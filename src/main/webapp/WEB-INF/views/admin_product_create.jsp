<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/views/common/top.jsp"/>
<link rel="stylesheet" href="/css/admin_product.css">
<title>제품 등록</title>
</head>
<body>
<section>
	<notfooter>
		<div class="h1">제품 등록</div>
		<div>
			<table id="table_productInsert">
				<tr>
					<td>대분류</td>
					<td>
						<input type="text" id="input_bigcategory" list="list_bigcategory" maxlength="30">
						<datalist id="list_bigcategory">
						</datalist>
					</td
				</tr>
				<tr>
					<td>소분류</td>
					<td>
						<input type="text" id="input_category" list="list_category" maxlength="30">
						<datalist id="list_category">
						</datalist>
					</td>
				</tr>
				<tr>
					<td>코드</td>
					<td><input type="text" id="input_code" maxlength="90" style="border:0; outline:0;" readonly></td>
				</tr>
				<tr>
					<td>이름</td>
					<td><input type="text" id="input_name" maxlength="90"></td>
				</tr>
				<tr>
					<td>제조사</td>
					<td><input type="text" id="input_company" maxlength="30"></td>
				</tr>
				<tr>
					<td>정가</td>
					<td><input type="number" id="input_price" min="1" max="999999999"></td>
				</tr>
				<tr>
					<td>판매가</td>
					<td><input type="number" id="input_discount" min="1" max="999999999"></td>
				</tr>
				<tr>
					<td>이미지</td>
					<td id="preview1" style="width: 500px;">
					</td>
					<td>
						<textarea id="text1" style="display: none;"></textarea>
						<input type="file" id="file1" accept="image/*" multiple>
					</td>
				</tr>
				<tr>
					<td>상세 이미지</td>
					<td id="preview2">
					</td>
					<td>
						<textarea id="text2" style="display: none;"></textarea>
						<input type="file" id="file2" accept="image/*" multiple>
					</td>
				</tr>
				<tr>
					<td>배송비</td>
					<td><input type="number" id="input_delivery" min="1" max="999999999"></td>
				</tr>
			</table>
		</div>
		
		<div class="div_button">
			<button class="button_ap" id="button_gotoList">목록</button>
			<button class="button_ap" id="button_insert">제품 등록</button>
			<button class="button_ap" id="button_empty">비우기</button>
		</div>
	</notfooter>
</section>
<jsp:include page="/WEB-INF/views/common/closer.jsp"/>
<script src="/js/admin_product_create.js"></script>
</html>