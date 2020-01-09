import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import NextBackNavigation from './NextBackNavigation';
import SignUpFormImage from '../Assets/sun-wide.png';

function UserLogin({ errors, touched, isSubmitting }) {

    const img = `url('${SignUpFormImage}')`;

    const inputStyle = {

        marginBottom: '20px',
        fontFamily: 'Quicksand',
        border: '1px solid #000000',
        borderRadius: '4px',
        paddingLeft: '10px',
        fontSize: '1rem',
        width: '100%'
    }
    
    const labelStyle = {
        fontFamily: 'Raleway',
        color: '#000000',
        textAlign: 'left',
        padding: '20px',
        fontWeight: '600',
        fontSize: '12px',
        lineHeight: '18px'
    }
    
    const containerStyle = {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        width: '100%'
    }
    
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'center',
        // minHeight: '50vh',
        width: '100%',
        margin: '20px',
        maxWidth: '375px'
    }
    
    const imgContainer = {
        display: 'flex',
        width: '100%',
        justifyContent: 'center'
    }
    
    const mainImg = {
        height: '135px',
        backgroundImage: img,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '48px',
        // maxWidth: '375px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        lineHeight: '59px',
        width: '100%'
    }
    
    const buttonStyle = {
        background: '#000000',
        borderRadius: '4px',
        color: 'white',
        fontFamily: 'Quicksand',
        fontStyle: 'normal',
        fontWeight: 'bold'
    }
    

    return (
        // !!REPLACED MARKETING NAVIGATION TO BACK/NEXT TO MATCH STYLING OF SIGN UP!!
        
        // <div>
        //     <div className="nav">
        //     <p>Sauti.</p>
        //     <Nav>
        //         <NavItem>
        //             <NavLink href="/">Home</NavLink>
        //         </NavItem>
        //         <NavItem>
        //             <NavLink href="/about/">About Us</NavLink>
        //         </NavItem>
        //         <NavItem>
        //             <NavLink href="/services/">Services</NavLink>
        //         </NavItem>
        //         <NavItem>
        //             <NavLink href="/news/">News & Updates</NavLink>
        //         </NavItem>
        //         <NavItem>
        //             <NavLink href="/contact/">Contact</NavLink>
        //         </NavItem>
        //     </Nav>
        //     </div>
        <div className='SignUpFormPage' >
        <NextBackNavigation />
        <div style={imgContainer} className='imageContainer'>
            <div style={mainImg}>
                <h2>Login</h2>
            </div>
        </div>
        <div style={containerStyle} className='sign-up-container'>

            <Form style={formStyle}>
                    {touched.username && errors.username && <p style={labelStyle}>{errors.username}</p>}
                    <Field style={inputStyle} type="text" name="username"  placeholder="USERNAME" />
                    {touched.password && errors.password && <p style={labelStyle}>{errors.password}</p>}
                    <Field style={inputStyle} type="password" name="password" placeholder="PASSWORD" />
                <button style={buttonStyle} type='submit'>SUBMIT</button>

            </Form>
        </div>

    </div>
    );
}

const FormikLoginForm = withFormik({
    mapPropsToValues({ username, password }) {
        return {
            username: username || "",
            password: password || ""
        };
    },

    validationSchema: Yup.object().shape({
        username: Yup.string()
            .required("Username is a required field"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is a required field")
    }),

    handleSubmit(values, { resetForm, setSubmitting }) {

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