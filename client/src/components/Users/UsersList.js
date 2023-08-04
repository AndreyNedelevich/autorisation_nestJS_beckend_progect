import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";

import {Context} from "../../index";
import {User} from "./User";



const UsersList = observer(() => {

        const {user} = useContext(Context)

        return (
            <>
                <div className="title_table">
                    <div className="table_cell">ID</div>
                    <div className="table_cell">EMAIL</div>
                    <div className="table_cell">USERS ROLE</div>
                    <div className="table_cell"> STATUS</div>
                    <div className="table_cell">DESCRIPTION BLOKED</div>
                    <div className="table_cell">DATA CREATED</div>
                    <div className="table_cell">USER POSTS</div>
                </div>
                {user.users.map((user, index) => <User key={index} user={user}/>
                )}
            </>
        )
    }
)
export {UsersList};