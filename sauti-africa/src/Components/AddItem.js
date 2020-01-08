import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import NextBackNavigation from './NextBackNavigation';
import '../Styles/NavigationComponentStyles';

function AddItem({ errors, touched, isSubmitting }) {

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

    const buttonStyle = {
        background: '#000000',
        borderRadius: '4px',
        color: 'white',
        fontFamily: 'Quicksand',
        fontStyle: 'normal',
        fontWeight: 'bold'
    }

    return (
        //!! UPDATED TO STYLE MATCH USERLOGIN AND SIGNUP FOR CONSISTENCY!!
        // <div>
        //     <div className="nav">
        //         <p>Sauti.</p>
        //         <Nav>
        //             <NavItem>
        //                 <NavLink href="/">Home</NavLink>
        //             </NavItem>
        //             <NavItem>
        //                 <NavLink href="/about/">About Us</NavLink>
        //             </NavItem>
        //             <NavItem>
        //                 <NavLink href="/services/">Services</NavLink>
        //             </NavItem>
        //             <NavItem>
        //                 <NavLink href="/news/">News & Updates</NavLink>
        //             </NavItem>
        //             <NavItem>
        //                 <NavLink href="/contact/">Contact</NavLink>
        //             </NavItem>
        //         </Nav>
        //     </div>


        <div className="addItem">
            <NextBackNavigation />
            <div style={containerStyle} className='addItemContainer'>
                <Form style={formStyle}>
                    {touched.l_id && errors.l_id && <p>{errors.l_id}</p>}
                    <label htmlFor="l_id">Choose a location:</label>
                    <Field name="l_id" as="select" placeholder="Select.." >
                        <option value="Kenya">Kenya</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="South Sudan">South Sudan</option>
                        <option value="Burudni">Burudni</option>
                        <option value="Democratic Republic of Congo">Democratic Republic of Congo</option>
                    </Field>
                    {touched.item_name && errors.item_name && <p style={labelStyle}>{errors.item_name}</p>}
                    <Field style={inputStyle} type="item_name" name="item_name" placeholder="NAME" />
                    {touched.item_description && errors.item_description && <p style={labelStyle}>{errors.item_description}</p>}
                    <Field style={inputStyle} type="item_description" name="item_description" placeholder="DESCRIPTION" />
                    {touched.item_price && errors.item_price && <p style={labelStyle}>{errors.item_price}</p>}
                    <Field style={inputStyle} type="item_price" name="item_price" placeholder="PRICE" />
                    <button stlye={buttonStyle} className="submit" disabled={isSubmitting}>SUBMIT</button>
                </Form>
            </div>
        </div>
    );
}

const FormikAdditemForm = withFormik({
    mapPropsToValues({ l_id, item_name, item_description, item_price, c_id }) {
        return {
            l_id: l_id || "",
            item_name: item_name || "",
            item_description: item_description || "",
            item_price: item_price || "",
            c_id: c_id || "produce"
        };
    },

    validationSchema: Yup.object().shape({
        l_id: Yup.string()
            .ensure(),
        item_name: Yup.string()

            .required("Item name is a required field"),
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