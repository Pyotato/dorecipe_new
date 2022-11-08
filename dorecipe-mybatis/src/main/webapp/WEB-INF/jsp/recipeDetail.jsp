<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>레시피상세</title>
</head>
<body>

	<h2>아이디 : ${recipeVO.member_id} &nbsp;&nbsp;&nbsp; 등록일자 : ${recipeVO.recipe_creDate}</h2>
	<h2>대표이미지 : <img src="${recipeVO.recipe_rpath}" alt="${recipeVO.recipe_rpath}"></h2>
	<h2>제목 : ${recipeVO.recipe_title}</h2>
	<h4>요리정보(난이도, 시간) : ${recipeVO.information_level} ${recipeVO.information_time}</h4><br>
	
	
	<h2>재료</h2>
	<hr>
	<c:forEach var="rb" items="${recipeBundle}">
		<span>
			${rb.ing_ingredient} ${rb.ing_amount}
		</span>  
		<input type="button" value="구매" onclick="location.href='https://www.coupang.com/np/search?component=&q=${rb.ing_ingredient}&channel=user'"> <br><br>
	</c:forEach>
	
	
	<h2>조리 순서 steps</h2>
	<hr>
	<c:forEach var="ro" items="${recipeOrder}">
		<span>
			<img src="${ro.order_path}" alt="${ro.order_path}"> step : ${ro.order_num}  ${ro.order_explain}
		</span><br><br>
	</c:forEach>
	
	
	<h2>코멘트 comments</h2>
	<hr>
	<c:forEach var="c" items="${comment}">
		<h2>${c.member_id} ${c.comment_creDate}</h2>
		<span>
			${c.comment_content }
		</span>
		<img src="${c.comment_path}" alt="${c.comment_path}">
	</c:forEach>
	
	
</body>
</html>