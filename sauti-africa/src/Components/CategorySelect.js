import React, {useEffect, useState} from 'react'; 
import axios from 'axios';
import Select from 'react-select';

function CategorySelect(props)  {

    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios
            .get("https://build-week-africanmarketplace.herokuapp.com/api/category")
            .then(res => {
                console.log(res)
                setCategory(res.data)
            })
            .catch(err => {
                console.log(err); // There was an error creating the data and logs to console
            });
    },[])

    return (
        <div style={{ margin: "1rem 0" }}>
            <label htmlFor="item-name">Item</label>
            <Select
                id="item_name"
                getOptionLabel={category =>
                    `${category.category}`
                  }
                getOptionValue={category => 
                    `${category.loc_id}`
                }
                value={category.value}
                // isSearchable={this.location.isSearchable}
                options={category}
                // searchable ={location.country.searchable}
            />
            {!!props.error && props.touched && (
                <div style={{ color: "red", marginTop: ".5rem", float: "left"}}>
                    {props.error}
                </div>
            )}
        </div>
    )
}

export default CategorySelect;