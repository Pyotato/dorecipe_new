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
<h1>Recipes</h1>

	<table>
		<thread>
			<tr>
				<th>레시피 번호</th>
				<th>레시피 제목</th>
				<th>레시피 대표이미지</th>
				<th>레시피 난이도</th>
				<th>수정</th>
				<th>삭제</th>
			</tr>
		</thread>
		<tbody>
			<c:forEach var="r" items="${recipeList}">
				<tr>
					<td>${r.recipe_num}</td>
					<td><a href="/recipe/detail/${r.recipe_num}">${r.recipe_title}</td>
					<td><a href="/recipe/detail/${r.recipe_num}">${r.recipe_rpath}</a></td>
					<td>${r.information_level}</td>
					<td><a href="/recipe/update/${r.recipe_num}">수정</a></td>
					<td><a href="/recipe/delete/${r.recipe_num}">삭제</a></td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
	<br><br>
	<a href="/recipe/insert">레시피 등록</a>
</body>
</html>