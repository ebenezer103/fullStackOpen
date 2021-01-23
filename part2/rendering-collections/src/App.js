import React, { useState, useEffect } from 'react'
import OneCountryDetailed from './components/OneCountryDetailed';
import axios from 'axios'

function filterByValue(array, string) { return array.filter(o => { return Object.keys(o).some(k => { if (typeof o[k] === 'string') return o[k].toLowerCase().includes(string.toLowerCase()); }); }); }

const App = () => {
  const [countries, setCountriesFound] = useState([])
  const [filterTerm, setNewfilterTerm] = useState('')

  const hook = () => {
    if (!filterTerm) {
      return
    }
    axios
      .get(`https://restcountries.eu/rest/v2/name/${filterTerm}`)
      .then(response => {
        console.log('promise fulfilled')
        // console.log(response.data.length)

        if (response.data.length > 10) {
          console.log("Ebenezer")
        } else {
          setCountriesFound(response.data)
        }

      })
  }

  useEffect(hook, [filterTerm])
  // console.log('render', countries.length, 'countries')

  const handleFilterChange = (event) => {
    setNewfilterTerm(event.target.value)
    console.log(filterByValue(countries, filterTerm))

  }



  return (
    <div>
      <form >
        <div> find countries <input value={filterTerm} onChange={handleFilterChange} /> </div>
      </form>
      {/* {filterByValue(countries, filterTerm).map(country => <div key={country.cioc}>{country.name} {country.number}</div>)} */}
      {filterByValue(countries, filterTerm).map(country => <div key={country.cioc}>{country.name} </div>)}

      <OneCountryDetailed countries={countries} />

    </div>
  )
}

export default App