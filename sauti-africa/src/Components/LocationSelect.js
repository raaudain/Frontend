import React, {useEffect, useState} from 'react'; 
import axios from 'axios';
import { Field } from 'formik';

const inputStyle = {

    padding: '.5rem',
    fontSize: '16px',
    display: 'block',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '.25rem',
    width: '100%',
    backgroundColor: 'white'

}

function LocationSelect(props)  {

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

    const [location, setLocation] = useState([]);

    useEffect(() => {
        axios
            .get("https://build-week-africanmarketplace.herokuapp.com/api/location")
            .then(res => {
                console.log(res)
                setLocation(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err); // There was an error creating the data and logs to console
            });
    },[])

    return (
        <div style={{ margin: "1rem 0" }}>
            <Field 
            name="l_id"
            as="select" 
            style={inputStyle}
            onClick={e => e.target.value}
            >
            {location.length > 0 ? location.map((object, index) => {
                return <option value={object.country} key={object.id}
            >{object.country}</option>
            }): null}
            {!!props.error && props.touched && (
                <div style={{ color: "red", marginTop: ".5rem", float: "left"}}>
                    {props.error}
                </div>
            )}
            </Field>
        </div>
    )
}

export default LocationSelect;