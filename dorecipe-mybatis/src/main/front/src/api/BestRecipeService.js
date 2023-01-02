import request from "./request";

export default class BestRecipeService {
  static getBestRecipesList() {
    return request({
      url: "/recipe/getBestRecipes",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
