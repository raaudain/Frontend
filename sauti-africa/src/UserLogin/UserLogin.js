import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Button, Container, Row, Col, Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';

function UserLogin({ errors, touched, isSubmitting }) {
    return (
        <div>
            <Navbar color="#1b1411" light expand="md">
                <NavbarBrand href="/">Sauti Africa</NavbarBrand>
            </Navbar>
            <Form>
                <div>
                    {touched.email && errors.email && <p>{errors.email}</p>}
                    <Field type="email" name="email" placeholder="Email" />
                </div>
                <div>
                    {touched.password && errors.password && <p>{errors.password}</p>}
                    <Field type="password" name="password" placeholder="Password" />
                </div>
                <a style={{ display: "block" }}>Forgot Password?</a>
                <Button disabled={isSubmitting}>Sign In</Button>
            </Form>
        </div>
        
    );
}

const FormikLoginForm = withFormik({
    mapPropsToValues({ email, password }) {
        return {
            email: email || "",
            password: password || ""
        };
    },

    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email("Invalid E-mail")
            .required("E-mail is a required field"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is a required field")
    }),

    handleSubmit(values) {
        console.log(values);
        //need to add functionality to the handle submit
        //https://build-week-africanmarketplace.herokuapp.com
        ///api/auth/login
    }
})(UserLogin);


export default FormikLoginForm;