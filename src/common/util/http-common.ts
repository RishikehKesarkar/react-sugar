import axios from "axios";

export default axios.create({
    //https://fakestoreapi.com
    baseURL: "http://localhost:3500",
    headers: {
      "Content-type": "application/json"
    }
})