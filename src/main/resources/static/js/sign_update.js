$(document)
.ready(clear_signup)
.ready(get_signupInfo)

.on("propertychange change paste input blur", "#input_signupPW", function() {
	check_validPW(); check_samePWC();
})
.on("propertychange change paste input blur", "#input_signupPWC", check_samePWC)
.on("propertychange change paste input blur", "#input_signupNN", check_dupleNicknameByID)
.on("propertychange change paste input blur", "#input_signupADD", check_nullAddress)
.on("propertychange change paste input blur", "#input_signupPH1, #input_signupPH2, #input_signupPH3", function() {
	check_nullPhone();
	check_notNum();
})
.on("propertychange change paste input blur", "#input_signupEM", check_emailByID)
.on("click", "#button_updateSignup", update_signup)
.on("click", "#button_findPostcode", find_address)

function get_signupInfo() {
	$.ajax({
		url: "/get_signupInfo",
		type: "post",
		dataType: "json",
		success: function(data) {
			if (data.length != 0) {
				for (i = 0; i < data.length; i++) {
					$("#input_signupID").val(data[i]["id"]);
					$("#input_signupPW").val(data[i]["pw"]);
					$("#input_signupPWC").val(data[i]["pw"]);
					$("#input_signupRN").val(data[i]["realname"]);
					$("#input_signupNN").val(data[i]["nickname"]);
					
					if (data[i]["gender"] == "남성") 
					$("input[value=남성]").prop("checked", true);
					else $("input[value=여성]").prop("checked", true);
					
					$("#input_signupDB").val(data[i]["birth"]);
					
					splited = data[i]["address"].split("/");
					$("#input_signupPC").val(splited[0]);
					$("#input_signupADD").val(splited[1]);
					$("#input_signupDADD").val(splited[2]);
					$("#input_signupNADD").val(splited[3]);
					
					$("#input_signupPH1").val(data[i]["phone"].substring(0,3));
					$("#input_signupPH2").val(data[i]["phone"].substring(3,7))
					$("#input_signupPH3").val(data[i]["phone"].substring(7,11));
					
					$("#input_signupEM").val(data[i]["email"]);
				}
				check_validPW(); 
				check_samePWC(); 
				check_dupleNicknameByID();
				check_nullAddress(); 
				check_nullPhone(); 
				check_emailByID();
			}
			else {
				alert("로그인이 필요한 페이지입니다");
				document.location = "/home";
			}
		}
	})
}

function check_validPW() {
	pw = $("#input_signupPW").val();
	validation = /^[A-Za-z0-9]{5,30}$/;
	
	if(pw == "" || pw == null) {
		$("#pre_checkPWMessage").css("color", "red");
		$("#pre_checkPWMessage").text("비밀번호를 입력해주세요");
	}
	else if (validation.test(pw) == false) {
		$("#pre_checkPWMessage").css("color", "red");
		$("#pre_checkPWMessage").text("05~30 자리 영문과 숫자만 가능");
	}
	else {
		$("#pre_checkPWMessage").css("color", "green");
		$("#pre_checkPWMessage").text("사용 가능한 비밀번호");
	}
}

function check_samePWC() {
	pw = $("#input_signupPW").val();
	pwc = $("#input_signupPWC").val();
	
	if (pw == pwc) {
		$("#pre_checkPWCMessage").css("color", "green");
		$("#pre_checkPWCMessage").text("비밀번호가 일치함");
	}
	else {
		$("#pre_checkPWCMessage").css("color", "red");
		$("#pre_checkPWCMessage").text("비밀번호가 일치하지 않음");
	}
}

function check_nullName() {
	rn = $("#input_signupRN").val();
	ary = rn.split("");
	byte = 0;
	
	if (rn == "" || rn == null) {
		$("#pre_checkRNMessage").css("color", "red");
		$("#pre_checkRNMessage").text("이름을 입력해주세요");
	}
	
	for (i = 0; i < ary.length; i++) {
		code = ary[i].codePointAt(0);
		if(code > 126) byte += 3;
		else byte += 1;
	}
	
	if (byte > 30) {
		$("#pre_checkRNMessage").css("color", "red");
		$("#pre_checkRNMessage").text("이름이 너무 깁니다");
	}
	else {
		$("#pre_checkRNMessage").css("color", "green");
		$("#pre_checkRNMessage").text("멋진 이름이네요");
	}
}

function check_dupleNicknameByID() {
	id = $("#input_signupID").val();
	nn = $("#input_signupNN").val();
	
	$.ajax({
		url: "/check_dupleNicknameByID",
		type: "post",
		data: {
			id: id,
			nickname: nn
		},
		dataType: "text",
		beforeSend: function() {			
			if(nn == "" || nn == null) {
				$("#pre_checkNNMessage").css("color", "red");
				$("#pre_checkNNMessage").text("닉네임을 입력해주세요");
				return false;
			}
			
			validation = /^[A-Za-z0-9]{4,20}$/; 
			
			if (validation.test(nn) == false) {
				$("#pre_checkNNMessage").css("color", "red");
				$("#pre_checkNNMessage").text("04~20 자리 영문과 숫자만 가능");
				return false;
			}
		},
		success: function(check) {
			if (check == "true") {
				$("#pre_checkNNMessage").css("color", "green");
				$("#pre_checkNNMessage").text("사용 가능한 닉네임");
			}
			else {
				$("#pre_checkNNMessage").css("color", "red");
				$("#pre_checkNNMessage").text("사용 불가능한 닉네임");
			}
		}
	})
}

function check_nullAddress() {
	add = $("#input_signupADD").val();
	
	if (add == "" || add == null) {
		$("#pre_checkADDMessage").css("color", "red");
		$("#pre_checkADDMessage").text("주소를 입력해주세요");
	}
	else {
		$("#pre_checkADDMessage").css("color", "green");
		$("#pre_checkADDMessage").text("이 주소로 배송을 도울께요");
	}
}

function check_nullPhone() {
	ph1 = $("#input_signupPH1").val();
	ph2 = $("#input_signupPH2").val();
	ph3 = $("#input_signupPH3").val();
	
	if (ph1 == "" || ph2 == "" || ph3 == "" ||
	ph1 == null || ph2 == null || ph3 == null) {
		$("#pre_checkPHMessage").css("color", "red");
		$("#pre_checkPHMessage").text("전화번호를 입력해주세요");
	}
	else {
		$("#pre_checkPHMessage").css("color", "green");
		$("#pre_checkPHMessage").text("잘 기억해서 연락할게요");
	}
}

function check_notNum() {
	val = $(this).val();
	$(this).val(val.replace(/[^0-9]/g, ""));
}

function check_emailByID() {
	id = $("#input_signupID").val();
	em = $("#input_signupEM").val();
	emtext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
	
	$.ajax({
		url: "/check_emailByID",
		type: "post",
		data: {
			id: id,
			email: em
		},
		dataType: "text",
		beforeSend: function() {
			if (em == "" || em == null) {
				$("#pre_checkEMMessage").css("color", "red");
				$("#pre_checkEMMessage").text("이메일을 입력해주세요");
				return false;
			}
			else if (emtext.test(em) == false) {
				$("#pre_checkEMMessage").css("color", "red");
				$("#pre_checkEMMessage").text("올바른 이메일을 입력해주세요");
				return false;
			}
		},
		success: function(check) {
			if (check == "true") {
				$("#pre_checkEMMessage").css("color", "green");
				$("#pre_checkEMMessage").text("든든한 이메일이에요");
			}
			else {
				$("#pre_checkEMMessage").css("color", "red");
				$("#pre_checkEMMessage").text("사용 불가능한 이메일이에요");
			}
		}
	})
}

function update_signup() {	
	Cpw = $("#pre_checkPWMessage").css("color");
	Cpwc = $("#pre_checkPWCMessage").css("color");
	Cph = $("#pre_checkPHMessage").css("color");
	Cem = $("#pre_checkEMMessage").css("color");
	
	id = $("#input_signupID").val();
	pw = $("#input_signupPW").val();
	rn = $("#input_signupRN").val();
	
	add = $("#input_signupPC").val() + "/" + $("#input_signupADD").val() 
	+ "/" + $("#input_signupDADD").val() + "/" + $("#input_signupNADD").val();
	
	ph = $("#input_signupPH1").val() + $("#input_signupPH2").val() + $("#input_signupPH3").val();
	em = $("#input_signupEM").val();
	
	g = $("input[name=gender]:checked").val();
	bd = $("#input_signupDB").val();
			
	red = "rgb(255, 0, 0)";
	green = "rgb(0, 128, 0)";
	
	$.ajax({
		url: "/update_signup",
		type: "post",
		data: {
			id: id,
			pw: pw,
			realname: rn,
			gender: g,
			birth: bd,
			address: add,
			phone: ph,
			email: em
		},
		dataType: "text",
		beforeSend: function() {
			pc = $("#input_signupPC").val();
			add = $("#input_signupADD").val();
							
			if (Cpw != green || Cpwc != green || Cph != green || Cem != green) {
				alert("입력하신 회원 정보를 확인해주세요");
				return false;
			}
			
			if (pc == "" || pc == null || add == "" || add == null || g == "" 
			|| g == null || bd == "" || bd == null || bd.length != 10) {
				alert("입력하신 회원 정보를 확인해주세요");
				return false;
			}
		},
		success: function(check) {
			alert("회원 정보가 수정되었습니다\n다시 로그인해주세요");
			clear_signup();
			do_logout();
		}
	})
}

function clear_signup() {
	$("#input_signupID").val("");
	$("#input_signupPW").val("");
	$("#input_signupPWC").val("");
	$("#input_signupRN").val("");
	$("#input_signupPC").val("");
	$("#input_signupADD").val("");
	$("#input_signupDADD").val("");
	$("#input_signupNADD").val("");
	$("#input_signupPH1").val("");
	$("#input_signupPH2").val("");
	$("#input_signupPH3").val("");
	$("#input_signupEM").val("");
	$("input[name=gender]").prop("checked", false);
	$("#input_signupDB").val("");
	$(".pre_checkMessage").text("");
}

function find_address() {
	new daum.Postcode({
		oncomplete: function(data) {
			add = "";
			nadd = "";
			
			if (data.userSelectedType === "R") {
				add = data.roadAddress;
				
				if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
					nadd += data.bname;
				}
				if (data.buildingName !== "" && data.apartment === "Y") {
					nadd += (nadd !== "" ? ", " + data.buildingName : data.buildingName);
				}
				if (nadd !== "") {
					nadd = "(" + nadd + ")";
				}
				$("#input_signupNADD").val(nadd);
			}
			else {
				add = data.jibunAddress;
				nadd = "";
			}
			
			$("#input_signupPC").val(data.zonecode);
			$("#input_signupADD").val(add);
			$("#input_signupDADD").focus();
		}
	}).open();
}

function do_logout() {
	$.ajax({
		url: "/logout",
		type: "post",
		dataType: "text",
		success: function(check) {
			document.location = "/home";
		}
	})
}