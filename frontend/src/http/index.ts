import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost/api/'
})

export default http