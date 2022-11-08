<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>노하우 상세 페이지</title>
</head>
<body>
	<h1>${knowhowVO.know_title}</h1><br>
	<p>${knowhowVO.know_creDate}</p><br>
	<h3>${knowhowVO.know_content}</h3><br>
	<h4>${knowhowVO.know_path}</h4>
</body>
</html>