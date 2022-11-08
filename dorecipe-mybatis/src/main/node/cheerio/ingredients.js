import fetch from "node-fetch";
import { load } from "cheerio";
import axios from "axios";
const result = [
  {
    recipeId: 0, //레시피 번호
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

let recipeOrderResult = [];

for (let count = 6978100; count < 6978200; count++) {
  // for (let count = 6907542; count < 6907543; count++) {
  // for (let count = 6907542; count < 6907550; count++) {
  // for (let count = 6907542; count < 6907546; count++) {
  // for (let count = 6907542; count < 6907549; count++) {
  const recipeUrl = "https://www.10000recipe.com/recipe/" + count;
  // const recipeUrl = `https://www.10000recipe.com/recipe/6834258`;

  const response = await fetch(recipeUrl);
  const body = await response.text();

  let $ = load(body);

  result[0].recipeId = count - 6978100 + 1;

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
  // const recipeIngredients = $(".case1 li");
  const recipeIngredients = $(".ready_ingre3 ul li ");
  // const recipeIngredients = $(".ready_ingre3 ul li a");
  const recipeIngredientsUnit = $(".ingre_unit");
  const recipeThumbnail = $(".centeredcrop");
  const authorProfilePic = $(".user_info2");

  // result[count]["recipeTitle"] = menuTitle.text();
  // result[count]["recipeAuthor"] = recipeAuthor.text();
  // result[count]["recipeIntro"] = recipeIntro.text().replace("\n", "");
  // result[count]["recipeServing"] = recipeServing.text().replace("\n", "");
  // result[count]["recipeTime"] = recipeTime.text().replace("\n\t", "");
  // result[count]["recipeDifficulty"] = recipeDifficulty.text().replace("\n", "");
  if (recipeTitle.text().length > 0) {
    result[0]["recipeTitle"] = recipeTitle.text();
    result[0]["recipeAuthor"] = recipeAuthor.text().replace(/\s/g, "");
    result[0]["recipeIntro"] = recipeIntro.text().replace(/\s\s/g, "");
    result[0]["recipeServing"] = recipeServing.text().replace("\n", "");
    result[0]["recipeTime"] = recipeTime.text().replace("\n\t", "");
    result[0]["recipeDifficulty"] = recipeDifficulty.text().replace("\n", "");
    result[0]["recipeThumbnail"] = recipeThumbnail.find("img").attr("src");
    result[0]["authorProfilePic"] = authorProfilePic.find("img").attr("src");
  }
  // result["recipeIngredients"] = recipeIngredients.text().replace(" 구매\n'", "");
  //초기화
  result[0]["recipeIngredients"] = [];
  result[0]["recipeIngredientsUnit"] = [];

  recipeIngredients.map(function (i, element) {
    //   String($(element).find("a").text());
    const arr = [];
    arr.push(String($(element).text()));
    //   result[`recipeIngredients[${i}]`] = arr;
    result[0]["recipeIngredients"].push(
      String($(element).find("a:first").text().replace(/\s/g, ""))
    );
  });
  recipeIngredientsUnit.map(function (i, element) {
    result[0]["recipeIngredientsUnit"].push(
      String($(element).text().replace(/\s/g, ""))
    );
  });

  console.log("result: ", result);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////레시피 재료

  const steps = $(".view_step_cont");
  //초기화
  recipeOrderResult = [];
  for (let i = 0; i < steps.length; i++) {
    recipeOrderResult.push({
      recipe_num: count - 6978099,
      steps: i + 1,
      stepDescription: $(`#stepdescr${i + 1}`)
        .text()
        .replace(/\n/g, " "),
      stepImg: $(`#stepDiv${i + 1}`)
        .find("img")
        .attr("src"),
    });
  }

  // console.log("recipeOrderResult: ", recipeOrderResult);
  //////////////////////////////////////////////////////////////////////////////////레시피 댓글

  // export const recipeCommentResult = [];
  let recipeCommentResult = [];
  // const commenter = $(`.media-heading`).find("b");
  // const commenter = $(`.view_reply div .reply_list:nth-child(1)`);
  // const commenter = $(
  //   ".view_reply div div:nth-child(1) .media-heading:nth-child(1) b"
  // );
  const commenter = $(`.reply_list`);
  console.log(commenter.length);
  //초기화
  recipeCommentResult = [];
  if (commenter.length > 0) {
    for (let i = 1; i <= 3; i++) {
      recipeCommentResult.push({
        commentNo: i,
        commenter: $(
          `.view_reply div .reply_list:nth-child(${i}) .media-body b`
        )
          .first()
          .text()
          .replace(/쉐프의 한마디/g, "")
          .replace(/\s/g, ""),
        comment: $(`.view_reply div .reply_list:nth-child(${i}) .media-body h4`)
          .next()
          .first()
          .text()
          .replace(/\n/g, ""),
        commenterProfileImg: $(
          `.view_reply div .reply_list:nth-child(${i}) .media-left a`
        )
          .find("img")
          .attr("src"),
        commenterReviewImg: $(`.view_reply div .reply_list:nth-child(${i})`)
          .first()
          .find($(".media-body a"))
          .find("img")
          .attr("src"),
      });
    }
    if (commenter.length > 4) {
      for (let i = 1; i <= commenter.length - 3; i++) {
        recipeCommentResult.push({
          commentNo: i + 3,
          commenter: $(
            `#moreViewReviewList .reply_list:nth-child(${i}) .media-body b`
          )
            .text()
            .replace(/쉐프의 한마디/g, "")
            .replace(/\s/g, ""),
          comment: $(
            `#moreViewReviewList .reply_list:nth-child(${i}) .media-body h4`
          )
            .next()
            .first()
            .text()
            .replace(/\n/g, ""),
          commenterProfileImg: $(
            `#moreViewReviewList .reply_list:nth-child(${i}) .media-left a`
          )
            .find("img")
            .attr("src"),
          commenterReviewImg: $(
            `#moreViewReviewList .reply_list:nth-child(${i}) .media-body a`
          )
            .find("img")
            .attr("src"),
        });
      }
    }
  }

  // console.log("recipeCommentResult: ", recipeCommentResult);
  // console.log("commenter: ", $(`.media-heading b`).text());
  // const data = {
  //   recipe_title: `${result[0].recipeTitle}`,
  //   recipe_savetype: 0,
  //   recipe_introduce: `${result[0].recipeIntro}`,
  //   recipe_url: "",
  //   recipe_rpath: `${result[0].recipeThumbnail}`,
  //   category_kind: "전체",
  //   category_kind: "전체",
  //   category_theme: "전체",
  //   category_way: "전체",
  //   category_ing: "전체",
  //   information_person: `${result[0].recipeServing}`,
  //   information_time: `${result[0].recipeTime}`,
  //   information_level: `${result[0].recipeDifficulty}`,
  //   recipe_creDate: "",
  //   member_id: "admin", //로그인한 멤버 정보 들어갈 자리
  //   // member_id: `${result[0].recipeAuthor}`, //로그인한 멤버 정보 들어갈 자리
  //   // member_id: `admin`, //로그인한 멤버 정보 들어갈 자리
  // };
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

  // const stepData = {
  //   recipe_num:count-6978100,
  //   order_num:steps[],
  //   order_explain:stepDescription,
  //   order_path:stepImg,
  // }
  // for (let i = 0; i < steps.length; i++) {
  // let data = [];
  let ingredientsData = [];
  for (let j = 0; j < result[0].recipeIngredients.length; j++) {
    // const data = {
    ingredientsData = {
      // recipe_num: `${result[0].recipeId}`,
      // recipe_num: count - 6978099,
      // recipe_num: count - 6978099,
      recipe_num: count - 6978099,
      ing_num: j + 1,
      ing_ingredient: `${result[0].recipeIngredients[j]}`,
      ing_amount: `${result[0].recipeIngredientsUnit[j]}`,
    };
    console.log("ingredientsData", ingredientsData);
    // console.log(
    //   "result[0].recipeIngredients.length",
    //   result[0].recipeIngredients.length
    // );
    axios({
      method: "POST",
      url: "http://localhost:9000/recipe/insertRecipeIngredientsCheerio",
      headers: { "Content-Type": "multipart/form-data" },
      data: ingredientsData,
      // data: recipeOrderResult,
    }).then((response) => {
      console.log(response.data);
    });
  }

  // }
  // for (let i = 0; i < steps.length; i++) {
  //   recipeOrderResult.push({
  //     recipe_num: count - 6978100,
  //     steps: i + 1,
  //     stepDescription: $(`#stepdescr${i + 1}`)
  //       .text()
  //       .replace(/\n/g, " "),
  //     stepImg: $(`#stepDiv${i + 1}`)
  //       .find("img")
  //       .attr("src"),
  //   });
  // }

  // const formData = new FormData();
  // formData.append("data", blob);
  // 레시피 배열 수 만큼 append 시켜 주기
  // for (let i = 0; i < recipeOrderResult.length; i++) {
  //   formData.append(`orderVoList[${i}].recipe_num`, count);
  //   formData.append(`orderVoList[${i}].order_num`, i + 1);
  //   formData.append(
  //     `orderVoList[${i}].order_explain`,
  //     recipeOrderResult[i].stepDescription
  //   );
  //   formData.append(`orderVoList[${i}].recipe_imgs_steps`, stepImg[i]);
  //   formData.append(
  //     `orderVoList[${i}].order_path`,
  //     recipeOrderResult[i].stepImg
  //   );
  // }
  // let orderVoList = [];

  // let recipeOrderData = [];
  // let orderVoList = [];
  // for (let i = 0; i < recipeOrderResult.length; i++) {
  //   recipeOrderData.push(
  //     // (orderVoList[i] = [
  //     {
  //       recipe_num: count,
  //       order_num: i + 1,
  //       stepDescription: recipeOrderResult[i].stepDescription,
  //       stepImg: recipeOrderResult[i].stepImg,
  //     }
  //     // ])
  //   );
  // }

  cat1; //방법별
  //방법별
  let cat1 = ["", 6, 1, 7, 36, 41, 42, 8, 10, 9, 38, 67, 39, 37, 11];
  cat2; //상황별
  let cat2 = ["", 12, 18, 13, 19, 21, 15, 43, 17, 45, 20, 46, 44, 14, 22];
  cat3; //재료별
  let cat3 = [
    "",
    70,
    71,
    72,
    23,
    28,
    24,
    50,
    33,
    47,
    32,
    25,
    31,
    48,
    27,
    26,
    34,
  ];
  cat4; //종류별
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
  // axios({
  //   method: "POST",
  //   url: "http://localhost:9000/recipe/insertRecipeOrderCheerio",
  //   headers: { "Content-Type": "multipart/form-data" },
  //   data: data,
  //   // data: recipeOrderResult,
  // }).then((response) => {
  //   console.log(response.data);
  // });
  // .catch((e) => {
  //   console.log(e);
  //   // alert("임시저장 실패.");
  // });
}
// for (let count = 6977951; count < 6978000; count++) {
//   const i = count - 6977951;
//   const data = {
//     recipe_title: `${result[0].recipeTitle}`,
//     recipe_savetype: 0,
//     recipe_introduce: `${result[0].recipeIntro}`,
//     recipe_url: "",
//     recipe_rpath: `${result[0].recipeThumbnail}`,
//     category_kind: "전체",
//     category_kind: "전체",
//     category_theme: "전체",
//     category_way: "전체",
//     category_ing: "전체",
//     information_person: `${result[0].recipeServing}`,
//     information_time: `${result[0].recipeTime}`,
//     information_level: `${result[0].recipeDifficulty}`,
//     recipe_creDate: "",
//     member_id: "admin", //로그인한 멤버 정보 들어갈 자리
//     // member_id: `${result[0].recipeAuthor}`, //로그인한 멤버 정보 들어갈 자리
//     // member_id: `admin`, //로그인한 멤버 정보 들어갈 자리
//   };
//   // console.log(data);
// }
// // axios로 보내기
// const data = {
//   recipe_title: `${result[0].recipeTitle}`,
//   recipe_savetype: 0,
//   recipe_introduce: `${result[0].recipeIntro}`,
//   recipe_url: "",
//   recipe_rpath: `${result[0].recipeThumbnail}`,
//   category_kind: "전체",
//   category_kind: "전체",
//   category_theme: "전체",
//   category_way: "전체",
//   category_ing: "전체",
//   information_person: `${result[0].recipeServing}`,
//   information_time: `${result[0].recipeTime}`,
//   information_level: `${result[0].recipeDifficulty}`,
//   recipe_creDate: "",
//   member_id: "admin", //로그인한 멤버 정보 들어갈 자리
//   // member_id: `${result[0].recipeAuthor}`, //로그인한 멤버 정보 들어갈 자리
//   // member_id: `admin`, //로그인한 멤버 정보 들어갈 자리
// };
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
// console.log("result: ", result);
