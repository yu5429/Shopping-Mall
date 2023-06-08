<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/views/common/top.jsp"/>
<link href="/css/product_list.css" rel="stylesheet">
<title>Product_list</title>
</head>
<body>
<jsp:include page="/WEB-INF/views/common/header.jsp"/>
    <section>
    	<notfooter>
    		<br><br>
	        <div class="product_normal_package">
	            <div class="normal_menu">
	                <div class="pl_title">
	                    <h3 class="h3"><span id="h3_categoryTitle"></span></h3>
	                </div><br><br>
	                <div class="categorydiv">
	                    <ul id="category" class="categoryul">
	                    </ul>
	                    <input type="hidden" id="hidden_cty" value="">
	                </div>
	            </div>
	            <div id="div1-1" class="div1-1">
	                    <p class="prdcount">상품목록 (<span id="span_product_all_Count">0</span>)</p>
	                    <ul class="orderbyul">
	                    	<li class="orderby" odb="최신순">최신순</li>
	                    	<li class="orderby" odb="낮은가격순">낮은가격순</li>
	                    	<li class="orderby" odb="상품후기순">상품후기순</li>
	                    </ul>
	                    <input type="hidden" id="hidden_odb" value="최신순">
	            </div>
	            <div class="product_list_normal div1">
	                <ul id="normal_menu_list" class="prdList grid1">
	                </ul>
	            </div>
	            <div id="normal_menu_pagination" class="normal_menu_pagination">
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
        </notfooter><br><br>
        <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
    </section>
<jsp:include page="/WEB-INF/views/common/closer.jsp"/>
<script src="/js/product_list.js"></script>
</html>