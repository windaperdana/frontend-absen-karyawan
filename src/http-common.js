import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3002/api",
  // baseURL :"https://simple-contact-crud.herokuapp.com",
  headers: {
    "Content-type": "application/json",
    'Access-Control-Allow-Origin' : '*'
  }
});