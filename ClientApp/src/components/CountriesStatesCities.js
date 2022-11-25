import React, { useState, useEffect } from 'react';
import Combobox from './Combobox';

const BASE_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/";
const MY_API_KEY = "3bffb589bamshe663ba8eeaec494p1067edjsnf23d4fdc1c55";

const divStyle = {
    display: "inline-block",
    width: "100px"
};
const comboStyle = {
    width: '250px'
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
        let currentOffset = 0, totalCount = 0, retries = 0;
        let newCountries = [];
        let pageSize = 5;
        let fetchNow = function () {
            console.log('fetching countries PageSize CurrentOffset TotalCount', pageSize, currentOffset, totalCount);
            fetch(BASE_API_URL + 'countries', {
                headers: apiHeaders,
                params: {offset: currentOffset}
            }).then(res => res.json())
                .then(data => {
                    if (data.data) {
                        retries = 0;
                        let pagedCountries = data.data.map(country => { return { value: country.code, text: country.name } });
                        newCountries = newCountries.concat(pagedCountries);
                        pageSize = data.data.length;
                        totalCount = data.metadata.totalCount;
                        currentOffset = currentOffset + pageSize;
                        if (currentOffset <= totalCount)
                            fetchNow();
                        else {
                            //console.log(newCountries);
                            newCountries.sort(objectSorter);
                            newCountries = [{ value: null, text: '' }, ...newCountries];
                            setCountries(newCountries);
                        }
                    }
                    else {
                        //For current offset try again 2 times
                        retries++;
                        if (retries < 3)
                            fetchNow();
                        else
                            retries = 0; //reset tries counter so that it can be used for next offset failure if any
                    }
            });
        }
        fetchNow();
    }

    function objectSorter(prev, next) {
        return (prev.text < next.text ? -1 : (prev.text == next.text ? 0 : 1));
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
            //console.log(newStates);
            setStates(newStates);
        });
    }

    function fetchCities(stateid) {
        console.log('fetching cities for ' + stateid, selectedCountry.value);
        //countries/US/regions/CA/cities
        fetch(BASE_API_URL + `countries/${selectedCountry.value}/regions/${stateid}/cities`, {
            headers: apiHeaders,
        }).then(res => res.json())
        .then(data => {
            //console.log(data);
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
                <div style={divStyle}>Country:</div> <Combobox title="Countries" estyle={comboStyle} selectedOption={selectedCountry}
                    availableOptions={countries} onOptionSelect={onCountrySelect} />
            </div>
            <br/>
            <div>
                <div style={divStyle}>State:</div> <Combobox title="States" estyle={comboStyle} selectedOption={selectedState}
                    availableOptions={states} onOptionSelect={onStateSelect} />
            </div>
            <br />
            <div>
                <div style={divStyle}>City:</div> <Combobox title="Cities" estyle={comboStyle} selectedOption={selectedCity}
                    availableOptions={cities} onOptionSelect={onCitySelect} />
            </div>
        </>
    );
}