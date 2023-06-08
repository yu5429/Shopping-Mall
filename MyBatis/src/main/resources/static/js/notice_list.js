$(document)
.ready(check_admin)
.ready(notice_getCount)

.on("click", ".page", pageIndexing)

.on('click','#button_write',function(){
	document.location='/notice/write';
})

function check_admin() {
	$.ajax({
		url: "/check/admin",
		type: "post",
		dataType: "text",
		success: function(check) {
			if (check == "true") {
				html = [];
				html.push(
					"<button id='button_write' class='button'>공지 작성</button>"
				);
				$("#div_admin").append(html.join(""));
			}
		}
	})
}


function notice_getCount() {
	$.ajax({
		url: "/notice/getCount",
		type: "post",
		dataType: "text",
		success: function(count) {
			$('#hidden_currentL').val(count);
			$('#hidden_currentP').val(1);
			pageIndexing();
		}
	})
}

function notice_getList(cp) {       
    allNum = Number($('#hidden_currentL').val());
    if(cp > 1) allNum += -(cp*5) + 5;
    
	$.ajax({
		url: "/notice/getList",
		type: "post",
		data:{
			currentP: cp
		},
		dataType: "json",
		success: function(data) {
			$("#table_notice tr:gt(0)").remove();
			for (i = 0; i < data.length; i++) {
				html = [];
				html.push(
					"<tr>",
					"<td>",allNum,"</td>",
					"<td><a href='/notice/view/",data[i]["W_num"],"'>",
					data[i]["W_title"],"</a></td>",
					"<td>",data[i]["W_writer"],"</td>",
					"<td>",data[i]["W_date"],"</td>",
					"<td>",data[i]["W_views"],"</td>",
					"</tr>"
				);
				allNum--;
				$("#table_notice").append(html.join(""));
			}
		}
	})
}

function pageIndexing() {
	$("#ul_pageNumber").empty();
	
	dataLength = $("#hidden_currentL").val();
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
		for (i = startIndex; i <= last; i++) {
			$("#ul_pageNumber").append(`<li id='np${i}' class='page pnum'>${i}</li>`);
		}
	}
	
	$(`#np${cp}`).css("background-image", "url(/img/ui/pagination_click.png)");
	
	notice_getList(cp);
	$("#div6-1").css("display", "block");
}