$(document)
.ready(check_loginStatus)

.on('click','#btnUpdate',inquiry_update)
.on('click','#btnCancel',update_cancel)

function check_loginStatus() {
	$.ajax({
		url: "/check/loginStatus",
		type: "post",
		dataType: "text",
		success: function(check) {
			if (check != "true") {
				alert("로그인이 필요한 페이지입니다");
				history.back();
			}
		}
	})
}

function inquiry_update(){
	if(!confirm('수정하시겠습니까?')){
		return false;
	}else{
		$.ajax({
		url: "/inquiry/update",
		type: "post",
		dataType: "text",
		data:{inquiry_no:$('#inquiry_no').val(),inquiry_title:$('#inquiry_title').val(),
			  inquiry_content:$('#inquiry_content').val()},
		success: function(data) {}
		})
		document.location="/inquiry/list";
	}
	
}

function update_cancel(){
	if(!confirm('취소하시겠습니까?')){
		return false;
	}else{
		document.location='/inquiry/list';
	}
}