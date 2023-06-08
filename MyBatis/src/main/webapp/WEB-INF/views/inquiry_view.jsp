<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/views/common/top.jsp"/>
<link rel="stylesheet" href="/css/inquiry_view.css">
<title>문의글 보기</title>
</head>
<body>
<jsp:include page="/WEB-INF/views/common/header.jsp"/>
	<section>
		<notfooter style="text-align: left;">
			<div id="div_writerText" hidden>${inquiry.inquiry_writer}</div>
			<article>
				<p class='h1'>문의</p>
				<input type='hidden' id=inquiry_no value='${inquiry.inquiry_no}' readonly>
				<div class='view'>
					제목 : ${inquiry.inquiry_title}
				</div>
				<div class='view'>
					작성자 : ${inquiry.inquiry_writer}
				</div>
				<div id="product_info" class='displaynone view'>       
					문의 상품                         
					<table id="product_info_table"></table>
				</div>
				<div>
					<textarea class='textarea' readonly>${inquiry.inquiry_content}</textarea>
				</div>
				<div class='view'>
					작성일 : ${inquiry.inquiry_created}
				</div>
				<div class='view'>
					수정일 : ${inquiry.inquiry_updated}
				</div>
			</article>
			
			<div>
				<input type=text id=product_code style="display: none;" value =${inquiry.inquiry_product}>
			</div>
			
			<div class="divg">
				<button id=btnList class=button>목록</button>
				<button id=btnUpdate class='button nonmember'>수정</button>
				<button id=btnDelete class='button nonmember'>삭제</button>
			</div><br><br><br><br>
			
			<article id="article_response">
			</article>
		</notfooter><br><br><br><br>
		<jsp:include page="/WEB-INF/views/common/footer.jsp"/>
	</section>
<jsp:include page="/WEB-INF/views/common/closer.jsp"/>
<script src="/js/inquiry_view.js"></script>
</html>