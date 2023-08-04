import React, {useContext} from 'react';
import {Navigate} from 'react-router-dom';

import {Context} from "../index";
import {isAdmin} from "../utils/isAdmin";
import {POSTS} from "../utils/const";

const RequiredAdminAuth = ({children}) => {

    const {user} = useContext(Context)
    let admin=user?.user.roles&&isAdmin(user.user.roles)


    if (!admin) {
        return  <Navigate to={POSTS}/>
    }
    return children
};

export {RequiredAdminAuth};


