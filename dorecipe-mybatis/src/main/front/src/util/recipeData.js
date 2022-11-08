import axios from "axios";

const data = {
  recipe_title: "",
  recipe_savetype: 1,
  recipe_introduce: "",
  recipe_url: "",
  recipe_rpath: "",
  category_kind: "",
  category_theme: "",
  category_way: "",
  category_ing: "",
  information_person: "",
  information_time: "",
  information_level: "",
  recipe_creDate: "",
  member_id: "hirin012",
};

const blob = new Blob([JSON.stringify(data)], {
  type: "multipart/form-data",
});

const formData = new FormData();
formData.append("data", blob);
formData.append("recipe_title", data.recipe_title);
formData.append("recipe_savetype", data.recipe_savetype);
formData.append("recipe_introduce", data.recipe_introduce);
formData.append("recipe_url", data.recipe_url);
formData.append("recipe_rpath", data.recipe_rpath);
// formData.append("recipe_thumbnail", recipe_thumbnail);
formData.append("category_kind", data.category_kind);
formData.append("category_theme", data.category_theme);
formData.append("category_way", data.category_way);
formData.append("category_ing", data.category_ing);
formData.append("information_person", data.information_person);
formData.append("information_level", data.information_level);
formData.append("information_time", data.information_time);
formData.append("recipe_creDate", data.recipe_creDate);
formData.append("member_id", data.member_id);

axios({
  method: "POST",
  url: "http://localhost:9000/recipe/save",
  // url: process.env.REACT_APP_HOST + "/recipe/save",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  data: formData,
}).then((response) => {
  for (let value of formData.values()) {
    console.log(value);
  }
  console.log("성공?");
});
