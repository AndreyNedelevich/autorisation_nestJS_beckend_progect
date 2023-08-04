import "./Posts.css";
import {Card} from "../UI";
import React from "react";
import {PostList} from "./PostList";
import {observer} from "mobx-react-lite";


const Posts = observer(({posts}) => {



    return (
        <div>
            <Card className="posts">
                {!posts.length&&<h2 className="post-list__fallback">Posts not found</h2>}
                <PostList posts={posts} />
            </Card>
        </div>
    );
});

export {Posts};