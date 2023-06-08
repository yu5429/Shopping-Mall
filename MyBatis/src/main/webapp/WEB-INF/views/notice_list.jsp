<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:include page="/WEB-INF/views/common/top.jsp"/>
<link rel="stylesheet" href="/css/notice.css">
<title>공지사항</title>
</head>
<body>
<jsp:include page="/WEB-INF/views/common/header.jsp"/>
	<section>
		<notfooter>
			<div>
				<h1>공지사항</h1>
			</div><br><br>
			
			<div id="list">
			
				<table id="table_notice" class="board-table" >
					<tr>
						<th width="100px">번호</th>
						<th width="500px">제목</th>
						<th width="200px">작성자</th>
						<th width="200px">작성일</th>
						<th width="100px">조회</th>
					</tr>
				</table>
				
				<div id="div_admin" style="text-align: right;">
				</div>
			</div>
			
			<div id="div6-1">
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
			</div>
			<div>
				<input type="number" id="hidden_currentL" class="dnone"><br>
				<input type="number" id="hidden_currentP" value="1" class="dnone">
			</div>
		</notfooter>
		<jsp:include page="/WEB-INF/views/common/footer.jsp"/>
	</section>
<jsp:include page="/WEB-INF/views/common/closer.jsp"/>
<script src="/js/notice_list.js"></script>
</html>