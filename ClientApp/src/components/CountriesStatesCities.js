import React, { useState, useEffect } from 'react';
import Combobox from './Combobox';

const BASE_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/";
const MY_API_KEY = "3bffb589bamshe663ba8eeaec494p1067edjsnf23d4fdc1c55";

const divStyle = {
    display: "inline-block",
    width: "100px"
};
const apiHeaders = {
    "X-RapidAPI-Key": MY_API_KEY,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
};

//Ref: https://www.universal-tutorial.com/rest-apis/free-rest-api-for-country-state-city
export function CountriesStatesCities() {
    var [countries, setCountries] = useState([]);
    var [selectedCountry, setSelectedCountry] = useState();
    var [states, setStates] = useState([]);
    var [selectedState, setSelectedState] = useState();
    var [cities, setCities] = useState([]);
    var [selectedCity, setSelectedCity] = useState();

    useEffect(() => {
        fetchCountries();
    }, []);

    function fetchCountries() {
        console.log('fetching countries');
        fetch(BASE_API_URL + 'countries', {
            headers: apiHeaders,
        }).then(res => res.json())
        .then(data => {
            var newCountries = [
                { value: null, text: '' },
                ...data.data.map(country => { return { value: country.code, text: country.name } }).sort(objectSorter)
            ];
            //console.log(newCountries);
            setCountries(newCountries);
        });
    }

    function objectSorter(prev, next) {
        return prev.text < next.text;
    }

    function fetchStates(country) {
        console.log('fetching states for ' + country)
        fetch(BASE_API_URL + `countries/${country}/regions`, {
            headers: apiHeaders,
        }).then(res => res.json())
            .then(data => {
                var newStates = [
                    { value: null, text: '' },
                    ...data.data.map(state => { return { value: state.isoCode, text: state.name } }).sort(objectSorter)
                ];
            console.log(newStates);
            setStates(newStates);
        });
    }

    function fetchCities(stateid) {
        console.log('fetching cities for ' + stateid, selectedCountry.value);
        console.log('calling api', BASE_API_URL + `countries/${selectedCountry.value}/regions/${stateid}/cities`);
        //countries/US/regions/CA/cities
        fetch(BASE_API_URL + `countries/${selectedCountry.value}/regions/${stateid}/cities`, {
            headers: apiHeaders,
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            setCities([
                { value: null, text: '' },
                ...data.data.map(city => { return { value: city.id, text: city.name } }).sort(objectSorter)
            ]);
        })
        .catch(function (error) {
            console.error(error);
        });
    }

    function onCountrySelect(e) {
        console.log('You selected country - ' + e.target.value);
        fetchStates(e.target.value);
        //fetchStates('GH');
        let foundCountry = countries.find(c => c.value == e.target.value);
        setSelectedCountry(foundCountry);
    }

    function onStateSelect(e) {
        console.log('You selected state - ' + e.target.value);
        fetchCities(e.target.value);
        //fetchCities('BA');
        let foundState = states.find(s => s.value == e.target.value);
        setSelectedState(foundState);
    }

    function onCitySelect(e) {
        console.log('You selected city - ' + e.target.value);
    }

    return (
        <>
            <h1>Countries, States, Cities</h1>
            <br/>
            <div>
                <div style={divStyle}>Country:</div> <Combobox selectedOption={selectedCountry} availableOptions={countries} onOptionSelect={onCountrySelect} />
            </div>
            <br/>
            <div>
                <div style={divStyle}>State:</div> <Combobox selectedOption={selectedState} availableOptions={states} onOptionSelect={onStateSelect} />
            </div>
            <br />
            <div>
                <div style={divStyle}>City:</div> <Combobox selectedOption={selectedCity} availableOptions={cities} onOptionSelect={onCitySelect} />
            </div>
        </>
    );
}