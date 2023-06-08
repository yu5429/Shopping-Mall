<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/views/common/top.jsp"/>
<link rel="stylesheet" href="/css/inquiry_newpost.css">
<title>문의글 작성</title>
</head>
<body>
<jsp:include page="/WEB-INF/views/common/header.jsp"/>
	<section>
		<notfooter style="text-align: left;">
			<p id='h1'>New 문의</p>
			<div id='newpost_name'>
				제목 &nbsp;&nbsp;: <input type=text id=inquiry_title class='up_input' maxlength='30'><br><br>
				작성자 : <input type=text id=nickname class='up_input' value='<%=session.getAttribute("nickname") %>' readonly>
			</div>
			<div id="product_info">       
				<p style="margin-top: 10px; font-size: 20px;">문의 상품</p><br>                        
				<table id="product_info_table"></table>
			</div>
			<div><br>
				<textarea id=inquiry_content class='textarea' maxlength='600'></textarea>
			</div>
			<div><br>
				 비밀번호 : <input type='password' id='inquiry_password' class='up_input' maxlength='8'>
			</div>
			<div id="div_newPostButtons">
				<div class='divg'>
					<button id="btnList" class="button">목록</button>
					<button id="btnOK" class="button">등록</button>
					<button id="btnCancel" class="button">취소</button>
				</div>
			</div>
		</notfooter><br><br><br><br><br><br>
		<jsp:include page="/WEB-INF/views/common/footer.jsp"/>
	</section>
<jsp:include page="/WEB-INF/views/common/closer.jsp"/>
<script src="/js/inquiry_newPost.js"></script>
</html>