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
	<form action="/event/update" method="post">
	
		<div>
			<label for="event_title">제목</label>
			<input type="text" name="event_title" value="${eventVO.event_title}"/>
		</div>
		
		<div>
			<label for="event_content">내용</label>
			<input type="text" name="event_content" value="${eventVO.event_content}"/>
		</div>
		
		<div>
			<label for="event_path">파일경로</label>
			<input type="text" name="event_path" value="${eventVO.event_path}"/>
		</div>
		
		<div>
			<label for="event_creDate">시작날짜</label>
			<input type="date" name="event_creDate" value="${eventVO.event_creDate}"/>
		</div>
		
		<div>
			<label for="event_finDate">종료</label>
			<input type="date" name="event_finDate" value="${eventVO.event_finDate}"/>
		</div>
		
		<div>
			<label for="event_num">번호</label>
			<input type="number" name="event_num" value="${eventVO.event_num}"/>
		</div>
		
		<button type="submit">수정</button>
	</form>
</body>
</html>