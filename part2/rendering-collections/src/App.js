import React, { useState, useEffect } from 'react'
import axios from 'axios'
//EXERCISE 2.15
function filterByValue(array, string) { return array.filter(o => { return Object.keys(o).some(k => { if (typeof o[k] === 'string') return o[k].toLowerCase().includes(string.toLowerCase()); }); }); }

const App = () => {
  const [countries, setCountriesFound] = useState([])
  const [countryWeather, setcountryWeather] = useState()
  const [filterTerm, setNewfilterTerm] = useState('')
  const [countryDetailedBoolean, setCountryDetailedBoolean] = useState(false)
  const [countryWeatherBoolean, setCountryWeatherBoolean] = useState(false)
  const [globalCountry, setGlobalCountry] = useState('')
  const api_key = process.env.REACT_APP_API_KEY

  const weatherHook = () => {
    if (globalCountry) {
      axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${globalCountry.name}`)
        .then(response => {
          setcountryWeather(response.data)
          setCountryWeatherBoolean(true)
        })
    }
  }

  const hook = () => {
    if (!filterTerm) {
      return
    }
    axios
      .get(`https://restcountries.eu/rest/v2/name/${filterTerm}`)
      .then(response => {
        // console.log('promise fulfilled')
        // console.log(response.data.length)

        if (response.data.length > 10) {
          console.log("Ebenezer")
        } else {
          setCountriesFound(response.data)
        }

      })
  }

  useEffect(hook, [filterTerm])
  useEffect(weatherHook, [globalCountry])
  // console.log('render', countries.length, 'countries')

  const handleFilterChange = (event) => {
    setNewfilterTerm(event.target.value)
    // console.log(filterByValue(countries, filterTerm))

  }

  const showDetails = (country) => {
    setCountryDetailedBoolean(true);
    setGlobalCountry(country)
  }

  const CountryDetailed = (country) => {
    return (
      <div style={{ display: countryDetailedBoolean ? "block" : "none" }} >
        <h1> {globalCountry.name} </h1>
        <p>capital: {globalCountry.capital} </p>
        <p>population: {globalCountry.population} </p>
        <h3> languages </h3>
        {globalCountry && globalCountry.languages.map((language) => <li key={language.iso639_2} > {language.name} </li>)}
        <img src={globalCountry.flag} width="200" height="200" alt="" />
      </div >
    )
  }

  const CountryWeatherDetailed = (country) => {
    return (
      <div style={{ display: countryWeatherBoolean ? "block" : "none" }} >
        <h2> Weather in {countryWeather && countryWeather.location.name}</h2>
        <h4> temperature: {countryWeather && countryWeather.current.temperature} </h4>
        <img />
        <h4> wind: {countryWeather && countryWeather.current.wind_speed} mph direction {countryWeather && countryWeather.current.wind_dir} </h4>
      </div >
    )
  }


  return (
    <div>
      <form >
        <div> find countries <input value={filterTerm} onChange={handleFilterChange} /> </div>
      </form>
      {filterByValue(countries, filterTerm).map(country => <div key={country.cioc}> {country.name} <button onClick={() => showDetails(country)}> show </button> </div>)}
      < CountryDetailed />
      < CountryWeatherDetailed />
    </div>
  )
}

export default App