import {$authHost, $host} from "./index";


export const registration = async (email, password) => {
    const {data} = await $host.post('auth/registration', {email, password})
    localStorage.setItem('accessTokens', data.token)
    return data.user
}

export const login = async (email, password) => {
    const {data} = await $host.post('auth/login', {email:email, password:password})
    localStorage.setItem('accessTokens', data.token)
    return data.user
}


export const getUserByToken = async () => {
        const {data} = await $authHost.get('auth/info')
        return data
}
