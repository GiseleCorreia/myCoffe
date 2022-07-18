import axios from 'axios'

const api = axios.create({
  BASE_URL:
    'https://my-json-server.typicode.com/GiseleCorreia/mycoffe-api/coffe'
})

export default api
