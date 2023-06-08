<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/views/common/top.jsp"/>
<title>비밀번호 찾기</title>
</head>
<style>
h1 {
	font-size: 37px;
	margin: 0 0 42px 0;
}
#button_findPW {
	top: 80px;
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
#input_findpwRM {
	top: 30px;
}
#input_findpwEM {
	top: 60px;
}
#pre_findPWMessage {
 	position: relative;
    top: 67px;
    text-align: initial;
}
</style>
<body>
<jsp:include page="/WEB-INF/views/common/header.jsp"/>
	<section style="top: 40vh;">
		<notfooter style="width: fit-content;">
			<div>
				<h1>비밀번호 찾기</h1>
			</div>
			<input type="text" id="input_findID" class="input_login" placeholder="아이디"><br>
			<input type="text" id="input_findpwRM" class="input_login" placeholder="이름"><br>
			<input type="text" id="input_findpwEM" class="input_login" placeholder="이메일"><br>
			<pre id="pre_findPWMessage"></pre>
			<button id="button_findPW" class="input_login">비밀번호 찾기</button><br>
		</notfooter>
		<jsp:include page="/WEB-INF/views/common/footer.jsp"/>
	</section>
<jsp:include page="/WEB-INF/views/common/closer.jsp"/>
<script src="/js/findPW.js"></script>
</html>