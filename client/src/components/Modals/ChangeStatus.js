import React, {useContext, useState} from 'react';


import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form} from "react-bootstrap";
import {chengeStatus} from "../../http/adminApi";
import {Context} from "../../index";
import {useFetching} from "../../hooks";


const ChangeStatus = ({show, onHide}) => {

    const {user} = useContext(Context)
    const [userId, setUserId] = useState('')
    const [banReason, setBanReason] = useState('')
    const [selectedStatus,setSelectedStatus]=useState('')


    const [fetch] = useFetching(
        async (userId, banReason,status) => {
            const response = await chengeStatus(userId, banReason,status)
            if(response){
                user.setTriger()
            }
        }
    );


    const handlerBanUser = () => {
            fetch(userId, banReason,selectedStatus)
            setUserId('')
            setBanReason('')
            setSelectedStatus('')
            onHide()
    }

    const close=()=>{
        onHide()
        setUserId('')
        setBanReason('')
        setSelectedStatus('')
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    CHENGE USER STATUS
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        type="number"
                        value={userId}
                        onChange={e => setUserId(e.target.value)}
                        placeholder={"ID user"}
                        onKeyDown={e => {
                            const isValidKey = /^\d$/.test(e.key) || e.key === "Backspace" || e.key === "Delete";
                            if (!isValidKey) {
                                e.preventDefault();
                            }
                        }}
                        min="0"
                    />
                </Form>
                <Form style={{marginTop: '8px'}}>
                    <Form.Control
                        value={banReason}
                        onChange={e => setBanReason(e.target.value)}
                        placeholder={"Description"}
                    />
                </Form>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{selectedStatus || "Select status"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {[
                            { value: 'active', name: "ACTIVE" },
                            { value: "blocked", name: "BLOCKED" },
                        ].map(status =>
                            <Dropdown.Item
                                onClick={() => setSelectedStatus(status.value)}
                                key={status.value}

                            >
                                {status.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <hr/>
            </Modal.Body>
            <Modal.Footer>
                <Button  variant="outline-danger" onClick={close}>Close</Button>
                <Button disabled={selectedStatus === ""||!userId} variant="outline-success" onClick={handlerBanUser}>Send</Button>
            </Modal.Footer>
        </Modal>
    );
};

export {ChangeStatus}
