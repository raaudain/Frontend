import React from 'react';
import { withFormik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import NextBackNavigation from './NextBackNavigation';
import '../Styles/NavigationComponentStyles';
import ProfileImage from '../Assets/profile_image.png';
import LocationSelect from './LocationSelect';
import CategorySelect from './CategorySelect';

function AddItem(props) {

    const {
        values,
        touched,
        errors,
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        setFieldTouched,
        isSubmitting
    } = props;

    const img = `url('${ProfileImage}')`;

    const inputStyle = {

        padding: '.5rem',
        fontSize: '16px',
        display: 'block',
        borderRadius: '4px',
        border: '1px solid #ccc',
        marginBottom: '.5rem',

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
        fontWeight: 'bold',
        border: 'none',
        padding: '.5rem'
    }

    const selectionLabel = {
        fontWeight: 'bold',
        display: 'block',
        textAlign: 'left',
        fontSize: '.75rem'
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
                <label htmlFor="locations" style={selectionLabel}>MARKET LOCATION</label>
                    <LocationSelect 
                        id="l_id"
                        type="text"
                        values={props.id}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.l_id}
                        touched={touched.l_id}
                    />
                    <label htmlFor="items" style={selectionLabel}>SELECT AN ITEM</label>
                    <CategorySelect
                        id="c_id"
                        type="text"
                        values={props.id}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.c_id}
                        touched={touched.c_id}
                    />
                    <label htmlFor="item_description" style={selectionLabel}>ITEM DESCRIPTION</label>
                    <input style={inputStyle}
                        id="item_description"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values.item_description}
                        error={errors.item_description}
                        touched={touched.item_description}
                    />
                    {touched.item_description && errors.item_description && <div style={{ color: "red", marginTop: ".5rem", textAlign: "left" }}>{errors.item_description}</div>}
                    <label htmlFor="item_price" style={selectionLabel}>PRICE</label>
                    <input style={inputStyle}
                        id="item_price"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values.item_price}
                        error={errors.item_price}
                        touched={touched.item_price}
                    />
                    {touched.item_price && errors.item_price && <div style={{ color: "red", margin: "0 .5rem", textAlign: "left" }}>{errors.item_price}</div>}
                    <button style={buttonStyle} className="submit" disabled={isSubmitting}>SUBMIT</button>
                </Form>
            </div>
        </div>
    );
};


const FormikAdditemForm = withFormik({

    mapPropsToValues: props => ({
        l_id: props.values || "",
        c_id: props.values || "",
        item_description: "",
        item_price: ""
    }),

    validationSchema: Yup.object().shape({
        l_id: Yup.string()
            .ensure()
            .required("*Market is a required field"),
        c_id: Yup.string()
            .ensure()
            .required("*Item is a required field"),
        item_description: Yup.string()
            .required("*Description is a required field"),
        item_price: Yup.string()
            .required("*Price is a required field")
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