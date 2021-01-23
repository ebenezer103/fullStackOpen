import React, { useState, useEffect } from 'react'
import AddPerson from './components/AddPerson';
import axios from 'axios'

function filterByValue(array, string) { return array.filter(o => { return Object.keys(o).some(k => { if (typeof o[k] === 'string') return o[k].toLowerCase().includes(string.toLowerCase()); }); }); }


const App = () => {
  const [notes, setNotes] = useState([])
  const [persons, setPersons] = useState([])
  const [filterTerm, setNewfilterTerm] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])
  console.log('render', persons.length, 'persons')

  const handleFilterChange = (event) => {
    setNewfilterTerm(event.target.value)
    console.log(filterByValue(persons, filterTerm))
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <form >
        <div> filter shown with: <input value={filterTerm} onChange={handleFilterChange} /> </div>
      </form>

      <h2>add a new</h2>
      <AddPerson persons={persons} setPersons={setPersons}/>

      <h2>Numbers</h2>
      {filterByValue(persons, filterTerm).map(person => <div key={person.id}>{person.name} {person.number}</div>)}

    </div>
  )
}

export default App