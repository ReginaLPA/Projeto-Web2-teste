import axios from 'axios';

const api = axios.create({
    baseURL: "process.env.PORT || 8080"
})

export default api