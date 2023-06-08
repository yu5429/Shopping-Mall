<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/views/common/top.jsp"/>
<link rel="stylesheet" href="/css/login.css">
<title>로그인</title>
</head>
<body>
<jsp:include page="/WEB-INF/views/common/header.jsp"/>
	<section>
		<notfooter>
			<article id="article_loginbox">
				<div id="div_loginUpper">
					<input type="text" id="input_loginID" class="input_login" placeholder="아이디"><br>
					<input type="password" id="input_loginPW" class="input_login" placeholder="비밀번호"><br>
					<button id="button_login" class="input_login">로그인</button><br>
				</div>
				<div id="div_loginAhrefBox">
					<a id="href_signup" class="a_loginAhref">회원가입</a>
					<a id="href_findID" class="a_loginAhref">아이디&ensp;찾기</a>
					<a id="href_findPW" class="a_loginAhref">비밀번호&ensp;찾기</a>
				</div>
			</article>
		</notfooter>
		<jsp:include page="/WEB-INF/views/common/footer.jsp"/>
	</section>
<jsp:include page="/WEB-INF/views/common/closer.jsp"/>
<script src="/js/login.js"></script>
</html>