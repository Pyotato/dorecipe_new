<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
  request.setCharacterEncoding("UTF-8");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>이벤트</title>
</head>
<body>
	<table>
		<thead>
			<tr>
				<th> No. </th>
				<th> 제목 </th>
				<th> 참여 기간 </th>
				<th> 삭제 </th>
			</tr>
		</thead>
		<tbody>
			<c:forEach var="e" items="${eList}">
				<tr>
					<td>${e.event_num}</td>
					<td>
						<a href="/event/detail/${e.event_num}">
						${e.event_title}</a>
					</td>
					<td>${e.event_creDate}~${e.event_finDate}</td>
					<td>
						<a href="/event/update/${e.event_num}">수정</a>
						<a href="/event/delete/${e.event_num}">삭제</a>
					</td>
				</tr>
			</c:forEach>	
		</tbody>
	</table>
	
	<br>
	<form action="/event/insert" method="post">
		<div>
			<label for="event_title">제목</label>
			<input type="text" name="event_title">
		</div>
		<div>
			<label for="event_path">파일경로</label>
			<input type="text" name="event_path">
		</div>
		<div>
			<label for="event_content">내용</label>
			<input type="text" name="event_content">
		</div>
		<div>
			<label for="event_creDate">시작날짜</label>
			<input type="date" name="event_creDate">
		</div>
		<div>
			<label for="event_finDate">종료</label>
			<input type="date" name="event_finDate">
		</div>
		<button type="submit">등록</button>
	</form>
</body>
</html>