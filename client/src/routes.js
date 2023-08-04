import {ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, POSTS} from "./utils/const";
import {Admin,Login,AllPosts,Registration} from "./pages";


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: POSTS,
        Component: AllPosts
    },

]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
]
