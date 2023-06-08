$(document)
.ready(loadData)
.ready(basket_calculateSum)
.ready(check_loginStatus)

.on("click", ".select_item", basket_selectItems)

.on('change','.basket_quantity',function(){
	index = $(this).parent().parent().index();
	seq = $(`#table_basket tr:eq(${index})`).attr("seq");
	qty = Number($(this).val());
	price = Number($(`#table_basket tr:eq(${index}) td:eq(2)`).text());
	total = qty * price;
	$(`#table_basket tr:eq(${index}) td:eq(4)`).text(total);
	
	basket_calculateSum();
	
	$.ajax({
		url: "/basket/changeQuantity",
		type: "post",
		data: {
			b_count: qty,
			bsk_seq: seq
		},
		dataType: "text",
		success: function() {}
	})
})

.on('click','#delete',function(){
	var bsk_seq=$(this).parent().parent().find('#bsk_seq').val();
	$.ajax({
		url:'/basket/delete',
		type:'post',
		dataType:'text',
		data:{
			bsk_seq: bsk_seq
		},
		success:function(data) {
			if (data =='ok') loadData();
			else alert('delete 실패');
		},
		error:function() {
			alert("서버 오류 발생");
		}
	})
})
.on('click','#allselect', function() {
	basket_addSelectItem();
})

.on("propertychange change paste input", ".basket_quantity", maxlength999)

dfset = new Set();

function check_loginStatus() {
	$.ajax({
		url: "/check/loginStatus",
		type: "post",
		dataType: "text",
		success: function(check) {
			if (check != "true") {
				alert("로그인이 필요한 페이지입니다");
				document.location = "/home";
			}
		}
	})
}

function loadData() {
	$("#table_basket tr:gt(0)").remove();
	$.ajax({
		url:'/basket/getList',
		type:'post',
		dataType:'json',
		success:function(data){
			for(i = 0; i < data.length; i++) {
				basket = data[i];
				html = [];
				html.push(
					"<tr seq='",basket['bsk_seq'],"'>",
					"<td><img src='",basket['b_img'],"' width='50px'></td>",
					"<td style='width:300px' class='select_item'>",basket['b_title'],"</td>",
					"<td>",basket['b_price'],"</td>",
					"<td><input type='number' min='1' max='999' class='basket_quantity'", 
					"style='width:40px' value='",basket['b_count'],"'></td>",
					"<td>",Number(basket['b_price']) * Number(basket['b_count']),"</td>",
					"<td>",basket['b_df'],"</td>",
					"<td><input type='button' id='delete' value='삭제''></td>",
					"<td style='display:none'><input type='hidden' id='b_img' value='",basket['b_img'],"'></td>",
					"<td style='display:none'><input type='hidden' id='b_title' value='",basket['b_title'],"'></td>",
					"<td style='display:none'><input type='hidden' id='bsk_seq' value='",basket['bsk_seq'],"'></td>",
					"<td style='display:none'><input type='hidden' id='net",i,"' value='",basket['b_price'],"'></td></tr>"
				);
				$('#table_basket').append(html.join(""));
			}
			$('#span_basketcount').text(data.length);
		}
	})
}

function basket_selectDelete() {
	seqArray = [];
	for (i = 1; i < $("#table_basket tr").length; i++) {
		if ($(`#table_basket tr:eq(${i})`).css("background-color") == "rgb(192, 192, 192)") {
			seqArray.push($(`#table_basket tr:eq(${i})`).attr("seq"));
		}
	}
	$.ajax({
		url:'/basket/selectDelete',
		type:'post',
		traditional: true,
		data: {
			seqArray: seqArray
		},
		dataType:'text',
		beforeSend: function() {
			if (seqArray.length == 0) return false;
		},
		success:function(data){
			if (data =='ok') loadData();
		}
	})
}

function basket_selectItems() {
	index = $(this).parent().index();
	trdex = $(`#table_basket tr:eq(${index})`);
	color = trdex.css("background-color");
	grey = "rgb(192, 192, 192)";
	white = "rgb(0, 0, 0, 0)";
	targetD = $(`#table_basket tr:eq(${index}) td:eq(5)`)
	
	if (color == grey) {
		trdex.css("background-color", white);
		targetD.css("text-decoration", "");
	}
	else {
		trdex.css("background-color", grey);
		dfset.add(targetD.text());
	}
	
	dfary = Array.from(dfset);
	
	for (i = 0; i < $("#table_basket tr").length; i++) {
		icolor = $(`#table_basket tr:eq(${i})`).css("background-color");
		itd = $(`#table_basket tr:eq(${i}) td:eq(5)`);
		
		if (icolor == grey && dfset.has(itd.text())) {
			itd.css("text-decoration", "line-through");
		}
	}
	
	for (i = 0; i < dfary.length; i++) {
		flag = 0;
		for (j = 0; j < $("#table_basket tr").length; j++) {
			jcolor = $(`#table_basket tr:eq(${j})`).css("background-color");
			jtd = $(`#table_basket tr:eq(${j}) td:eq(5)`);
			
			if (jcolor == grey && dfary[i] == jtd.text()) {
				jtd.css("text-decoration", "");
				flag = 1; break;
			}
		}
		if (flag == 0) dfset.delete(dfary[i]);
	}
		
	basket_calculateSum();
}


function basket_addSelectItem() {
	seqArray = [];
	for (i = 1; i < $("#table_basket tr").length; i++) {
		if ($(`#table_basket tr:eq(${i})`).css("background-color") == "rgb(192, 192, 192)") {
			seqArray.push($(`#table_basket tr:eq(${i})`).attr("seq"));
		}
	}
	
	$.ajax({
		url: "/basket/addSelectItem",
		type: "post",
		traditional: true,
		data: {
			seqArray: seqArray
		},
		dataType: "json",
		success: function(data) {
			if (data.length != 0) {
				for (i = 0; i < data.length; i++) {
					bsk_seq = data[i]['bsk_seq'];
					b_img = data[i]['b_img'];
					b_title = data[i]['b_title'];
					b_price = Number(data[i]['b_price']);
					b_count = Number(data[i]['b_count']);
					b_df = data[i]['b_df'];
					
					string = `<!--${bsk_seq}시작-->`;
					string += `<tr seq=${bsk_seq}><td><img src=${b_img} width=50px></td>`;
					string += `<td style=width:300px>${b_title}</td><td>${b_price}</td>`;
					string += `<td><input type=number min=1 max=999 class=odt_quantity style=width:40px value=${b_count}></td>`;
					string += `<td>${b_df}</td><td>${b_price * b_count}</td>`;
					string += `<td><input type=button class='cancel' value=취소></td></tr>`;
					string += `<!--${bsk_seq}끝-->`;
					
					if (localStorage.getItem("odt") == null) localStorage.setItem("odt", string);
					else {
						combi = localStorage.getItem("odt") + string;
						localStorage.setItem("odt", combi);
					}
				}
				basket_selectDelete();
			}
			document.location = "/order/detail";
		}
	})
}

function basket_calculateSum() {
	totalP = 0;
	totalD = 0;
	tempD = 0;
	totalSum = 0;
	flag = 0;
	
	for (i = 0; i < $("#table_basket tr").length; i++) {
		if ($(`#table_basket tr:eq(${i})`).css("background-color") == "rgb(192, 192, 192)") {
			flag = 1;
			totalP += Number($(`#table_basket tr:eq(${i}) td:eq(4)`).text());
			
			targetD = Number($(`#table_basket tr:eq(${i}) td:eq(5)`).text());
			
			if (totalD == 0) {
				totalD += targetD;
				tempD = targetD;
			}
			else if (tempD < targetD) {
				totalD += targetD;
				tempD = targetD;
			}	
		}
	}
	totalSum = totalP + totalD;
	
	if (flag == 0) {
		$("#basket_totalP").text(0);
		$("#basket_totalD").text(0);
		$("#basket_totalSum").text(0);
	}
	else {
		$("#basket_totalP").text(totalP);
		$("#basket_totalD").text(totalD);
		$("#basket_totalSum").text(totalSum);
	}
}

function maxlength999() {
	input = $(this).val();
	if (input.length > 3) $(this).val(input.slice(0, 3));
}