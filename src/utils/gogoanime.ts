import axios from "axios"

const api = axios.create({
  baseURL: `https://api.consumet.org/anime/gogoanime/`,
})

export default api
