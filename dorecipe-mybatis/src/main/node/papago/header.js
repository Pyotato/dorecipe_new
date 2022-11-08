import fetch from "node-fetch";
import { load } from "cheerio";
import axios from "axios";

// const recipeUrl = `https://www.10000recipe.com/recipe/6881099`;
const recipeUrl = `http://localhost:3000/recipes/search`;
// const recipeUrl = `http://localhost:3000/recipes/search/details/99`;
const urlResponse = await fetch(recipeUrl);
const body = await urlResponse.text();
let $ = load(body);
// export const result = [
//   {
//     recipeId: "6977981", //레시피 번호
//     recipeAuthor: "",
//     recipeTitle: "", //레시피 제목
//     recipeIntro: "", //레시피 소개
//     recipeServing: "", //레시피 인원
//     recipeTime: "", //레시피 요리 시간
//     recipeDifficulty: "", //레시피 난이도
//     recipeIngredients: [],
//     recipeIngredientsUnit: [],
//     // recipeIframe: "",
//   },
// ];
// fetch("index.html")
//   .then((result) => {
//     return result.text();
//   })
//   .then((content) => {
//     document.getElementById("ID").innerHTML = content;
//   });

axios({
  method: "GET",
  url: "http://localhost:9000",
  // headers: { "Content-Type": "multipart/form-data" },
  // data: ingredientsData,
  // data: recipeOrderResult,
})
  .then((response) => {
    // console.log(response.data);
  })
  .then(() => {
    let $ = load(body);
    const list = $("div").text();
    console.log(list);
  });
// // let all = $("*");
// const recipeTitle = $(".view2_summary h3");
// const recipeAuthor = $(".user_info2_name");
// const recipeIntro = $(".view2_summary_in");
// const recipeServing = $(".view2_summary_info1");
// const recipeTime = $(".view2_summary_info2");
// const recipeDifficulty = $(".view2_summary_info3");
// // const recipeIngredients = $(".case1 li");
// const recipeIngredients = $(".ready_ingre3 ul li ");
// // const recipeIngredients = $(".ready_ingre3 ul li a");
// const recipeIngredientsUnit = $(".ingre_unit");
// const recipeThumbnail = $(".centeredcrop");
// const authorProfilePic = $(".user_info2");
// // const list = $("#root").text();
const list = $("div").text();

// result[0]["recipeTitle"] = recipeTitle.text();
// result[0]["recipeAuthor"] = recipeAuthor.text().replace(/\s/g, "");
// result[0]["recipeIntro"] = recipeIntro.text().replace(/\s\s/g, "");
// result[0]["recipeServing"] = recipeServing.text().replace("\n", "");
// result[0]["recipeTime"] = recipeTime.text().replace("\n\t", "");
// result[0]["recipeDifficulty"] = recipeDifficulty.text().replace("\n", "");
// result[0]["recipeThumbnail"] = recipeThumbnail.find("img").attr("src");
// result[0]["authorProfilePic"] = authorProfilePic.find("img").attr("src");

// result["recipeIngredients"] = recipeIngredients.text().replace(" 구매\n'", "");
//초기화
// const response = await axios.post(
//   "https://naveropenapi.apigw.ntruss.com/web-trans/v1/translate",
//   //   'http://\'m Papago.</font><font class="papago-parent"><font class="papago-source" style="display:none;">\n</font>\n\n</font></div>%\n',
//   // `source=ko&target=en&html=<div class="totalSearch"><span>상황•테마별</span><div class="selectWrap"><button value="전체" class="sc-TRNrF bEuAxC">전체</button><button value="일상" class="sc-jIAOiI bHIvhz">일상</button><button value="초스피드" class="sc-jIAOiI bHIvhz">초스피드</button><button value="술안주" class="sc-jIAOiI bHIvhz">술안주</button><button value="다이어트" class="sc-jIAOiI bHIvhz">다이어트</button><button value="도시락" class="sc-jIAOiI bHIvhz">도시락</button><button value="영양식" class="sc-jIAOiI bHIvhz">영양식</button><button value="간식" class="sc-jIAOiI bHIvhz">간식</button><button value="야식" class="sc-jIAOiI bHIvhz">야식</button><button value="해장" class="sc-jIAOiI bHIvhz">해장</button><button value="명절" class="sc-jIAOiI bHIvhz">명절</button><button value="이유식" class="sc-jIAOiI bHIvhz">이유식</button><button value="연예인/유명인" class="sc-jIAOiI bHIvhz">연예인/유명인</button><button value="기타" class="sc-jIAOiI bHIvhz">기타</button></div></div>`,
//   `source=ko&target=en&html=<div class="recipeIntro"> 오늘은 쪽파를 조금 무쳐 보았는데한 끼에 먹을 만큼 조금씩 무쳐 먹으면한 끼 반찬으로 너무 괜찮아서 자주 만들어 먹게 될 것 같아요
//   새콤달콤하고 매콤한 맛있는 양념에 휘리릭 버무려 놓으면봄철 잃어버리기 쉬운 입맛도 찾아주고 식욕을 돋우어주는간단하지만 아주 괜찮은 간단 반찬입니다부드럽고 아작아작 씹는 식감에 젓가락을 멈출 수 없게 하는쪽파 무침 데치는 시간이 중요하지요그럼 저와 함께 데치기부터 양념까지 시작해 보실까요
//   데쳐서 양념해놓으면 다른 반찬보다 먼저 찾게 만드는#쪽파요리 요리라고 할 것도 없답니다​
//   ​​
//   ​</div>`,
//   {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       "X-NCP-APIGW-API-KEY-ID": "i1t55x92ff",
//       "X-NCP-APIGW-API-KEY": "o7ctmzdynVyJ11lpnnFJXungjcYS1C87wUf3cIME",
//     },
//   }
// );
// const response2 = await axios.post(
//   "https://naveropenapi.apigw.ntruss.com/web-trans/v1/translate",
//   //   'http://\'m Papago.</font><font class="papago-parent"><font class="papago-source" style="display:none;">\n</font>\n\n</font></div>%\n',
//   // `source=ko&target=en&html=<div class="totalSearch"><span>상황•테마별</span><div class="selectWrap"><button value="전체" class="sc-TRNrF bEuAxC">전체</button><button value="일상" class="sc-jIAOiI bHIvhz">일상</button><button value="초스피드" class="sc-jIAOiI bHIvhz">초스피드</button><button value="술안주" class="sc-jIAOiI bHIvhz">술안주</button><button value="다이어트" class="sc-jIAOiI bHIvhz">다이어트</button><button value="도시락" class="sc-jIAOiI bHIvhz">도시락</button><button value="영양식" class="sc-jIAOiI bHIvhz">영양식</button><button value="간식" class="sc-jIAOiI bHIvhz">간식</button><button value="야식" class="sc-jIAOiI bHIvhz">야식</button><button value="해장" class="sc-jIAOiI bHIvhz">해장</button><button value="명절" class="sc-jIAOiI bHIvhz">명절</button><button value="이유식" class="sc-jIAOiI bHIvhz">이유식</button><button value="연예인/유명인" class="sc-jIAOiI bHIvhz">연예인/유명인</button><button value="기타" class="sc-jIAOiI bHIvhz">기타</button></div></div>`,
//   `source=ko&target=en&html=<div class="recipeIntro"> 오늘은 쪽파를 조금 무쳐 보았는데한 끼에 먹을 만큼 조금씩 무쳐 먹으면한 끼 반찬으로 너무 괜찮아서 자주 만들어 먹게 될 것 같아요
//   새콤달콤하고 매콤한 맛있는 양념에 휘리릭 버무려 놓으면봄철 잃어버리기 쉬운 입맛도 찾아주고 식욕을 돋우어주는간단하지만 아주 괜찮은 간단 반찬입니다부드럽고 아작아작 씹는 식감에 젓가락을 멈출 수 없게 하는쪽파 무침 데치는 시간이 중요하지요그럼 저와 함께 데치기부터 양념까지 시작해 보실까요
//   데쳐서 양념해놓으면 다른 반찬보다 먼저 찾게 만드는#쪽파요리 요리라고 할 것도 없답니다​
//   ​​
//   ​</div>`,
//   {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       "X-NCP-APIGW-API-KEY-ID": "i1t55x92ff",
//       "X-NCP-APIGW-API-KEY": "o7ctmzdynVyJ11lpnnFJXungjcYS1C87wUf3cIME",
//     },
//   }
// );
// // console.log(result);
// console.log(response);
// console.log(response2);
// console.log("list", list);
