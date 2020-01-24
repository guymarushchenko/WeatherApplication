import React, { Component } from 'react';
import CheckBox from './CheckBox/CheckBox';
import CityCard from './CityCard/CityCard';
import {myCities} from './myCities.json';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { shownCitiesWithTemp: {} };
    this.selectedCitiesIds = [];
    this.allCities = myCities;
  }


  checkCityHandler = (city) =>
    this.selectedCitiesIds.includes(city) ? this.selectedCitiesIds.splice(this.selectedCitiesIds.indexOf(city), 1) : this.selectedCitiesIds.push(city);


  okButtonHandler = async () => {

    const newCitiesWithTemp = {};
    for (let cityId of this.selectedCitiesIds) {
      let cityWeatherData = await fetch(process.env.REACT_APP_WEATHER_API + '&units=metric&id=' + cityId);
      let pureCityWeatherData = await cityWeatherData.json();
      newCitiesWithTemp[cityId] = {
            "name": pureCityWeatherData.name,
            "temp": Math.round(pureCityWeatherData.main.temp),
            "icon": pureCityWeatherData.weather[0].icon
          };
        }
        this.setState({shownCitiesWithTemp:newCitiesWithTemp});
  }


  render() {
    return (
      <div className="App" >
        <h1>Current Weather</h1>
        <h4>Please select the cities you want to check the current weather for:</h4>
        <div>
          {
            Object.keys(this.allCities).map((cityName) => {
              return (
                <CheckBox key={this.allCities[cityName]} cityName={cityName} cityId={this.allCities[cityName]}
                  changeHandler={this.checkCityHandler} />
              );
            })
          }
        </div>
        <button className="button" onClick={this.okButtonHandler}>OK</button>
        <div className="citiesCards">
          {
            Object.keys(this.state.shownCitiesWithTemp).map((cityId) =>
              <CityCard key={cityId} cityInfo={this.state.shownCitiesWithTemp[cityId]} />
            )
          }
        </div>
      </div>
    );
  }

}

export default App;
