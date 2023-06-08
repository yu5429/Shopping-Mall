$(document)
.ready(check_admin)
.ready(getCount)
.ready(before_date(90))
.ready(picker)

.on('click','#today', function() {before_date(0)})
.on('click','#oneweek', function() {before_date(7)})
.on('click','#onemonths', function() {before_date(30)})
.on('click','#threemonths', function() {before_date(90)})
.on('click','#sixmonths', function() {before_date(180)})

.on("click", ".page", pagination)
.on("click", "#order_search_btn", getCount)
.on("change", ".selectOS", update_userODL)
.on("click", "#table_orderList tr:gt(0)", goto_order_paid_list)

pnAry = window.location.pathname.split("/");
pn = pnAry[2];

function check_admin() {
	$.ajax({
		url: "/check/admin",
		type: "post",
		dataType: "text",
		success: function(check) {
			if (check == "false") {
				alert("관리자용 페이지입니다");
				document.location = "/home";
			}
		}
	})
}

function getCount() {
	sd = $("#order_history_start_date").val().replaceAll("-", "");
	ed = $("#order_history_end_date").val().replaceAll("-", "");
	os = $("#order_status option:selected").val();
	
	$.ajax({
		url: "/admin/delivery/getCount",
		type: "post",
		data: {
			m_id: pn,
			s_date: sd,
			e_date: ed,
			o_ps: $("#order_status option:selected").val()
		},
		dataType: "text",
		success: function(count) {
			$("#span_orderCount").text(count);
			getDatabyID();
		}
	})
}

function getDatabyID() {	
	$("#h3_userID").text(pn + " 님의 주문 배송 내역");
	
	sd = $("#order_history_start_date").val().replaceAll("-", "");
	ed = $("#order_history_end_date").val().replaceAll("-", "");
	os = $("#order_status option:selected").val();
	cp = $("#hidden_currentP").val();
	
	$.ajax({
		url: "/admin/delivery/getDatabyID",
		type: "post",
		async: false,
		data: {
			user_id: pn,
			s_date: sd,
			e_date: ed,
			order_status:os,
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
						"<td ono='",data[i]["o_no"],"'>",data[i]["o_date"],"<br>[",data[i]["o_no"],"]","</td>",
						"<td><img src='",data[i]["o_img"],"' width=50px></td>",
						"<td>",data[i]["o_info"],"</td>",
						"<td>",data[i]["o_count"],"</td>",
						"<td>",data[i]["o_price"],"원</td>",
						"<td>",data[i]["o_ps"],"</td>",
						"<td onclick='event.stopPropagation()'><select id=select",i+1," class=selectOS>",
						"<option value=입금전>입금전</option>",
						"<option value=배송준비중>배송준비중</option>",
						"<option value=배송중>배송중</option>",
						"<option value=배송완료>배송완료</option>",
						"<option value=취소>취소</option>",
						"<option value=반품>반품</option>",
						"</select></td></tr>"
					);
					$("#table_orderList").append(html.join(""));
				}
				
				for (i = 1; i < data.length + 1; i++) {
					status = $(`#table_orderList tr:eq(${i}) td:eq(5)`).text();
					$(`#select${i} > option[value=${status}]`).attr("selected", true);
				}
				pageIndexing();
			}
			else pageIndexing();
		}
	})
}

function pageIndexing() {
	$("#ul_pageNumber").empty();
	
	cp = Number($("#hidden_currentP").val());
	dataLength = $("#span_orderCount").text();
	if (dataLength == "0") return false;
	last = Math.ceil(dataLength / 5);
		
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
	
	$("#div6-1").css("display", "block");
}

function pagination() {
	thisText = $(this).text();
		
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
	
	getDatabyID();
}

function update_userODL() {
	os = $(this).val();
	
	index = $(this).parent().parent().index();
	on = $(`#table_orderList tr:eq(${index}) td:eq(0)`).text();
	on = on.replaceAll(/[\[\]]/gi, "").substring(10);
	
	$.ajax({
		url: "/admin/delivery/update",
		type: "post",
		data: {
			o_no: on,
			o_ps: os
		},
		dataType: "text",
		success: function(check) {
			getDatabyID();
		}
	})
}

function goto_order_paid_list() {
	index = $(this).index();
	ono = $(`#table_orderList tr:eq(${index}) td:eq(0)`).attr("ono");
	document.location = `/order_detail_paid/${ono}/${pn}`
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