import React from 'react';
import Select from 'react-select';

const locations = [
    { value:"Kenya", label:"Kenya" },
    { value:"Uganda", label:"Uganda" },
    { value:"Tanzania", label:"Tanzania" },
    { value:"Rwanda", label:"Rwanda" },
    { value:"South Sudan", label:"South Sudan" },
    { value:"Burudni", label:"Burudni" },
    { value:"Democratic Republic of Congo", label:"Democratic Republic of Congo" }
]


class LocationSelect extends React.Component {
    
    handleChange = value => {
        this.props.onChange("l_id", value);
    };

    handleBlur = () => {
        this.props.onBlur("l_id", true);
    };

    render() {
        return (
            <div style={{ margin: "1rem 0" }}>
                <label htmlFor="location">Market</label>
                <Select
                    id="l_id"
                    locations={locations}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    value={this.props.value}
                />
                {!!this.props.error && this.props.touched && (
                    <div style={{ color: "red", marginTop: ".5rem" }}>
                        {this.props.error}
                    </div>
                )}
            </div>
        )
    }
}
export default LocationSelect;