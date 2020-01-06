import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Button, Container, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';

function UserLogin({ errors, touched, isSubmitting }) {
    return (
        <div>
            <Nav color="#1b1411">
                <p>Sauti Africa</p>
                <NavItem>
                    <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/about/">About Us</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/services/">Services</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/news/">News & Updates</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/contact/">Contact</NavLink>
                </NavItem>
            </Nav>
            <Form>
                <div>
                    {touched.email && errors.email && <p>{errors.email}</p>}
                    <Field type="email" name="email" placeholder="Email" />
                </div>
                <div>
                    {touched.password && errors.password && <p>{errors.password}</p>}
                    <Field type="password" name="password" placeholder="Password" />
                </div>
                <a href="/forgot/"style={{ display: "block" }}>Forgot Password?</a>
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

    handleSubmit(values, {resetForm, setSubmitting }) {
        console.log(values);
        axios
        .post("https://build-week-africanmarketplace.herokuapp.com/api/auth/login", values)
        .then(res => {
          console.log(res);
          resetForm();
          setSubmitting(false);
        })
        .catch(err => {
          console.log(err); // There was an error creating the data and logs to console
          setSubmitting(false);
        });
    }
})(UserLogin);


export default FormikLoginForm;