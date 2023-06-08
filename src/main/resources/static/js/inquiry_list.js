$(document)
.ready(inquiry_getCount)
.on("click", ".page", pageIndexing)
.on('click','.td_title', goto_view)
.on('click','#btnWrite',newPost)

function goto_view() {
	document.location='/inquiry/view/'+$(this).attr("inqno");
}

function newPost(){
	document.location = "/inquiry/newPost/default";
}

function inquiry_getCount() {
	$.ajax({
		url: "/inquiry/getCount",
		type: "post",
		dataType: "text",
		success: function(count) {
			$("#hidden_countList").val(count);
			pageIndexing();
		}
	})
}

function inquiry_getList(cp) {	
	$.ajax({
		url: "/inquiry/getList",
		type: "post",
		data: {
			currentP: cp
		},
		dataType: "json",
		success: function(data) {
			$("#tblList tr:gt(0)").remove();
			let inquiry_list_no = parseInt($('#hidden_countList').val())
			inquiry_list_no = inquiry_list_no-(cp-1)*10;
			
			if (data.length != 0) {
				for (i = 0; i < data.length; i++) {
					imgAry = [];
					img = "";
					
					if (data[i]["prod_img"] == null) {
						img = "/img/ui/no_img.jpg";
					}
					else {
						imgAry = data[i]["prod_img"].split("||");
						img = "/img/" + imgAry[0];
					}
					
					html = [];
					html.push(
						"<tr>",
						"<td>",inquiry_list_no,"</td>",
						"<td>",data[i]["inquiry_no"],"</td>",
						"<td><img src='",img,"' style='width:100px; height:100px'></td>"
					);
					
					inqno = data[i]['inquiry_no'];
					if (inquiry_taggingResponse(inqno) == true) {
						html.push(
							"<td class='td_title' inqno='",data[i]['inquiry_no'],"'>",
							data[i]['inquiry_title'],"<div class=div_tagG>답변됨</div></td>"
						);
					}
					else {
						html.push(
							"<td class='td_title' inqno='",data[i]['inquiry_no'],"'>"
							,data[i]['inquiry_title'],"<div class=div_tagR>답변 대기중</div></td>"
						);
					}
					
					html.push(
		                "<td>",data[i]['inquiry_writer'],"</td>",
		                "<td>",data[i]['inquiry_created'],"</td>",
		                "<td>",data[i]['inquiry_readcount'],"</td>",
					);
					$("#tblList").append(html.join(""));
					inquiry_list_no--;
				}
			}
		}
	})
}

function pageIndexing() {
	$("#ul_pageNumber").empty();
	
	dataLength = $("#hidden_countList").val();
	
	last = Math.ceil(dataLength / 10);
	thisText = $(this).text();
	
	cp = Number($("#hidden_currentPage").val());
	
	if (thisText == "처음") {
		cp = 1;
		$("#hidden_currentPage").val(cp);
	}
	else if (thisText == "이전" && cp - 1 > 0) {
		cp -= 1;
		$("#hidden_currentPage").val(cp);
	}
	else if (thisText == "다음" && cp + 1 < last + 1) {
		cp += 1;
		$("#hidden_currentPage").val(cp);
	}
	else if (thisText == "마지막") {
		cp = last;
		$("#hidden_currentPage").val(cp);
	}
	
	if ($.isNumeric(thisText)) {
		cp = Number(thisText);
		$("#hidden_currentPage").val(cp);
	}
	
	startIndex = Math.floor(cp / 10) * 10 + 1;
	if (cp % 10 == 0) startIndex = (Math.floor(cp / 10) - 1) * 10 + 1;
	
	
	if (cp <= 10) {
		if (last > 10) {
			for (i = 1; i <= 10; i++)
			$("#ul_pageNumber").append(`<li class='page'>${i}</li>`);
		}
		else {
			for (i = 1; i <= last; i++)
			$("#ul_pageNumber").append(`<li class='page'>${i}</li>`);
		}
	}
	else {
		for (i = startIndex; i <= last; i++) {
			$("#ul_pageNumber").append(`<li class='page'>${i}</li>`);
		}
	}
	
	inquiry_getList(cp);
}

function inquiry_taggingResponse(inqno) {
	check = false;
	
	$.ajax({
		url: "/inquiry/taggingResponse",
		type: "post",
		async: false,
		data: {
			inquiry_no: inqno
		},
		dataType: "text",
		success: function(flag) {
			if (flag != 0) check = true;
		}
	})
	
	return check;
}