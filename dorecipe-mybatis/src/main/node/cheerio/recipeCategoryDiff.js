import fetch from "node-fetch";
import { load } from "cheerio";
import axios from "axios";

let recipeOrderResult = [];

//방법별
let cat1 = ["", 6, 1, 7, 36, 41, 42, 8, 10, 9, 38, 67, 39, 37, 11];
// console.log("cat1.length", cat1.length); //15
//상황별
let cat2 = ["", 12, 18, 13, 19, 21, 15, 43, 17, 45, 20, 46, 44, 14, 22];
// console.log("cat2.length", cat2.length); //15

//재료별
let cat3 = ["", 70, 71, 72, 23, 28, 24, 50, 33, 47, 32, 25, 31, 48, 27, 26, 34];
// console.log("cat3.length", cat3.length); //17

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
// console.log("cat4.length", cat4.length); //18

let links = []; //카테고리별 주소
let onCategoryChangeIndex = [];
let categoryChangeLinks = [];

for (let items in cat1) {
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
            // "&fct=&order=reco&dsearch=&copyshot=&scrap=&degree=&portion=&time=&niresource="
            "&order=reco&page=1"
        );
        categoryChangeLinks.push({
          cat1: cat1[items],
          cat2: cat2[items2],
          cat3: cat3[items3],
          cat4: cat4[items4],
        });
      }
    }
  }
}

// console.log("links.length", links.length);
console.log("links", links);
console.log("categoryChangeLinks", categoryChangeLinks);
console.log(
  "categoryChangeLinks.findIndex~~~~~~~~~~~~~~~~~~~~~~~~~",
  categoryChangeLinks.findIndex(
    (element) =>
      element.cat4 == cat4[cat4.length - 1] &&
      element.cat3 == cat3[cat3.length - 1]
  )
);
// console.log("categoryChangeLinks[2]", categoryChangeLinks[2]); //categoryChangeLinks[2] { cat1: '', cat2: '', cat3: '', cat4: 56 }

const recipeLinkList = [];

// const response = await fetch(links[0]);
// for (let i = 0; i < 10; i++) {
// for (let i = 0; i < 22; i++) {
// for (let i = 0; i < 18; i++) {
//   //cat4만 선택
//   // for (let i = 18; i < ; i++) {//cat3만 선택
//   //한페이지당 레시피 40개
//   // for (let i = 0; i < links.length; i++) {
//   // for (let i = 0; i < links.length; i++) {
//   // for (let i = 0; i < links.length - 50600; i++) {
//   // for (let i = 0; i < links.length - 50600; i++) {
//   // for (let i = 0; i < 10; i++) {
//   // for (let i = 0; i < 20; i++) {
//   const response = await fetch(
//     links[i]
//     // "https://www.10000recipe.com/recipe/" + recipeLinkList[i]
//   );
//   const body = await response.text();
//   let $ = load(body);
//   // let all = $("*");
//   // const specificLink = $(".common_sp_thumb");
//   const specificLink = $(".common_sp_list_li");

//   // for (let i = 1; i < specificLink.find("a").length; i++) {
//   for (let j = 1; j <= specificLink.length; j++) {
//     recipeLinkList.push(
//       $(".common_sp_list_li:nth-child(" + j + ")")
//         .find("a")
//         .attr("href")
//     );
//     if (recipeLinkList.length % 40 == 0) {
//       //종류별 카테고리 바뀌는 시점의 링크
//       onCategoryChangeIndex.push(recipeLinkList[recipeLinkList.length - 1]);
//     }
//   }
// }

console.log("recipeLinkList", recipeLinkList);
console.log("recipeLinkList.length", recipeLinkList.length);

console.log("onCategoryChangeIndex", onCategoryChangeIndex);

for (let i = 0; i < onCategoryChangeIndex.length; i++) {
  console.log(
    "recipeLinkList[indexofCategoryChange]",
    recipeLinkList[recipeLinkList.indexOf(onCategoryChangeIndex[i])]
    // recipeLinkList.indexOf(onCategoryChangeIndex[i]) 카테고리 바뀌는 링크의 인덱스
  );
}
console.log("onCategoryChangeIndex.length", onCategoryChangeIndex.length);
// console.log("result: ", result);
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

//if connection dies => (find index of link) then change count= index
// console.log("index", recipeLinkList.indexOf("/recipe/6875940")); //426

// for (let count = 426; count < recipeLinkList.length; count++) {
for (let count = 0; count < recipeLinkList.length; count++) {
  //cat4만 선택
  // for (let count = 720; count < recipeLinkList.length; count++) {
  const response = await fetch(
    "https://www.10000recipe.com" + recipeLinkList[count]
  ).catch((e) => {
    console.log(e);
  });
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

  if (count < 40) {
    // console.log("count < 40", count);
    catResult[0]["category_way"] = "전체";
    catResult[0]["category_theme"] = "전체";
    catResult[0]["category_ing"] = "전체";
    catResult[0]["category_kind"] = "전체";
  } else if (count >= 40 && count < 80) {
    // console.log("count >= 40 && count < 80", count);
    catResult[0]["category_way"] = "전체";
    catResult[0]["category_theme"] = "전체";
    catResult[0]["category_ing"] = "전체";
    catResult[0]["category_kind"] = "밑반찬";
  } else if (count >= 80 && count < 120) {
    // console.log("count >= 40 && count < 80", count);
    catResult[0]["category_way"] = "전체";
    catResult[0]["category_theme"] = "전체";
    catResult[0]["category_ing"] = "전체";
    catResult[0]["category_kind"] = "메인반찬";
  } else if (count >= 120 && count < 160) {
    // console.log("count >= 40 && count < 80", count);
    catResult[0]["category_way"] = "전체";
    catResult[0]["category_theme"] = "전체";
    catResult[0]["category_ing"] = "전체";
    catResult[0]["category_kind"] = "국/탕";
  } else if (count >= 160 && count < 200) {
    // console.log("count >= 40 && count < 80", count);
    catResult[0]["category_way"] = "전체";
    catResult[0]["category_theme"] = "전체";
    catResult[0]["category_ing"] = "전체";
    catResult[0]["category_kind"] = "찌개";
  } else if (count >= 200 && count < 240) {
    // console.log("count >= 40 && count < 80", count);
    catResult[0]["category_way"] = "전체";
    catResult[0]["category_theme"] = "전체";
    catResult[0]["category_ing"] = "전체";
    catResult[0]["category_kind"] = "디저트";
  } else if (count >= 240 && count < 280) {
    // console.log("count >= 40 && count < 80", count);
    catResult[0]["category_way"] = "전체";
    catResult[0]["category_theme"] = "전체";
    catResult[0]["category_ing"] = "전체";
    catResult[0]["category_kind"] = "면/만두";
  } else if (count >= 280 && count < 320) {
    // console.log("count >= 40 && count < 80", count);
    catResult[0]["category_way"] = "전체";
    catResult[0]["category_theme"] = "전체";
    catResult[0]["category_ing"] = "전체";
    catResult[0]["category_kind"] = "밥/죽/떡";
  } else if (count >= 320 && count < 360) {
    // console.log("count >= 40 && count < 80", count);
    catResult[0]["category_way"] = "전체";
    catResult[0]["category_theme"] = "전체";
    catResult[0]["category_ing"] = "전체";
    catResult[0]["category_kind"] = "퓨전";
  } else if (count >= 360 && count < 400) {
    // console.log("count >= 40 && count < 80", count);
    catResult[0]["category_way"] = "전체";
    catResult[0]["category_theme"] = "전체";
    catResult[0]["category_ing"] = "전체";
    catResult[0]["category_kind"] = "김치/젓갈/장류";
  } else if (count >= 400 && count < 440) {
    // console.log("count >= 40 && count < 80", count);
    catResult[0]["category_way"] = "전체";
    catResult[0]["category_theme"] = "전체";
    catResult[0]["category_ing"] = "전체";
    catResult[0]["category_kind"] = "양념/소스/잼";
  } else if (count >= 440 && count < 480) {
    // console.log("count >= 40 && count < 80", count);
    catResult[0]["category_way"] = "전체";
    catResult[0]["category_theme"] = "전체";
    catResult[0]["category_ing"] = "전체";
    catResult[0]["category_kind"] = "양식";
  } else if (count >= 480 && count < 520) {
    // console.log("count >= 40 && count < 80", count);
    catResult[0]["category_way"] = "전체";
    catResult[0]["category_theme"] = "전체";
    catResult[0]["category_ing"] = "전체";
    catResult[0]["category_kind"] = "샐러드";
  } else if (count >= 520 && count < 560) {
    // console.log("count >= 40 && count < 80", count);
    catResult[0]["category_way"] = "전체";
    catResult[0]["category_theme"] = "전체";
    catResult[0]["category_ing"] = "전체";
    catResult[0]["category_kind"] = "스프";
  } else if (count >= 560 && count < 600) {
    // console.log("count >= 40 && count < 80", count);
    catResult[0]["category_way"] = "전체";
    catResult[0]["category_theme"] = "전체";
    catResult[0]["category_ing"] = "전체";
    catResult[0]["category_kind"] = "빵";
  } else if (count >= 600 && count < 640) {
    // console.log("count >= 40 && count < 80", count);
    catResult[0]["category_way"] = "전체";
    catResult[0]["category_theme"] = "전체";
    catResult[0]["category_ing"] = "전체";
    catResult[0]["category_kind"] = "과자";
  } else if (count >= 640 && count < 680) {
    // console.log("count >= 40 && count < 80", count);
    catResult[0]["category_way"] = "전체";
    catResult[0]["category_theme"] = "전체";
    catResult[0]["category_ing"] = "전체";
    catResult[0]["category_kind"] = "차/음료/술";
  } else if (count >= 680 && count < 720) {
    // console.log("count >= 40 && count < 80", count);
    catResult[0]["category_way"] = "전체";
    catResult[0]["category_theme"] = "전체";
    catResult[0]["category_ing"] = "전체";
    catResult[0]["category_kind"] = "기타";
  } else if (count >= 720 && count < 760) {
    // console.log("count >= 40 && count < 80", count);
    catResult[0]["category_way"] = "전체";
    catResult[0]["category_theme"] = "전체";
    catResult[0]["category_ing"] = "소고기";
    catResult[0]["category_kind"] = "전체";
  }

  if (recipeTitle.text().length > 0) {
    if (recipeTitle.text().length > 0) {
      catResult[0]["recipeTitle"] = recipeTitle.text();
      catResult[0]["recipeAuthor"] = recipeAuthor.text().replace(/\s/g, "");
      catResult[0]["recipeIntro"] = recipeIntro.text().replace(/\s\s/g, "");
      catResult[0]["recipeServing"] = recipeServing.text().replace("\n", "");
      catResult[0]["recipeTime"] = recipeTime.text().replace("\n\t", "");
      catResult[0]["recipeDifficulty"] = recipeDifficulty
        .text()
        .replace("\n", "");
      catResult[0]["recipeThumbnail"] = recipeThumbnail.find("img").attr("src");
      catResult[0]["authorProfilePic"] = authorProfilePic
        .find("img")
        .attr("src");
    }
    catResult[0]["recipeIngredients"] = [];
    catResult[0]["recipeIngredientsUnit"] = [];

    recipeIngredients.map(function (i, element) {
      const arr = [];
      arr.push(String($(element).text()));

      if (String($(element).find("a:first").text().replace(/\s/g, "")) !== "") {
        catResult[0]["recipeIngredients"].push(
          String($(element).find("a:first").text().replace(/\s/g, ""))
        );
      }
    });
    recipeIngredientsUnit.map(function (i, element) {
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
      member_id: `admin`, //로그인한 멤버 정보 들어갈 자리
    };

    // console.log("data", data);

    // axios({
    //   method: "POST",
    //   url: "http://localhost:9000/recipe/save",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   data: data,
    //   // timeout: 1000 * 60 * 30, //10분
    //   keepAlive: true,
    //   // httpAgent: { keepAlive: true },
    //   // httpAgent: true,

    //   // data: formData,
    // }).then((response) => {
    //   // for (let value of data.values()) {
    //   //   console.log(value);
    //   // }
    //   console.log(response);
    //   console.log("성공?");
    // });

    // const formData = new FormData();

    // //////////////////////////////////////조리순서

    let ingredientsData = [];
    // for (let j = 0; j < result[0].recipeIngredients.length; j++) {
    for (let j = 0; j < catResult[0].recipeIngredients.length; j++) {
      // const data = {
      ingredientsData = {
        // recipe_num: `${result[0].recipeId}`,
        // recipe_num: count - 6978099,
        // recipe_num: count - 6978099,s
        recipe_num: count + 1,
        ing_num: j + 1,
        ing_ingredient: `${catResult[0].recipeIngredients[j]}`,
        ing_amount: `${catResult[0].recipeIngredientsUnit[j]}`,
      };
      // console.log("ingredientsData", ingredientsData);
      // console.log("catResult", catResult[0].recipeIngredients);
      // console.log("catResult", catResult);
      // console.log(
      //   "ingredientsData",
      //   ingredientsData.ing_ingredient + " " + ingredientsData.ing_amount
      // );
      // console.log(
      //   "result[0].recipeIngredients.length",
      //   result[0].recipeIngredients.length
      // );

      //   // console.log(
      //   //   "catResult[0].recipeIngredients[j]",
      //   //   ingredientsData.recipe_num +
      //   //     "    " +
      //   //     catResult[0].recipeIngredients[j] +
      //   //     " " +
      //   //     catResult[0].recipeIngredientsUnit[j]
      //   // );

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

    //   axios({
    //     method: "POST",
    //     url: "http://localhost:9000/recipe/insertRecipeIngredientsCheerio",
    //     headers: { "Content-Type": "multipart/form-data" },
    //     // data: data,
    //     data: {
    //       recipe_num: count,
    //       ing_num: i + 1,
    //       ing_ingredient: catResult[0].recipeIngredients[i],
    //       ing_amount: catResult[0].recipeIngredientsUnit[i],
    //     },
    //   }).then((response) => {
    //     console.log(response.data);
    //     // console.log("recipeOrderResult", recipeOrderResult);
    //   });
    // }
    /////////////////////////////////재료///////////////////////////////////////////////////////
    // console.log("catResult,recipeIngredients", catResult[0].recipeIngredients);
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
    //   axios({
    //     method: "POST",
    //     url: "http://localhost:9000/recipe/insertRecipeIngredientsCheerio",
    //     headers: { "Content-Type": "multipart/form-data" },
    //     data: ingredientsData,
    //     // data: recipeOrderResult,
    //   }).then((response) => {
    //     console.log(response.data);
    //   });
    // }
    //////////////////////////////////////////////////////////////////////////////////////

    const steps = $(".view_step_cont");
    recipeOrderResult = [];
    for (let i = 0; i < steps.length; i++) {
      recipeOrderResult.push({
        // recipe_num: count + 1,
        recipe_num: count + 1,
        // recipe_num: count + 1,
        // steps: i + 1,
        order_num: i + 1,
        // stepDescription: $(`#stepdescr${i + 1}`)
        order_explain: $(`#stepdescr${i + 1}`)
          .text()
          .replace(/\n/g, " "),
        // stepImg: $(`#stepDiv${i + 1}`)
        order_path: $(`#stepDiv${i + 1}`)
          .find("img")
          .attr("src"),
      });
    }
    // console.log("recipeOrderResult", recipeOrderResult);
    // for (let i = 0; i < recipeOrderResult.length; i++) {
    //   // if (recipeOrderResult != null) {
    //   axios({
    //     method: "POST",
    //     url: "http://localhost:9000/recipe/insertRecipeOrderCheerio",
    //     headers: { "Content-Type": "multipart/form-data" },
    //     // data: data,
    //     data: recipeOrderResult[i],
    //   }).then((response) => {
    //     console.log(response.data);
    //     // console.log("recipeOrderResult", recipeOrderResult);
    //     recipeOrderResult = [];
    //   });
    // }
    // let ingredientsData = [];
    //   for (let j = 0; j < result[0].recipeIngredients.length; j++) {
    //     // const data = {
    //     ingredientsData = {
    //       // recipe_num: `${result[0].recipeId}`,
    //       // recipe_num: count - 6978099,
    //       // recipe_num: count - 6978099,
    //       recipe_num: count + 1,
    //       ing_num: j + 1,
    //       ing_ingredient: `${result[0].recipeIngredients[j]}`,
    //       ing_amount: `${result[0].recipeIngredientsUnit[j]}`,
    //     };
    //     console.log("ingredientsData", ingredientsData);
    //     axios({
    //       method: "POST",
    //       url: "http://localhost:9000/recipe/insertRecipeIngredientsCheerio",
    //       headers: { "Content-Type": "multipart/form-data" },
    //       data: ingredientsData,
    //       // data: recipeOrderResult,
    //     }).then((response) => {
    //       console.log(response.data);
    //     });
    //   }
    //   // }
  }

  // console.log("catResult", catResult);
  // console.log("recipeOrderResult", recipeOrderResult);
}
