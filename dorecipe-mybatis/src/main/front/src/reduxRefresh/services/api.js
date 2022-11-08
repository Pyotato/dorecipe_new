import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9000/api",
  // baseURL: process.env.REACT_APP_API_URL + "/api",
  // baseURL: "http://localhost:9000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
