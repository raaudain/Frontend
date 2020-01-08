import React, {useEffect, useState} from 'react'; 
import axios from 'axios';
import Select from 'react-select';

const selectionLabel = {
    fontWeight: 'bold',
    display: 'block',
    textAlign: 'left'
  }

function LocationSelect(props)  {

    const [location, setLocation] = useState([]);

    useEffect(() => {
        axios
            .get("https://build-week-africanmarketplace.herokuapp.com/api/location")
            .then(res => {
                console.log(res)
                setLocation(res.data)
            })
            .catch(err => {
                console.log(err); // There was an error creating the data and logs to console
            });
    },[])

    return (
        <div style={{ margin: "1rem 0" }}>
            <label htmlFor="locations" style={selectionLabel}>MARKET LOCATION</label>
            <Select
                id="l_id"
                getOptionLabel={location =>
                    `${location.country}`
                  }
                getOptionValue={location => 
                    `${location.id}`
                }
                value={location.value}
                options={location}
            />
            {!!props.error && props.touched && (
                <div style={{ color: "red", marginTop: ".5rem", float: "left"}}>
                    {props.error}
                </div>
            )}
        </div>
    )
}

export default LocationSelect;