import React, {useContext} from "react";
import "./PostFilter.css";
import {MySelect} from "../UI";
import {Input} from "../UI";
import {Context} from "../../index";

const PostFilter = ({sort,setSort,search,setSearch}) => {

    const {post} = useContext(Context)



    const handlerSearch=(e)=>{
        post.setPage(1);
        setSearch(e.target.value)
    }


    const handlerSort=(value)=>{
        setSort(value)
    }



    return (
        <div className="posts-filter">
            <div className="posts-filter__control">
                <Input
                    value={search}
                    onChange={handlerSearch}
                    placeholder="search"
                />
                <MySelect
                     value={sort}
                     onChange={(value) => handlerSort(value)}
                    defaultValue="Sort by date"
                    options={[
                        { value: "DESC", name: "Descending" },
                        { value: "ASC", name: "Ascending" },
                    ]}
                />
                <MySelect
                    value={post.limit}
                    onChange={value => post.setLimit(value)}
                    options={[
                        {value: 5, name: '5'},
                        {value: 10, name: '10'},
                        {value: 15, name: '15'},
                        {value: -1, name: 'show all'},
                    ]}
                />
            </div>
        </div>
    );
}

export  {PostFilter};