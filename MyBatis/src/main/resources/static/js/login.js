$(document)
.ready(check_loginStatus)
.on("click", "#href_signup", goto_signup)
.on("click", "#href_findID", goto_findID)
.on("click", "#href_findPW", goto_findPW)
.on("click", "#button_login", submit_login)
.on("keyup", "#input_loginID, #input_loginPW", function(enter) {
	if (enter.keyCode == 13) submit_login();
})

$(".a_loginAhref").hover(function() {
	$(this).css("color", "red");
}, function() {
	$(this).css("color", "black");
})

function check_loginStatus() {
	$.ajax({
		url: "/check/loginStatus",
		type: "post",
		dataType: "text",
		success: function(check) {
			if (check == "true") document.location = "/home";
		}
	})
}

function goto_signup() {
	document.location = "/signup";
}

function goto_findID() {
	document.location = "/findID";
}

function goto_findPW() {
	document.location = "/findPW";
}

function submit_login() {
	id = $("#input_loginID").val();
	pw = $("#input_loginPW").val();
	
	$.ajax({
		url: "/submit/login",
		type: "post",
		data: {
			id: id,
			pw: pw
		},
		dataType: "text",
		beforeSend: function() {
			if (id == "" || id == null || pw == "" || pw == null) {
				alert("아이디와 비밀번호를 전부 입력해주세요")
				return false;
			}
		},
		success: function(check) {
			if (check == "true") {
				clear_login();
				document.location = "/home";
			}
			else if (check == "wrong") {
				alert("비밀번호가 틀렸습니다");
				$("#input_loginPW").val("");
			}
			else if (check == "none") {
				alert("존재하지 않는 ID 입니다");
				clear_login();
			}
		}
	})
}

function clear_login() {
	$("#div_loginUpper").find("input").val("");
}