import api from "./api.js";
import TokenService from "./tokenService.js";

class AuthService {
  async login(username, password) {
    //   login(username, password) {
    return api
      .post("/auth/signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  register(username, email, password) {
    return api.post("/auth/signup", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
