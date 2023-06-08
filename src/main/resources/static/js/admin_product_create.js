$(document)
.ready(check_admin)
.ready(admin_product_getCategory)

.on('click','#button_gotoList', goto_admin_productList)
.on("click", "#button_insert", admin_product_insert)
.on("click", "#button_empty", admin_product_clear)
.on("propertychange change paste input", "#input_bigcategory, #input_category", create_code)

.on("change", "#file1", function() {
	preview1(this, "#preview1");
})
.on("change", "#file2", function() {
	preview2(this, "#preview2");
})
.on("input", "input[type=number]", function() {
	validateInt(this.value, this.id);
})

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

function admin_product_getCategory() {
	$.ajax({
		url: "/admin/product/getCategory",
		type: "post",
		data: {
			firstLoad: "create"
		},
		dataType: "json",
		success: function(data) {
			if (data.length != 0) {
				for (i = 0; i < data.length; i++) {
					if (data[i]["prod_bigcategory"] == null) continue;
					html = [];
					html.push(
						"<option value='",data[i]["prod_bigcategory"],"'></option>"
					);
					$("#list_bigcategory").append(html.join(""));
				}
				for (i = 0; i < data.length; i++) {
					if (data[i]["prod_bigcategory"] != null) break; 
					html = [];
					html.push(
						"<option value='",data[i]["prod_category"],"'></option>"
					);
					$("#list_category").append(html.join(""));
				}
			}
		}
	})
}

function goto_admin_productList() {
	document.location = "/admin/product/list";
}

function admin_product_insert() {
	code = $("#input_code").val();
	namae = $("#input_name").val();
	category = $("#input_category").val();
	price = $("#input_price").val();
	discount = $("#input_discount").val();
	content = $("#text2").text();
	img = $("#text1").text();
	company = $("#input_company").val();
	delivery = $("#input_delivery").val();
	bigcategory = $("#input_bigcategory").val();
	
	$.ajax({
		url: "/admin/product/insert",
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
			bigcategory: bigcategory
		},
		dataType: "text",
		beforeSend: function() {
			if (code == "" || namae == "" || category == "" || price == "" ||
			discount == "" || img == "" || company == "" ||
			delivery == "" || bigcategory == "") {
				alert("입력값이 비어있지 않은지 확인해주세요");
				return false
			}
		},
		success: function(check) {
			alert("제품 등록이 완료되었습니다");
			admin_product_clear();
			goto_admin_productList();
		}
	})
}

function admin_product_clear() {
	$("#table_productInsert").find("input").val("");
	$("#table_productInsert").find("textarea").text("");
	$("#preview1").empty();
	$("#preview2").empty();
}

function preview1(input, place) {
	$("#preview1").empty();
	if (input.files) {
		length = input.files.length;
		nameString = "";
		breakFlag = 0;
		
		for (i = 0; i < length; i++) {
			fileName = input.files[i].name;
			
			ext = fileName.split(".").pop().toLowerCase();
			if($.inArray(ext, ['jpg','jpeg','gif','png','webp']) == -1) {
				breakFlag = 1;
				break;
			}
		
			reader = new FileReader();
			reader.onload = function (e) {
				$($.parseHTML("<img class='img_p1'>")).attr("src", e.target.result).appendTo(place);
			}
			reader.readAsDataURL(input.files[i]);
			nameString += input.files[i].name + "||";
		}
		
		if (breakFlag == 1) {
			$("#file1").val("");
			$("#preview1").empty();
			alert("이미지 파일만을 첨부해주세요");
			return false;
		}
		
		$("#text1").text(nameString);
	}	
}

function preview2(input, place) {
	$("#preview2").empty();
	if (input.files) {
		length = input.files.length;
		nameString = "";
		breakFlag = 0;
		
		for (i = 0; i < length; i++) {
			fileName = input.files[i].name;
			
			ext = fileName.split(".").pop().toLowerCase();
			if($.inArray(ext, ['jpg','jpeg','gif','png','webp']) == -1) {
				breakFlag = 1;
				break;
			}
			
			reader = new FileReader();
			reader.onload = function (e) {
				$($.parseHTML(`<img class='img_p2'>`)).attr("src", e.target.result).appendTo(place);
			}
			reader.readAsDataURL(input.files[i]);
			nameString += input.files[i].name + "||";
		}
		
		if (breakFlag == 1) {
			$("#file2").val("");
			$("#preview2").empty();
			alert("이미지 파일만을 첨부해주세요");
			return false;
		}
		
		$("#text2").text(nameString);
	}
}

function validateInt(input, id) {
	id = "#" + id;
	if (input.length > 9) $(id).val(input.slice(0, 9));
	idval = $(id).val();
	$(id).val(idval.replace(/[^0-9]/g, ""));
}

function create_code() {
	d = new Date();
	year = String(d.getFullYear());
	month = String(d.getMonth());
	date = String(d.getDate());
	hour = String(d.getHours());
	minute = String(d.getMinutes());
	seconds = String(d.getSeconds());
	dday = year+month+date+hour+minute+seconds;
	code = $("#input_bigcategory").val() + "_" + $("#input_category").val() + "_" + dday;
	$("#input_code").val(code);
}