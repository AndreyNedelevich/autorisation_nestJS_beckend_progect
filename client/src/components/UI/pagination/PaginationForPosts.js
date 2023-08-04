import React, {useContext} from "react";
import { getPagesArray } from "../../../utils/pages";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

import './Pagination.css'

const PaginationForPosts = observer( () => {

  const {post} = useContext(Context)
  let pagesArrays = getPagesArray(post.totalPages,post.limit);

  return (
    <div className="page__wrapper">
      {pagesArrays.map((p) => (
        <span
          onClick={() => post.setPage(p)}
          key={p}
          className={post.page === p ? "page page__current " : "page"}
        >
          {p}
        </span>
      ))}
    </div>
  );
});

export  {PaginationForPosts};
