<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<jsp:include page="/WEB-INF/views/common/top.jsp"/>
<link rel="stylesheet" href="/css/odl.css">
<link rel="stylesheet" href="/css/basket.css">
<title>장바구니</title>
</head>
<body>
<jsp:include page="/WEB-INF/views/common/header.jsp"/>
	<section>
		<notfooter>
			<h1 class=h1_basketTitle>장바구니</h1><br><br>
			<article style="margin: auto;">
				<div>
					<h3 class=h3_basketSubTitle>일반 상품(<span id="span_basketcount">0</span>)</h3>
				</div>
				
				<div id=div_explain>
					<h5>상품 정보 칸을 클릭하면 선택됩니다</h5>
					<h5>배송비가 각각 다를 때만 추가 부가됩니다</h5>
				</div>
			
				<table id=table_basket class=tblbasket>
					<tr>
						<th>이미지</th>
						<th>상품정보</th>
						<th>판매가</th>
						<th>수량</th>
						<th>판매가 * 수량</th>
						<th>배송비</th>
						<th>삭제</th>
					</tr>
				</table><br>
				
				<table id=table_basketPrice class=tblprice>
					<tr>
						<th>총 상품금액</th>
						<th>총 배송비</th>
						<th>결제예정금액</th>
					</tr>
					<tr>
						<td id=basket_totalP>0</td>
						<td id=basket_totalD>0</td>
						<td id=basket_totalSum>0</td>
					</tr>
				</table>
				
				<input type="button" id=allselect value="선택 상품 주문">
			</article>
		</notfooter>
		<jsp:include page="/WEB-INF/views/common/footer.jsp"/>
	</section>
<jsp:include page="/WEB-INF/views/common/closer.jsp"/>
<script src="/js/basket.js"></script>
</html>