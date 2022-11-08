<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<c:set var="contextPath"  value="${pageContext.request.contextPath}"  />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원수정테스트</title>
</head>
<body>
		
	<form action="/member/update" method="post" enctype="multipart/form-data">

		<div>
			<label for="member_id">아이디</label>
			<input name="member_id" type="text" value="${member.member_id}">
		</div>
		<div>
			<label for="member_pwd">비밀번호</label>
			<input name="member_pwd" type="password" value="${member.member_pwd}">
		</div>
		<div>
			<label for="member_name">이름</label>
			<input name="member_name" type="text"   value="${member.member_name}">
		</div>
		<div>
			<label for="member_email">이메일</label>
			<input name="member_email" type="text"   value="${member.member_email}">
		</div>
		<div>
			<label for="member_gender">성별</label>
			<input name="member_gender" type="text"   value="${member.member_gender}">
		</div>
		<div>
			<label for="member_birth">생년월일</label>
			<input name="member_birth" type="date"  value="${member.member_birth}">
		</div>
		<div>
			<label for="member_phone">전화번호</label>
			<input name="member_phone" type="text"   value="${member.member_phone}">
		</div>
		<div>
			<label for="member_imagePath">프로필 사진</label>
			<input name="member_imagePath" type="file"   value="${member.member_imagePath}">
		</div>
	
<!-- 
		<div>
			<label for="member_joinDate">가입일</label>
			<input name="member_joinDate" type="date">
		</div>

		<div>
			<label for="member_role">역할</label>
			<input name="member_role" type="text" value="member">
		</div>
 --> 		
		<button type="submit">수정하기</button>
		
	</form>
</body>
</html>