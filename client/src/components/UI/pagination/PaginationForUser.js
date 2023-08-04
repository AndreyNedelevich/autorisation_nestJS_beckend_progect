import React, {useContext} from "react";
import { getPagesArray } from "../../../utils/pages";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

import './Pagination.css'

const PaginationForUser = observer( () => {

    const {user} = useContext(Context)
    let pagesArray = getPagesArray(user.totalUsers,user.limit);

    return (
        <div className="page__wrapper">
            {pagesArray.map((p) => (
                <span
                    onClick={() => user.setPage(p)}
                    key={p}
                    className={user.page === p ? "page page__current " : "page"}
                >
          {p}
        </span>
            ))}
        </div>
    );
});

export  {PaginationForUser};