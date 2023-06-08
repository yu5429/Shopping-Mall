<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/views/common/top.jsp"/>
<title>홈페이지</title>
</head>
<body>
<jsp:include page="/WEB-INF/views/common/header.jsp"/>
	<section>
		<notfooter>
		<div class="slideshow-container">
			    <div class="mySlides fade">
				    <div class="numbertext">1 / 3</div>
			        <img src="/img/ui/slide01.jpg">
			    </div>
				
			    <div class="mySlides fade">
				    <div class="numbertext">2 / 3</div>
			        <img src="/img/ui/slide02.jpg">
			    </div>
				
				<div class="mySlides fade">
					<div class="numbertext">3 / 3</div>
					<img src="/img/ui/slide03.jpg">
				</div>
				
				<!-- Next and previous buttons -->
				<a class="prev" onclick="moveSlides(-1)">&#10094;</a>
				<a class="next" onclick="moveSlides(1)">&#10095;</a>
				
				<div class="divdot">
				    <!-- The dots/circles -->
				    <span class="dot" onclick="currentSlide(0)"></span>
				    <span class="dot" onclick="currentSlide(1)"></span>
				    <span class="dot" onclick="currentSlide(2)"></span>
			    </div>
   		    </div>
			<div class="div1">
				<div class='title home_best'>
					<h3 class="h3"><span>BEST PRODUCTS</span></h3>
				</div>
				<ul id="best_menu_list" class="prdList grid1">
				</ul>
			</div>
			<div class="div1">
	            <div class="title">
	                <h3 class="h3"><span>NEW ARRIVALS</span></h3>
	            </div>
	            <ul id="new_menu_list" class="prdList grid1">
	            </ul>
	        </div>
			<div class='home_best home_product_border_top'>
				 <div class="title">
	                <h3 class="h3"><span>BEST BRAND</span></h3>
	            </div>
			</div>
			<div class='brand_product_banner'>
				<div id="container">
					<img class="img" src="/img/ui/brand1.jpg">
					<img class="img" src="/img/ui/brand2.jpg">
					<img class="img" src="/img/ui/brand3.jpg">
					<img class="img" src="/img/ui/brand4.jpg">
				</div>
  		    </div>
		</notfooter><br><br>
		<jsp:include page="/WEB-INF/views/common/footer.jsp"/>
	</section>
<jsp:include page="/WEB-INF/views/common/closer.jsp"/>
<script src="/js/common/home.js"></script>