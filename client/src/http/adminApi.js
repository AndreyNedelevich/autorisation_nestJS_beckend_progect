import {$authHost} from "./index";


export const createRole = async (value, description) => {
    const {data} = await $authHost.post('roles', {value, description})
    return data
}

export const getAllUsers = async (page, limit, query, sort, userStatus) => {
    const {data} = await $authHost.get('users', {params: {page, limit, query, sort, userStatus}})
    return data
}

export const chengeStatus = async (userId, banReason, status) => {
    const {data} = await $authHost.post('users/ban', {userId, banReason, status})
    return data
}

export const getAllRooles = async () => {
    const {data} = await $authHost.get('roles')
    return data
}

export const setRoleToUser = async ({userId, value}) => {
    const {data} = await $authHost.post('users/role', {userId, value})
    return data
}

export const getRolesByUser = async (userId) => {
    const {data} = await $authHost.get(`users/${userId}/roles`)
    return data
}

export const deleteRoleFromUser = async (userId,roleId) => {
    const {data} = await $authHost.delete(`users/${userId}/roles/${roleId}`)
    return data
}
