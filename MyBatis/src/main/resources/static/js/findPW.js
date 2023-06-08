$(document)
.on("click", "#button_findPW", submit_findPW)

function submit_findPW() {
	id = $("#input_findID").val();
	rm = $("#input_findpwRM").val();
	em = $("#input_findpwEM").val();
	
	$.ajax({
		url: "/search_PW",
		type: "post",
		data: {
			id: id,
			realname: rm,
			email: em
		},
		dataType: "text",
		beforeSend: function() {
			if (id == "" || id == null || rm == "" || rm == null || em == "" || em == null) {
				$("#pre_findPWMessage").css("color", "red");
				$("#pre_findPWMessage").text("정보를 모두 입력해주세요")
				return false;
			}
			
			emtext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
			if (emtext.test(em) == false) {
				$("#pre_findPWMessage").css("color", "red");
				$("#pre_findPWMessage").text("올바른 이메일을 입력해주세요");
				return false;
			}
		},
		success: function(result) {
			if (result != "") {
				copy(result);
				alert("임시 비밀번호가 클립보드에 발급되었습니다\nCTRL+V 를 하면 입력창에 붙여넣을 수 있습니다\n\n" + result + 
				"\n\n확인하시면 로그인 페이지로 돌아갑니다\n로그인 후 비밀번호를 꼭 변경해주세요");
				clear_findPW();
				document.location = "/login";
			}
			else {
				$("#pre_findPWMessage").css("color", "black");
				$("#pre_findPWMessage").text("회원 정보와 관련된 PW가 없습니다");
			}
		}
	})
}

function clear_findPW() {
	$("#input_findID").val("");
	$("#input_findpwRM").val("");
	$("#input_findpwEM").val("");
}

function copy(result) {
	dummy = document.createElement("textarea");
	document.body.appendChild(dummy);
	dummy.value = result;
	dummy.select();
	document.execCommand("copy");
	document.body.removeChild(dummy);
}