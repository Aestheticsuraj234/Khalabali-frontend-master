import axios from "axios";
// import store from "./store/configureStore";
// import { tokenSelector } from "./selectors";

const instance = axios.create({
  baseURL: "https://khalbali.wiki/api",
  baseURL:"http://localhost:5000"
});

export default instance;
