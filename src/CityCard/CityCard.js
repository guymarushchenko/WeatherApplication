import React from 'react';
import './CityCard.css';



const CityCard = (props) => {
    return (
        <span className="cityCard">
            <p>{props.cityInfo.name}</p>
            <p id="icon"><img id="wicon" src={process.env.REACT_APP_WEATHER_ICONS + props.cityInfo.icon + ".png"} alt="Weather icon" /></p>
            <p>{props.cityInfo.temp} ℃</p>
        </span>
    );
}


export default CityCard;

