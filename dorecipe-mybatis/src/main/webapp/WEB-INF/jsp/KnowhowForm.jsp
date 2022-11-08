<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>노하우 수정 페이지</title>
</head>
<body>
	<form action="/knowhow/update" method="post">
		<!-- know_num 가져옴 -->
		<input type="hidden" name="know_num" value="${knowhowVO.know_num}">
		
		<div>
			<label for="know_title">제목</label>
			<input type="text" name="know_title" value="${knowhowVO.know_title}"/>
		</div>
		
		<div>
			<label for="know_content">내용</label>
			<input type="text" name="know_content" value="${knowhowVO.know_content}"/>
		</div>
		
		<div>
			<label for="know_path">파일경로</label>
			<input type="text" name="know_path" value="${knowhowVO.know_path}"/>
		</div>
		
		<button type="submit">수정</button>
	</form>
</body>
</html>