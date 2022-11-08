<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>로그인 테스트</title>
</head>
<body>
<form action="/login" method="post">

	<input
		id="member_id"
		name="member_id"
		class="idInput"
		required
		type="text"
		placeholder="아이디"
	/>
	<input
		id="member_pwd"
		name="member_pwd"
		class="pwdInput"
		required
		type="password"
		placeholder="비밀번호"
	/>
	<button type="submit" name="loginBtn">
		로그인
	</button>
</form>
</body>
<!-- 
<script>
function memberLogin() {
	if(${member_id} != NULL){
		
	}
	});
}
</script>
 -->
</html>