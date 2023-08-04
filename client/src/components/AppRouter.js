import React, {useContext, useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom'

import {authRoutes, publicRoutes} from "../routes";
import {Layout} from "./Layout";
import {Context} from "../index";
import {Admin, AllPosts} from "../pages";
import {observer} from "mobx-react-lite";
import {RequiredAdminAuth} from "../hoc";
import {useFetching} from "../hooks";
import {getUserByToken} from "../http/userApi";
import {LOGIN_ROUTE} from "../utils/const";
import {Loader} from "./UI";


const AppRouter = observer(() => {


    const navigate = useNavigate()
    const {user} = useContext(Context)

    const [fetch, isLoading] = useFetching(
        async () => {
            try {
                const response = await getUserByToken()
                user.setUser(response)
                user.setIsAuth(true)
                navigate('/')
            } catch (e) {
                navigate(LOGIN_ROUTE)
            }
        }
    );

    useEffect(() => {
        const token = localStorage.getItem('accessTokens')
        if (token) {
            fetch()
        } else {
            navigate(LOGIN_ROUTE)
        }
    }, [])

    if (isLoading) {
        return <Loader/>
    }


    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                {user.isAuth && authRoutes.map((route, index) =>
                    <Route key={index} path={route.path} element={<route.Component/>} exact/>
                )}

                {publicRoutes.map((route, index) => (
                    <Route key={index} path={route.path} element={<route.Component/>} exact/>
                ))}

                <Route path={"/admin"} element={
                    <RequiredAdminAuth>
                        <Admin/>
                    </RequiredAdminAuth>
                }/>

                <Route path={"/admin/posts/user/:userId"} element={
                    <RequiredAdminAuth>
                        <AllPosts/>
                    </RequiredAdminAuth>
                }/>
                <Route path="*" element={<Layout/>}/>
            </Route>
        </Routes>
    );
});

export {AppRouter};