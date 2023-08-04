import "./PostItem.css"
import {PostDate} from "./PostDate";
import {MyButton, Card} from "../UI";
import {useFetching} from "../../hooks";
import {deletePost} from "../../http/postApi";
import {useContext} from "react";
import {Context} from "../../index";


const PostItem = (props) => {

    const {post} = useContext(Context)


    const [fetch] = useFetching(
        async (postId) => {
            const response = await deletePost(postId);
            if(response) post.setTriger(!post._triger)
        }
    )


    return (
        <li>
            <Card className="post-item">
                <PostDate date={props.post.createdAt}/>
                <div className="post-item__description">
                    <div className='post-item__title'>
                        {props.post.title}
                    </div>
                    <div className='post-item__content'>{props.post.content}</div>
                </div>
                <MyButton
                    onClick={() => fetch(props.post.id)}
                >
                    DELETE
                </MyButton>
            </Card>
        </li>
    );
}

export {PostItem}