import React, {useContext} from "react";
import * as Yup from "yup";
import {useFormik} from "formik";
import {observer} from "mobx-react-lite";

import "./PostForm.css";
import {MyButton} from "../UI";
import {Input} from "../UI";
import {Context} from "../../index";
import {useFetching} from "../../hooks";
import {createPost} from "../../http/postApi";




const PostForm = observer(({setShowModal}) => {

    const {post,user} = useContext(Context)


    const [fetchCreatePost] = useFetching(
        async (title,content,userId) => {
            const response = await createPost(title,content,userId);
            if(response){
                post.setTriger(!post._triger)
            }
        }
    );



    const initialValues = {
        title: '',
        content: '',
    };


    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        content: Yup.string().required('Content is required'),
    });


    const newPostForm = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values,{ resetForm,setSubmitting}) => {
            console.log(values);
            setSubmitting(true);
            const userId= user.user.id
            fetchCreatePost( values.title,values.content,userId);
            setShowModal(false);
            resetForm({ values: initialValues });
            setSubmitting(true);
        },
        validateOnChange: true,
    });




    return (
        <form onSubmit={newPostForm.handleSubmit}>
            <h2 style={{fontStyle:"italic"}}>CREATE NEW POST</h2>
            <div className="new-post__controls">
                <div className="new-post__control">
                    <Input
                        placeholder={'title'}
                        type="text"
                        id="title"
                        name="title"
                        onChange={newPostForm.handleChange}
                        value={newPostForm.values.title}
                    />
                </div>
                {newPostForm.errors.title && newPostForm.touched.title && <span className="error_title">{newPostForm.errors.title}</span>}
                <div className="new-post__control">
                    <Input
                        placeholder={'content'}
                        type="text"
                        id="content"
                        name="content"
                        onChange={newPostForm.handleChange}
                        value={newPostForm.values.content}
                    />
                    {newPostForm.errors.content && newPostForm.touched.content && <span className="error_content">{newPostForm.errors.content}</span>}
                </div>
            </div>
            <div className="new-post__actions">
                <MyButton type={"submit"}>
                    Create post
                </MyButton>
                <MyButton type="button" onClick={()=>setShowModal(false)}>
                    Close
                </MyButton>
            </div>
        </form>
    );
});

export {PostForm};