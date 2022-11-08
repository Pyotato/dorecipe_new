<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>레시피 수정 테스트</title>
</head>
<body>
	<form action="/recipe/update" method="post">
	<input type="hidden" name="recipe_num" value="${recipeVO.recipe_num}">
		<div>
			<label for="recipe_title">레시피 제목</label>
			<input type="text" name="recipe_title" value="${recipeVO.recipe_title}">
		</div>
		<div>
			<label for="recipe_introduce">레시피 소개</label>
			<input type="text" name="recipe_introduce" value="${recipeVO.recipe_introduce}">
		</div>
		<div>
			<label for="recipe_url">동영상</label>
			<input type="text" name="recipe_url" value="${recipeVO.recipe_url}">
		</div>
		<!-- 대표이미지 빼고! -->
		
		<!-- 카테고리 -->
		<div>
			<h2>카테고리<h2>
			<hr>
			<select name="category_kind">
				<option>종류별</option>
				<option value="밑반찬">밑반찬</option>
				<option value="메인반찬">메인반찬</option>
				<option value="국/탕">국/탕</option>
			</select>
			<select name="category_ing">
				<option>테마/상황별</option>
				<option value="일상">일상</option>
				<option value="초스피드">초스피드</option>
			</select>
			<select name="category_way">
				<option>방법별</option>
				<option value="볶음">볶음</option>
				<option value="끓이기">끓이기</option>
			</select>
			<select name="category_ing">
				<option>재료별</option>
				<option value="소고기">소고기</option>
				<option value="돼지고기">돼지고기</option>
			</select>
		</div>
		
		<!-- 요리정보 -->
		<div>
			<h2>요리정보<h2>
			<hr>
			<select name="information_person">
				<option>인원</option>
				<option value="1">1인분</option>
				<option value="2">2인분</option>
				<option value="3">3인분</option>
			</select>
			<select name="information_time">
				<option>시간</option>
				<option value="5">5분 이내</option>
				<option value="15">15분 이내</option>
				<option value="20">20분 이내</option>
			</select>
			<select name="information_level">
				<option>난이도</option>
				<option value="아무나">아무나</option>
				<option value="초급">초급</option>
				<option value="중급">중급</option>
			</select>
		</div>
		
		<!-- 태그 -->
		<div>
			<label for="recipe_tag">태그</label>
			<input name="recipe_tag"
			 placeholder="주재료, 효능, 대상 등을 태그로 남기시면 내 레시피를 찾기 더 쉬워져요."
			 value="${recipeVO.recipe_tag}">
		</div>
		
		<button type="submit">수정</button>
	</form>
</body>
</html>