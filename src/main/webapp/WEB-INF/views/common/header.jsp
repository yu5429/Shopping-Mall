<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<header id="header">
	<div class="div_member">
		<ul id="ul_member">
			<a id="a_login" class="a_memberText">로그인</a>
			<a id="a_signup" class="a_memberText">회원가입</a>
		</ul>
	</div>
    <div class="div_title">
		<a href="/home">
			<img alt="logo" src="/img/ui/logo.jpg" class="header_title_img" >
			<span class="header_title_name">STATIONERY</span>
		</a>
	</div>	
	<div class="div_category">
	
			<div class="a_categoryText dropdown">
				<button class="dropbtn category_btn">≡ 전체 카테고리</button>
			    <div id="div_categoryall" class="dropdown-content"></div>
		    </div>
		    
		    <div id="div_smallCategoryAppend">
		    </div>
		    
			<div class="a_categoryText dropdown">
				<a id='a_notice' class='a_memberText'>공지사항</a>
			</div>
			
			<div class="a_categoryText dropdown">
				<a id='a_inquiry' class='a_memberText'>문의하기</a>
			</div>
			
	</div>
</header>