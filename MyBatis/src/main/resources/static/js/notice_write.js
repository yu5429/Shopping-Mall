$(document)
.ready(check_admin)

.on("click", "#button_submit", notice_write)
.on("click", "#button_cancel", goto_notice)

function check_admin() {
	$.ajax({
		url: "/check/admin",
		type: "post",
		dataType: "text",
		success: function(check) {
			if (check != "true") {
				alert("관리자용 페이지입니다");
				document.locaiton = "/notice/list";
			}
		}
	})
}

function notice_write() {
	title = $("#input_title").val();
	content = $("#textarea_content").val();
	
	$.ajax({
		url: "/notice/write/submit",
		type: "post",
		data: {
			w_title: title,
			w_content: content
		},
		dataType: "text",
		beforeSend: function() {
			if (title == "" || content == "")  {
				alert("제목과 내용을 입력해주세요");
				return false;
			}
		},
		success: function() {
			document.location = "/notice/list";
		}
	})
}

function goto_notice() {
	document.location = "/notice/list";
}