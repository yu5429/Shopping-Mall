<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/views/common/top.jsp"/>
<link rel="stylesheet" href="/css/notice.css">
<title>공지글 작성</title>
</head>
<body>
<jsp:include page="/WEB-INF/views/common/header.jsp"/>
	<section>
		<notfooter>
			<div id="list">
				<table class="board-table">
					<tr>
						<td>작성자</td>
						<td class="left">&emsp;
						<input type="text" class="none" value="관리자" readonly></td>
					</tr>
					<tr>
						<td>제목</td>
						<td class="left">&emsp;
							<input id="input_title" maxlength="30" style="width: 500px;">
						</td>
					</tr>
					<tr>
					<td>내용</td>
					<td></td>
					</tr>
					<tr>
						<td colspan="2">
							<textarea id="textarea_content" maxlength="900"></textarea>
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<button id="button_submit" class="button">등록</button>
							<button id="button_cancel" class="button">취소</button>
						</td>
					</tr>
				</table>
			</div>
		</notfooter><br><br><br>			
		<jsp:include page="/WEB-INF/views/common/footer.jsp"/>
	</section>
<jsp:include page="/WEB-INF/views/common/closer.jsp"/>
<script src="/js/notice_write.js"></script>
</html>