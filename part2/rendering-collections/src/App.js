import React, { useState, useEffect } from 'react'
import AddPersonFunctionality from './components/AddPersonFunctionality';
import axios from 'axios'
import backendServices from './components/services/backend';
function filterByValue(array, string) { return array.filter(o => { return Object.keys(o).some(k => { if (typeof o[k] === 'string') return o[k].toLowerCase().includes(string.toLowerCase()); }); }); }
//EXERCISE 2.15

const App = () => {
  // const [notes, setNotes] = useState([])
  const [persons, setPersons] = useState([])
  const [filterTerm, setNewfilterTerm] = useState('')
  const [deletedPerson, setDeletedPerson] = useState([])
  const [editedPerson, setEditedPerson] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook, [deletedPerson, editedPerson])
  console.log('render', persons.length, 'persons')

  const handleFilterChange = (event) => {
    setNewfilterTerm(event.target.value)
    console.log(filterByValue(persons, filterTerm))
  }

  const deleteUser = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      backendServices.
        deletePersonServerCall(id)
        .then(response => {
          setDeletedPerson(name)
        })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form >
        <div> filter shown with: <input value={filterTerm} onChange={handleFilterChange} /> </div>
      </form>

      <h2>add a new</h2>
      <AddPersonFunctionality persons={persons} setPersons={setPersons} editedPerson={editedPerson} setEditedPerson={setEditedPerson} />

      <h2>Numbers</h2>
      {filterByValue(persons, filterTerm).map(person => <div key={person.id}>{person.name} {person.number} <button type="button" onClick={() => { deleteUser(person.id, person.name) }}>delete</button>  </div>)}

    </div>
  )
}

export default App