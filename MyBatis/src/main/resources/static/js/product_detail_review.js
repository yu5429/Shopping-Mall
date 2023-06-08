$(document)
.ready(review_ready)
.ready(review_checkAdmin)
.ready(review_checkNickname)
.ready(check_alreadyReview)

.on('change', '#product_count', calculateSum)
.on("click", ".page", pageIndexing)
.on("click", ".pre_reviewArrows", review_toggle)
.on("click", "#add", review_insert)
.on("click", ".update-btn", review_update)
.on("click", ".dtrw_button", review_delete)
.on("click", ".mystar", change_star)

var isAdmin = false;
var updateFlag = 0;
pc = decodeURIComponent(document.location.pathname.substring(16));

function review_ready() {
	$.ajax({
		url: "/review/ready",
		type: "post",
		async: false,
		data:{
			product_code: pc
		},
		dataType: "json",
		success: function(data) {
			if (data.length != 0) {
				for (i = 0; i < data.length; i++) {
					imgAry = data[i]["prod_img"].split("||");
					img = "/img/" + imgAry[0];
					
					if (data[i]["prod_content"] != null) {
						contAry = data[i]["prod_content"].split("||");
						
						for (j = 0; j < contAry.length; j++) {
							cont = "/img/" + contAry[j];
							if (cont == "/img/") break;
							$("#prod_content").append(`<img src='${cont}'>`);
						}
					}
				
					$("#product_code").val(data[i]["prod_code"]);
					$("#product-name").text(data[i]["prod_name"]);
					if (data[i]["prod_discount"] != data[i]["prod_price"]) {
						$("#product_price").val(data[i]["prod_discount"]);
					}
					else $("#product_price").val(data[i]["prod_price"]);
					
					
					$("#prod_img").attr("src", img);
					$("#product_company").val(data[i]["prod_company"]);
					$("#product_df").val(data[i]["prod_delivery"]);
					$('#hidden_currentL').val(data[i]["review_count"]);
				}
				$('#hidden_currentP').val(1);
				review_getMy();
				pageIndexing();
				calculateSum();
			}
			else {
				alert("존재하지 않는 상품 코드입니다")
				document.location = "/home";
			}
		}
	})
}

function calculateSum() {
	number = ($('#product_count').val() * $('#product_price').val()) + Number($("#product_df").val());
	$('#total_price').val(number + " 원");
};

function pageIndexing() {
	$("#ul_pageNumber").empty();
	
	dataLength = $("#hidden_currentL").val();
	if (dataLength == 0) return false;
	
	last = Math.ceil(dataLength / 5);
	thisText = $(this).text();
	
	cp = Number($("#hidden_currentP").val());
	
	if (thisText == "처음") {
		cp = 1;
		$("#hidden_currentP").val(cp);
	}
	else if (thisText == "이전" && cp - 1 > 0) {
		cp -= 1;
		$("#hidden_currentP").val(cp);
	}
	else if (thisText == "다음" && cp + 1 < last + 1) {
		cp += 1;
		$("#hidden_currentP").val(cp);
	}
	else if (thisText == "마지막") {
		cp = last;
		$("#hidden_currentP").val(cp);
	}
	
	if ($.isNumeric(thisText)) {
		cp = Number(thisText);
		$("#hidden_currentP").val(cp);
	}
	
	startIndex = Math.floor(cp / 5) * 5 + 1;
	if (cp % 5 == 0) startIndex = (Math.floor(cp / 5) - 1) * 5 + 1;
		
	if (cp <= 5) {
		if (last > 5) {
			for (i = 1; i <= 5; i++)
			$("#ul_pageNumber").append(`<li id='np${i}' class='page pnum'>${i}</li>`);
		}
		else {
			for (i = 1; i <= last; i++)
			$("#ul_pageNumber").append(`<li id='np${i}' class='page pnum'>${i}</li>`);
		}
	}
	else {
		for (i = startIndex; i <= last; i++) {
			$("#ul_pageNumber").append(`<li id='np${i}' class='page pnum'>${i}</li>`);
		}
	}
	
	$(`#np${cp}`).css("background-image", "url(/img/ui/pagination_click.png)")
		
	review_getList(cp);
	$("#div6-1").css("display", "block");
}

function review_getList(cp) {
	$.ajax({
		url: "/review/getList",
		type: "post",
		data:{
			product_code:$("#product_code").val(),
			currentP: cp
		},
		dataType: "json",
		success: function(data) {
			index = 0;
			$("#review_table tr:gt(1)").remove();
			
			for (i = 0; i < data.length; i++) {
				star = '<div id="divYS">';
				starVal = data[i]["star_num"];
				for (j = 1; j <= 5; j++) {
					if (j > starVal) {
						star += `<li style="color:transparent; text-shadow: 0 0 0 #f0f0f0;">⭐</li>`
					}
					else star += `<li style="color:transparent; text-shadow: 0 0 0 #ffcc66;">⭐</li>`
				}
				star += '</div>'
                deleteButton = "";
                updateButton = "";
                
				html = [];
				html.push(
					"<tr>",
					"<td><div class='div_reviewTD'>",star,
					"<div class='div_rlt'><pre class='pre_reviewArrows'>▶</pre>",
					"<input type='text' class='review-list-title' value='",
					data[i]["review_title"],"' maxlength='30' readonly></div>",
					"<div class='hidden div_contentBox'>",
					"<textarea rows='4' cols='50' class='review_list_content' maxlength='300' readonly>",
					data[i]["review_content"],"</textarea></div><br>",
					"<div class=div_toggleNickname><input type='text' class='review-list-nickname' value='",
					data[i]["review_nickname"],"' readonly>",updateButton,deleteButton,"</div></div></td></tr>"
				);
				index++;
				$("#review_table").append(html.join(""));
			}
			
		}
	})
}

function review_getMy() {
	$.ajax({
		url: "/review/getMy",
		type: "post",
		data: {
			product_code: pc
		},
		dataType: "json",
		success: function(data) {
			if (data.length != 0) {
				$("#review_myTable tr:gt(1)").remove();
				starVal = 0;
				
				for (i = 0; i < data.length; i++) {
					star = "<div id='divMS'>";
					starVal = data[i]["star_num"];
					for (j = 1; j <= 5; j++) {
						if (j > starVal) {
							star += `<li id='mystar${j}' class='mystar' star='${j}'>⭐</li>`;
						}
						else {
							star += `<li id='mystar${j}' class='mystar' star='${j}' style="text-shadow: 0 0 0 #ffcc66">⭐</li>`;
						}
					}
					star += '</div>'

	                deleteButton = "<button class=dtrw_button>삭제</button>";
	                updateButton = "<button class=update-btn dtrw_button>수정</button>"

					html = [];
					html.push(
						"<tr>",
						"<td><div class=div_reviewTD>",star,
						"<div class=div_rlt><pre class=pre_reviewArrows>▶</pre>",
						"<input type='text' class='review-list-title' value='",
						data[i]["review_title"],"' maxlength='30' readonly></div>",
						"<div class='hidden div_contentBox'>",
						"<textarea rows='4' cols='50' class='review_list_content' maxlength='300' readonly>",
						data[i]["review_content"],"</textarea></div><br>",
						"<div class=div_toggleNickname><input type='text' class='review-list-nickname' value='",
						data[i]["review_nickname"],"' readonly>",updateButton,deleteButton,"</div></div></td></tr>"
					);
					$("#review_myTable").append(html.join(""));
				}
			}
			else $("#review_myTable").append("<tr><td id='td_reviewMsg'>리뷰를 작성해주세요</td></tr>");
		}
	})
}

function review_delete() {
	pc = $('#product_code').val();
	$.ajax({
		url: "/review/delete",
		type: "post",
		data: {
			product_code: pc
		},
		dataType: "text",
		success: function(response) {
			if (response = "true") {
				location.reload();
				$(".btnReview").trigger("click");
			}
		}
	});
}

function review_update() {
	arw = $(this).closest('tr').find('.pre_reviewArrows');
	if (arw.text() != "▼")
		arw.trigger('click');
		
	title =$(this).closest('tr').find('.review-list-title').val();
	content =$(this).closest('tr').find('.review_list_content').val();
	
	ts = $(this).closest('tr').find('.review-list-title');
	cs = $(this).closest('tr').find('.review_list_content');
	
	nickname = $('.review-list-nickname').val();
	product_code = $('#product_code').val();

	if($(this).text() != '수정 완료') {
		updateFlag = 1;
		ts.attr('readonly',false);
		ts.css('border', '1px solid black');
		cs.attr('readonly',false);
		cs.css('border', '1px solid black');
		$(this).text('수정 완료');
	}
	else {
		updateFlag = 0;
		ts.attr('readonly',true);
		ts.css('border', 'none');
		cs.attr('readonly',true);
		cs.css('border', 'none');
		$(this).text('수정');
		
		star = 0;
		for (i = 1; i <= 5; i++) {
			if ($(`#mystar${i}`).css("text-shadow") == "rgb(255, 204, 102) 0px 0px 0px")
				star++;
		}
		
		$.ajax({
			type: "POST",
			url: "/review/update",
			data: {
				product_code: product_code,
				star_num: star,
				nickname: nickname,
				review_title:title,
				review_content:content
				
			},
			success: function(response) {
				location.reload();
				$(".btnReview").trigger("click");
			}
		});
	}
}
	
function review_toggle() {
  arw = $(this).text();
  if (arw != '▼') {
	$(this).text('▼');
	$(this).closest('tr').find('.div_toggleNickname').css("top", "-20px");
    $(this).closest('tr').find('.hidden').toggle();
  }
  else {
	  $(this).text('▶');
	  $(this).closest('tr').find('.div_toggleNickname').css("top", "-40px");
	  $(this).closest('tr').find('.hidden').toggle();
  }
}

function review_insert(){
		$.ajax({
			url: "/review/insert",
			type: "post",
			dataType: "text",
			data:{product_code:$('#product_code').val(),star_num:$('input[name="reviewStar"]:checked').val(),
				  review_title:$('#review_title').val(),review_nickname:$('#nickname').val(),
				  review_content:$('#review_content').val()},
			beforeSend: function() {
				starVal = $('input[name="reviewStar"]:checked').val();
				review_content = $('#review_content').val();
				review_title = $('#review_title').val();
				review_nickname=$("#nickname").val();

				if (starVal == undefined) {
					alert('별점을 매겨주세요.');
					return false;
				}
				else if (review_content == '') {
					alert('내용을 입력해주세요.');
					return false;
				}
				else if (review_title == '') {
					alert('제목을 입력해주세요.');
					return false;
				}
			},
			success: function() {
				$('input[name="reviewStar"]:checked').prop('checked', false);
				$("#review_writeDiv").find("input").val("");
				location.reload();			 
			}
		})
}
function review_checkAdmin() {           
	$.ajax({
		url: "/review/checkAdmin",
		type: "post",
		dataType: "text",
		success: function(check) {
			if (check == "true") {
				isAdmin = true;
			}
		}
	})
}

function review_checkNickname() {           
	$.ajax({
		url: "/review/checkNickname",
		type: "post",
		dataType: "text",
		success: function(logininfo) {
			if (logininfo != "") {
				$("#nickname").val(logininfo);
			}
		}
	})
}

function check_alreadyReview() {
	pn = $("#product-name").text();
	
	$.ajax({
		url: "/check/alreadyReview",
		type: "post",
		data: {
			product_code: pc,
			product_name: pn
		},
		dataType: "text",
		success: function(check) {
			if (check == "리뷰 없음") $("#div_writeReview").css("display", "block");
			else {
				$("#div_writeReview").css("display", "none");
				$("#td_reviewMsg").text("해당 제품을 구매 확정 시 리뷰 작성이 가능합니다");
			}
		}
	})
}

function change_star() {
	if (updateFlag == 1) {
		index = $(this).attr("star");
		for (i = 1; i <= 5; i++) {
			if (i <= index) $(`#mystar${i}`).css("text-shadow", "0 0 0 #ffcc66");
			else $(`#mystar${i}`).css("text-shadow", "0 0 0 #f0f0f0");
		}
	}
}