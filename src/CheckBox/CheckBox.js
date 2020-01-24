import React from 'react';
import './CheckBox.css';


const CheckBox = (props) => {
    return (
        <label className="cityCheckBox">
            {props.cityName}
            <input type="checkbox" onChange={() => { props.changeHandler(props.cityId) }} />
            <span className="checkmark" />
        </label>
    );
}

export default CheckBox;
