import axios from "axios";
const baseUrl = "http://localhost:3000"
// 创建axios实例
const service = axios.create({
  baseURL : baseUrl,
  timeout : 3000
})

export default service