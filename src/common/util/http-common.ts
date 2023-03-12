import axios from "axios";

export default axios.create({
    //https://fakestoreapi.com
    baseURL: "http://localhost:8090/api",
    headers: {
      "Content-type": "application/json"
    }
})