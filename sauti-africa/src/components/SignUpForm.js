import React , { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import axios from 'axios';
// import { Button, Label, Input, FormGroup } from 'reactstrap';



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
    width: '500px',
    marginBottom: '20px',
    fontFamily: 'Quicksand',
    border: '1px solid #000000',
    borderRadius: '4px',
    paddingLeft: '10px',
    fontSize: '1rem'
}

const labelStyle = {
    fontFamily: 'Raleway',
    color: '#000000'
}

const containerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  
}


    return (
        <div style={containerStyle} className='sign-up-container'>




            <Form style={formStyle}>


                    <h2 style={labelStyle}>YOUR INFORMATION</h2>
                    <Field style={inputStyle} type="text" name="username"  placeholder="USERNAME" />
                    <Field style={inputStyle} type="email" name="email"  placeholder="EMAIL" />
                    <Field style={inputStyle} type="password" name="password" placeholder="PASSWORD" />
            
                <button type='submit'>Submit</button>

            </Form>
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