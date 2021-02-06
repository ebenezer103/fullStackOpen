import React, { useEffect, useState } from 'react'
import backendServices from './services/backend';


const AddPersonFunctionality = (props) => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const editPerson = user => {
    if (window.confirm(`${user.name} is already added to phonebook, replace the old number with a new one`)) {
      backendServices
      .editPersonServerCall(user, newNumber)
      .then(response => {
        props.setEditedPerson(`${user.name} + ${newNumber}`)
        console.log(response)
      })
    }

  }

  const addPerson = (event) => {
    event.preventDefault()
    // if (props.persons.some(e => e.name === newName)) { alert(`${newName} is already added to phonebook`); setNewName(''); return }
    if (props.persons.some(e => e.name === newName)) { editPerson(props.persons.find(e => e.name === newName), newNumber); return }

    if (newName == '') { alert(`You can not add a blank name to phonebook`); setNewName(''); return }

    let newObject = {
      name: newName,
      number: newNumber,
      id: props.persons.length + 1,
    }
    backendServices.addPersonServerCall(newObject)
      .then(response => {
        console.log(response)
      })


    props.setPersons(props.persons.concat(newObject))

    setNewName('')
    setNewNumber('')
  }


  return (
    <form onSubmit={addPerson}>

      <div> name: <input value={newName} onChange={handleNameChange} /> </div>
      <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )

}

export default AddPersonFunctionality