<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/views/common/top.jsp"/>
<link rel="stylesheet" href="/css/admin_product.css">
<title>제품 보기</title>
</head>
<body>
<section>
	<notfooter>
			<div>
				<div class='h1'>제품 수정 / 삭제</div>
				<div>
					<table id='table_productView'>
						<tr>
							<th>제품이미지</th>
							<td id="img_og" style="width: 500px; border-right: 1px black solid">
							</td>
							<td id="preview1" style="width: 500px;">
							</td>
							<td>
								<textarea id="text1" style="display: none;"></textarea>
								<input type='file' id="file1" multiple>
							</td>
						</tr>
						<tr>
							<th>대분류</th>
							<td>
								<select id='select_bigcategory'>
								</select>
							</td>
						</tr>
						<tr>
							<th>소분류</th>
							<td>
								<select id='select_category'>
								</select>
							</td>
						</tr>
						<tr>
							<th>제품 코드</th>
							<td><input type='text' id='input_code' style="border: 0; outline: 0;" readonly></td>
						</tr>
						<tr>
							<th>변경될 코드</th>
							<td><input type='text' id='input_changeCode' style="border: 0; outline: 0;" readonly></td>
						</tr>
						<tr>
							<th>제품명</th>
							<td><input type='text' id='input_name'></td>
						</tr>
						<tr>
							<th>제조사</th>
							<td><input type='text' id='input_company'></td>
						</tr>
						<tr>
							<th>제품정가</th>
							<td><input type='number' id='input_price'></td>
						</tr>
						<tr>
							<th>제품판매가</th>
							<td><input type='number' id='input_discount'></td>
						</tr>
						<tr>
							<th>제품설명</th>
							<td id="img_ogd" style="border-right: 1px black solid">
							</td>
							<td id="preview2">
							</td>
							<td>
								<textarea id="text2" style="display: none;"></textarea>
								<input type="file" id="file2" multiple>
							</td>
						</tr>
						<tr>
							<th>배송비</th>
							<td><input type='number' id='input_delivery'></td>
						</tr>
					</table>
				</div>
			
			<div class='div_button'>
				<button class='button_ap' id='button_gotoList'>목록</button>
				<button class='button_ap' id='button_update'>제품 수정</button>
				<button class='button_ap' id='button_delete'>제품 삭제</button>
			</div>		
		</div>
	</notfooter>
</section>
<jsp:include page="/WEB-INF/views/common/closer.jsp"/>
<script src="/js/admin_product_view.js"></script>
</html>