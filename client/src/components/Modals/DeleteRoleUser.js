import React, {useContext, useState, useRef, useEffect} from 'react';
import Modal from "react-bootstrap/Modal";
import {observer} from "mobx-react-lite";
import {Dropdown, Form, Button} from "react-bootstrap";

import {Context} from "../../index";
import { getRolesByUser, deleteRoleFromUser} from "../../http/adminApi";
import {useFetching} from "../../hooks";


const DeleteRoleUser = observer(({show, onHide}) => {


    const [userId, setUserId] = useState("")
    const [userRoles, setUserRoles] = useState([])
    const [selectRoleForDelete, setSelectRoleForDelete] = useState("")
    const [error, setError] = useState("");

    const timerRef = useRef(null);
    const {user} = useContext(Context)


    const [fetchDelete] = useFetching(
        async (userId, roleId) => {
            const response = await deleteRoleFromUser(userId, roleId)
            if (response) {
                user.setTriger()
            }
        }
    );


    const handlerGetrolesByUser =  (userId) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(async () => {
            try {
                const response = await getRolesByUser(userId)
                setSelectRoleForDelete("")
                if (response) {
                    setError("");
                    setUserRoles(response)
                }
            } catch (e) {
                setError(e.message);
                setUserRoles([])
                setSelectRoleForDelete("")
            } finally {
            }
            setSelectRoleForDelete("")
        }, 500);
    }


    useEffect(() => {
        if (userId !== "") {
            handlerGetrolesByUser(userId);
        } else {
            setUserRoles([])
            setSelectRoleForDelete("")
        }
    }, [userId]);


    const deleteRole = () => {
        fetchDelete(userId, selectRoleForDelete.id)
        setUserId("")
        setSelectRoleForDelete("")
        setUserRoles([])
        onHide()
    }

    const close = () => {
        onHide()
        setUserId("")
        setSelectRoleForDelete("")
        setUserRoles([])
    }


    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    REMOVE ROLE FROM USER
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={userId}
                        onChange={e => setUserId(e.target.value)}
                        onKeyDown={e => {
                            const isValidKey = /^\d$/.test(e.key) || e.key === "Backspace" || e.key === "Delete";
                            if (!isValidKey) {
                                e.preventDefault();
                            }
                        }}
                        className="mt-8"
                        placeholder="id user"
                        type="number"
                        min="0"
                    />
                    {userRoles.length !== 0 &&
                        <Dropdown className="mt-2 mb-2">
                            <Dropdown.Toggle>{selectRoleForDelete?.value || "Select role"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {userRoles.map(role =>
                                    <Dropdown.Item
                                        onClick={() => setSelectRoleForDelete(role)}
                                        key={role.id}

                                    >
                                        {role.value}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                    {error&&<h4 style={{color:"red"}}>{error}</h4>}
                    <hr/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={close}>Close</Button>
                <Button disabled={selectRoleForDelete === ""||!userId} variant="outline-success"
                        onClick={deleteRole}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
});

export {DeleteRoleUser};