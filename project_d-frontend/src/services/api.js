import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://project-d-18p2.onrender.com", 
});

export default API;