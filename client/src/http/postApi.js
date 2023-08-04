import {$authHost} from "./index";


export const createPost = async (title, content, userId) => {
    const {data} = await $authHost.post('posts', {title, content, userId})
    return data
}

export const getAllPosts = async (limit, page, userId,query,sort) => {
    const {data} = await $authHost.get('posts', {
        params: {
            limit,
            page,
            userId,
            query,
            sort
        },
    })
    return data
}

export const deletePost = async (userId) => {
    const {data} = await $authHost.delete(`posts/${userId}`)
    return data
}

