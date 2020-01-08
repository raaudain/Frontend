import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import NextBackNavigation from './NextBackNavigation';
import '../Styles/NavigationComponentStyles';
import ProfileImage from '../Assets/profile_image.png';
import LocationSelect from './LocationSelect';
import CategorySelect from './CategorySelect';

function AddItem({
    values,
    touched,
    errors,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    isSubmitting

}) {

    const img = `url('${ProfileImage}')`;

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
        backgroundImage: img,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '48px',
        maxWidth: '375px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        lineHeight: '59px',
        width: '175px',
        height: '175px',
        borderRadius: '100%'
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
        <div className="addItem">
            <NextBackNavigation />
            <div style={imgContainer} className='imageContainer'>
                <div style={mainImg}>
                </div>
            </div>
            <div style={containerStyle} className='addItemContainer'>
                <Form onSubmit={handleSubmit} style={formStyle} type="l_id" name="l_id">
                    <LocationSelect
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.l_id}
                        touched={touched.l_id}
                    />
                    <CategorySelect
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.l_id}
                        touched={touched.l_id}
                    />
                    {touched.item_description && errors.item_description && <p style={labelStyle}>{errors.item_description}</p>}
                    <Field style={inputStyle} type="item_description" name="item_description" placeholder="DESCRIPTION" />
                    {touched.item_price && errors.item_price && <p style={labelStyle}>{errors.item_price}</p>}
                    <Field style={inputStyle} type="item_price" name="item_price" placeholder="PRICE" />
                    <button style={buttonStyle} className="submit" disabled={isSubmitting}>SUBMIT</button>
                </Form>
            </div>
        </div>
    );
};


const FormikAdditemForm = withFormik({

    mapPropsToValues({ props }) {
        return {
            l_id: "",
            item_name: "",
            item_description: "",
            item_price: ""
        }
    },

    validationSchema: Yup.object().shape({
        l_id: Yup.string()
            .required("Market is a required field"),
        item_name: Yup.string()
            .required("Item is a required field"),
        item_description: Yup.string()
            .required("Description is a required field"),
        item_price: Yup.string()
            .required("Price is a required field")
    }),

    handleSubmit(values, { resetForm, setSubmitting }) {
        console.log(values);
        axios
            .post("https://build-week-africanl_idplace.herokuapp.com/api/users/:id/items", values)
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
})(AddItem);


export default FormikAdditemForm;