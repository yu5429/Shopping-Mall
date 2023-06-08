<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/views/common/top.jsp"/>
<link rel="stylesheet" href="/css/admin_member_list.css">
<title>회원 목록 관리</title>
</head>
<body>
<section style="text-align: center;">
	<h1>회원 목록</h1><br>
	
	<div id="search">
		<input type="text" placeholder="찾을 사람 입력" id="input_search">
	</div>
	
	<article>
		<table id="member_management" border=1>
			<tr>
			  <th>아이디</th>
			  <th>닉네임</th>
			  <th>성별</th>
			  <th>휴대전화</th>
			  <th>이메일</th>
			</tr>
		</table>
		
		<ul id="ul_pagenation">
			<li class="page ptext">처음</li>
			<li class="page ptext">이전</li>
			<ul id="ul_pageNumber">
			</ul>
			<li class="page ptext">다음</li>
			<li class="page ptext">마지막</li>
		</ul>
		
		<div style="text-align: right; margin-right: 10px;">
			<button id="button_home">홈으로</button>
		</div>
	</article>
</section>

	<div id='modal_member' style="display:none">
		<p>아이디: <input type="text" id="modal_id" class="modal_input border" readonly></p>
		<p>닉네임: <input type="text" id="modal_nickname" class="modal_input border" readonly></p>
		<p>성별: <input type="text" id="modal_gender" class="modal_input border" readonly></p>
		<p>휴대전화: <input type="tel" id="modal_phone" class="modal_input"></p>
		<p>이메일: <input type="text" id="modal_email" class="modal_input"></p>
		<pre id="email_check"></pre>
		<div id="buttons">
			<button id="update">수정</button>
			<button id="delete">회원 탈퇴</button>
			<button id="order">주문 배송 관리</button>
		</div>
	</div>

	<input type="number" id="input_lp" class="hidden">
	<input type="number" id="input_cp" class="hidden" value="1">
		
<jsp:include page="/WEB-INF/views/common/closer.jsp"/>
<script src="/js/admin_member_list.js"></script>
</html>