import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.URL // the url of our server
})


export { axiosInstance }
