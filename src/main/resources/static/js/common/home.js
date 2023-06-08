$(document)
.ready(CheckandDraw)
.ready(getCategoryforHeader)
.ready(home_new)
.ready(home_best)

.on("click", ".category_btn", goto_category)
.on("click", "#a_login", goto_login)
.on("click", "#a_signup", goto_signup)
.on("click", "#a_logout", do_logout)
.on("click", "#a_orderList", goto_orderList)
.on("click", "#a_mypage", goto_mypage)
.on("click", "#a_notice", goto_notice)
.on("click", "#a_inquiry", goto_inquiry)
.on("click", "#a_basket", goto_basket)
.on("click", "#a_member", goto_member)
.on("click", "#a_product", goto_product)

function CheckandDraw() {
	$.ajax({
		url: "/CheckandDraw",
		type: "post",
		dataType: "text",
		success: function(nickname) {
			if (nickname != "") {
				draw_ulMember(nickname);
			}
		}
	})
}

function getCategoryforHeader() {
	$.ajax({
		url: "/home/bigcategory",
		type: "post",
		dataType: "json",
		success: function(data) {
			if (data.length != 0) {
				$("#div_categoryall").empty();
				$("#div_smallCategoryAppend").empty();
				for (i = 0; i < data.length; i++) {
					if (data[i]["prod_big"] == null) break;
					html = [];
					html.push(
						"<a href='/product_list/",data[i]["prod_big"],
						"/전체'>",data[i]["prod_big"],"</a>"
					);
					$("#div_categoryall").append(html.join(""));
					
					
					html2 = [];
					html2.push(
						"<div class='a_categoryText dropdown'>",
						"<button class='dropbtn category_btn'>",data[i]["prod_big"],"</button>",
						"<div id='",data[i]["prod_big"],"' class='dropdown-content'></div>"
					);
					$("#div_smallCategoryAppend").append(html2.join(""));
				}
				
				for (i = 0; i < data.length; i++) {
					big = data[i]["prod_bigcategory"];
					html = [];
					html.push(
						"<a href='/product_list/",data[i]["prod_bigcategory"],
						"/",data[i]["prod_category"],"'>",data[i]["prod_category"],"</a>"
					);
					$(`#${big}`).append(html.join(""));	
				}	
			}
		}
	})
}

function goto_login() {
	document.location = "/login";
}

function goto_signup() {
	document.location = "/signup";
}

function goto_orderList() {
	document.location = "/odl/default";
}

function goto_notice() {
	document.location = "/notice/list";
}

function goto_inquiry() {
	document.location = "/inquiry/list";
}

function goto_basket() {
	document.location = "/basket";
}

function goto_member() {
	document.location = "/admin/member/list"
}

function goto_product() {
	document.location = "/admin/product/list"
}

function do_logout() {
	localStorage.clear();
	$.ajax({
		url: "/logout",
		type: "post",
		dataType: "text",
		success: function(check) {
			document.location = "/home";
		}
	})
}

function draw_ulMember(nickname) {
	$("#ul_member").empty();
	html = [];
	html.push(
		"<li class='header_member_text'>",
		"<a id='p_greetingNickname' class='a_memberText'>환영합니다  ",nickname,
		"님</a><a id='a_logout' class='a_memberText'>로그아웃</a>",
		"<a id='a_orderList' class='a_memberText'>주문/배송조회</a>",
		"<a id='a_mypage' class='a_memberText'><img src='/img/ui/humanico.png' width=30px;></a>",
		"<a id='a_basket' class='a_memberText'><img src='/img/ui/basketico.png' width=30px;></a></li>",
		"</li>"
	);
	if (nickname == "관리자") {
		html.push(
			"<li><a id='a_member' class='a_memberText'>회원 관리</a>",
			"<a id='a_product' class='a_memberText'>상품 관리</a></li>"
		);
	}
	$("#ul_member").append(html.join(""));
}

function goto_mypage() {
	document.location = "/my";
}

function home_best() {
	$.ajax({
		url: '/home/best',
		type: 'post',
		dataType:'json',
		success: function(data) {
			$('#best_menu_list').empty();
			if (data.length != 0) {
				for (i = 0; i < data.length; i++) {
					html = [];
					htmlCreate(data, html, i);
					html.push(
                        "<span><img src='/img/ui/hot.gif' class='icon_img' alt='new'></span>",
                        "</ul></div></div></li>",
	                );
	                $('#best_menu_list').append(html.join(""));
				}
			}
		}
	})
}

function home_new() {
	$.ajax({
		url: '/home/new',
		type: 'post',
		dataType:'json',
		success:function(data) {
			$('#new_menu_list').empty();
			if (data.length != 0) {
				for (i = 0; i < data.length; i++) {
					html = [];
					htmlCreate(data, html, i);
					html.push(
                        "<span><img src='/img/ui/new.gif' class='icon_img' alt='new'></span>",
                        "</ul></div></div></li>",
	                );
	                $('#new_menu_list').append(html.join(""));
				}
			}
		}
	})
}



function htmlCreate(data, html, i) {
	prod_price = Number(data[i]["prod_price"]).toLocaleString();
	prod_discount = Number(data[i]["prod_discount"]).toLocaleString();
	prod_code = data[i]["prod_code"];
	
	imgAry = data[i]["prod_img"].split("||");
	prod_image = "/img/" + imgAry[0];
	
	html.push(
		"<li><div class='productBox'>",
	    "<div class=thumbnail><a href='/product/detail/",prod_code,"'>",
	    "<img src='",prod_image,"'>&nbsp;</a></div>",
	    "<div class=description>",
	    "<strong class='name'><a href='/product/detail/",prod_code,"'>",
	    "<span class='span_product_name'>",
	    data[i]["prod_name"],"</span></a></strong>",
	    "<ul class='spec'>",
	    "<li><span class='span_product_price'>￦",prod_price,"</span></li>",
	    "<li><span class='span_product_discount_price'>￦",prod_discount,"</span></li>",
	);
}

function goto_category() {
	text = $(this).text();
	if (text != "≡ 전체 카테고리") {
		document.location = `/product_list/${text}/전체`;
	}
}



var slideIndex = 0; //slide index

window.onload=function(){
  showSlides(slideIndex);

  var sec = 3000;
  setInterval(function(){
    slideIndex++;
    showSlides(slideIndex);

  }, sec);
}

function moveSlides(n) {
  slideIndex = slideIndex + n
  showSlides(slideIndex);
}

function currentSlide(n) {
  slideIndex = n;
  showSlides(slideIndex);
}

function showSlides(n) {

  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  var size = slides.length;

  if ((n+1) > size) {
    slideIndex = 0; n = 0;
  }else if (n < 0) {
    slideIndex = (size-1);
    n = (size-1);
  }

  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[n].style.display = "block";
  dots[n].className += " active";
}

const images = document.querySelectorAll('.img');
let current = 0;

function showSlide() {
  for(let i=0; i<images.length; i++) {
    images[i].classList.remove('on');
  }
  current++;
  if(current > images.length) {
    current = 1;
  }
  images[current - 1].classList.add('on');
  setTimeout(showSlide, 2000);
}

showSlide();