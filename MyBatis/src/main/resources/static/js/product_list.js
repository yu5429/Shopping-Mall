$(document)
.ready(product_category_count)

.on("click", ".category", change_clikedcty)
.on('click', '.page', pagination)
.on('click', '.page', getDatabyPage)
.on('click', '.orderby', getOrderby)
.on('click', '.category', product_select_category_find )

tempAry = window.location.pathname.substring(14).split("/");
pn = decodeURIComponent(tempAry[0], "ASCII");
cn = decodeURIComponent(tempAry[1], "ASCII");

function product_category_count(){
	$.ajax({
		url: '/product_list/category/count',
		type: 'post',
		data: {
			big_category: pn
		},
		dataType: 'json',
		success:function(data) {
			if (data.length != 0) {
				$("#h3_categoryTitle").text(`${pn}`);
				
				for (i=0; i < data.length; i++) {
					html = [];
					html.push(
						"<li class=category cty=",data[i]["prod_category"],">",
						data[i]["prod_category"],"(<span>",data[i]["prod_category_count"],"</span>)<li>"
					);
					$("#category").append(html.join(""));
				}
			}
			if (cn == "전체") {
				product_list_normal_pageData(1);
				product_list_all_count();
				change_urlcty();
			}
			else {
				product_select_category_find();
				change_urlcty();
			}
		}
	})
}
			
function product_list_normal_pageData(cp) {
	$.ajax({
		url: '/product_list/normal_pageData',
		type: 'post',
		data:{
			big_category: pn,
			currentP: cp
		},
		dataType:'json',
		success:function(data) {
			$('#normal_menu_list').empty();
			if (data.length != 0) {
				for (i = 0; i < data.length; i++) {
					shorten(data,i);
				}
			}
		}
	})
}

function product_select_category_find() {
	cty = $(this).attr("cty");
	if (cty == "" || cty == undefined) cty = cn;
	$('#hidden_cty').val(cty);

	$("#hidden_currentP").val(1);
	
	ct = $(this).find('span').text();
	if (ct == "") ct = $(`[cty = '${cn}']`).find("span").text();
	$('#span_product_all_Count').text(ct);
	
	$.ajax({
		url: '/product_list/select_category_find',
		type: 'post',
		data:{
			currentP: 1, 
			cty:cty
		},
		dataType:'json',
		async:false,
		success:function(data) {
			$('#normal_menu_list').empty();
			if (data.length != 0) {
				for (i = 0; i < data.length; i++) {
					shorten(data,i);
				}
			}
		}
	})
	pagination();
}

function product_list_all_count(){
	$.ajax({
		url: '/product_list/all_count',
		type: 'post',
		data: {
			big_category: pn
		},
		dataType: 'json',
		success:function(count) {
			$('#span_product_all_Count').text(count);
			pagination();
		}
	})
}
	
function pagination(){
	$("#ul_pageNumber").empty();
	dataLength = Number($("#span_product_all_Count").text());
	thisText = $(this).text();
	last = Math.ceil(dataLength / 8);
	
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
	else if ($.isNumeric(thisText)) {
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
		if (last > startIndex + 4) {
			for (i = startIndex; i <= startIndex + 4; i++) {
				$("#ul_pageNumber").append(`<li id='np${i}' class='page pnum'>${i}</li>`);
			}
		}
		else {
			for (i = startIndex; i <= last; i++) {
				$("#ul_pageNumber").append(`<li id='np${i}' class='page pnum'>${i}</li>`);
			}
		}
	}
	$(`#np${cp}`).css("background-image", "url(/img/ui/pagination_click.png)")
}

function getOrderby() {
	odb = $(this).attr("odb");
	$('#hidden_odb').val(odb);
	getDatabyPage();
	$("#hidden_currentP").val(1);
}

function getDatabyPage() {
	cty = $('#hidden_cty').val();
	odb = $("#hidden_odb").val();
	cp = Number($("#hidden_currentP").val());
	
	if (odb == '최신순') {
		odb = "prod_regdate desc";
	}
	else if (odb == '낮은가격순') {
		odb = "prod_discount asc"
	}
	else if(odb == '상품후기순') {
		odb = "review_count desc"
	}
	
	$.ajax({
		url: '/product_list/getDatabyPage',
		type: 'post',
		data:{
			big_category: pn,
			currentP: cp, 
			cty:cty, 
			odb:odb
		},
		dataType:'json',
		success:function(data) {
			if (data.length != 0) {
				$('#normal_menu_list').empty();
				for (i = 0; i < data.length; i++) {
					shorten(data,i);
				}
			}
			else {
				$("#hidden_odb").val("최신순");
				return false;
			}
		}
	})
}

function shorten(data, i) {
	let prod_price = Number(data[i]["prod_price"]).toLocaleString();
	let prod_discount = Number(data[i]["prod_discount"]).toLocaleString();
	
	imgAry = data[i]["prod_img"].split("||");
	img = "/img/" + imgAry[0];
	
	html = [];
	html.push(
		"<li id='normal_menu_list_li'>",
        "<div class='productBox'>",
        "<div class='thumbnail'><a href='/product/detail/",data[i]["prod_code"],"'>",
        "<img src='",img,"'>&nbsp;</a></div>",
        "<div class='description'>",
        "<strong class='name'><a href='/product/detail/",data[i]["prod_code"],"'>",
        "<span style='font-size:12px;color:#555555;'>",data[i]["prod_name"],"</span></a></strong>",
        "<ul class='product-listitem spec'>",
        "<li><span style='text-decoration-line: line-through'>￦",prod_price,"</span></li>",
        "<li><span style='color:#000000;font-weight:bold;'>￦",prod_discount,"</span></li>",
        "</ul></div></div></li>",
    );
    $('#normal_menu_list').append(html.join(""));
}

function change_urlcty() {
	if (cn != "전체") {
		$(".category").css("background-color", "white");
		$(".category").css("color", "black");
		$(`.category[cty='${cn}']`).css("color", "white");
		$(`.category[cty='${cn}']`).css("background-color", "black");
	}
}

function change_clikedcty() {
	cty = $("#hidden_cty").val();
	if (cty == "전체") {
		$(".category").css("background-color", "white");
		$(".category").css("color", "black");
	}
	else {
		$(".category").css("background-color", "white");
		$(".category").css("color", "black");
		$(this).css("color", "white");
		$(this).css("background-color", "black");
	}
}