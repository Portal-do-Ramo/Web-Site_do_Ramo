import axios from 'axios';

//usar a a baseURL com localhost quem tiver o back configurado

const api = axios.create({
    //baseURL:'https://site-ramo-api.herokuapp.com/api',
    baseURL: process.env.API_URL,
})

export default api;