$(document)
.ready(inquiry_checkAdmin)
.on('click','#btnOk',inquiry_checkPostPassword)


function inquiry_checkAdmin() {
	url = window.location.pathname.substring(16);
	$.ajax({
		url: "/inquiry/checkAdmin",
		type: "post",
		dataType: "text",
		success: function(check) {
			if (check == "admin") {
				document.location = `/inquiry/view/${url}`;
			}
		}
	})
}

function inquiry_checkPostPassword() {
	url = window.location.pathname.substring(16);
	pw = $("#secret_password").val();

	$.ajax({
		url: `/inquiry/checkPostPassword`,
		type: "post",
		data: {
			url: url,
			password: pw
		},
		dataType: "text",
		beforeSend: function() {
			if ($("#secret_password").val() == "") {
				alert("패스워드를 입력해주세요");
				return false;
			}
		},
		success: function(check) {
			if (check == "true") {
				document.location = `/inquiry/view/${url}`;
			}
			else {
				alert("비밀번호가 일치하지 않습니다");
				$("#secret_password").val("");
			}
		}
	})
}

