import fetch from "node-fetch";
import { load } from "cheerio";
import axios from "axios";

const recipeUrl = `https://www.10000recipe.com/recipe/6881099`;
const urlResponse = await fetch(recipeUrl);
const body = await urlResponse.text();
let $ = load(body);
export const result = [
  {
    recipeId: "6977981", //레시피 번호
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

// let all = $("*");
const recipeTitle = $(".view2_summary h3");
const recipeAuthor = $(".user_info2_name");
const recipeIntro = $(".view2_summary_in");
const recipeServing = $(".view2_summary_info1");
const recipeTime = $(".view2_summary_info2");
const recipeDifficulty = $(".view2_summary_info3");
// const recipeIngredients = $(".case1 li");
const recipeIngredients = $(".ready_ingre3 ul li ");
// const recipeIngredients = $(".ready_ingre3 ul li a");
const recipeIngredientsUnit = $(".ingre_unit");
const recipeThumbnail = $(".centeredcrop");
const authorProfilePic = $(".user_info2");

result[0]["recipeTitle"] = recipeTitle.text();
result[0]["recipeAuthor"] = recipeAuthor.text().replace(/\s/g, "");
result[0]["recipeIntro"] = recipeIntro.text().replace(/\s\s/g, "");
result[0]["recipeServing"] = recipeServing.text().replace("\n", "");
result[0]["recipeTime"] = recipeTime.text().replace("\n\t", "");
result[0]["recipeDifficulty"] = recipeDifficulty.text().replace("\n", "");
result[0]["recipeThumbnail"] = recipeThumbnail.find("img").attr("src");
result[0]["authorProfilePic"] = authorProfilePic.find("img").attr("src");

// result["recipeIngredients"] = recipeIngredients.text().replace(" 구매\n'", "");
//초기화

const response = await axios.post(
  "https://naveropenapi.apigw.ntruss.com/web-trans/v1/translate",
  //   'http://\'m Papago.</font><font class="papago-parent"><font class="papago-source" style="display:none;">\n</font>\n\n</font></div>%\n',
  `source=ko&target=en&html=${recipeTitle}`,
  {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-NCP-APIGW-API-KEY-ID": "i1t55x92ff",
      "X-NCP-APIGW-API-KEY": "o7ctmzdynVyJ11lpnnFJXungjcYS1C87wUf3cIME",
    },
  }
);
console.log(result);
console.log(response);
