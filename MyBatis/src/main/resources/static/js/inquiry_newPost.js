$(document)
.ready(check_loginStatus)

.on('click','#btnOK',inquiry_insert)
.on("propertychange change paste input", "#inquiry_password", check_validPW)
.on('click','#btnList',gotoList)
.on('click','#btnCancel',newpost_cancel)

url = decodeURIComponent(window.location.pathname.substring(17));

function check_loginStatus() {
	$.ajax({
		url: "/check/loginStatus",
		type: "post",
		dataType: "text",
		success: function(check) {
			if (check != "true") {
				alert("로그인이 필요한 페이지입니다");
				document.location = "/inquiry/list";
			}
			else check_pathname();
		}
	});
}

function check_pathname() {
	if (url == "default") return false;
	else {
		console.log(url);
		$.ajax({
			url: "/inquiry/getpc",
			type: "post",
			data: {
				prod_code: url
			},
			dataType: "json",
			success: function(data) {
				str = "";
				
				$("#product_info_table tr:gt(1)").remove();
				$("#product_info").show();
				
				prod_code = "상품코드 ["+data["prod_code"]+"]";
				prod_name = "상품이름 ["+data["prod_name"]+"]";
				prod_price ="상품가격 ["+data["prod_price"]+"원]";
				
				imgAry = data["prod_img"].split("||");
				prod_img = "/img/" + imgAry[0];
				
				str="<tr>"+"<td>"+"<img src='"+prod_img+"' style='width: 100px; height: 100px;'>"+"<td>"+
				"<td style='padding-left: 20px'>"+prod_code+"<br>"+prod_name+"<br>"+prod_price+"</td>"+"</tr>";
				$("#product_info_table").append(str);
			}
		})
	}
}

function inquiry_insert(){
	$.ajax({
		url: "/inquiry/insert",
		type: "post",
		dataType: "text",
		data:{
			inquiry_title:$('#inquiry_title').val(),
			inquiry_content:$('#inquiry_content').val(),
			inquiry_writer:$('#nickname').val(),
			inquiry_password:$('#inquiry_password').val(),
			inquiry_secure: "F",
			inquiry_product: url
		},
		beforeSend: function() {
			title = $('#inquiry_title').val();
			content = $('#inquiry_content').val();
			password = $('#inquiry_password').val();
			
			if(title == '') {
				alert('제목을 입력해주세요.');
				return false;
			}
			else if(content == ''){
				alert('내용을 입력해주세요.');
				return false;
			}
			else if(password =='' || password.length < 4){
				alert('비밀번호를 4자 이상으로 입력해주세요.');
				return false;
			}
		},
		success: function(data) {
			document.location="/inquiry/list";
		}
	})
}

function check_validPW() {
	pw = $("#inquiry_password").val();
	$(this).val(pw.replace(/[^A-Za-z0-9]/g, ""));
}

function gotoList(){
	document.location='/inquiry/list';
}

function newpost_cancel(){
	document.location='/inquiry/list';
}