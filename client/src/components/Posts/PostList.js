import "./PostList.css";
import {PostItem} from "./PostItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";



const PostList = ({ posts }) => {




    return (
        <ul className="post-list">
            <TransitionGroup>
                {posts.map((post) => (
                    <CSSTransition key={post.id} timeout={250} classNames="post">
                        <PostItem  post={post} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
};

export  {PostList};