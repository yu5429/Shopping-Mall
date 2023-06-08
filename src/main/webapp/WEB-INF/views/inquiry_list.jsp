<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/views/common/top.jsp"/>
<link rel="stylesheet" href="/css/inquiry_list.css">
<title>문의 게시판</title>
</head>
<body>
<jsp:include page="/WEB-INF/views/common/header.jsp"/>
<section style="top: 25vh;">
	<notfooter style="width: 95vw;">
		<p id='h1'>문의 리스트</p>
	  
		<div>
			<table id=tblList class='tblList'>
				<tr class='tblListTh'>
					<th width="75px;">게시물 번호</th>
					<th width="100px;">문의 번호</th>
					<th width="120px;">문의 상품</th>
					<th style="width: 300px;">제목</th>
					<th width="200px;">작성자</th>
					<th width="200px;">작성일</th>
					<th width="50px">조회</th>
					<th hidden>히든번호</th>
					<th hidden>히든PW</th>
					<th hidden>공개여부</th>
				</tr>
			</table>
		</div>
	  	
		<div id="div6-1" class='div6-1'>
		    <ul>
		        <li id="li_first" class="page">처음</li>
		        <li id="li_prev" class="page">이전</li>
		    </ul>
		    <ul id="ul_pageNumber">
		    </ul>
		    <ul>
		        <li id="li_next" class="page">다음</li>
		        <li id="li_last" class="page">마지막</li>
		    </ul>
		   		    
	     	<div hidden>
				Count<input type="number" id="hidden_countList" value=''><br>
				현재page<input type="number" id="hidden_currentPage" value="1">
			</div>
		</div>
		
		<% if (session.getAttribute("nickname") != null){ %>
			<div id='button_write'>
				<button id='btnWrite' class='button'>글쓰기</button>
			</div>
		<% } %>
	</notfooter><br><br>
	<jsp:include page="/WEB-INF/views/common/footer.jsp"/>
</section>
<jsp:include page="/WEB-INF/views/common/closer.jsp"/>
<script src="/js/inquiry_list.js"></script>
</html>
