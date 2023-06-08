$(document)
.ready(check_loginStatus)
.ready(check_odlURI)
.ready(before_date(90))
.ready(picker)

.on("click", "#order_search_btn", odl_getCount)
.on("click", ".page", pageIndexing)
.on("click", "#table_orderList td:gt(1)", goto_orderPaid)

.on('click','#today', function() {before_date(0)})
.on('click','#oneweek', function() {before_date(7)})
.on('click','#onemonths', function() {before_date(30)})
.on('click','#threemonths', function() {before_date(90)})
.on('click','#sixmonths', function() {before_date(180)})

function check_loginStatus() {
	$.ajax({
		url: "/check/loginStatus",
		type: "post",
		dataType: "text",
		success: function(check) {
			if (check == "false") {
				alert("로그인이 필요한 페이지입니다");
				document.location = "/home";
			}
		}
	})
}

function check_odlURI() {
	uri = window.location.pathname.substring(4);
	odl_getCount(uri);
}

function odl_getCount(uri) {
	if (uri == "/before") $("#order_status option:eq(1)").attr("selected", "selected");
	else if (uri == "/prepare") $("#order_status option:eq(2)").attr("selected", "selected");
	else if (uri == "/while") $("#order_status option:eq(3)").attr("selected", "selected");
	else if (uri == "/done") $("#order_status option:eq(4)").attr("selected", "selected");
	else if (uri == "/cancel") $("#order_status option:eq(5)").attr("selected", "selected");
	else if (uri == "/takeback") $("#order_status option:eq(6)").attr("selected", "selected");
	
	$.ajax({
		url: "/odl/getCount",
		type: "post",
		data: {
			s_date: $("#order_history_start_date").val(),
			e_date: $("#order_history_end_date").val(),
			order_status: $("#order_status option:selected").val()
		},
		dataType: "text",
		success: function(count) {
			$("#span_orderCount").text(count);
			pageIndexing();
		}
	})
}

function odl_getPageData(cp) {	
	$.ajax({
		url: "/odl/getPageData",
		type: "post",
		data: {
			s_date: $("#order_history_start_date").val(),
			e_date: $("#order_history_end_date").val(),
			order_status: $("#order_status option:selected").val(),
			currentP: cp
		},
		dataType: "json",
		success: function(data) {
			$("#table_orderList tbody tr:gt(0)").remove();
			if (data.length != 0) {
				for (i = 0; i < data.length; i++) {
					html = [];
					html.push(
						"<tr id='order_list'>",
						"<td>",data[i]["o_date"],"<br>",
						"<p mid='",data[i]["m_id"],"' ono='",data[i]["o_no"],"'>",
						"[",data[i]["o_no"],"]</p></td>",
						"<td><img src='",data[i]["o_img"],"' width=50px></td>",
						"<td>",data[i]["o_info"],"</td>",
						"<td>",data[i]["o_count"],"</td>",
						"<td>",data[i]["o_price"],"원</td>",
						"<td>",data[i]["o_ps"],"</td>",
						"</tr>"
					);
					$("#table_orderList").append(html.join(""));
				}
			}
		}
	})
}

function pageIndexing() {
	$("#ul_pageNumber").empty();
	
	dataLength = $("#span_orderCount").text();
	last = Math.ceil(dataLength / 5);
	thisText = $(this).text();
	
	cp = Number($("#hidden_currentP").val());
	
	if (thisText == "처음") {
		cp = 1;
		$("#hidden_currentP").val(cp);
	}
	else if (thisText == "이전" && cp - 1 > 0) {
		cp -= 1;
		$("#hidden_currentP").val(cp);
	}
	else if (thisText == "다음" && cp + 1 < last + 1) {
		cp += 1;
		$("#hidden_currentP").val(cp);
	}
	else if (thisText == "마지막") {
		cp = last;
		$("#hidden_currentP").val(cp);
	}
	
	if ($.isNumeric(thisText)) {
		cp = Number(thisText);
		$("#hidden_currentP").val(cp);
	}
	
	startIndex = Math.floor(cp / 5) * 5 + 1;
	if (cp % 5 == 0) startIndex = (Math.floor(cp / 5) - 1) * 5 + 1;
	
	
	if (cp <= 5) {
		if (last > 5) {
			for (i = 1; i <= 5; i++)
			$("#ul_pageNumber").append(`<li id='np${i}' class='page pnum'>${i}</li>`);
		}
		else {
			for (i = 1; i <= last; i++)
			$("#ul_pageNumber").append(`<li id='np${i}' class='page pnum'>${i}</li>`);
		}
	}
	else {
		if (last > startIndex + 4) {
			for (i = startIndex; i <= startIndex + 4; i++) {
				$("#ul_pageNumber").append(`<li id='np${i}' class='page pnum'>${i}</li>`);
			}
		}
		else {
			for (i = startIndex; i <= last; i++) {
				$("#ul_pageNumber").append(`<li id='np${i}' class='page pnum'>${i}</li>`);
			}
		}
	}
	$(`#np${cp}`).css("background-image", "url(/img/ui/pagination_click.png)");
	
	odl_getPageData(cp);
	$("#div6-1").css("display", "block");
}

function before_date(day){
	let date = new Date();
		let start = new Date(Date.parse(date) - day * 1000 * 60 * 60 * 24);
		let today = new Date(Date.parse(date) - 0 * 1000 * 60 * 60 * 24);
		
		let s_yyyy = start.getFullYear();
		let s_mm = start.getMonth()+1;
		let s_dd = start.getDate();
		
		if(s_mm<10){
			s_mm = "0" + s_mm;
		} if(s_dd<10){
			s_dd = "0" + s_dd;
		}
		
		let e_yyyy = today.getFullYear();
		let e_mm = today.getMonth()+1;
		let e_dd = today.getDate();
		
		if(e_mm<10){
			e_mm = "0" + e_mm;
		} if(e_dd<10){
			e_dd = "0" + e_dd;
		}
		
		let startDate = s_yyyy + "-" + s_mm + "-" + s_dd;
		let endDate = e_yyyy + "-" + e_mm + "-" + e_dd;
		
		
		$('#order_history_start_date').val(startDate);
		$('#order_history_end_date').val(endDate);
}

function picker(){
	$('#order_history_start_date').datepicker({
		showOn: "both",
		buttonImage: "/img/ui/calender.jpg",
		buttonImageOnly: true,
		changeMonth: true,
		changeYear: true,
		dateFormat: "yy-mm-dd",
		showButtonPanel: true,
		currentText: "오늘",
		closeText: "닫기",
		dayNames: ['월요일','화요일','수요일','목요일','금요일','토요일','일요일'],
		dayNamesMin: ['월','화','수','목','금','토','일'],
		monthNamesShort:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
	});
	$('#order_history_end_date').datepicker({
		showOn: "both",
		buttonImage: "/img/ui/calender.jpg",
		buttonImageOnly: true,
		changeMonth: true,
		changeYear: true,
		dateFormat: "yy-mm-dd",
		showButtonPanel: true,
		currentText: "오늘",
		closeText: "닫기",
		dayNames: ['월요일','화요일','수요일','목요일','금요일','토요일','일요일'],
		dayNamesMin: ['월','화','수','목','금','토','일'],
		monthNamesShort:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
	});
	$('.ui-datepicker-trigger').attr("style","margin-left:2px; vertical-align:middle; cursor:pointer;");
}

function goto_orderPaid() {
	index = $(this).parent().index();
	no = $(`#table_orderList tr:eq(${index}) td:eq(0)`).find("p").attr("ono");
	id = $(`#table_orderList tr:eq(${index}) td:eq(0)`).find("p").attr("mid");
	document.location = `/order_detail_paid/${no}/${id}`;
}