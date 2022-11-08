<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<form action="/notice/update" method="post">
	
		<div>
			<label for="notice_title">제목</label>
			<input type="text" name="notice_title" value="${notice.notice_title}"/>
		</div>
		
		<div>
			<label for="notice_content">내용</label>
			<input type="text" name="notice_content" value="${notice.notice_content}"/>
		</div>
		
		<div>
			<label for="notice_num">번호</label>
			<input type="number" name="notice_num" value="${notice.notice_num}"/>
		</div>
		
		<button type="submit">수정</button>
	</form>
</body>
</html>