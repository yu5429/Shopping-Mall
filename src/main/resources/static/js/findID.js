$(document)
.on("click", "#button_findID", submit_findID)

function submit_findID() {
	rm = $("#input_findRM").val();
	em = $("#input_findEM").val();
	
	$.ajax({
		url: "/search_ID",
		type: "post",
		data: {
			realname: rm,
			email: em
		},
		dataType: "text",
		beforeSend: function() {
			if (rm == "" || rm == null || em == "" || em == null) {
				$("#pre_findIDMessage").css("color", "red");
				$("#pre_findIDMessage").text("이름과 이메일을 입력해주세요")
				return false;
			}
			
			emtext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
			if (emtext.test(em) == false) {
				$("#pre_findIDMessage").css("color", "red");
				$("#pre_findIDMessage").text("올바른 이메일을 입력해주세요");
				return false;
			}
		},
		success: function(result) {
			if (result != "") {
				alert("찾으시는 ID 는\n" + result + "  입니다\n확인하시면 로그인 페이지로 돌아갑니다");
				clear_findID();
				document.location = "/login";
			}
			else {
				$("#pre_findIDMessage").css("color", "black");
				$("#pre_findIDMessage").text("회원 정보와 관련된 ID가 없습니다");
			}
		}
	})
}

function clear_findID() {
	$("#input_findRM").val("");
	$("#input_findEM").val("");
}