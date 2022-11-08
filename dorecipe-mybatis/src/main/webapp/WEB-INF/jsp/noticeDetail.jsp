<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>공지사항 상세 보기</title>
</head>
<body>
	<h1>${notice.notice_num}</h1><br>
	<h1>${notice.notice_title}</h1><br>
	<h3>${notice.notice_content}</h3>
</body>
</html>