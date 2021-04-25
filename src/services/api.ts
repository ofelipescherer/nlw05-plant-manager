import axios from 'axios'

const api = axios.create({
    baseURL: 'http://hereyourip',
})

export default api;