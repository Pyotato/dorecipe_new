<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>레시피</title>
</head>
<body>
<h1>운영자 추천</h1>
	<c:forEach var="rc" items="${recoList}">
	<table>
		<tr><!-- 레시피 상세페이지로 -->
			<td><a href="/recipe/detail/${rc.recipe_num}"><img src="${rc.recipe_rpath}" alt="${rc.recipe_rpath}"></a></td>
		</tr>
		<tr>
			<td>${rc.recipe_title}</td>
		</tr>
		<br>
	</table>
	</c:forEach>
</body>
</html>