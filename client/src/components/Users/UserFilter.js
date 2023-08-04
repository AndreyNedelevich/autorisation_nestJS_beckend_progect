import React, {useContext} from "react";
import {observer} from "mobx-react-lite";

import "./UserFilter.css";
import {MySelect} from "../UI";
import {Input} from "../UI";
import {Context} from "../../index";



const UserFilter = observer(() => {

    const {user,filterUser} = useContext(Context)

    const handlerSearch=(e)=>{
        filterUser.setSearch(e.target.value)
        user.setPage(1)

    }


    const handlerSort=(value)=>{
        filterUser.setSelectedStatus(value)
        user.setPage(1)

    }



    return (
        <div className="users-filter">
            <div className="users-filter__control">
                <Input
                    value={filterUser.search}
                    onChange={handlerSearch}
                    placeholder="search"
                />
                <MySelect
                     value={filterUser.sort}
                     onChange={(value) => filterUser.setSort(value)}
                    defaultValue="Sort by date"
                    options={[
                        { value: "DESC", name: "Descending" },
                        { value: "ASC", name: "Ascending" },
                    ]}
                />
                <MySelect
                    value={filterUser.selectedStatus}
                    onChange={(value) => handlerSort(value)}
                    options={[
                        { value: "all", name: "All status" },
                        { value: "active", name: "Active status" },
                        { value: "blocked", name: "Blocked status" },
                    ]}
                />
                <MySelect
                    value={user.limit}
                    onChange={value => user.setLimit(value)}
                    options={[
                        {value: 10, name: '10'},
                        {value: 15, name: '15'},
                        {value: 20, name: '20'},
                        {value: -1, name: 'show all'},
                    ]}
                />
            </div>
        </div>
    );
})

export  {UserFilter};