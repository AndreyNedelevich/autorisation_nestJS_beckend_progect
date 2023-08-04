import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";

import {createRole} from "../../http/adminApi";
import {useFetching} from "../../hooks";
import {Context} from "../../index";

const CreateRole = ({show, onHide}) => {

    const {user} = useContext(Context)

    const [value, setValue] = useState('')
    const [description, setdescription] = useState('')


    const [fetch] = useFetching(
        async (value, description) => {
            const response = await createRole(value, description)
            if (response) {
                user.setTrigerRole()
            }
        }
    );


    const addRole = () => {
        fetch(value, description)
        setValue('')
        setdescription('')
        onHide()
    }

    const close = () => {
        onHide()
        setValue('')
        setdescription('')

    }


    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create Role
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"name"}
                    />
                    <Form.Control style={{marginTop: '8px'}}
                                  value={description}
                                  onChange={e => setdescription(e.target.value)}
                                  placeholder={"description"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={close}>Close</Button>
                <Button disabled={!value || !description} variant="outline-success" onClick={addRole}>Send</Button>
            </Modal.Footer>
        </Modal>
    );
};

export {CreateRole}