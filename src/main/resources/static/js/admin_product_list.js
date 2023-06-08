$(document)
.ready(check_admin)
.ready(admin_product_getBigCategory)
.ready(admin_product_getCount)

.on("propertychange change paste input", "#input_search", admin_product_getSearchCount)
.on("change", "#select_bigcategory", admin_product_selectBig)
.on("change", "#select_category", admin_product_getSearchCount)
.on("click", "#table_productList td", goto_admin_product_view)
.on("click", ".page", pageIndexing)
.on('click','#button_create', goto_admin_product_create)
.on("click", "#button_goto_home", goto_home)

firstLoad = 0;

function check_admin() {
	$.ajax({
		url: "/check/admin",
		type: "post",
		dataType: "text",
		success: function(check) {
			if (check == "false") {
				alert("관리자용 페이지입니다");
				document.location = "/home";
			}
		}
	})
}

function goto_home() {
	document.location = "/home";
}

function goto_admin_product_create(){
	document.location = "/admin/product/create";
}

function goto_admin_product_view() {
	index = $(this).parent().index();
	code = $(`#table_productList tr:eq(${index}) td:eq(4)`).html();
	code = code.replaceAll("<br>","_");
	document.location = `/admin/product/view/${code}`
}

function admin_product_getCount() {
	$.ajax({
		url: "/admin/product/getCount",
		type: "post",
		dataType: "text",
		success: function(count) {
			$("#hidden_countList").val(count);
			pageIndexing(0);
		}
	})
}

function admin_product_getList(cp){
	$.ajax({
		url: "/admin/product/getList",
		type: "post",
		data: {currentP: cp},
		dataType: "json",
		success: function(data) {
			draw_product_table(data);
		}
	})
}

function pageIndexing(flag) {
	$("#ul_pageNumber").empty();
	
	dataLength = $("#hidden_countList").val();
	
	last = Math.ceil(dataLength / 10);
	thisText = $(this).text();
	
	cp = Number($("#hidden_currentPage").val());
	
	if (thisText == "처음") {
		cp = 1;
		$("#hidden_currentPage").val(cp);
	}
	else if (thisText == "이전" && cp - 1 > 0) {
		cp -= 1;
		$("#hidden_currentPage").val(cp);
	}
	else if (thisText == "다음" && cp + 1 < last + 1) {
		cp += 1;
		$("#hidden_currentPage").val(cp);
	}
	else if (thisText == "마지막") {
		cp = last;
		$("#hidden_currentPage").val(cp);
	}
	
	if ($.isNumeric(thisText)) {
		cp = Number(thisText);
		$("#hidden_currentPage").val(cp);
	}
	
	startIndex = Math.floor(cp / 10) * 10 + 1;
	if (cp % 10 == 0) startIndex = (Math.floor(cp / 10) - 1) * 10 + 1;
	
	
	if (cp <= 10) {
		if (last > 10) {
			for (i = 1; i <= 10; i++)
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
	
	$(`#np${cp}`).css("background-image", "url(/img/ui/pagination_click.png)");
	
	if (flag == 0) admin_product_getList(cp);
	else admin_product_search(cp);
	$('html').scrollTop(0);
}

function admin_product_getSearchCount() {
	if ($("#input_search").val() == "") $("#hidden_currentPage").val(1);
	
	$.ajax({
		url: "/admin/product/getSearchCount",
		type: "post",
		data: {
			bigcategory: $("#select_bigcategory option:selected").val(),
			category: $("#select_category option:selected").val(),
			keyword: $("#input_search").val()
		},
		dataType: "text",
		success: function(count) {
			$("#hidden_countList").val(count);
			pageIndexing(1);		
		}
	})
}

function admin_product_search(cp) {
	big = $("#select_bigcategory option:selected").val();
	small = $("#select_category option:selected").val();
	
	$.ajax({
		url: "/admin/product/search",
		type: "post",
		data: {
			bigcategory: big,
			category: small,
			keyword: $("#input_search").val(),
			currentP: cp
		},
		dataType: "json",
		success: function(data) {
			draw_product_table(data);
		}
	})
}

function admin_product_getBigCategory() {
	$.ajax({
		url: "/admin/product/getCategory",
		type: "post",
		data: {
			firstLoad: firstLoad
		},
		dataType: "json",
		success: function(data) {
			$("#select_bigcategory option").not("[value='']").remove();
			
			if (data.length != 0) {
				for (i = 0; i < data.length; i++) {
					$("#select_bigcategory").append("<option>" + data[i]["prod_bigcategory"] + "</option>");
				}
			}
			
			firstLoad = 1;
		}
	})
}

function admin_product_selectBig() {
	select = $("#select_bigcategory option:selected").val();
	
	$.ajax({
		url: "/admin/product/getCategory",
		type: "post",
		data: {
			firstLoad: firstLoad,
			bigcategory: select
		},
		dataType: "json",
		beforeSend: function() {
			if (select == "") {
				$("#select_category").css("display", "none");
				$("#select_category option").not("[value='']").remove();
				return false;
			}
		},
		success: function(data) {
			$("#select_category option").not("[value='']").remove();
			
			if (data.length != 0) {
				for (i = 0; i < data.length; i++) {
					$("#select_category").append("<option>" + data[i]["prod_category"] + "</option>");
				}
				$("#select_category").css("display", "inline-block");
			}
		}
	})
}



function draw_product_table(data) {
	$("#table_productList tr:gt(0)").remove();
			
	product_listNum = Number($('#hidden_countList').val());
	product_listNum = product_listNum - (cp-1) * 10;
			
	if (data.length != 0) {
		for (i = 0; i < data.length; i++) {
			imgAry = data[i]['prod_img'].split("||");
			imgsr = "/img/" + imgAry[0];
			
			code = data[i]['prod_code'].split("_");
								
			html = [];
			html.push(
				"<tr><td>",product_listNum,"</td>",
				"<td style='width:150px'><img class='table_img' src='",imgsr,"'></td>",
				"<td>",data[i]["prod_bigcategory"],"</td>",
				"<td>",data[i]['prod_category'],"</td>",
                "<td>",code[0],"<br>",code[1],"<br>",code[2],"</td>",
                "<td>",data[i]['prod_name'],"</td>",
                "<td>",data[i]['prod_company'],"</td>",
                "<td>",data[i]['prod_discount'],"</td>",
                "<td>",data[i]['prod_price'],"</td><td>"
            );
            
            if (data[i]['prod_content'] != "" && data[i]['prod_content'] != null) {
	            contAry = data[i]['prod_content'].split("||");
	            
	            for (j = 0; j < contAry.length; j++) {
				    contsr = "/img/" + contAry[j];
	            	
	            	if (contsr == "" || contsr == "/img/") break;
	            	
					html.push(
					"<img src='",contsr,"' style='width:50px; height: 100px'>"
					)
				}
			}
            
            date = data[i]['prod_regdate'].split(" ");
            html.push(		                
                "</td><td>",data[i]['prod_delivery'],"</td>",
				"<td>",date[0],"<br>",date[1],"</td></tr>"
			);
			$("#table_productList").append(html.join(""));
			product_listNum--;
		}
	}
}