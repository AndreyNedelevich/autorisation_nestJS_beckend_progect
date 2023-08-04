import axios from "axios";

const $host = axios.create({
    baseURL: '/api'
})

const $authHost = axios.create({
    baseURL: '/api'
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('accessTokens')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

$authHost.interceptors.response.use((response) => {
    return response;
}, (err) => {
    throw err.response.data;
});

$host.interceptors.response.use((response) => {
    return response;
}, (err) => {
    throw err.response.data;
});


export {
    $host,
    $authHost
}
