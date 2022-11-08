import fetch from "node-fetch";
import { load } from "cheerio";
import axios from "axios";
export const result = [
  {
    recipeId: "", //레시피 번호
    recipeAuthor: "",
    recipeTitle: "", //레시피 제목
    recipeIntro: "", //레시피 소개
    recipeServing: "", //레시피 인원
    recipeTime: "", //레시피 요리 시간
    recipeDifficulty: "", //레시피 난이도
    recipeIngredients: [],
    recipeIngredientsUnit: [],
    // recipeIframe: "",
  },
];

export const recipeOrderResult = [];

for (let count = 6977951; count < 6978000; count++) {
  const recipeUrl = "https://www.10000recipe.com/recipe/" + count;
  // const recipeUrl = `https://www.10000recipe.com/recipe/6834258`;

  const response = await fetch(recipeUrl);
  const body = await response.text();

  let $ = load(body);

  //   let all = $("*");
  // const menuTitle = $(".view2_summary h3");
  // const recipeAuthor = $(".user_info2_name");
  // const recipeIntro = $(".view2_summary_in");
  // const recipeServing = $(".view2_summary_info1");
  // const recipeTime = $(".view2_summary_info2");
  // const recipeDifficulty = $(".view2_summary_info3");
  // const recipeIngredients = $(".case1 li");
  // const recipeIngredientsUnit = $(".ingre_unit");
  // const recipeIframe = $("#ifrmRecipeVideo");
  const recipeTitle = $(".view2_summary h3");
  const recipeAuthor = $(".user_info2_name");
  const recipeIntro = $(".view2_summary_in");
  const recipeServing = $(".view2_summary_info1");
  const recipeTime = $(".view2_summary_info2");
  const recipeDifficulty = $(".view2_summary_info3");
  const recipeIngredients = $(".case1 li");
  const recipeIngredientsUnit = $(".ingre_unit");
  const recipeThumbnail = $(".centeredcrop");
  const authorProfilePic = $(".user_info2");

  // result[count]["recipeTitle"] = menuTitle.text();
  // result[count]["recipeAuthor"] = recipeAuthor.text();
  // result[count]["recipeIntro"] = recipeIntro.text().replace("\n", "");
  // result[count]["recipeServing"] = recipeServing.text().replace("\n", "");
  // result[count]["recipeTime"] = recipeTime.text().replace("\n\t", "");
  // result[count]["recipeDifficulty"] = recipeDifficulty.text().replace("\n", "");

  result[0]["recipeTitle"] = recipeTitle.text();
  result[0]["recipeAuthor"] = recipeAuthor.text().replace(/\s/g, "");
  result[0]["recipeIntro"] = recipeIntro.text().replace("\n", "");
  result[0]["recipeServing"] = recipeServing.text().replace("\n", "");
  result[0]["recipeTime"] = recipeTime.text().replace("\n\t", "");
  result[0]["recipeDifficulty"] = recipeDifficulty.text().replace("\n", "");
  result[0]["recipeThumbnail"] = recipeThumbnail.find("img").attr("src");
  result[0]["authorProfilePic"] = authorProfilePic.find("img").attr("src");

  // result["recipeIngredients"] = recipeIngredients.text().replace(" 구매\n'", "");
  recipeIngredients.map(function (i, element) {
    //   String($(element).find("a").text());
    const arr = [];
    arr.push(String($(element).text()));
    //   result[`recipeIngredients[${i}]`] = arr;
    result[0]["recipeIngredients"].push(
      String($(element).find("a:first").text().replace("\n", ""))
    );
  });
  recipeIngredientsUnit.map(function (i, element) {
    result[0]["recipeIngredientsUnit"].push(String($(element).text()));
  });

  console.log("result: ", result);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////레시피 재료

  const steps = $(".view_step_cont");

  for (let i = 0; i < steps.length; i++) {
    recipeOrderResult.push({
      steps: i + 1,
      stepDescription: $(`#stepdescr${i + 1}`).text(),
      stepImg: $(`#stepDiv${i + 1}`)
        .find("img")
        .attr("src"),
    });
  }

  console.log("recipeOrderResult: ", recipeOrderResult);
  //////////////////////////////////////////////////////////////////////////////////레시피 댓글

  // export const recipeCommentResult = [];
  const recipeCommentResult = [];
  const commenter = $(".info_name_f");
  // const comment = $(".reply_list_cont");
  const comment = $(".media-body");
  const commenterImg = $(".media-left a");

  for (let i = 1; i <= commenter.length; i++) {
    recipeCommentResult.push({
      commentNo: i,

      // commenter: $(`.media-heading`).find("b").text(),
      commenter: $(`.media-heading:nth-child(${i})`).find("b").text(),
      // commenter: $(`.media-heading`).find("b").text(),
      comment: $(`.reply_list_cont`).text(),
      // comment: $(
      //   `.media-body:nth-child(${i}) reply_list_cont:nth-child(${1})`
      // ).text(),
      stepcommenterImg: commenterImg.find("img").attr("src"),
    });
  }
  console.log("recipeCommentResult: ", recipeCommentResult);
  // console.log("commenter: ", $(`.media-heading b`).text());
}

const data = {
  recipe_title: `${result[0].recipeTitle}`,
  recipe_savetype: 0,
  recipe_introduce: `${result[0].recipeIntro}`,
  recipe_url: "",
  recipe_rpath: `${result[0].recipeThumbnail}`,
  category_kind: "전체",
  category_kind: "전체",
  category_theme: "전체",
  category_way: "전체",
  category_ing: "전체",
  information_person: `${result[0].recipeServing}`,
  information_time: `${result[0].recipeTime}`,
  information_level: `${result[0].recipeDifficulty}`,
  recipe_creDate: "",
  member_id: `${result[0].recipeAuthor}`, //로그인한 멤버 정보 들어갈 자리
  // member_id: `admin`, //로그인한 멤버 정보 들어갈 자리
};

// axios로 보내기
axios({
  method: "POST",
  url: "http://localhost:9000/recipe/save",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  data: data,
  // data: formData,
}).then((response) => {
  // for (let value of data.values()) {
  //   console.log(value);
  // }
  console.log(response);
  console.log("성공?");
});
