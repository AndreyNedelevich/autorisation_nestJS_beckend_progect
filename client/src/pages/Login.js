import React, {useContext} from 'react';
import {Context} from "../index";
import {NavLink, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Container, Form, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import * as Yup from "yup";
import {useFormik} from "formik";

import {POSTS, REGISTRATION_ROUTE} from "../utils/const";
import {login} from "../http/userApi";
import {useFetching} from "../hooks";
import './Pages.css'


const Login = observer(() => {

    const {user} = useContext(Context)
    const navigate = useNavigate()


    const [fetch, isLoading, error] = useFetching(
        async (email, password) => {
            const data = await login(email, password);
            if (data) {
                user.setUser(data)
                user.setIsAuth(true)
                navigate(POSTS)
            }
        }
    );


    const initialValues = {
        email: '',
        password: '',
    };


    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Invalid email address'
        ),
        password: Yup.string().required('Password is required'),
    });


    const signinForm = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, {resetForm, setSubmitting}) => {
            setSubmitting(true);
            fetch(values.email, values.password)
            resetForm({values: initialValues});
            setSubmitting(true);
        },
        validateOnChange: true,
    });


    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">Authorization form</h2>
                <Form onSubmit={signinForm.handleSubmit} className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="email..."
                        id="email"
                        name="email"
                        onChange={signinForm.handleChange}
                        value={signinForm.values.email}
                        isInvalid={signinForm.touched.email && !!signinForm.errors.email}
                    />
                    {signinForm.touched.email && signinForm.errors.email && (
                        <Form.Control.Feedback className="error_email" type="invalid">
                            {signinForm.errors.email}
                        </Form.Control.Feedback>
                    )}
                    <Form.Control
                        className="mt-3"
                        placeholder="password..."
                        type="password"
                        id="password"
                        name="password"
                        onChange={signinForm.handleChange}
                        value={signinForm.values.password}
                        isInvalid={signinForm.touched.password && !!signinForm.errors.password}
                    />
                    {signinForm.touched.password && signinForm.errors.password && (
                        <Form.Control.Feedback className="error_password" type="invalid">
                            {signinForm.errors.password}
                        </Form.Control.Feedback>
                    )}
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <div>
                            Don't have an account? <NavLink to={REGISTRATION_ROUTE}>Registration!</NavLink>
                        </div>
                        <Button
                            style={{margin:"4px 15px",width:"95%"}}
                            variant={"outline-success"}
                            type={"submit"}
                        >
                            Sign in
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export {Login};