$(document)
.ready(check_admin)
.on("click", "#button_update", notice_update)
.on("click", "#button_cancel", goto_notice)

function check_admin() {
	$.ajax({
		url: "/check/admin",
		type: "post",
		dataType: "text",
		success: function(check) {
			if (check != "true") {
				alert("관리자용 페이지입니다");
				document.location = "/home";
			}
		}
	})
}

function notice_update() {
	url = window.location.pathname.substring(15);
	
	$.ajax({
		url: "/notice/update/proceed",
		type: "post",
		data: {
			w_title: $("#input_title").val(),
			w_content: $("#textarea_content").val(),
			w_num: url
		},
		dataType: "text",
		success: function() {
			document.location = "/notice/list";
		}
	})
}

function goto_notice() {
	document.location = "/notice/list";
}