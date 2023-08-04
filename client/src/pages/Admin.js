import React, {useContext, useEffect, useState, useRef} from 'react';
import {observer} from "mobx-react-lite";

import {Button, Container} from "react-bootstrap";
import {AddRoleUser, CreateRole, ChangeStatus, UsersList, Loader,PaginationForUser} from "../components";
import {getAllRooles, getAllUsers} from "../http/adminApi";
import {Context} from "../index";
import {useFetching} from "../hooks";
import {DeleteRoleUser} from "../components/Modals/DeleteRoleUser";
import {getPageCount} from "../utils/pages";
import {UserFilter} from "../components/Users/UserFilter";


const Admin = observer(() => {

    const {user, filterUser} = useContext(Context)

    const timerRef = useRef(null);

    const [roles, setRoles] = useState([])
    const [showModal, setShowModal] = useState({
        addRole: false,
        deleteRole: false,
        banOneUser: false,
        createRole: false,
    })



    const [fetch, isLoading] = useFetching(
        async (page, limit, query, sort, userStatus) => {
            const response = await getAllUsers(
                page,
                limit,
                query.trim() === '' ? undefined : query,
                sort === '' ? "DESC" : sort,
                userStatus=== '' ? undefined : userStatus,
            )
            if (response) {
                user.setUsers(response.users);
                user.setTotalUsers(getPageCount(response.totalCount, response.limit));
            }
        }
    );

    useEffect(() => {
        if (user.user) {
            getAllRooles().then(roles => setRoles(roles)).catch()
        }
    }, [user.trigerRole])


    useEffect(() => {
        const fetchData = () => {
            fetch(user.page, user.limit, filterUser.search, filterUser.sort, filterUser.selectedStatus);
        };
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(fetchData, 400);
        return () => clearTimeout(timerRef.current);
    }, [user.page, user.limit, filterUser.search, filterUser.sort, user.triger, filterUser.selectedStatus]);



    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setShowModal({...showModal, createRole: true})}
            >
                CREATE ROLE
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setShowModal({...showModal, addRole: true})}
            >
                ADD ROLE TO USER
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setShowModal({...showModal, deleteRole: true})}
            >
                REMOVE ROLE FROM USER
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setShowModal({...showModal, banOneUser: true})}
            >
                CHANGE USER STATUS
            </Button>

            <AddRoleUser roles={roles} show={showModal.addRole}
                         onHide={() => setShowModal({...showModal, addRole: false})}/>
            <DeleteRoleUser show={showModal.deleteRole}
                            onHide={() => setShowModal({...showModal, deleteRole: false})}/>
            <ChangeStatus roles={roles} show={showModal.banOneUser}
                          onHide={() => setShowModal({...showModal, banOneUser: false})}/>
            <CreateRole show={showModal.createRole} onHide={() => setShowModal({...showModal, createRole: false})}/>
            <h1 style={{fontStyle: "italic", margin: "25px auto"}}>ALL REGISTERED USERS</h1>
            <UserFilter/>
            {isLoading ? <Loader/> :
                <>
                    <UsersList/>
                    <PaginationForUser/>
                </>
            }
        </Container>
    );
});

export {Admin};