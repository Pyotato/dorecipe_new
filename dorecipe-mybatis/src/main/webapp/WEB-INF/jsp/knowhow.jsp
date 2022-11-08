<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
     <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<c:set var="contextPath"  value="${pageContext.request.contextPath}"  />

<%
  request.setCharacterEncoding("UTF-8");
%> 

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>노하우목록테스트</title>
</head>
<body>
	<table>
		<thead>
			<tr>
				<th>등록번호</th>
				<th>제목</th>
				<th>내용</th>
				<th>이미지(경로)</th>
				<th>작성일</th>
				<th>수정</th>
				<th>삭제</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach var="knowhow" items="${knowhowList}">
				<tr>
					<td>${knowhow.know_num}</td>
					<td><a href="/knowhow/detail/${knowhow.know_num}">${knowhow.know_title}</a></td>
					<td>${knowhow.know_content}</td>
					<td>${knowhow.know_path}</td>
			   		<td>${knowhow.know_creDate}</td>
			   		<td>
			   			<a href="${contextPath}/knowhow/update/${knowhow.know_num}">수정</a>
			   		</td>
			   		<td>
			   			<a href="${contextPath}/knowhow/delete/${knowhow.know_num}">삭제</a>
			   		</td>
		   		</tr>
			</c:forEach>
		</tbody>
	   </table>
	   
	   <br>
	   <a href="${contextPath}/knowhow/insert">노하우 등록하기</a>
</body>
</html>