$(document)
.ready(inquiry_checkAdmin)
.ready(inquiry_getpc)
.ready(inquriy_nonmember)

.on("focus", "#response_title, #response_content", function() {
	inquiry_checkAdmin(1);
})
.on('click','#btnUpdate',postUpdate)
.on('click','#btnDelete',inquiry_delete)
.on('click','#btnList, #button_gotoList',goto_inquiry)
.on("click", "#button_submitResponse", inquiry_submitResponse)
.on("click", "#button_deleteResponse", inquiry_deleteResponse)

url = window.location.pathname.substring(14);

function postUpdate(){
	document.location='/inquiry/update/'+$('#inquiry_no').val();
}

function inquiry_delete(){
	if(! confirm('삭제 하시겠습니까?')) {
		return false;
	}
	else {
		$.ajax({
			url: "/inquiry/delete",
			type: "post",
			dataType: "text",
			data:{
				inquiry_no:$('#inquiry_no').val()
			},
			success: function(check) {
				if (check == "true") document.location="/inquiry/list";
				else alert("삭제 하시려면 로그인해야합니다");
			}
		})		
	}
}

function goto_inquiry(){
		document.location='/inquiry/list';
}

function inquriy_nonmember() {
	$.ajax({
		url: "/inquiry/nonmember",
		type: "post",
		dataType: "text",
		success: function(check) {
			if (check == "true") {
				$(".nonmember").css("display", "inline-block");
			}
		}
	})
}

function inquiry_checkAdmin(flag) {
	if ($("#div_writerText").text() != "관리자") {
		$.ajax({
			url: "/inquiry/checkAdmin",
			type: "post",
			data: {
				inquiry_no: url
			},
			dataType: "text",
			success: function(check) {
					if (flag != 1) inquiry_alreadyExistResponse(url);
					if (check == "admin new") {
						if (flag != 1) {
							html = [];
							html.push(
								"<p class=h1>답변</p><div class='view'>",
								"제목 : <input type=text id=response_title maxlength=30>",
								"</div><div class='view'>작성자 : 관리자</div><div>",
								"<textarea id=response_content class=textarea maxlength=600></textarea>",
								"</div><div class='divg'><button id=button_gotoList class=button>목록</button>",
								"<button id=button_submitResponse class=button>등록</button></div>"
							);
							$("#article_response").append(html.join(""));
						}
					}
					else if (check == "admin already") {
						if (flag == 1) {
							$("#response_title").prop("readonly", false);
							$("#response_content").prop("readonly", false);
							$("#response_title").css("border", "1px");
							$("#response_title").attr("class", false);
						}
						else {			
							html = [];
							html.push(
								"<div class='divg'><button id=button_gotoList class=button>목록</button>",
								"<button id=button_submitResponse class=button>등록</button>",
								"<button id=button_deleteResponse class=button>삭제</button></div>"
								);
							$("#article_response").after(html.join(""));
						}
					}
				}
		})
	}
}

function inquiry_submitResponse() {
	$.ajax({
		url: "/inquiry/submitResponse",
		type: "post",
		data: {
			inquiry_no: url,
			title: $("#response_title").val(),
			content: $("#response_content").val()
		},
		dataType: "text",
		beforeSend: function() {
			title = $("#response_title").val();
			content = $("#response_content").val();
			
			if (title == "" || content == "") {
				alert("답변 제목과 내용을 입력해주세요");
				return false;
			}
		},
		success: function(check) {
			document.location = "/inquiry/list";
		}
	})
}

function inquiry_alreadyExistResponse(url) {
	$.ajax({
		url: "/inquiry/alreadyExistResponse",
		type: "post",
		data: {
			inquiry_no: url
		},
		dataType: "json",
		success: function(data) {
			if (data.length != 0) {
				for (i = 0; i < data.length; i++) {
					html = [];
					html.push(
						"<p class=h1>답변</p><div class='view'>",
						"제목 : <input type=text id=response_title class=view maxlength=30 style=border:0px value='",
						data[i]["response_title"],"'>",
						"</div><div class='view'>작성자 : 관리자</div><div>",
						"<textarea id=response_content class=textarea maxlength=600>",
						data[i]["response_content"],"</textarea>",
						"<div class='view'>작성일 : ",data[i]["response_created"],"</div>",
						"<div class='view'>수정일 : ",data[i]["response_updated"],"</div>"
					);
					$("#article_response").append(html.join(""));
					$("#response_title").prop("readonly", true);
					$("#response_content").prop("readonly", true);
				}
			}
		}
	})
}

function inquiry_deleteResponse() {
	$.ajax({
		url: "/inquiry/deleteResponse",
		type: "post",
		data: {
			inquiry_no: url
		},
		dataType: "text",
		beforeSend: function() {
			if (! confirm("답변을 삭제하시겠습니까?")) return false;
		},
		success: function(check) {
			document.location = "/inquiry/list";
		}
	})
}


function inquiry_getpc() {
	if ($("#product_code").val() != "") {
		$.ajax({
			url: "/inquiry/getpc",
			type: "post",
			data: {
				prod_code: $("#product_code").val(),
			},
			dataType: "json",
			success: function(data) {
				if (data.length != 0) {
					str="";
		
					$("#product_info").show();
					$("#product_info_table tr:gt(1)").remove();
					
					prod_code = "상품코드 ["+data["prod_code"]+"]";
					prod_name = "상품이름 ["+data["prod_name"]+"]";
					prod_price ="상품가격 ["+data["prod_price"]+"원]";
					
					imgAry = data["prod_img"].split("||");
					prod_img = "/img/" + imgAry[0];
					
					str="<tr>"+"<td>"+"<img src='"+prod_img+"' style='width: 100px; height: 100px;'>"+"<td>"+
					"<td style='padding-left: 20px'>"+prod_code+"<br>"+prod_name+"<br>"+prod_price+"</td>"+"</tr>";
					
					$("#product_info_table").append(str);
				}
			}
		});
	}
}