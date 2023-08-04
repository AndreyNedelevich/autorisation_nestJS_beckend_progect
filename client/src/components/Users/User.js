import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";

import {UserDate} from "./UserDate";
import './User.css'
import {MyButton} from "../UI";
import {Context} from "../../index";



const User = ({user}) => {

    const {post} = useContext(Context)
    const navigate=useNavigate()






    return (
        <div className='wrapper'>
            <div className='wrapper_card'>
                <div className="title">{user.id}</div>
            </div>
            <div className='wrapper_card'>
                <div className='wrapper_email'>{user.email}</div>
            </div>
            <div className='wrapper_card'>
                <span>
                    {user.roles.map(role => `${role.value},  `)}
                </span>
            </div>
            <div className='wrapper_card'>
                <div>{user.banned ? "blocked" : "active"}</div>
            </div>
            <div className='wrapper_card'>
                <span>{user.banReason ? `${user.banReason}` : ""}</span>
            </div>
            <div className='wrapper_card'>
                <UserDate date={user.createdAt}/>
            </div>
            <div className='wrapper_card'>
                <MyButton style={{padding:"2px 3px",border:"none",width:"100%",height:"50%"}} type="button" onClick={()=>{
                    navigate(`posts/user/${user.id}`)
                    post.setPage(1)
                }}>
                    Open posts
                </MyButton>
            </div>
        </div>
    )
};

export {User};