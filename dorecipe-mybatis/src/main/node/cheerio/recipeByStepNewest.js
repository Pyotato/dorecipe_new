import fetch from "node-fetch";
import { load } from "cheerio";
import axios from "axios";
const result = [
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
const catResult = [
  {
    recipeId: "", //레시피 번호
    recipeAuthor: "",
    recipeTitle: "", //레시피 제목
    recipeIntro: "", //레시피 소개
    category_way: "", //방법별 cat1
    category_theme: "", //상황별 cat2
    category_ing: "", //재료별 cat3
    category_kind: "", //종류별 cat4
    recipeServing: "", //레시피 인원
    recipeTime: "", //레시피 요리 시간
    recipeDifficulty: "", //레시피 난이도
    recipeIngredients: [],
    recipeIngredientsUnit: [],
    // recipeIframe: "",
  },
];
let recipeOrderResult = [];

//방법별
let cat1 = ["", 6, 1, 7, 36, 41, 42, 8, 10, 9, 38, 67, 39, 37, 11];

//상황별
let cat2 = ["", 12, 18, 13, 19, 21, 15, 43, 17, 45, 20, 46, 44, 14, 22];

//재료별
let cat3 = ["", 70, 71, 72, 23, 28, 24, 50, 33, 47, 32, 25, 31, 48, 27, 26, 34];

//종류별
let cat4 = [
  "",
  63,
  56,
  54,
  55,
  60,
  53,
  52,
  61,
  57,
  58,
  65,
  64,
  68,
  66,
  69,
  59,
  62,
];
let links = []; //카테고리별 주소
// const categoryUrl =
//   "https://www.10000recipe.com/recipe/list.html?q=&query=&cat1=" +
//   cat1 +
//   "&cat2=" +
//   cat2 +
//   "&cat3=" +
//   cat3 +
//   "&cat4=" +
//   cat4;
// +"&";
// "&order=reco&page=";
// console.log(catResult[0])
for (let items in cat1) {
  // console.log("items", cat1[items]);

  for (let items2 in cat2) {
    for (let items3 in cat3) {
      for (let items4 in cat4) {
        links.push(
          "https://www.10000recipe.com/recipe/list.html?q=&query=&cat1=" +
            cat1[items] +
            "&cat2=" +
            cat2[items2] +
            "&cat3=" +
            cat3[items3] +
            "&cat4=" +
            cat4[items4] +
            "&"
        );

        cat2[items2] == ""
          ? (catResult[0]["category_theme"] = "전체")
          : cat2[items2] == 12
          ? (catResult[0]["category_theme"] = "일상")
          : cat2[items2] == 18
          ? (catResult[0]["category_theme"] = "초스피드")
          : cat2[items2] == 13
          ? (catResult[0]["category_theme"] = "손님접대")
          : cat2[items2] == 19
          ? (catResult[0]["category_theme"] = "술안주")
          : cat2[items2] == 21
          ? (catResult[0]["category_theme"] = "다이어트")
          : cat2[items2] == 15
          ? (catResult[0]["category_theme"] = "도시락")
          : cat2[items2] == 43
          ? (catResult[0]["category_theme"] = "영양식")
          : cat2[items2] == 17
          ? (catResult[0]["category_theme"] = "간식")
          : cat2[items2] == 45
          ? (catResult[0]["category_theme"] = "야식")
          : cat2[items2] == 20
          ? (catResult[0]["category_theme"] = "푸드스타일링")
          : cat2[items2] == 46
          ? (catResult[0]["category_theme"] = "해장")
          : cat2[items2] == 44
          ? (catResult[0]["category_theme"] = "명절")
          : cat2[items2] == 14
          ? (catResult[0]["category_theme"] = "이유식")
          : cat2[items2] == 22
          ? (catResult[0]["category_theme"] = "기타")
          : console.log("해당 되는 분야가 없음");

        // items4.match("")
        cat4[items4] == ""
          ? (catResult[0]["category_kind"] = "전체")
          : cat4[items4] == 63
          ? // : items4.match(63)
            (catResult[0]["category_kind"] = "밑반찬")
          : cat4[items4] == 56
          ? // : items4.match(56)
            (catResult[0]["category_kind"] = "메인반찬")
          : cat4[items4] == 54
          ? // : items4.match(54)
            (catResult[0]["category_kind"] = "국/탕")
          : cat4[items4] == 55
          ? // : items4.match(55)
            (catResult[0]["category_kind"] = "찌개")
          : cat4[items4] == 60
          ? // : items4.match(60)
            (catResult[0]["category_kind"] = "디저트")
          : cat4[items4] == 53
          ? // : items4.match(53)
            (catResult[0]["category_kind"] = "면/만두")
          : cat4[items4] == 52
          ? // : items4.match(52)
            (catResult[0]["category_kind"] = "밥/죽/떡")
          : cat4[items4] == 61
          ? // : items4.match(61)
            (catResult[0]["category_kind"] = "퓨전")
          : cat4[items4] == 57
          ? // : items4.match(57)
            (catResult[0]["category_kind"] = "김치/젓갈/장류")
          : cat4[items4] == 58
          ? // : items4.match(58)
            (catResult[0]["category_kind"] = "양념/소스/잼")
          : cat4[items4] == 65
          ? // : items4.match(65)
            (catResult[0]["category_kind"] = "양식")
          : cat4[items4] == 64
          ? // : items4.match(64)
            (catResult[0]["category_kind"] = "샐러드")
          : cat4[items4] == 68
          ? // : items4.match(68)
            (catResult[0]["category_kind"] = "스프")
          : cat4[items4] == 66
          ? // : items4.match(66)
            (catResult[0]["category_kind"] = "빵")
          : cat4[items4] == 69
          ? // : items4.match(69)
            (catResult[0]["category_kind"] = "과자")
          : cat4[items4] == 59
          ? // : items4.match(59)
            (catResult[0]["category_kind"] = "차/음료/술")
          : cat4[items4] == 62
          ? // : items4.match(62)
            (catResult[0]["category_kind"] = "기타")
          : console.log("해당 되는 분야가 없음_ cat4", links[count]);

        cat3[items3] == ""
          ? (catResult[0]["category_ing"] = "전체")
          : cat3[items3] == 70
          ? (catResult[0]["category_ing"] = "소고기")
          : cat3[items3] == 71
          ? (catResult[0]["category_ing"] = "돼지고기")
          : cat3[items3] == 72
          ? (catResult[0]["category_ing"] = "닭고기")
          : cat3[items3] == 23
          ? (catResult[0]["category_ing"] = "육류")
          : cat3[items3] == 28
          ? (catResult[0]["category_ing"] = "채소류")
          : cat3[items3] == 24
          ? //  items3 == 24
            (catResult[0]["category_ing"] = "해물류")
          : cat3[items3] == 50
          ? //  items3 == 50
            (catResult[0]["category_ing"] = "달걀/유제품")
          : cat3[items3] == 33
          ? //   items3 == 33
            (catResult[0]["category_ing"] = "가공식품류")
          : items3.match(47)
          ? // items3 == 47
            (catResult[0]["category_ing"] = "쌀")
          : cat3[items3] == 32
          ? //  items3 == 32
            (catResult[0]["category_ing"] = "밀가루")
          : cat3[items3] == 25
          ? //  items3 == 25
            (catResult[0]["category_ing"] = "건어물류")
          : cat3[items3] == 31
          ? //   items3 == 31
            (catResult[0]["category_ing"] = "버섯류")
          : cat3[items3] == 48
          ? // items3 == 48
            (catResult[0]["category_ing"] = "과일류")
          : cat3[items3] == 27
          ? // items3 == 27
            (catResult[0]["category_ing"] = "콩/견과류")
          : // : items3.match(26)
          cat3[items3] == 26
          ? // : items3 == 26
            (catResult[0]["category_ing"] = "곡류")
          : cat3[items3] == 34
          ? //  items3.match(34)
            // : cat3[items3].match(34)
            (catResult[0]["category_ing"] = "기타")
          : console.log("해당 되는 분야가 없음 category_ing");

        cat1[items] == ""
          ? (catResult[0]["category_way"] = "전체")
          : // : cat1[items].match(6)
          cat1[items] == 6
          ? (catResult[0]["category_way"] = "볶음")
          : // : cat1[items].match(1)
          cat1[items] == 1
          ? (catResult[0]["category_way"] = "끓이기")
          : // : cat1[items].match(7)
          cat1[items] == 7
          ? (catResult[0]["category_way"] = "부침")
          : // : cat1[items].match(36)
          cat1[items] == 36
          ? (catResult[0]["category_way"] = "조림")
          : // : cat1[items].match(41)
          cat1[items] == 41
          ? (catResult[0]["category_way"] = "무침")
          : cat1[items] == 42
          ? // : cat1[items].match(42)
            (catResult[0]["category_way"] = "비빔")
          : cat1[items] == 8
          ? // : cat1[items].match(8)
            (catResult[0]["category_way"] = "찜")
          : cat1[items] == 10
          ? // : cat1[items].match(10)
            (catResult[0]["category_way"] = "절임")
          : cat1[items] == 9
          ? // : cat1[items].match(9)
            (catResult[0]["category_way"] = "튀김")
          : cat1[items] == 38
          ? // : cat1[items].match(38)
            (catResult[0]["category_way"] = "삶기")
          : cat1[items] == 67
          ? // : cat1[items].match(67)
            (catResult[0]["category_way"] = "굽기")
          : cat1[items] == 39
          ? // : cat1[items].match(39)
            (catResult[0]["category_way"] = "데치기")
          : cat1[items] == 37
          ? // : cat1[items].match(37)
            (catResult[0]["category_way"] = "회")
          : cat1[items] == 11
          ? // : cat1[items].match(11)

            (catResult[0]["category_way"] = "기타")
          : console.log("해당 되는 분야가 없음", links[count]);
        // console.log(catResult[0]);
      }
    }
  }
}
// console.log("links.length", links.length);
console.log("links", links);
console.log("links", links.length);

const recipeLinkList = [];

for (let i = 0; i < 10; i++) {
  const response = await fetch(links[i]);
  const body = await response.text();
  let $ = load(body);

  const specificLink = $(".common_sp_list_li");

  for (let i = 1; i <= specificLink.length; i++) {
    recipeLinkList.push(
      $(".common_sp_list_li:nth-child(" + i + ")")
        .find("a")
        .attr("href")
    );
  }
}
console.log("recipeLinkList", recipeLinkList);

// for (let count = 0; count < recipeLinkList.length; count++) {
for (let count = 0; count < recipeLinkList.length; count++) {
  const response = await fetch(
    "https://www.10000recipe.com" + recipeLinkList[count]
  );
  const body = await response.text();
  let $ = load(body);
  const recipeTitle = $(".view2_summary h3");
  const recipeAuthor = $(".user_info2_name");
  const recipeIntro = $(".view2_summary_in");
  const recipeServing = $(".view2_summary_info1");
  const recipeTime = $(".view2_summary_info2");
  const recipeDifficulty = $(".view2_summary_info3");
  // const recipeIngredients = $(".case1 li");
  const recipeIngredients = $(".ready_ingre3 ul li");
  const recipeIngredientsUnit = $(".ingre_unit");
  const recipeThumbnail = $(".centeredcrop");
  const authorProfilePic = $(".user_info2");

  // console.log(links[count]);
  /////////////////////////////////////////////////////    cat1//방법별
  //    category_way: "", //방법별 cat1
  // if (recipeTitle.text().length > 0) {
  //     console.log("catResult[0]~~~", catResult[0]);
  //   if (recipeTitle.text().length > 0) {
  catResult[0]["recipeTitle"] = recipeTitle.text();
  catResult[0]["recipeAuthor"] = recipeAuthor.text().replace(/\s/g, "");
  catResult[0]["recipeIntro"] = recipeIntro.text().replace(/\s\s/g, "");
  catResult[0]["recipeServing"] = recipeServing.text().replace("\n", "");
  catResult[0]["recipeTime"] = recipeTime.text().replace("\n\t", "");
  catResult[0]["recipeDifficulty"] = recipeDifficulty.text().replace("\n", "");
  catResult[0]["recipeThumbnail"] = recipeThumbnail.find("img").attr("src");
  catResult[0]["authorProfilePic"] = authorProfilePic.find("img").attr("src");
}
catResult[0]["recipeIngredients"] = [];
catResult[0]["recipeIngredientsUnit"] = [];

recipeIngredients.map(function (i, element) {
  //   String($(element).find("a").text());
  const arr = [];
  arr.push(String($(element).text()));
  //   result[`recipeIngredients[${i}]`] = arr;
  // result[0]["recipeIngredients"].push(

  if (String($(element).find("a:first").text().replace(/\s/g, "")) !== "") {
    catResult[0]["recipeIngredients"].push(
      String($(element).find("a:first").text().replace(/\s/g, ""))
    );
  }
});
recipeIngredientsUnit.map(function (i, element) {
  // result[0]["recipeIngredientsUnit"].push(
  catResult[0]["recipeIngredientsUnit"].push(
    String($(element).text().replace(/\s/g, ""))
  );
});

const data = {
  recipe_title: `${catResult[0].recipeTitle}`,
  recipe_savetype: 0,
  recipe_introduce: `${catResult[0].recipeIntro}`,
  recipe_url: "",
  recipe_rpath: `${catResult[0].recipeThumbnail}`,
  category_kind: `${catResult[0].category_kind}`,
  category_theme: `${catResult[0].category_theme}`,
  category_way: `${catResult[0].category_way}`,
  category_ing: `${catResult[0].category_ing}`,
  information_person: `${catResult[0].recipeServing}`,
  information_time: `${catResult[0].recipeTime}`,
  information_level: `${catResult[0].recipeDifficulty}`,
  recipe_creDate: "",
  // member_id: `${result[0].recipeAuthor}`, //로그인한 멤버 정보 들어갈 자리
  member_id: `tester`, //로그인한 멤버 정보 들어갈 자리
};

console.log("data", data);
// axios({
//   method: "POST",
//   url: "http://localhost:9000/recipe/save",
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
//   data: data,
//   // data: formData,
// }).then((response) => {
//   // for (let value of data.values()) {
//   //   console.log(value);
//   // }
//   console.log(response);
//   console.log("성공?");
// });

let ingredientsData = [];

for (let j = 0; j < catResult[0].recipeIngredients.length; j++) {
  ingredientsData = {
    recipe_num: count + 1,
    ing_num: j + 1,
    ing_ingredient: `${catResult[0].recipeIngredients[j]}`,
    ing_amount: `${catResult[0].recipeIngredientsUnit[j]}`,
  };

  // axios({
  //   method: "POST",
  //   url: "http://localhost:9000/recipe/insertRecipeIngredientsCheerio",
  //   headers: { "Content-Type": "multipart/form-data" },
  //   data: ingredientsData,
  //   // data: recipeOrderResult,
  // }).then((response) => {
  //   console.log(response.data);
  // });
}

// for (let i = 0; i < catResult[0].recipeIngredients.length; i++) {
//   console.log(
//     "catResult,recipeIngredientsUnit",
//     // catResult[i] +
//     count +
//       1 +
//       " " +
//       //   " " +
//       (i + 1) +
//       " " +
//       catResult[0].recipeIngredients[i] +
//       "  " +
//       catResult[0].recipeIngredientsUnit[i]
//   );

// axios({
//   method: "POST",
//   url: "http://localhost:9000/recipe/insertRecipeIngredientsCheerio",
//   headers: { "Content-Type": "multipart/form-data" },
//   // data: data,
//   data: {
//     recipe_num: count,
//     ing_num: i + 1,
//     ing_ingredient: catResult[0].recipeIngredients[i],
//     ing_amount: catResult[0].recipeIngredientsUnit[i],
//   },
// }).then((response) => {
//   // console.log(response.data);
//   console.log("recipeOrderResult", recipeOrderResult);
// });
// }

// console.log("catResult,recipeIngredients", catResult[0].recipeIngredients);
// console.log(
//   "catResult,recipeIngredientsUnit",
//   catResult[0].recipeIngredientsUnit
// );

// const steps = $(".view_step_cont");
// // recipeOrderResult = [];
// for (let i = 0; i < steps.length; i++) {
//   recipeOrderResult.push({
//     // recipe_num: count + 1,
//     recipe_num: count + 1,
//     // recipe_num: count + 1,
//     // steps: i + 1,
//     order_num: i + 1,
//     // stepDescription: $(`#stepdescr${i + 1}`)
//     order_explain: $(`#stepdescr${i + 1}`)
//       .text()
//       .replace(/\n/g, " "),
//     // stepImg: $(`#stepDiv${i + 1}`)
//     order_path: $(`#stepDiv${i + 1}`)
//       .find("img")
//       .attr("src"),
//   });
// }
// console.log("recipeOrderResult", recipeOrderResult);
for (let i = 0; i < recipeOrderResult.length; i++) {
  // if (recipeOrderResult != null) {
  // axios({
  //   method: "POST",
  //   url: "http://localhost:9000/recipe/insertRecipeOrderCheerio",
  //   headers: { "Content-Type": "multipart/form-data" },
  //   // data: data,
  //   data: recipeOrderResult[i],
  // }).then((response) => {
  //   console.log(response.data);
  //   // console.log("recipeOrderResult", recipeOrderResult);
  //   recipeOrderResult = [];
  // });
  /////////////////////////////////재료
  // console.log(
  //   "catResult,recipeIngredients",
  //   catResult[0].recipeIngredients
  // );
  // console.log(
  //   "catResult,recipeIngredientsUnit",
  //   catResult[0].recipeIngredientsUnit
  // );
  // for (let i = 0; i < catResult[0].recipeIngredients.length; i++) {
  //   let ingredientsData = {
  //     recipe_num: count + 1,
  //     ing_num: i + 1,
  //     ing_ingredient: `${catResult[0].recipeIngredients[i]}`,
  //     ing_amount: `${catResult[0].recipeIngredientsUnit[i]}`,
  //   };
  //   // axios({
  //   //   method: "POST",
  //   //   url: "http://localhost:9000/recipe/insertRecipeIngredientsCheerio",
  //   //   headers: { "Content-Type": "multipart/form-data" },
  //   //   data: ingredientsData,
  //   //   // data: recipeOrderResult,
  //   // }).then((response) => {
  //   //   console.log(response.data);
  //   // });
  // }
}
//   }
//   // console.log("catResult", catResult);
// }
