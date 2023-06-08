<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/views/common/top.jsp"/>
<link rel="stylesheet" href="/css/product_detail.css">
<title>상세 페이지</title>
</head>
<body>
<jsp:include page="/WEB-INF/views/common/header.jsp"/>
	<section>
		<notfooter>
			<div id="product-first">
			
				<div id="product-image">
					<img id="prod_img">                    
				</div>
				
				<div id="product-info">
					<h3 id="product-name"></h3><br><br>           
					<pre>상품코드<input type="text" id="product_code" class="input_pDetail" readonly></pre><br>
					<pre>판매가  <input type="number" id="product_price" class="input_pDetail" readonly>원</pre><br>
					<pre>제조사  <input type="text" id="product_company" class="input_pDetail" readonly></pre><br>
					<p>수량<input type="number" id="product_count" min="1" max="999" value="1"></p><br>
					<pre>배송비  <input type="number" id="product_df" class="input_pDetail" readonly></pre><br>
					<p>총 상품 금액</p>
					<input type="text" id="total_price">원<br>
					
					<div id="div_goto">
						<button id="btnBuy">구매하기</button>
						<button id="btnBasket">장바구니에 담기</button>
					</div>
				</div>
			</div>
			
			<div>
				<button class="btnInfo">상품 정보</button>
				<button class="btnReview">상세 후기</button>
				<button class="btnQna">제품 문의</button>
				<br><br><br>
			</div>
			
			<div id="prod_content"></div><br><br>
			
			<div>
				<button class="btnInfo">상품 정보</button>
				<button class="btnReview">상세 후기</button>
				<button class="btnQna">제품 문의</button>
			</div><br><br>
					
			<div id="div_writeReview">
			    <input type='number' id='review_check' class="displaynone">
				<p>생생한 후기 작성</p>
				
				<div class="myform">
					<input type="radio" name="reviewStar" value="5" id="rate1"><label
						for="rate1">★</label>
					<input type="radio" name="reviewStar" value="4" id="rate2"><label
						for="rate2">★</label>
					<input type="radio" name="reviewStar" value="3" id="rate3"><label
						for="rate3">★</label>
					<input type="radio" name="reviewStar" value="2" id="rate4"><label
						for="rate4">★</label>
					<input type="radio" name="reviewStar" value="1" id="rate5"><label
						for="rate5">★</label>
				</div>
				
				<div id="review_writeDiv">
					<p style="position:relative; left: -15px;">제목
					<input type="text" id="review_title" style="position:relative; left: 20px; width: 320px;"
					maxlength="30"></p><br>
					<p style="position:relative; left: -70px;">작성자
					<input type="text" id="nickname" readonly></p><br> 
					<p style="position:relative; left: -180px;">내용</p><br>
					<textarea rows="5" cols="50" id="review_content" maxlength="200"></textarea>
					<button id="add" style="position: relative; top: -36px; 
					width: 50px; height: 82px;">등록</button>
				</div>
			</div>
			
			<div>
				<div class="review-info">
					<table id="review_myTable">
						<tr>
							<th>내 리뷰</th>
						</tr>	
						<tr><td style="height: 25px;"></td></tr>
					</table>
				</div><br><br>
		
				<div class="review-info">
					<table id="review_table">
						<tr>
							<th>리뷰 목록</th>
						</tr>	
						<tr><td style="height: 25px;"></td></tr>
					</table>
				</div>
			</div>
	
			<div id="div6-1">
				<ul>
					<li id="li_first" class="page">처음</li>
					<li id="li_prev" class="page">이전</li>
					<li id="ul_pageNumber">
					<li id="li_next" class="page">다음</li>
					<li id="li_last" class="page">마지막</li>
				</ul>
			</div>
			
			<div>
				<input type="number" id="hidden_currentL" value="1" class="displaynone">
				<input type="number" id="hidden_currentP" value="1" class="displaynone">
			</div>
			
		</notfooter>
		<jsp:include page="/WEB-INF/views/common/footer.jsp"/>
	</section>
<jsp:include page="/WEB-INF/views/common/closer.jsp"/>
<script src="/js/product_detail.js"></script>
<script src="/js/product_detail_review.js"></script>
</html>		