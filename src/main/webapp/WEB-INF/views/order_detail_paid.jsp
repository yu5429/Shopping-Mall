<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/views/common/top.jsp"/>
<link rel="stylesheet" href="/css/odl.css">
<link rel="stylesheet" href="/css/basket.css">
<title>주문 상세</title>
</head>
<body>
<jsp:include page="/WEB-INF/views/common/header.jsp"/>
	<section>
		<notfooter>
			<div>
				<span class=h1_basketTitle>주문 상세</span><br><br>
				<span id='order_detail_paid_o_no' class='p_order_detail_paid'></span>
				<span id='order_detail_paid_date' class='p_order_detail_paid'></span>
			</div>
			
			<article>
				<table id=table_orderDetail class=tblbasket border=1>
					<tr>
						<th>이미지</th>
						<th>상품정보</th>
						<th>판매가</th>
						<th>수량</th>
						<th>배송비</th>
						<th>합계</th>
						<th>주문상태</th>
					</tr>
				</table><br>
		
				<table id=table_orderDetailPrice class=tblprice border=1>
					<tr>
						<th>총 상품금액</th>
						<th>총 배송비</th>
						<th>결제예정금액</th>
					</tr>
					<tr>
						<td id=odt_totalP>0</td>
						<td id=odt_totalD>0</td>
						<td id=odt_totalSum>0</td>
					</tr>
				</table>
			</article>
			<article>
				<div class='order_deliver_div_table'>
					<h3>주문정보</h3>
					<table class="table_orderInfo">
						<tbody>
							<tr>
								<th>이름</th>
								<td>
									<input type='hidden' id='paid_no' value='${o_no}'>
									<input type="text" id="input_orderRN" class="input_order input_delivery"
									maxlength="30" readonly>
								</td>
							</tr>
							<tr>
								<th>주소</th>
								<td>
									<input type="text" id="input_orderPC" placeholder="우편번호" 
									class="input_order input_delivery" readonly>
									<input type="text" id="input_orderADD" class="input_order input_delivery"
									placeholder="주소" readonly>
									<input type="text" id="input_orderDADD" class="input_order input_delivery"
									placeholder="상세주소" maxlength="20" readonly>
									<input type="text" id="input_orderNADD" class="input_order input_delivery"
									placeholder="참고사항" readonly>
								</td>
							</tr>
							<tr>
								<th>휴대전화</th>
								<td>
									<input type="tel" id="input_orderPH1" class="input_delivery input_Phone" maxlength="4" readonly>
									<span class="span_phoneSpace">-</span>
									<input type="tel" id="input_orderPH2" class="input_delivery input_Phone" maxlength="4" readonly>
									<span class="span_phoneSpace">-</span>
									<input type="tel" id="input_orderPH3" class="input_delivery input_Phone" maxlength="4" readonly>
								</td>
							</tr>
						</tbody>
					</table>
				</div><br>
				
				<div class='order_deliver_div_table'>
					<h3>배송정보</h3>
					<table class="table_orderInfo">
							<tbody>
								<tr>
									<th>이름</th>
									<td>
										<input type='hidden' id='paid_m_id' value='${m_id}'>
										<input type="text" id="input_deliveryRN" class="input_order input_delivery"
										maxlength="30" readonly>
									</td>
								</tr>
								<tr>
									<th>주소</th>
									<td>
										<input type="text" id="input_deliveryPC" placeholder="우편번호" 
										class="input_order input_delivery" readonly>
										<input type="text" id="input_deliveryADD" class="input_order input_delivery"
										placeholder="주소" readonly>
										<input type="text" id="input_deliveryDADD" class="input_order input_delivery"
										placeholder="상세주소" maxlength="20" readonly>
										<input type="text" id="input_deliveryNADD" class="input_order input_delivery"
										placeholder="참고사항" readonly>
									</td>
								</tr>
								<tr>
									<th>휴대전화</th>
									<td>
										<input type="tel" id="input_deliveryPH1" class="input_delivery input_Phone" maxlength="4" readonly>
										<span class="span_phoneSpace">-</span>
										<input type="tel" id="input_deliveryPH2" class="input_delivery input_Phone" maxlength="4" readonly>
										<span class="span_phoneSpace">-</span>
										<input type="tel" id="input_deliveryPH3" class="input_delivery input_Phone" maxlength="4" readonly>
									</td>
								</tr>
								<tr>
									<th>배송메세지</th>
									<td>
										<textarea id="input_deliveryDM" class="input_order input_delivery"
										maxlength="100" readonly></textarea>
									</td>
								</tr>
							</tbody>
						</table>
				</div>
			</article>
		</notfooter>
		<jsp:include page="/WEB-INF/views/common/footer.jsp"/>
	</section>
<jsp:include page="/WEB-INF/views/common/closer.jsp"/>
<script src="/js/order_detail_paid.js"></script>
</html>