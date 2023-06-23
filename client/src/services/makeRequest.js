import axios from 'axios'

const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true
})

export function makeRequest(url, options) {
    return api(url, options)
        .then(res => {
            // console.log(JSON.stringify(res.data))
            return res.data
        })
        .catch(error => Promise.reject(error?.response?.data?.message ?? "Error"))
}