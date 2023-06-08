$(document)
.ready(check_admin)
.on("click", "#button_update", goto_update)
.on("click", "#button_delete", notice_delete)

url = window.location.pathname.substring(13)

function check_admin() {
	$.ajax({
		url: "/check/admin",
		type: "post",
		dataType: "text",
		success: function(check) {
			if (check == "true") {
				html = [];
				html.push(
					"<button id='button_update' class='button'>수정</button>",
					"<button id='button_delete' class='button'>삭제</button>"
				);		
				$("#td_admin").append(html.join(""));
			}
		}
	})
}

function goto_update() {
	document.location = `/notice/update/${url}`;
}

function notice_delete() {
	if (confirm("해당 공지를 삭제하시겠습니까?")) {
		$.ajax({
			url: "/notice/delete",
			type: "post",
			data: {
				w_num: url
			},
			dataType: "text",
			success: function() {
				document.location = "/notice/list";
			}
		})
	}
}