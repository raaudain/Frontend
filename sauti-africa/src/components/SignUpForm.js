import React , { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import axios from 'axios';
// import { Button, Label, Input, FormGroup } from 'reactstrap';
import NextBackNavigation from './NextBackNavigation';
import SignUpFormImage from '../assets/sign-up-picture.png'


const img = `url('${SignUpFormImage}')`;


const SignUpForm = () => {


useEffect(() => {
    axios  
            .get('https://build-week-africanmarketplace.herokuapp.com/api/users')
                .then(res => {
                    console.log('Get Success', res)
                })
                .catch(err => {
                    console.log(err.response);
                })

},[]);

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
    margin: '20px'
}

const imgContainer = {
    backgroundImage: img,
    height: '135px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontFamily: 'Montserrat',
fontStyle: 'normal',
fontWeight: 'normal',
fontSize: '48px',
lineHeight: '59px'
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

        <div >
            <NextBackNavigation />
            <div style={imgContainer} className='imageContainer'>
                <h2>Sauti</h2>
            </div>
            <div style={containerStyle} className='sign-up-container'>

                <Form style={formStyle}>

                        <h2 style={labelStyle}>YOUR INFORMATION</h2>
                        <Field style={inputStyle} type="text" name="username"  placeholder="USERNAME" />
                        <Field style={inputStyle} type="email" name="email"  placeholder="EMAIL" />
                        <Field style={inputStyle} type="password" name="password" placeholder="PASSWORD" />
                
                    <button style={buttonStyle} type='submit'>Sign Up</button>

                </Form>
            </div>

        </div>

    )
}

const FormikSignUpForm = withFormik({
    mapPropsToValues({username, password, email}) {
        return {
            username: '',
            password: '',
            email: ''
        };
    },
    handleSubmit(values, {setStatues, resetForm}) {
        console.group('submitting...', values);
        axios
            .post("https://build-week-africanmarketplace.herokuapp.com/api/auth/register", values)
            .then(res => {
                console.log('Post Success', res)
                resetForm();
            })
            .catch(err => {
                console.log(err.response);

            })
            
    },

})(SignUpForm);

export default FormikSignUpForm;