$(document)
.ready(drawOrderDetail)
.ready(odt_calculateSum)
.ready(check_loginStatus)

.ready(clear_all)
.ready(get_memberInfo)

.on("change", ".odt_quantity", odt_quantity)
.on("click", ".cancel", odt_cancelRow)

.on("click", "#button_findPostcode", find_address)
.on("click", "#button_deliveryfindPostcode", find_deliveryAddress)
.on('click', '#radio_delivery', radio_default_or_new)
.on('click', '#btnPay', odl_insert)
.on("propertychange change paste input", "#input_deliveryPH1, #input_deliveryPH2, #input_deliveryPH3", check_nullPhone)
.on("propertychange change paste input", ".odt_quantity", maxlength999)

function drawOrderDetail() {
	plus = localStorage.getItem("odt");
	$("#table_orderDetail").append(plus);
	rownum = $("#table_orderDetail").children().length - 1;
	$("#span_selectedCount").text(rownum);
}

function check_loginStatus() {
	$.ajax({
		url: "/check/loginStatus",
		type: "post",
		dataType: "text",
		success: function(check) {
			if (check != "true") {
				alert("로그인이 필요한 페이지입니다");
				document.location = "/home";
			}
		}
	})
}

function odt_quantity() {
	index = $(this).parent().parent().index();
	qty = Number($(this).val());
	price = Number($(`#table_orderDetail tr:eq(${index}) td:eq(2)`).text());
	total = qty * price;
	$(`#table_orderDetail tr:eq(${index}) td:eq(5)`).text(total);
	
	odt_calculateSum();
}

function odt_calculateSum() {
	totalP = 0;
	totalD = 0;
	tempD = 0;
	totalSum = 0;
	
	for (i = 0; i < $("#table_orderDetail tr").length; i++) {
			totalP += Number($(`#table_orderDetail tr:eq(${i}) td:eq(5)`).text());
			targetD = Number($(`#table_orderDetail tr:eq(${i}) td:eq(4)`).text());
			if (totalD == 0) {
				totalD += targetD;
				tempD = targetD;
			}
			else if (tempD < targetD) {
				totalD += targetD;
				tempD = targetD;
			}	
		}
	totalSum = totalP + totalD;

	$("#odt_totalP").text(totalP);
	$("#odt_totalD").text(totalD);
	$("#odt_totalSum").text(totalSum);
}
	
function odt_cancelRow() {
	index = $(this).parent().parent().index();
	
	seq = $(`#table_orderDetail tr:eq(${index})`).attr("seq");
	$(`#table_orderDetail tr:eq(${index})`).remove();
	
	odt_calculateSum();
	
	localString = localStorage.getItem("odt");
	si = localString.indexOf(`<!--${seq}시작-->`);
	ei = localString.indexOf(`<!--${seq}끝-->`);
	rpt = localString.substring(si, ei);
	localString = localString.replace(rpt, "");
	localStorage.setItem("odt", localString);
	
	rownum = $("#table_orderDetail").children().length - 1;
	$("#span_selectedCount").text(rownum);
}



function find_address() {
	new daum.Postcode({
		oncomplete: function(data) {
			add = "";
			nadd = "";
			
			if (data.userSelectedType === "R") {
				add = data.roadAddress;
				
				if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
					nadd += data.bname;
				}
				if (data.buildingName !== "" && data.apartment === "Y") {
					nadd += (nadd !== "" ? ", " + data.buildingName : data.buildingName);
				}
				if (nadd !== "") {
					nadd = "(" + nadd + ")";
				}
				$("#input_orderNADD").val(nadd);
			}
			else {
				add = data.jibunAddress;
				nadd = "";
			}
			
			$("#input_orderPC").val(data.zonecode);
			$("#input_orderADD").val(add);
			$("#input_orderDADD").focus();
		}
	}).open();
}

function find_deliveryAddress() {
	new daum.Postcode({
		oncomplete: function(data) {
			add = "";
			nadd = "";
			
			if (data.userSelectedType === "R") {
				add = data.roadAddress;
				
				if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
					nadd += data.bname;
				}
				if (data.buildingName !== "" && data.apartment === "Y") {
					nadd += (nadd !== "" ? ", " + data.buildingName : data.buildingName);
				}
				if (nadd !== "") {
					nadd = "(" + nadd + ")";
				}
				$("#input_deliveryNADD").val(nadd);
			}
			else {
				add = data.jibunAddress;
				nadd = "";
			}
			
			$("#input_deliveryPC").val(data.zonecode);
			$("#input_deliveryADD").val(add);
			$("#input_deliveryDADD").focus();
		}
	}).open();
}
function clear_all() {
	$(".table_orderInfo").find("input").val("");
	$(".table_orderInfo").find("pre").text("");
}

function clear_delivery() {
	$("#table_delivery").find("input").val("");
	$("#table_delivery").find("pre").text("");
}

function get_memberInfo() {
	$.ajax({
		url: "/get_signupInfo",
		type: "post",
		dataType: "json",
		success: function(data) {
			if (data.length != 0) {
				for (i = 0; i < data.length; i++) {
					$("#input_orderRN").val(data[i]["realname"]);
					
					splited = data[i]["address"].split("/");
					$("#input_orderPC").val(splited[0]);
					$("#input_orderADD").val(splited[1]);
					$("#input_orderDADD").val(splited[2]);
					$("#input_orderNADD").val(splited[3]);
					
					$("#input_orderPH1").val(data[i]["phone"].substring(0,3));
					$("#input_orderPH2").val(data[i]["phone"].substring(3,7))
					$("#input_orderPH3").val(data[i]["phone"].substring(7,11));
					
					$("#input_orderEM").val(data[i]["email"]);
					
					$("#input_deliveryRN").val(data[i]["realname"]);
					
					splited = data[i]["address"].split("/");
					$("#input_deliveryPC").val(splited[0]);
					$("#input_deliveryADD").val(splited[1]);
					$("#input_deliveryDADD").val(splited[2]);
					$("#input_deliveryNADD").val(splited[3]);
					
					$("#input_deliveryPH1").val(data[i]["phone"].substring(0,3));
					$("#input_deliveryPH2").val(data[i]["phone"].substring(3,7))
					$("#input_deliveryPH3").val(data[i]["phone"].substring(7,11));
					
					$("#input_deliveryEM").val(data[i]["email"]);
				}
			}
			else {
				alert("로그인이 필요한 페이지입니다");
				document.location = "/home";
			}
		}
	})
}

function radio_default_or_new(){
	let delivery_address = $("input[name='delivery']:checked").val()
	if(delivery_address == 'default'){
		clear_delivery();
		$("#input_deliveryRN").val($("#input_orderRN").val());
		$("#input_deliveryPC").val($("#input_orderPC").val());
		$("#input_deliveryADD").val($("#input_orderADD").val());
		$("#input_deliveryDADD").val($("#input_orderDADD").val());
		$("#input_deliveryNADD").val($("#input_orderNADD").val());
		$("#input_deliveryPH1").val($("#input_orderPH1").val());
		$("#input_deliveryPH2").val($("#input_orderPH2").val());
		$("#input_deliveryPH3").val($("#input_orderPH3").val());
	}else if(delivery_address == 'new'){
		clear_delivery();
	}
}

function odl_insert() {
	
	o_name = $('#input_deliveryRN').val();
	
	o_add = $("#input_deliveryPC").val() + "/" + $("#input_deliveryADD").val() 
	+ "/" + $("#input_deliveryDADD").val() + "/" + $("#input_deliveryNADD").val();
	
	o_ph = $("#input_deliveryPH1").val() + $("#input_deliveryPH2").val() 
		 + $("#input_deliveryPH3").val();
	
	o_dm = $('#input_deliveryDM').val();
	
	pc = $('#input_deliveryPC').val();
	add = $('#input_deliveryADD').val();
	dadd = $('#input_deliveryDADD').val();
	nadd = $('#input_deliveryNADD').val();
	
	ph1 = $('#input_deliveryPH1').val();
	ph2 = $('#input_deliveryPH2').val();
	ph3 = $('#input_deliveryPH3').val();
	
	if(o_name == '' || o_name == null){
		alert("입력하신 배송자 정보를 확인해주세요");
		return false;
	} else if(pc == '' || pc == null || add == '' || add == null){
		alert("입력하신 배송지를 확인해주세요");
		return false;
	} else if(ph1 == '' || ph1 == null ||
		     ph2 == '' || ph2 == null ||
		     ph3 == '' || ph3 == null){
		alert("입력하신 전화번호를 확인해주세요");
		return false;
	}
	else if ($('#table_orderDetail tr:gt(0)').length == 0) {
		alert("결제하실 상품이 하나 이상 필요합니다");
		return false;
	}
	
	o_no = Math.ceil(Math.random() * 10000);
	flag = 0;
	
	for (i=1; i < $('#table_orderDetail tr').length; i++) {
		o_img = $("#table_orderDetail tr:eq("+i+") td:eq(0)").find("img").attr("src");
		o_info = $("#table_orderDetail tr:eq("+i+") td:eq(1)").text();
		o_count = $("#table_orderDetail tr:eq("+i+") td:eq(3)").find("input").val(); 
		o_price = $("#table_orderDetail tr:eq("+i+") td:eq(2)").text();
		o_df = $("#table_orderDetail tr:eq("+i+") td:eq(4)").text();
		
		$.ajax({
			url: "/odl_insert",
			type: "post",
			async: false,
			data:{
				o_no: o_no,
				o_img: o_img,
				o_info: o_info,
				o_count: o_count,
				o_price: o_price,
				o_name: o_name,
				o_address: o_add,
				o_phone: o_ph,
				o_dm: o_dm,
				o_df: o_df 
			},
			dataType: "text",
			success: function(check) {
				console.log("체크:" + check);
				flag = 1;
			}
		})
	}
	
	if (flag == 1) {
		alert("결제 완료");
		localStorage.clear();
		document.location = "/home";
	}
}

function check_nullPhone() {
	ph1 = $("#input_signupPH1").val();
	ph2 = $("#input_signupPH2").val();
	ph3 = $("#input_signupPH3").val();
	
	val = $(this).val();
	$(this).val(val.replace(/[^0-9]/g, ""));
	
	if (ph1 == "" || ph2 == "" || ph3 == "" ||
	ph1 == null || ph2 == null || ph3 == null) {
		$("#pre_checkPHMessage").css("color", "red");
		$("#pre_checkPHMessage").text("전화번호를 입력해주세요");
	}
	else {
		$("#pre_checkPHMessage").css("color", "green");
		$("#pre_checkPHMessage").text("잘 기억해서 연락할게요");
	}
}

function maxlength999() {
	input = $(this).val();
	if (input.length > 3) $(this).val(input.slice(0, 3));
}