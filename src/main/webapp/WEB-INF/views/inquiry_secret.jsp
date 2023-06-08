<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/views/common/top.jsp"/>
<link rel="stylesheet" href="/css/inquiry_secret.css">
<title>비밀글 보기</title>
</head>
<body>
<jsp:include page="/WEB-INF/views/common/header.jsp"/>
<section>
	<notfooter>
	 	<p id='h1'>비밀글 보기</p>
	  	<div id='pw'>
	  		<p id='pw_a'>패스워드 입력</p>
		  	<input type='password' id='secret_password' maxlength='8'><br><br>
			<button id='btnOk' class='button'>확인</button>
	  	</div>
	  	<div>
	  		<input type='text' id='hidden_no' value='${secret.inquiry_no}' readonly hidden>
		  	<input type='text' id='hidden_writer' value='${secret.inquiry_writer}' readonly hidden>
		  	<input type='text' id='hidden_lo_name' value='<%=session.getAttribute("nickname") %>' readonly hidden>
	  	</div>
	</notfooter>
  	<jsp:include page="/WEB-INF/views/common/footer.jsp"/>
</section>
<jsp:include page="/WEB-INF/views/common/closer.jsp"/>
<script src="/js/inquiry_secret.js"></script>
</html>