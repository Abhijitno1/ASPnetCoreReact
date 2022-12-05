import React, { useState, useEffect } from 'react';
import Combobox from './Combobox';

const BASE_API_URL = "countries";

const divStyle = {
    display: "inline-block",
    width: "100px"
};
const comboStyle = {
    width: '250px'
};
const clientSecret = {
    UserName: "adesai21",
    RegdEmail: 'myapp@notmail.net',
    SecretKey: 'abracadabra'
};

//Ref: https://www.universal-tutorial.com/rest-apis/free-rest-api-for-country-state-city
export function CountriesStatesCities() {
    var [countries, setCountries] = useState([]);
    var [selectedCountry, setSelectedCountry] = useState();
    var [states, setStates] = useState([]);
    var [selectedState, setSelectedState] = useState();
    var [cities, setCities] = useState([]);
    var [selectedCity, setSelectedCity] = useState();
    var authToken;


    useEffect(() => {
        //get authentication token first
        getToken();
    }, []);

    function getToken() {
        fetch('token', {
            headers: { 'content-type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(clientSecret)
        })
        .then(res => res.json())
            .then(data => {
                authToken = data.token;
                fetchCountries();
            });
    }
    function createApiHeaders() {
        return {
            'content-type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        };
    }

    function fetchCountries() {
        let newCountries = [];
        let fetchNow = function () {
            console.log('fetching countries');
            fetch(BASE_API_URL, {
                method: 'GET',
                headers: createApiHeaders(),
            })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    let pagedCountries = data.map(country => { return { value: country.id, text: country.name } });
                    newCountries = newCountries.concat(pagedCountries);
                    newCountries.sort(objectSorter);
                    newCountries = [{ value: null, text: '' }, ...newCountries];
                    //console.log(newCountries);
                    setCountries(newCountries);
                }
            })
            .catch(function (error) {
                console.error(error);
            });
        }
        fetchNow(); //using a function is useful when output contains paged data. not signifiant in above case.
    }

    function objectSorter(prev, next) {
        return (prev.text < next.text ? -1 : (prev.text == next.text ? 0 : 1));
    }

    function fetchStates(country) {
        console.log('fetching states for ' + country)
        fetch(BASE_API_URL + `/${country}/states`, {
            method: 'GET',
            headers: createApiHeaders(),
        }).then(res => res.json())
        .then(data => {
            var newStates = [
                { value: null, text: '' },
                ...data.map(state => { return { value: state.id, text: state.name } }).sort(objectSorter)
            ];
            //console.log(newStates);
            setStates(newStates);
        })
        .catch (function (error) {
            console.error(error);
        });
    }

    function fetchCities(stateid) {
        console.log('fetching cities for ' + stateid, selectedCountry.value);
        //countries/US/regions/CA/cities
        fetch(BASE_API_URL + `/${selectedCountry.value}/states/${stateid}/cities`, {
            method: 'GET',
            headers: createApiHeaders(),
        }).then(res => res.json())
        .then(data => {
            //console.log(data);
            setCities([
                { value: null, text: '' },
                ...data.map(city => { return { value: city.id, text: city.name } }).sort(objectSorter)
            ]);
        })
        .catch(function (error) {
            console.error(error);
        });
    }

    function onCountrySelect(e) {
        fetchStates(e.target.value);
        //fetchStates('GH');
        let foundCountry = countries.find(c => c.value == e.target.value);
        setSelectedCountry(foundCountry);
        console.log(`You selected country -${foundCountry?foundCountry.text:'none'}`);
    }

    function onStateSelect(e) {
        fetchCities(e.target.value);
        //fetchCities('BA');
        let foundState = states.find(s => s.value == e.target.value);
        setSelectedState(foundState);
        console.log(`You selected state -${foundState ? foundState.text : 'none'}`);
    }

    function onCitySelect(e) {
        let foundCity = cities.find(c => c.value == e.target.value);
        setSelectedCity(foundCity);
        console.log(`You selected city -${foundCity ? foundCity.text : 'none'}`);
    }

    return (
        <>
            <h1>Countries, States, Cities</h1>
            <br/>
            <div>
                <label style={divStyle}>Country:</label> <Combobox title="Countries" estyle={comboStyle} selectedOption={selectedCountry}
                    availableOptions={countries} onOptionSelect={onCountrySelect} />
            </div>
            <br/>
            <div>
                <label style={divStyle}>State:</label> <Combobox title="States" estyle={comboStyle} selectedOption={selectedState}
                    availableOptions={states} onOptionSelect={onStateSelect} />
            </div>
            <br />
            <div>
                <label style={divStyle}>City:</label> <Combobox title="Cities" estyle={comboStyle} selectedOption={selectedCity}
                    availableOptions={cities} onOptionSelect={onCitySelect} />
            </div>
        </>
    );
}