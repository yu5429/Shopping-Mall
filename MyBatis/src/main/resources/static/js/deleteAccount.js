$(document)

.ready(check_loginStatus)
.on("click", "#button_deleteAccount", delete_account)

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

function delete_account() {
	pw = $("#input_deleteAPW").val();
	pwc = $("#input_deleteAPWC").val();
	$.ajax({
		url: "/delete_account",
		type: "post",
		data: {
			pw: pw
		},
		dataType: "text",
		beforeSend: function() {
			if (pw == "" || pwc == "") {
				alert("탈퇴하고자 하는 아이디의 비밀번호를 입력해주세요");
				return false;
			}
			else if (pw != pwc) {
				alert("비밀번호가 일치하지 않습니다");
				return false;
			}
			else {
				if (! confirm("정말로 탈퇴하시겠습니까?")) return false;
			}
		},
		success: function(check) {
			if (check == "true") {
				alert("그동안 저희 문방구를 이용해주셔서 감사합니다");
				document.location = "/home";
			}
			else {
				alert("비밀번호가 틀려서 탈퇴되지 않았습니다");
			}
		}
	})
}