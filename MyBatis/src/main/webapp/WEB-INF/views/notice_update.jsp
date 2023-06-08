<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/views/common/top.jsp"/>
<link rel="stylesheet" href="/css/notice.css">
<title>공지글 수정</title>
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
							<input type="text" class="none" value='${n.w_writer}'>
						</td>
					</tr>
					<tr>
						<td>제목</td>
						<td class="left">&emsp;
							<input type="text" id="input_title" maxlength="30" value='${n.w_title}'>
						</td>
					</tr>
					<tr>
						<td>내용</td>
						<td></td>
					</tr>
					<tr>
						<td colspan="2">
							<textarea id="textarea_content" maxlength="900">${n.w_content }</textarea>
						</td>
					</tr>
					<tr>
						<td colspan="2" id="btnInfo">
							<button id="button_update" class="button">수정 완료</button>
							<button id="button_cancel" class="button">취소</button>
						</td>
					</tr>
				</table>
			</div>
		</notfooter><br><br><br>
		<jsp:include page="/WEB-INF/views/common/footer.jsp"/>
	</section>
<jsp:include page="/WEB-INF/views/common/closer.jsp"/>
<script src="/js/notice_update.js"></script>
</html>