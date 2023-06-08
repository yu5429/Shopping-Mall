<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/views/common/top.jsp"/>
<link rel="stylesheet" href="/css/my.css">
<title>마이페이지</title>
</head>
<body>
<jsp:include page="/WEB-INF/views/common/header.jsp"/>
<section>
	<notfooter>
		<h2 id="h2_myNickname"></h2><br>
		<div id="div_orderedNumpad">
			<p id="p_subtitle">내 주문내역
			<span id="span_3month">최근 3개월 기준 입니다</span></p><br>
			<a class="a_orderTextBox" uri="before">
				<span class="span_orderTAlign">입금전</span>
				<span id="span_before" class="span_orderNAlign">0</span>
			</a>
			<a class="a_orderTextBox" uri="prepare">
				<span class="span_orderTAlign">배송준비중</span>
				<span id="span_prepare" class="span_orderNAlign">0</span>
			</a><br><br>
			<a class="a_orderTextBox" uri="while">
				<span class="span_orderTAlign">배송중</span>
				<span id="span_while" class="span_orderNAlign">0</span>
			</a>
			<a class="a_orderTextBox" uri="done">
				<span class="span_orderTAlign">배송완료</span>
				<span id="span_done" class="span_orderNAlign">0</span>
			</a><br><br>
			<a class="a_orderTextBox" uri="cancel">
				<span class="span_orderTAlign">취소</span>
				<span id="span_cancel" class="span_orderNAlign">0</span>
			</a>
			<a class="a_orderTextBox" uri="takeback">
				<span class="span_orderTAlign">반품</span>
				<span id="span_takeback" class="span_orderNAlign">0</span>
			</a>
		</div>
		<div id="div_selectMyMenu">
			<button id="button_gotoAllOrderList" class="p_selectMyBox">전체 주문내역</button>
			<button id="button_updateSignInfo" class="p_selectMyBox">회원정보 수정</button>
			<button id="button_deleteAccount" class="p_selectMyBox">회원 탈퇴</button>
		</div>
	</notfooter>
	<jsp:include page="/WEB-INF/views/common/footer.jsp"/>
</section>
<jsp:include page="/WEB-INF/views/common/closer.jsp"/>
<script src="/js/my.js"></script>
</html>