import { createSlice } from "@reduxjs/toolkit";
export const recipeReducer = createSlice({
  name: "recipe",
  initialState: {
    recipeInfo: [],
    isLoading: false, //읽고 삭제
    isDone: false,
    error: null,
    createRecipeDone: false, //등록
    createRecipeLoading: false,
    editDone: false,
    editLoading: false,
    commentDone: false,
    commentLoading: false,
    resetDone: false,
    resetLoading: false,
  },
  reducers: {
    //recipe 등록
    recipeCreate: (state) => {
      state.createRecipeLoading = true;
      state.createRecipeDone = false;
      state.error = null;
    },
    recipeCreateSuccess: (state, action) => {
      state.createRecipeLoading = false;
      state.createRecipeDone = true;
      state.recipeInfo.unshift(action.payload);
    },
    recipeCreateFailure: (state, action) => {
      state.createRecipeLoading = false;
      state.createRecipeDone = true;
      state.error = action.error;
    },
    //읽기
    recipeRead: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    recipetReadSuccess: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.recipeInfo = state.recipeInfo.concat(action.payload);
    },
    recipeReadFailure: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.recipeInfo = action.error;
    },

    //수정
    recipeUpdate: (state) => {
      state.editLoading = true;
      state.editDone = false;
      state.error = null;
    },

    recipeUpdateSuccess: (state, action) => {
      state.editLoading = false;
      state.editDone = true;
      let postIndex = state.post.findIndex((v) => v.id === action.payload.id);
      state.post[postIndex] = action.payload;
    },
    recipeUpdateFailure: (state, action) => {
      state.editLoading = false;
      state.editDone = true;
      state.error = action.error;
    },
    //삭제
    recipeDel: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    recipeDelSuccess: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.recipeInfo = state.recipeInfo.filter(
        (v) => v.id !== action.payload
      );
    },
    recipeDelFailure: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = action.error;
    },
    //  reset
    resetRecipe: (state) => {
      state.resetLoading = true;
      state.resetDone = false;
    },

    resetRecipeSuccess: (state) => {
      state.resetLoading = false;
      state.resetDone = true;
      state.post = [];
      state.createRecipeLoading = false;
      state.postDone = false;
      state.error = null;
    },

    //comment
    commentCreate: (state) => {
      state.commentLoading = true;
      state.commentDone = false;
      state.error = null;
    },
    commentCreateSuccess: (state, action) => {
      state.commentLoading = false;
      state.commentDone = true;
      const post = state.recipeInfo.find(
        (v) => v.id === action.payload.recipeId
      );
      post.Comments.unshift(action.payload.data);
    },
    commentCreateFailure: (state, action) => {
      state.commentLoading = false;
      state.commentDone = true;
      state.error = action.error;
    },

    commentDel: (state) => {
      state.commentLoading = true;
      state.commentDone = false;
      state.error = null;
    },
    commentDelSuccess: (state, action) => {
      state.commentLoading = false;
      state.commentDone = true;
      const post = state.post.find((v) => v.id === action.payload.postId);
      post.Comments = post.Comments.filter(
        (v) => v.id !== action.payload.commentId
      );
    },
    commentDelFailure: (state, action) => {
      state.commentLoading = false;
      state.commentDone = true;
      state.error = action.error;
    },

    // // blog read post

    // blogPostRead: (state) => {
    //   state.isLoading = true;
    //   state.isDone = false;
    //   state.error = null;
    // },
    // blogPostReadSucces: (state, action) => {
    //   state.isLoading = false;
    //   state.isDone = true;
    //   state.post = state.post.concat(action.payload);
    // },
    // blogPostReadFailure: (state, action) => {
    //   state.isLoading = true;
    //   state.isDone = false;
    //   state.error = action.payload.error;
    // },
  },
});

export const {
  recipeCreate,
  recipeCreateSuccess,
  recipeCreateFailure,
  recipeRead,
  recipetReadSuccess,
  recipeReadFailure,
  recipeUpdate,
  recipeUpdateSuccess,
  recipeUpdateFailure,
  recipeDel,
  recipeDelSuccess,
  recipeDelFailure,
  resetRecipe,
  resetRecipeSuccess,
  commentCreate,
  commentCreateSuccess,
  commentCreateFailure,
  commentDel,
  commentDelSuccess,
  commentDelFailure,
  // blogLoadPostSucccess,
  // blogPostRead,
  // blogPostReadSucces,
  // blogPostReadFailure,
} = recipeReducer.actions;
