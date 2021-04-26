import axios from 'axios'

const api = axios.create({
    baseURL: 'http://yourIPhere',
})

export default api;