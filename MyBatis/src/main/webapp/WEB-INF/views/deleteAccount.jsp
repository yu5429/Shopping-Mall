<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/views/common/top.jsp"/>
<title>회원 탈퇴</title>
</head>
<style>
#button_deleteAccount {
		top: 30px;
    width: 350px;
    cursor: pointer;
    color: #fff;
    border: 1px solid #222;
    border-bottom-color: #222;
    box-shadow: 0 2px 2px rgba(0,0,0,0.04);
    text-shadow: 0 0 2px rgba(0,0,0,0.2);
    background: linear-gradient(to bottom,#333333 0%,#222222 100%);
    font-size: 18px;
}
.input_login {
		position: relative;
    width: 350px;
    height: 50px;
    padding: 0 20px;
    font-size: 14px;
    border: 1px solid #eaeaea;
    outline: none;
}

#input_deleteAPWC {
		top: 10px;
}
#div_wrapper {
		position: absolute;
		top: 12vh;
		left: 37vw;
		width: fit-content;
		height: fit-content;
}
</style>
<body>
<jsp:include page="/WEB-INF/views/common/header.jsp"/>
	<section>
		<notfooter>
			<div id="div_wrapper">
				<input type="password" id="input_deleteAPW" class="input_login" placeholder="비밀번호"><br><br>
				<input type="password" id="input_deleteAPWC" class="input_login" placeholder="비밀번호 확인"><br><br>
				<button id="button_deleteAccount" class="input_login">회원 탈퇴</button><br>
			</div>
		</notfooter>
		<jsp:include page="/WEB-INF/views/common/footer.jsp"/>
	</section>
<jsp:include page="/WEB-INF/views/common/closer.jsp"/>
<script src="/js/deleteAccount.js"></script>
</html>