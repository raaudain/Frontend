import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Nav, NavItem, NavLink } from 'reactstrap';
import '../Styles/styles.css';

function AddItem({ errors, touched, isSubmitting }) {

    return (
        <div>
            <div className="nav">
                <p>Sauti.</p>
                <Nav>
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
            </div>
            <Form>
                <div className="container">
                    <div className="input">
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
                    </div>
                    <div className="input">
                        {touched.item_name && errors.item_name && <p>{errors.item_name}</p>}
                        <Field type="item_name" name="item_name" placeholder="name" />
                    </div>
                    <div className="input">
                        {touched.item_description && errors.item_description && <p>{errors.item_description}</p>}
                        <Field type="item_description" name="item_description" placeholder="description" />
                    </div>
                    <div className="input">
                        {touched.item_price && errors.item_price && <p>{errors.item_price}</p>}
                        <Field type="item_price" name="item_price" placeholder="price" />
                    </div>
                    <button className="submit" disabled={isSubmitting}>Submit</button>
                </div>
            </Form>
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