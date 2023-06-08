$(document)
.ready(check_loginStatus)
.on('click', "#btnBuy", goto_orderDetail)
.on('click', "#btnBasket", goto_basket)

.on('click',".btnInfo",function(){
	$('html,body').animate({
        scrollTop: $("#prod_content").offset().top},
        500);
})
.on('click',".btnReview",function(){
	$('html,body').animate({
        scrollTop: $("#review_myTable").offset().top},
        500);
})
.on('click',".btnQna", goto_inquriy)
.on("propertychange change paste input", "#product_count", maxlength999)

pn = decodeURIComponent(window.location.pathname.substring(16));

function check_loginStatus() {
	$.ajax({
		url: "/check/loginStatus",
		type: "post",
		dataType: "text",
		success: function(check) {
			if (check == "true") flag = "true";
			else flag = "false";
		}
	});
}

function goto_orderDetail() {
	if (flag == "true") {
		
		random = Math.floor(Math.random()* 1000 + 1) * -1;
		b_img = $("#prod_img").attr("src");
		b_title = $("#product-name").text();
		b_price = $("#product_price").val();
		b_df = $("#product_df").val();
		b_count = $("#product_count").val();
					
		string = `<!--${random}시작-->`;
		string += `<tr seq=${random}><td><img src=${b_img} width=50px></td>`;
		string += `<td style=width:300px>${b_title}</td><td>${b_price}</td>`;
		string += `<td><input type=number min=1 class=odt_quantity style=width:40px value=${b_count}></td>`;
		string += `<td>${b_df}</td><td>${b_price * b_count}</td>`;
		string += `<td><input type=button class=cancel value=취소></td></tr>`;
		string += `<!--${random}끝-->`;
		
		if (localStorage.getItem("odt") == null) localStorage.setItem("odt", string);
		else {
			combi = localStorage.getItem("odt") + string;
			localStorage.setItem("odt", combi);
		}
						
		document.location = "/order/detail";
	}
	else alert("로그인을 하셔야 구매 가능합니다");
}

function goto_basket() {
	if (flag == "true") {
		b_img = $("#prod_img").attr("src");
		b_title = $("#product-name").text();
		b_price = $("#product_price").val();
		b_count = $("#product_count").val();
		b_df = $("#product_df").val();		
		
		$.ajax({
			url: "/basket/insert",
			type: "post",
			data: {
				b_img: b_img,
				b_title: b_title,
				b_price: b_price,
				b_count: b_count,
				b_df: b_df
			},
			dataType: "text",
			success: function() {
				if(confirm("상품이 장바구니에 담겼습니다\n장바구니로 이동하시겠습니까?")) {
					document.location = "/basket";
				}
			}
		})
	}
	else alert("로그인을 하셔야 장바구니에 담을 수 있습니다");
}

function goto_inquriy() {
	document.location=`/inquiry/newPost/${pn}`
}

function maxlength999() {
	input = $(this).val();
	if (input.length > 3) $(this).val(input.slice(0, 3));
}