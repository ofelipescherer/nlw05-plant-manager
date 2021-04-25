import axios from 'axios'

const api = axios.create({
    baseURL: 'http://yourIpHere',
})

export default api;