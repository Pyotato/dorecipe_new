<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>노하우 등록 페이지</title>
</head>
<body>
	
	<form action="/knowhow/insert" method="post">
		<div>
			<label for="know_title">제목</label>
			<input type="text" name="know_title">
		</div>
		<div>
			<label for="know_content">내용</label>
			<input type="text" name="know_content">
		</div>
		<div>
			<label for="know_path">이미지경로</label>
			<input type="text" name="know_path">
		</div>
		<button type="submit">등록</button>
	</form>
	
	
</body>
</html>