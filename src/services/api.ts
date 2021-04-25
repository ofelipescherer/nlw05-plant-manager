import axios from 'axios'

const api = axios.create({
    baseURL: 'http://youriphere',
})

export default api;