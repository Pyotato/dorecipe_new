import express from "express";
// import { result, recipeOrderResult, recipeCommentResult } from "index.js";
//app = express에 대한 반환값
const app = express();

app.set("port", 3005); // 포트 로직분리
app.use(express.json());

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 포트에서 실행중...`);
});

app.post("/recipe/create", function (req, res) {
  req.sendFile(result);
  req.sendFile(recipeOrderResult);
  req.sendFile(recipeCommentResult);
});
app.get("http://localhost:3000/recipes/search/details/99", function (req, res) {
  res.render("index", { title: "Express" });
});

app.get("/jsondata", function (req, res) {
  res.json({ msg: `Hello ${req.body.name}, your email is ${req.body.email}` });
});
app.post("/jsondata", function (req, res) {
  res.json({ msg: `Hello ${req.body.name}, your email is ${req.body.email}` });
});
