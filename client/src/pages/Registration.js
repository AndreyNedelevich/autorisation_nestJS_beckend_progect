import React, {useContext} from 'react';
import {Context} from "../index";
import {NavLink, useNavigate} from "react-router-dom";
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {observer} from "mobx-react-lite";
import {Container, Form, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {LOGIN_ROUTE, POSTS} from "../utils/const";
import {registration} from "../http/userApi";
import {useFetching} from "../hooks";


const Registration = observer(() => {

    const {user} = useContext(Context)
    const navigate = useNavigate()


    const [fetch] = useFetching(
        async (email, password) => {

            const data = await registration(email, password);
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
        password: Yup.string()
            .required('Password is required')
            .matches(/^(?=.*[a-zA-Zа-яА-Я])(?=.*\d).{8,}/,
                'Password must contain more then 8 charcters and at least one letter and one digit!'
            ),
    });


    const formik = useFormik({
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
                <h2 className="m-auto">Registration form</h2>
                <Form onSubmit={formik.handleSubmit} className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="email..."
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        isInvalid={formik.touched.email && !!formik.errors.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <Form.Control.Feedback className="error_email" type="invalid">
                            {formik.errors.email}
                        </Form.Control.Feedback>
                    )}
                    <Form.Control
                        className="mt-3"
                        placeholder="password..."
                        type="password"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        isInvalid={formik.touched.password && !!formik.errors.password}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <Form.Control.Feedback className="error_password" type="invalid">
                            {formik.errors.password}
                        </Form.Control.Feedback>
                    )}
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <div>
                            Do have an account? <NavLink to={LOGIN_ROUTE}>Sign in!</NavLink>
                        </div>
                        <Button
                            style={{margin:"4px 15px",width:"95%"}}
                            variant={"outline-success"}
                            type={"submit"}
                        >
                            Sign up
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export {Registration};