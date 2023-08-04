import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {observer} from "mobx-react-lite";

import {Button, Dropdown, Form} from "react-bootstrap";
import {Context} from "../../index";
import {setRoleToUser} from "../../http/adminApi";
import {useFetching} from "../../hooks";


const AddRoleUser = observer(({show, onHide,roles}) => {


    const [userId, setUserId] = useState('')

    const {user} = useContext(Context)

    const [fetch] = useFetching(
        async (userId,value) => {
          const response = await setRoleToUser({userId,value})
            if (response) {
                user.setTriger()
            }
        }
    );


    const addRole = () => {
        fetch(+userId,user.selectedRole.value)
        onHide()
        setUserId("")
        user.setselectedRole("")
    }


    const close=()=>{
        onHide()
        setUserId("")
        user.setselectedRole("")
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    ADD ROLE TO USER
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={userId}
                        onChange={e => setUserId(e.target.value)}
                        className="mt-8"
                        placeholder="id user"
                        type="number"
                        min="0"
                        onKeyDown={e => {
                            const isValidKey = /^\d$/.test(e.key) || e.key === "Backspace" || e.key === "Delete";
                            if (!isValidKey) {
                                e.preventDefault();
                            }
                        }}
                    />
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle >{user.selectedRole.value || "select a role"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {roles.map(role =>
                                <Dropdown.Item
                                    onClick={() => user.setselectedRole(role)}
                                    key={role.id}

                                >
                                    {role.value}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <hr/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={close}>Close</Button>
                <Button disabled={user.selectedRole === ""||!userId} variant="outline-success" onClick={addRole}>Send</Button>
            </Modal.Footer>
        </Modal>
    );
});

export {AddRoleUser};