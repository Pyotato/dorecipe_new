import axios from "axios";
import { useMemo } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

export const CompleteRecipeState = ({
  currentUser,
  setRecipeState,
  setRecipeLength,
  setLoadingState,
  recipeLength,
}) => {
  useEffect(() => {
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
          //   console.log(response.data.length);
          // setLoadingState(false);
        })
        .then(() => {
          setLoadingState(false);
        });
    }
  }, [recipeLength]);
};

export const IncompleteRecipeState = ({
  currentUser,
  setLoadingState,
  incompleteRecipeState,
  setIncompleteRecipeState,
  incompleteRecipeLength,
  setIncompleteRecipeLength,
}) => {
  useEffect(() => {
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
  }, [incompleteRecipeLength]);
};

export const MyFavouriteRecipeState = ({ currentUser, setLikeState }) => {
  useEffect(() => {
    axios
      .get("http://localhost:9000/recipe/getLikedRecipes", {
        params: { param1: currentUser.toString() },
      })
      .then((res) => {
        console.log("getLikedRecipes", res.data);
        setLikeState(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
};
