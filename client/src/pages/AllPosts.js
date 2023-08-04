import React, {useEffect, useContext, useState, useRef} from "react";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";

import {PostFilter, Posts} from "../components";
import {NewPost} from "../components";
import {Modal} from "../components";
import {MyButton} from "../components";
import {PaginationForPosts} from "../components";
import {getAllPosts} from "../http/postApi";
import {Loader} from "../components";
import {useFetching} from "../hooks";
import {getPageCount} from "../utils/pages";
import {Context} from "../index";
import {toast} from "react-toastify";
import {isAdmin} from "../utils/isAdmin";


const AllPosts = observer(() => {
    const {post, user} = useContext(Context)

    let showAdminMenu = user.user.roles && isAdmin(user.user.roles)

    let idFromAdmin
    if (showAdminMenu) {
        const {userId} = useParams();
        idFromAdmin = userId
    }


    if(user.user.banned){
        toast.error(`Your account blocked for  reason "${user.user.banReason}". Please contact the administration!`,
            {
                theme: "light",
                autoClose:false,
                className: 'custom-toast',
            });
        return
    }


    const [showModal, setShowModal] = useState(false)
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const timerRef = useRef(null);


    const [fetchPosts, isPostLoading] = useFetching(
        async (limit, page, id, query, sort) => {
            const response = await getAllPosts(
                limit,
                page,
                id,
                query.trim() === '' ? undefined : search,
                sort === '' ? "DESC" : sort,
            );
            if (response.page > 1 && response.posts.length === 0) {
                post.setPage(post.page - 1);
                return;
            }
            if (response) {
                post.setPosts(response.posts);
                post.setTotalPages(getPageCount(response.totalCount, response.limit));
            }
        }
    );

    useEffect(() => {

        const id = +idFromAdmin || user.user.id

        const fetchData = () => {
            fetchPosts(post.limit, post.page, id, search, sort);
        }
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(fetchData, 400);
        return () => clearTimeout(timerRef.current);
    }, [post.page, post.limit, search, sort, post.triger]);


    return (
        <div className="conteiner">
            <div className="posts">
                {!idFromAdmin &&
                <MyButton
                    style={{padding: "8px 105px ", marginTop: "20px", marginBottom: "20px"}}
                    onClick={() => setShowModal(true)}
                >
                    CREATE NEW POST
                </MyButton>}
                <PostFilter sort={sort} setSort={setSort} search={search} setSearch={setSearch}/>
            </div>
            <Modal visible={showModal} setVisible={setShowModal}>
                <NewPost setShowModal={setShowModal}/>
            </Modal>
            {isPostLoading ? <Loader/> :
                <>
                    <Posts posts={post.posts}/>
                    <PaginationForPosts/>
                </>
            }
        </div>
    );
});

export {AllPosts};

