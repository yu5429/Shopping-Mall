$(document)
.ready(check_loginStatus)
.ready(identification_check)
.ready(odt_calculateSum)
.ready(get_signupInfo)
.ready(order_detail_paid_list)

function check_loginStatus() {
	$.ajax({
		url: "/check_loginStatus",
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

function identification_check(){
	$.ajax({
		url: "/identification_check",
		type: "post",
		data: {o_no: $('#paid_no').val()},
		dataType: "text",
		success: function(check) {
			if (check != "true") {
				alert("회원정보가 일치하지 않습니다.");
				document.location = "/home";
			}
		}
	})
}

function get_signupInfo() {
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
				}
			}
			else {
				alert("로그인이 필요한 페이지입니다");
				document.location = "/home";
			}
		}
	})
}

function order_detail_paid_list(){
	$.ajax({
		url: "/order_detail_paid_list",
		type: "post",
		data: {
			o_no: $('#paid_no').val(), 
			m_id: $('#paid_m_id').val()
		},
		dataType: "json",
		success: function(data) {
			console.log(data);
			$("#table_orderDetail tr:gt(0)").remove();
			$('#order_detail_paid_o_no').append("주문 번호: " + data[0]['o_no']);
			$('#order_detail_paid_date').append("주문 날짜: " + data[0]['o_date']);
			
			for (i = 0; i < data.length; i++) {
				html = [];
				html.push(
					"<tr><td><img src=",data[i]['o_img']," width=50px></td>",
					"<td>",data[i]['o_info'],"</td>",
					"<td>",data[i]['o_price'],"</td>",
					"<td>",data[i]['o_count'],"</td>",
					"<td>",data[i]['o_df'],"</td>",
					"<td>",(parseInt(data[i]['o_price'])*parseInt(data[i]['o_count'])),"</td>",
					"<td>",data[i]['o_ps'],"</td></tr>"
				);
				$("#table_orderDetail").append(html.join(""));
				
				$('#input_deliveryRN').val(data[i]['o_name']);
				
				splited = data[i]["o_address"].split("/");
				$("#input_deliveryPC").val(splited[0]);
				$("#input_deliveryADD").val(splited[1]);
				$("#input_deliveryDADD").val(splited[2]);
				$("#input_deliveryNADD").val(splited[3]);
				
				$("#input_deliveryPH1").val(data[i]["o_phone"].substring(0,3));
				$("#input_deliveryPH2").val(data[i]["o_phone"].substring(3,7))
				$("#input_deliveryPH3").val(data[i]["o_phone"].substring(7,11));
				
				$("#input_deliveryDM").val(data[i]["o_dm"]);
			}
			odt_calculateSum()
		}
	})
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