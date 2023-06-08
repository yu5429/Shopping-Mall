$(document)
.ready(check_admin)
.ready(admin_member_getAllMember)

.on('click','#member_management tr', member_dialog)
.on('click','#update', admin_member_update) 
.on('click','#delete', admin_member_delete)
.on('propertychange change paste input','#input_search', admin_member_search)
.on('focus', '#input_search', function() {
	$("#input_cp").val(1);
})
.on("click", ".page", getDatabyPage)
.on("propertychange change paste input", "#modal_phone", validatePhone)
.on("propertychange change paste input focus", "#modal_email", isEmail)
.on("click", "#order", goto_admin_member_delievery)
.on("click", "#button_home", goto_home)

ogemail = "";

function check_admin() {
	$.ajax({
		url: "/check/admin",
		type: "post",
		dataType: "text",
		success: function(check) {
			if (check == "false") {
				alert("관리자만 사용 가능한 페이지입니다");
				document.location = "/home";
			}
		}
	})
}

function goto_admin_member_delievery() {
	id = $("#modal_nickname").val();
	document.location = `/admin/${id}/delivery`;
}

function admin_member_getAllLength() {
	$.ajax({
		url: "/admin/member/getAllLength",
		type: "post",
		async: false,
		dataType: "text",
		success: function(dataLength) {
			$("#input_lp").val(Math.ceil(dataLength / 8));
		}
	})
}

function admin_member_getAllMember(){
	admin_member_getAllLength();
	cp = $("#input_cp").val();
	
	$.ajax({
		url:"/admin/member/getAllMember",
		type:'post',
		data: {
			currentP: cp
		},
		dataType:'json',
		success:function(data){
			if(data.length > 0) drawMemberList(data);
		}
	})	
}

function member_dialog(str) {
	index = $(this).index();
	$("#modal_id").val($(`#member_management tr:eq(${index}) td:eq(0)`).text());
	$("#modal_nickname").val($(`#member_management tr:eq(${index}) td:eq(1)`).text());
	$("#modal_gender").val($(`#member_management tr:eq(${index}) td:eq(2)`).text());
	$("#modal_phone").val($(`#member_management tr:eq(${index}) td:eq(3)`).text());
	$("#modal_email").val($(`#member_management tr:eq(${index}) td:eq(4)`).text());
	ogemail = $(`#member_management tr:eq(${index}) td:eq(4)`).text();
		
	$('#modal_member').dialog({
		title:'회원정보',
		modal:true,
		width: 650,
		open: function() {
			$("#modal_email").trigger("focus");
		},
		close: function() {
			$("#phone_check").text("")
			$("#email_check").text("")
		}
	})
}

function admin_member_update() {
	$.ajax({
		url:"/admin/member/update",
		type:'post',
		dataType:'text',
		data:{id:$('#modal_id').val(),phone:$('#modal_phone').val(),email:$('#modal_email').val()},
		beforeSend: function() {
			pc1 = $("#modal_phone1").val();
			pc2 = $("#modal_phone2").val();
			pc3 = $("#modal_phone3").val();
			ec = $("#email_check").css("color");
			green = "rgb(0, 128, 0)"
			if (pc1 == "" || pc2 == "" || pc3 == "" || ec != green) {
				alert("수정 값을 확인해주세요");
				return false;
			}
		},
		success:function(check){
			$('#modal_member').dialog("close");
			location.reload();
	    }
	})
}

function admin_member_delete() {
	if(confirm("정말 삭제하시겠습니까?")) {
		$.ajax({
			url:"/admin/member/delete",
			type:'post',
			dataType:'text',
			data:{id:$('#modal_id').val()},
			success:function(check){
				$('#modal_member').dialog("close");
				location.reload();
			}
		});	
	}
}

function admin_member_getSpecLength() {
	st = $("#input_search").val();
	
	$.ajax({
		url: "/admin/member/getSpecLength",
		type: "post",
		async: false,
		data: {
			memberInfo: st
		},
		dataType: "text",
		success: function(dataLength) {
			$("#input_lp").val(Math.ceil(dataLength / 8));
		}
	})
}

function admin_member_search() {
	admin_member_getSpecLength();
	input_search = $("#input_search").val();
	cp = $("#input_cp").val();
	
	$.ajax({
		url:"/admin/member/search",
		type:'post',
		data:{
			currentP: cp,
			input_search: input_search
		},
		dataType:'json',
		success:function(data){
			if(data.length > 0) drawMemberList(data);
        }
	});
}


function pagination() {
	cp = $("#input_cp").val();
	lp = $("#input_lp").val();
	
	$("#ul_pageNumber").empty();
	if (cp > 5) {
		if (cp % 5 == 0) {
			for (i = cp - 4; i <= cp; i++)
				$("#ul_pageNumber").append(`<li id='np${i}' class='page pnum'>${i}</li>`);
		}
		else {
			for (i = Math.floor(cp / 5) * 5 + 1; i <= lp; i++)
				$("#ul_pageNumber").append(`<li id='np${i}'  class='page pnum'>${i}</li>`);
		}
	}
	else {
		if (cp % 5 == 0) {
			for (i = cp - 4; i <= cp; i++)
				$("#ul_pageNumber").append(`<li id='np${i}'  class='page pnum'>${i}</li>`);
		}
		else {
			for (i = 1; i <= lp; i++)
				$("#ul_pageNumber").append(`<li id='np${i}'  class='page pnum'>${i}</li>`);
		}
	}
	$(`#np${cp}`).css("background-image", "url(/img/ui/pagination_click.png)");
}

function getDatabyPage() {
	tt = $(this).text();
	st = $("#input_search").val();
	cp = Number($("#input_cp").val());
	lp = Number($("#input_lp").val());
		
	if (st == "") {
		if (tt == "처음") {
			$("#input_cp").val(1);
			admin_member_getAllMember();
		}
		else if (tt == "이전" && cp - 1 >= 1) {
			$("#input_cp").val(cp - 1);
			admin_member_getAllMember();
		}
		else if (tt == "다음" && cp + 1 <= lp) {
			$("#input_cp").val(cp + 1);
			admin_member_getAllMember();
		}
		else if (tt == "마지막") {
			$("#input_cp").val(lp);
			admin_member_getAllMember();
		}
		else if ($.isNumeric(tt)) {
			$("#input_cp").val(Number(tt));
			admin_member_getAllMember();
		}
	}
	else {
		if (tt == "처음") {
			$("#input_cp").val(1);
			admin_member_search();
		}
		else if (tt == "이전" && cp - 1 >= 1) {
			$("#input_cp").val(cp - 1);
			admin_member_search();
		}
		else if (tt == "다음" && cp + 1 <= lp) {
			$("#input_cp").val(cp + 1);
			admin_member_search();
		}
		else if (tt == "마지막") {
			$("#input_cp").val(lp);
			admin_member_search();
		}
		else if ($.isNumeric(tt)) {
			$("#input_cp").val(Number(tt));
			admin_member_search();
		}
	}
}

function drawMemberList(data){
	$('#member_management tr:gt(0)').remove();
	
	for(i = 0; i < data.length; i++){
		member = data[i];
		html = [];
		html.push(
			'<tr><td>',member['id'],'</td>',
			'<td>',member['nickname'],'</td>',
			'<td>',member['gender'],'</td>',
			'<td>',member['phone'],'</td>',
			'<td>',member['email'],'</td></tr>'
		)
		$('#member_management').append(html.join(""));
	}
	
	pagination();
}

function validatePhone() {
	input = $(this).val();
	$(this).val(input.replace(/[^0-9]/g, ""));
	if (input.length > 12) $(this).val(input.slice(0, 12));
}

function isEmail() {
	em = $("#modal_email").val();
	emtext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
	
	if (em == ogemail) {
		$("#email_check").css("color", "green");
		$("#email_check").text("수정 전에 다시 확인해주세요");
	}
	else if (em == "") {
		$("#email_check").css("color", "red");
		$("#email_check").text("이메일을 입력해주세요");
		return false;
	}
	else if (emtext.test(em) == false) {
		$("#email_check").css("color", "red");
		$("#email_check").text("올바른 이메일을 입력해주세요");
	}
	else {
		$("#email_check").css("color", "green");
		$("#email_check").text("수정 전에 다시 확인해주세요");
	}
}

function goto_home() {
	document.location = '/home';
}