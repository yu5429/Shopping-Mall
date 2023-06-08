<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/views/common/top.jsp"/>
<link rel="stylesheet" href="/css/signup.css">
<title>회원 가입</title>
</head>
<body>
<jsp:include page="/WEB-INF/views/common/header.jsp"/>
	<section>
		<notfooter>
			<article>
				<div>
					<h1>회원가입</h1>
				</div>
				<h3>회원 정보</h3><br><br>
				
				<div id="div_table">
					<table id="table_signInfo">
						<tbody>
							<tr>
								<th>아이디</th>
								<td>
									<input type="text" id="input_signupID" class="input_signup" maxlength="20">
									<pre id="pre_checkIDMessage" class="pre_checkMessage"></pre>
								</td>
							</tr>
							<tr>
								<th>비밀번호</th>
								<td>
									<input type="password" id="input_signupPW" class="input_signup" maxlength="20">
									<pre id="pre_checkPWMessage" class="pre_checkMessage"></pre>
								</td>
							</tr>
							<tr>
								<th>비밀번호 확인</th>
								<td>
									<input type="password" id="input_signupPWC" class="input_signup" maxlength="20">
									<pre id="pre_checkPWCMessage" class="pre_checkMessage"></pre>
								</td>
							</tr>
							<tr>
								<th>이름</th>
								<td>
									<input type="text" id="input_signupRN" class="input_signup" maxlength="30">
									<pre id="pre_checkRNMessage" class="pre_checkMessage"></pre>
								</td>
							</tr>
							<tr>
								<th>닉네임</th>
								<td>
									<input type="text" id="input_signupNN" class="input_signup" maxlength="20">
									<pre id="pre_checkNNMessage" class="pre_checkMessage"></pre>
								</td>
							</tr>
							<tr>
								<th>성별</th>
								<td>
									<input type="radio" id="input_signupG" name="gender" value="남성">
									<label for="radio_signupG">남성</label>
									<input type="radio" id="input_signupG" name="gender" value="여성">
									<label for="radio_signupG">여성</label>
								</td>
							</tr>
							<tr>
								<th>생년월일</th>
								<td><input type="date" id="input_signupDB"></td>
							</tr>
							<tr>
								<th>주소</th>
								<td id="td_address" style="text-align: left;">
									<input type="text" id="input_signupPC" class="input_signup" placeholder="우편번호" readonly><br>
									<input type="text" id="input_signupADD" class="input_signup" placeholder="주소" readonly><br>
									<input type="text" id="input_signupDADD" class="input_signup" placeholder="상세주소" maxlength="20"><br>
									<input type="text" id="input_signupNADD" class="input_signup" placeholder="참고사항" readonly>
									<button id="button_findPostcode">우편번호 찾기</button>
								</td>
							</tr>
							<tr>
								<th>휴대전화</th>
								<td>
									<input type="tel" id="input_signupPH1" class="input_signupPhone" maxlength="4">
									<span class="span_phoneSpace">-</span>
									<input type="tel" id="input_signupPH2" class="input_signupPhone" maxlength="4">
									<span class="span_phoneSpace">-</span>
									<input type="tel" id="input_signupPH3" class="input_signupPhone" maxlength="4">
									<pre id="pre_checkPHMessage" class="pre_checkMessage"></pre>
								</td>
							</tr>
							<tr>
								<th>이메일</th>
								<td>
									<input type="text" id="input_signupEM" class="input_signup">
									<pre id="pre_checkEMMessage" class="pre_checkMessage"></pre>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div id="div_button">
					<button id="button_submitSignup" class="submit">회원가입</button>
				</div>
			</article>
		</notfooter><br><br><br>
		<jsp:include page="/WEB-INF/views/common/footer.jsp"/>
	</section>
<jsp:include page="/WEB-INF/views/common/closer.jsp"/>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script src="/js/signup.js"></script>
</html>