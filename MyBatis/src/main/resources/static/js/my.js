$(document)
.ready(my_nickname)
.ready(my_data)

.on("click", "#button_updateSignInfo", update_signInfo)
.on("click", "#button_gotoAllOrderList", goto_allOrderList)
.on("click", "#button_deleteAccount", goto_deleteAccount)
.on("click", ".a_orderTextBox", goto_selectOrderList)

function my_nickname() {
	$.ajax({
		url: "/my/nickname",
		type: "post",
		dataType: "text",
		success: function(nickname) {
			if (nickname != "") {
				$("#h2_myNickname").text(nickname + " 님 환영합니다");
			}
			else {
				alert("로그인이 필요한 페이지입니다");
				document.location = "/home";
			}
		}
	})
}

function my_data() {
	$.ajax({
		url: "/my/data",
		type: "post",
		dataType: "json",
		success: function(data) {
			if (data.length != 0) {
				for (i = 0; i < data.length; i++) {
					if(data[i]["o_ps"] == "입금전") $("#span_before").text(data[i]["o_psnum"]);
					if(data[i]["o_ps"] == "배송준비중") $("#span_prepare").text(data[i]["o_psnum"]);
					if(data[i]["o_ps"] == "배송중") $("#span_while").text(data[i]["o_psnum"]);
					if(data[i]["o_ps"] == "배송완료") $("#span_done").text(data[i]["o_psnum"]);
					if(data[i]["o_ps"] == "취소") $("#span_cancel").text(data[i]["o_psnum"]);
					if(data[i]["o_ps"] == "반품") $("#span_takeback").text(data[i]["o_psnum"]);
				}
			}
		}
	})
}

function update_signInfo() {
	document.location = "/sign/update";
}

function goto_allOrderList() {
	document.location = "/odl/default";
}

function goto_deleteAccount() {
	document.location = "/deleteAccount";
}

function goto_selectOrderList() {
	param = $(this).attr("uri");
	document.location = `/odl/${param}`;
}