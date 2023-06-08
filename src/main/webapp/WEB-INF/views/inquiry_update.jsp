<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/views/common/top.jsp"/>
<link rel="stylesheet" href="/css/inquiry_update.css">
<title>문의 수정</title>
</head>
<body>
<jsp:include page="/WEB-INF/views/common/header.jsp"/>
	<section>
		<notfooter style="text-align: left;">
			<p id='h3'>문의 수정</p>
		
			<div>
				<input type='hidden' id=inquiry_no value='${inquiry.inquiry_no}' readonly>
				<div id='update_name'>
					제목 &nbsp;&nbsp;:
					<input type=text id=inquiry_title class='up_input' value='${inquiry.inquiry_title}' maxlength='30'>
				</div>
				<div id='update_writer'>
					작성자 : 
					<input type=text id=inquiry_writer class='up_input' value='${inquiry.inquiry_writer}' readonly>
				</div>
			</div>
			
			<textarea class='textarea' id='inquiry_content' maxlength='600'>${inquiry.inquiry_content}</textarea>
		
			<div id='btnU'>
				<button id=btnUpdate class='button'>수정</button>
				<button id=btnCancel class='button'>취소</button>
			</div><br><br><br>
		</notfooter>
		<jsp:include page="/WEB-INF/views/common/footer.jsp"/>
	</section>
<jsp:include page="/WEB-INF/views/common/closer.jsp"/>
<script src="/js/inquiry_update.js"></script>
</html>