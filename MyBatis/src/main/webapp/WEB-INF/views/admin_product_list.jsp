<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/views/common/top.jsp"/>
<link rel="stylesheet" href="/css/admin_product.css">
<title>제품 리스트</title>
</head>
<body>
	<section>
		<notfooter>
			<div class='h1'>제품 리스트</div>
			
			<select id="select_bigcategory">
				<option value="">대분류</option>
			</select>
			<select id="select_category" style="display:none">
				<option value="">소분류</option>
			</select>
			
			<input type="text" id="input_search" placeholder="  이름 또는 제조사로 검색">	
			
			<div>
				<table id='table_productList'>
					<tr>
						<th>번호</th>
						<th>이미지</th>
						<th>대분류</th>
						<th>소분류</th>
						<th>코드</th>
						<th>이름</th>
						<th>제조사</th>
						<th>정가</th>
						<th>판매가</th>
						<th>상세 이미지</th>
						<th>배송비</th>
						<th>등록일자</th>
					</tr>
				</table>
			</div>
			
			<div class='div_button'>
				<button class='button_ap' id='button_goto_home'>홈으로</button>
				<button class='button_ap' id='button_create'>제품 추가</button>
			</div>
			
			<div id="div_pageIndex" class="div_pageIndex">
			    <ul>
			        <li id="li_first" class="page">처음</li>
			        <li id="li_prev" class="page">이전</li>
			    </ul>
			    <ul id="ul_pageNumber">
			    </ul>
			    <ul>
			        <li id="li_next" class="page">다음</li>
			        <li id="li_last" class="page">마지막</li>
			    </ul>
			</div>
			
		  	<div hidden>
				<input type="number" id="hidden_countList" value=''><br>
				<input type="number" id="hidden_currentPage" value="1">
			</div>
		</notfooter>
	</section>
<jsp:include page="/WEB-INF/views/common/closer.jsp"/>
<script src="/js/admin_product_list.js"></script>
</html>