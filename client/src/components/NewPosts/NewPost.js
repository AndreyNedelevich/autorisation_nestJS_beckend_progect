import React from "react";
import {PostForm} from "./PostForm";
import "./NewPost.css";

const NewPost = ({setShowModal}) => {

    return (
        <div className="new-post">
            <PostForm setShowModal={setShowModal}/>
        </div>
    );
};
export {NewPost};