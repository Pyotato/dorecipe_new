import axios from "axios";
import { useMemo } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

/** 등록한 완성레시피들 */
export const CompleteRecipeState = ({
  currentUser,
  setRecipeState,
  setRecipeLength,
  setLoadingState,
  recipeLength,
  recipeState,
}) => {
  // useEffect(() => {
  // useMemo(() => {
  const formData = new FormData();
  formData.append("member_id", currentUser);
  if (currentUser) {
    axios({
      url: "/recipe/recordingType0",
      method: "POST",
      data: formData,
      baseURL: "http://localhost:9000",
      // baseURL: process.env.REACT_APP_HOST,
    })
      .then((response) => {
        setRecipeState(response.data);
        setRecipeLength(response.data.length);
        if (response.data.length === 0) {
          setRecipeState("empty");
        }
        console.log("CompleteRecipeState", response.data);
        // setLoadingState(false);
      })
      .then(() => {
        setLoadingState(false);
      });
  }
  // }, [recipeLength, recipeState]);
};

/** 작성중인 레시피들 */
export const IncompleteRecipeState = ({
  currentUser,
  setLoadingState,
  incompleteRecipeState,
  setIncompleteRecipeState,
  incompleteRecipeLength,
  setIncompleteRecipeLength,
}) => {
  // useEffect(() => {
  // useMemo(() => {
  // useCallback(() => {
  const formData = new FormData();
  formData.append("member_id", currentUser);
  if (currentUser) {
    axios({
      url: "/recipe/recordingType1",
      method: "POST",
      data: formData,
      baseURL: "http://localhost:9000",
      // baseURL: process.env.REACT_APP_HOST,
    })
      .then((response) => {
        setIncompleteRecipeState(response.data);
        setIncompleteRecipeLength(response.data.length);
        if (response.data.length === 0) {
          setIncompleteRecipeState("empty");
        }
        console.log("setIncompleteRecipeLength", response.data.length);
        // setLoadingState(false);
      })
      .then(() => {
        setLoadingState(false);
      });
  }
  // }, [incompleteRecipeState]);
  // }, [incompleteRecipeState, incompleteRecipeLength]);
};

/** 내가 좋아하는 레시피들 */
export const MyFavouriteRecipeState = ({
  currentUser,
  setLikeState,
  likedRecipeStateLength,
  setRecipeStateLength,
}) => {
  // useEffect(() => {
  axios
    .get("http://localhost:9000/recipe/getLikedRecipes", {
      params: { param1: currentUser.toString() },
    })
    .then((res) => {
      console.log("getLikedRecipes", res.data);
      // setLikeState(res.data);
      if (res.data.length === 0) {
        setLikeState("empty");
        setRecipeStateLength(0);
      } else {
        setLikeState(res.data);
        setRecipeStateLength(res.data.length);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  // }, []);
};

/** 좋아요를 받은 내 레시피들 */
export const ReceivedLikesRecipes = ({
  currentUser,
  setReceivedLikesRecipes,
  receivedLikesRecipesLength,
  setReceivedLikesRecipesLength,
}) => {
  axios
    .get("http://localhost:9000/recipe/getMyRecipesLikes", {
      params: { param1: currentUser.toString() },
    })
    .then((res) => {
      console.log("getMyRecipesLikes", res.data);
      setReceivedLikesRecipes(res.data);
      if (res.data.length === 0) {
        setReceivedLikesRecipes("empty");
        setReceivedLikesRecipesLength(0);
      } else {
        setReceivedLikesRecipesLength(res.data.length);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
