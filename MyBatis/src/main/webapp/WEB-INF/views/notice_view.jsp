<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/views/common/top.jsp"/>
<link rel="stylesheet" href="/css/notice.css">
<title>공지글 보기</title>
</head>
<body>
	<jsp:include page="/WEB-INF/views/common/header.jsp" />
	<section>
		<notfooter>
			<div id="list">
				<table class="board-table">
					<tr>
						<td>작성자</td>
						<td class="left">&emsp;
							<input type="text" class="none" value='${n.w_writer }' readonly>
						</td>
					</tr>
					<tr>
						<td>제목</td>
						<td class="left">&emsp;
							<input type="text" class="none" value='${n.w_title }' readonly>
						</td>
					</tr>
					<tr>
						<td>작성일</td>
						<td class="left">&emsp; ${n.w_date }</td>
					</tr>
					<tr>
						<td class="left" colspan="2">
							<textarea class="none" readonly>${n.w_content }</textarea>
						</td>
					</tr>
					<tr>
						<td colspan="2" id="td_admin" style="text-align: right;"></td>
					</tr>
				</table>
			</div>
			<br><br><a href="/notice/list" class="showList">목록보기</a>
		</notfooter><br><br><br>
		<jsp:include page="/WEB-INF/views/common/footer.jsp" />
	</section>
<jsp:include page="/WEB-INF/views/common/closer.jsp" />
<script src="/js/notice_view.js"></script>
</html>