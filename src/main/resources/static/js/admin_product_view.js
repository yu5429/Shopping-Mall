$(document)
.ready(check_admin)
.ready(getBigCategory)

.on("change", "#select_bigcategory", admin_product_getCategory)
.on("change", "#select_bigcategory, #select_category", change_productCode)
.on('click','#button_gotoList',goto_admin_product_list)
.on('click','#button_update',admin_product_update)
.on('click','#button_delete',admin_product_delete)

.on("change", "#file1", function() {
	preview1(this, "#preview1");
})
.on("change", "#file2", function() {
	preview2(this, "#preview2");
})

pn = decodeURIComponent(window.location.pathname.substring(20));
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

function getBigCategory() {
	$.ajax({
		url: "/admin/product/getCategory",
		type: "post",
		data: {
			firstLoad: firstLoad
		},
		dataType: "json",
		success: function(data) {
			if (data.length != 0) {
				$("#select_bigcategory").empty();
				for(i = 0; i < data.length; i++) {
					html = [];
					html.push(
						"<option value='",data[i]["prod_bigcategory"],"'>",
						data[i]["prod_bigcategory"],"</option>"	
					);
					$("#select_bigcategory").append(html.join(""));
				}
				firstLoad = 1;
				admin_product_getCategory();
			}
		}
	})
}

function admin_product_getCategory() {
	ary = pn.split("_");
	big = ary[0];
	
	if (firstLoad == 2) big = $("#select_bigcategory option:selected").val();
	
	id = this.id;
		 
	$.ajax({
		url: "/admin/product/getCategory",
		type: "post",
		data: {
			firstLoad: firstLoad,
			bigcategory: big
		},
		dataType: "json",
		success: function(data) {
			if (data.length != 0) {
				$("#select_category").empty();
				for (i = 0; i < data.length; i++) {
					html = [];
					html.push(
						"<option value='",data[i]["prod_category"],"'>",
						data[i]["prod_category"],"</option>"
					);
					$("#select_category").append(html.join(""));
				}
				if (id != "select_bigcategory") getProductData();
				firstLoad = 2;
			}
		}
	})
}

function getProductData() {
	$.ajax({
		url: "/admin/product/getData",
		type: "post",
		data: {
			prod_code: pn
		},
		dataType: "json",
		success: function(data) {
			if (data.length != 0) {
				for (i = 0; i < data.length; i++) {
					category = data[i]["prod_category"];
					bigcategory = data[i]["prod_bigcategory"];
					
					$("#input_code").val(data[i]["prod_code"]);
					$("#input_changeCode").val(data[i]["prod_code"]);
					$("#input_name").val(data[i]["prod_name"]);
					
					$(`#select_bigcategory option[value="${bigcategory}"]`).attr("selected", "selected");
					$(`#select_category option[value="${category}"]`).attr("selected", "selected");
										
					$("#input_price").val(data[i]["prod_price"]);
					$("#input_discount").val(data[i]["prod_discount"]);
					
					$("#text1").text(data[i]['prod_img']);
					imgAry = data[i]['prod_img'].split("||");
					
					for (j = 0; j < imgAry.length; j++) {
					    imgsr = "/img/" + imgAry[j];
		            	
		            	if (imgsr == "" || imgsr == "/img/") break;
		            	
						$("#img_og").append("<img src='" + imgsr + "' style='width:100px; height: 100px'>");
					}
					
					if (data[i]["prod_content"] != null) {
						$("#text2").text(data[i]['prod_content']);
						contAry = data[i]['prod_content'].split("||");
						
						for (j = 0; j < contAry.length; j++) {
						    contsr = "/img/" + contAry[j];
			            	
			            	if (contsr == "" || contsr == "/img/") break;
			            	
							$("#img_ogd").append("<img src='" + contsr + "' style='width:100px; height: 200px'>");
						}
					}
					
					$("#input_company").val(data[i]["prod_company"]);
					$("#input_delivery").val(data[i]["prod_delivery"]);
				}
			}
		}
	})
}

function goto_admin_product_list(){
	document.location = "/admin/product/list";
}

function admin_product_update(){
	code = $("#input_code").val();
	namae = $("#input_name").val();
	category = $("#select_category option:selected").val();
	price = $("#input_price").val();
	discount = $("#input_discount").val();
	content = $("#text2").text();
	img = $("#text1").text();
	company = $("#input_company").val();
	delivery = $("#input_delivery").val();
	bigcategory = $("#select_bigcategory option:selected").val();
	ccode = $("#input_changeCode").val();
	
	$.ajax({
		url: "/admin/product/update",
		type: "post",
		data: {
			code: code,
			name: namae,
			category: category,
			price: price,
			discount: discount,
			content: content,
			img: img,
			company: company,
			delivery: delivery,
			bigcategory: bigcategory,
			ccode: ccode
		},
		datatype: "text",
		success: function(check) {
			alert("제품 정보가 수정되었습니다");
			goto_admin_product_list();
		}
	})
}

function admin_product_delete(){
	if(! confirm('삭제하시겠습니까?')) return false;
	else {
		prod_code = $('#input_code').val();
		
		$.ajax({
			url: "/admin/product/delete",
			type: "post",
			dataType: "text",
			data:{prod_code:prod_code} ,
			success: function(data) {
				alert("제품이 삭제되었습니다.");
				adminProduct_clear();
				goto_admin_product_list();
			}
		})		
	}
}

function adminProduct_clear() {
	$("#table_productView").find("input").val("");
}

function preview1(input, place) {
	$("#preview1").empty();
	if (input.files) {
		length = input.files.length;
		nameString = "";
		
		for (i = 0; i < length; i++) {
			reader = new FileReader();
			reader.onload = function (e) {
				$($.parseHTML("<img class='img_p1'>")).attr("src", e.target.result).appendTo(place);
			}
			reader.readAsDataURL(input.files[i]);
			nameString += input.files[i].name + "||";
		}
		$("#text1").text(nameString);
	}
}
 
function preview2(input, place) {
	$("#preview2").empty();
	if (input.files) {
		length = input.files.length;
		nameString = "";
		
		for (i = 0; i < length; i++) {
			reader = new FileReader();
			reader.onload = function (e) {
				$($.parseHTML(`<img class='img_p2'>`)).attr("src", e.target.result).appendTo(place);
			}
			reader.readAsDataURL(input.files[i]);
			nameString += input.files[i].name + "||";
		}
		$("#text2").text(nameString);
	}
}

function change_productCode() {
	d = new Date();
	year = String(d.getFullYear());
	month = String(d.getMonth());
	date = String(d.getDate());
	hour = String(d.getHours());
	minute = String(d.getMinutes());
	seconds = String(d.getSeconds());
	dday = year+month+date+hour+minute+seconds;
	code = $("#select_bigcategory option:selected").val() + "_" 
	+ $("#select_category option:selected").val() + "_" + dday;
	$("#input_changeCode").val(code);
}