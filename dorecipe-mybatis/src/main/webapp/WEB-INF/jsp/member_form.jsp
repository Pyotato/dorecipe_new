<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원입력테스트</title>
</head>
<body>
	<form action="${contextPath}/member/join" method="post">
		<div>
			<label for="member_id">아이디</label>
			<input name="member_id" type="text">
		</div>
		<div>
			<label for="member_pwd">비밀번호</label>
			<input name="member_pwd" type="password">
		</div>
		<div>
			<label for="member_name">이름</label>
			<input name="member_name" type="text">
		</div>
		<div>
			<label for="member_email">이메일</label>
			<input name="member_email" type="text">
		</div>
		<div>
			<label for="member_gender">성별</label>
			<input name="member_gender" type="text">
		</div>
		<div>
			<label for="member_birth">생년월일</label>
			<input name="member_birth" type="date">
		</div>
		<div>
			<label for="member_phone">전화번호</label>
			<input name="member_phone" type="text">
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
		<button type="submit">회원가입</button>
		
	</form>
</body>
</html>