import axios from "axios";
import { useMemo, useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

/** 등록한 완성레시피들 */
export const TemporaryRecipeState = ({
  setRecipeState,
  recipeNum,
  setIngredientState,
  setOrderState,
}) => {
  axios
    .get("http://localhost:9000/recipe/temporary/" + recipeNum)
    .then((response) => {
      setRecipeState(response.data);
    })
    .catch((e) => console.log(e));
  axios
    .get("http://localhost:9000/recipe/getIngredientList/" + recipeNum)
    .then((response) => {
      setIngredientState(response.data);
    })
    .catch((e) => console.log(e));
  axios
    .get("http://localhost:9000/recipe/temporary/getOrder/" + recipeNum)
    .then((response) => {
      setOrderState(response.data);
    })
    .catch((e) => console.log(e));
};

/** 레시피 재료 업데이트 */
export const UpdateRecipeIngredients = ({
  ingredients,
  IngredientState,
  recipeNum,
}) => {
  // e.preventDefault();
  console.log("ingredients", ingredients);
  if (ingredients[0].ing_ingredient !== "") {
    const data = ingredients;
    const blob = new Blob([JSON.stringify(data)], {
      type: "application.json",
    });
    // console.log("data", data);
    const formData = new FormData();
    formData.append("data", blob);
    //!!!!!!!!!!!!!!!!!!!!!!!!!//수정한 거 백에 보내기

    // if (IngredientState.length <= ingredients.length) {
    for (let i = 0; i < ingredients.length; i++) {
      formData.append(
        `orderVoList[${i}].recipe_num`,
        recipeNum
        // parseInt(recipeId.recipeId)
      );
      formData.append(`orderVoList[${i}].ing_num`, ingredients[i].ing_num);
      formData.append(
        `orderVoList[${i}].ing_ingredient`,
        ingredients[i].ing_ingredient
      );
      formData.append(
        `orderVoList[${i}].ing_amount`,
        ingredients[i].ing_amount
      );
    }
    axios({
      method: "POST",
      // url: process.env.REACT_APP_HOST + "/recipe/insertRecipeIngredients",
      url: "http://localhost:9000/recipe/updateRecipeIngredients",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    })
      .then((response) => {
        // console.log(response.data);
        console.log("재료 업데이트 성공!!!!!!!!!!!!");
      })
      .catch((e) => console.log(e));
    // }
    //임시저장했던 재료 수가 더 많았고
    //임시저장했던 재료를 제거하고 싶다면
    if (IngredientState.length > ingredients.length) {
      for (let i = ingredients.length; i < IngredientState.length; i++) {
        formData.append(
          `orderVoList[${i}].recipe_num`,
          recipeNum
          // parseInt(recipeId.recipeId)
        );
        formData.append(
          `orderVoList[${i}].ing_num`,
          IngredientState[i].ing_num
        );
        formData.append(`orderVoList[${i}].ing_ingredient`, "");
        formData.append(`orderVoList[${i}].ing_amount`, "");
      }
      axios({
        method: "POST",
        // url: process.env.REACT_APP_HOST + "/recipe/insertRecipeIngredients",
        url: "http://localhost:9000/recipe/updateRecipeIngredients",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      })
        .then((response) => {
          // console.log(response.data);
          console.log("재료 업데이트 성공!!!!!!!!!!!!");
        })
        .catch((e) => console.log(e));
    }
  }
};

export const TemporarySaveOrders = ({ stepState, recipeNum, orderState }) => {
  // console.log("event", typeof e);
  if (
    stepState[0].order_explain !== ""
    // &&
    // stepState[stepState.length - 1].order_explain !== ""
  ) {
    const data = stepState;
    const blob = new Blob([JSON.stringify(data)], {
      type: "application.json",
    });
    // // console.log("data", data);
    const formData = new FormData();
    formData.append("data", blob);
    // //!!!!!!!!!!!!!!!!!!!!!!!!!//수정한 거 백에 보내기
    for (let i = 0; i < stepState.length; i++) {
      formData.append(
        `orderVoList[${i}].recipe_num`,
        // parseInt(recipeId.recipeId)
        recipeNum
      );
      formData.append(`orderVoList[${i}].order_num`, stepState[i].order_num);
      formData.append(
        `orderVoList[${i}].order_explain`,
        stepState[i].order_explain
      );
      //파일이라면 (새로운 거 등록)
      if (typeof stepState[i].order_path !== "string") {
        formData.append(
          `orderVoList[${i}].order_path`,
          stepState[i].order_path.name
        );
        formData.append(`recipe_imgs_steps`, stepState[i].order_path);
      } else {
        // //원래 등록했던 이미지를 그대로 업로드하려면
        if (
          typeof stepState[i].order_path === "string" &&
          stepState[i].order_path != null &&
          stepState[i].order_path.length > 0
        ) {
          // if (stepState[i].order_path.contains("/img")) {
          // i &&

          // stepState[i].order_path ===
          //   orderState[i].order_path.slice(
          //     orderState[i].order_path.lastIndexOf("/img"),
          //     orderState[i].order_path.length
          //   ) &&
          formData.append(
            `orderVoList[${i}].order_path`,
            stepState[i].order_path
          );
          // }
        } else {
          formData.append(
            `orderVoList[${i}].order_path`,
            stepState[i].order_path
          );
        }
      }
      // axios({
      //   method: "POST",
      //   // url: process.env.REACT_APP_HOST + "/recipe/insertRecipeIngredients",
      //   url: "http://localhost:9000/recipe/updateRecipeInstructions",
      //   headers: { "Content-Type": "multipart/form-data" },
      //   data: formData,
      // })
      //   .then((response) => {
      //     console.log("순서 업데이트 성공");
      //     console.log(response.data);
      //   })
      //   .catch((e) => {
      //     console.log("순서 업데이트 실패ㅜㅜㅜㅜ");

      //     console.log(e);
      //   });
    }

    //임시저장한 순서 중에서 삭제한 순서가 있는 경우
    if (orderState.length > stepState.length) {
      for (let i = stepState.length; i < orderState.length; i++) {
        formData.append(
          `orderVoList[${i}].recipe_num`,
          orderState[i].recipe_num
        );
        formData.append(`orderVoList[${i}].order_num`, orderState[i].order_num);
      }
    }
    axios({
      method: "POST",
      // url: process.env.REACT_APP_HOST + "/recipe/insertRecipeIngredients",
      url: "http://localhost:9000/recipe/updateRecipeInstructions",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    })
      .then((response) => {
        console.log("순서 업데이트 성공");
        console.log(response.data);
      })
      .catch((e) => {
        console.log("순서 업데이트 실패ㅜㅜㅜㅜ");

        console.log(e);
      });
  }
  // else {
  //   if (stepState.length > 0 && stepState[0].order_explain === "") {
  //     alert("순서에 대한 설명을 적어주세요");
  //   }
  // }
};
