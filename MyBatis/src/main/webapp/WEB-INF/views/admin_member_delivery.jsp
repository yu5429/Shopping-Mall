<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/views/common/top.jsp"/>
<link rel="stylesheet" href="/css/admin_member_delivery.css">
<title>주문, 배송 관리 페이지</title>
</head>
<body>
<jsp:include page="/WEB-INF/views/common/header.jsp"/>
	<section>
		<notfooter style="text-align: left; margin-left: 50px;">
	        <div>
                <div id="div1-1">
                    <h1>관리자 주문/배송 관리 (<span id="span_orderCount">0</span>)</h1>
                </div><br>
	            
                <div>
	                <div>
	                    <fieldset id="fieldset">
	                        <legend></legend>
	                        <div>
								<select id="order_status">
									<option value="전체">전체 주문처리상태</option>
									<option value="입금전">입금전</option>
									<option value="배송준비중">배송준비중</option>
									<option value="배송중">배송중</option>
									<option value="배송완료">배송완료</option>
									<option value="취소">취소</option>
									<option value="반품">반품</option>
								</select>
							</div>
							
	                        <span>
	                            <p>
	                                <input id="today" class="datebtn" type="button" value="오늘">
	                                <input id="oneweek" class="datebtn" type="button" value="1주일">
	                                <input id="onemonths" class="datebtn" type="button" value="1개월">
	                                <input id="threemonths" class="datebtn" type="button" value="3개월">
	                                <input id="sixmonths" class="datebtn" type="button" value="6개월">
	                            </p>
	                        </span>
	                        
	                        <span>
	                            <input id="order_history_start_date" class="calender" type="text">
	                            ~
	                            <input id="order_history_end_date" class="calender" type="text">
	                        </span>
	                        
	                        <span>
	                            <input type="button" id="order_search_btn" value="조회">
	                        </span>
	                    </fieldset><br>
	                    
	                    <div>
	                        <div>
	                            <ol>
	                                <li class="item1">기본적으로 최근 3개월간의 자료가 조회되며, 기간 검색시 지난 주문내역을 조회하실 수 있습니다.</li>
	                                <li class="item2">주문번호를 클릭하시면 해당 주문에 대한 상세내역을 확인하실 수 있습니다.</li>
	                            </ol>
	                        </div>
	                    </div>
	                 
	                </div>
	                
                    <div>
                        <br>
                        <h3 id="h3_userID"></h3>
                        <table id="table_orderList" border="1">
                            <colgroup>
                                <col style="width:135px;">
                                <col style="width:93px;">
                                <col style="width:400px;">
                                <col style="width:40px;">
                                <col style="width:80px;">
                                <col style="width:80px;">
                                <col style="width:100px;">
                            </colgroup>
                            <tr>
                                <th scope="col">주문일자<br>[주문번호]</th>
                                <th scope="col">이미지</th>
                                <th scope="col">상품정보</th>
                                <th scope="col">수량</th>
                                <th scope="col">상품구매금액</th>
                                <th scope="col">주문처리상태</th>
                                <th scope="col">주문처리변경</th>
                            </tr>
                        </table>
                    </div>
                    
                    <div id="div6-1" class="div6-1">
                        <ul>
                            <li class="page">처음</li>
                            <li class="page">이전</li>
                        </ul>
                        <ul id="ul_pageNumber">
                        </ul>
                        <ul>
                            <li class="page">다음</li>
                            <li class="page">마지막</li>
                        </ul>
                    </div>
                    
                    <input type="hidden" id="hidden_currentP" value="1">
                </div>
            </div>
        </notfooter><br><br><br>
        <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
    </section>
<jsp:include page="/WEB-INF/views/common/closer.jsp"/>
<script src="/js/admin_member_delivery.js"></script>
</html>