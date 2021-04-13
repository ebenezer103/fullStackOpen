import React, { useState } from 'react'

const AddPerson = ( {props} ) => {

    const handleNameChange = (event) => {
        setNewName(event.target.value)
      }
      const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
      }
    
    
      const addPerson = (event) => {
        event.preventDefault()
        if (props.persons.some(e => e.name === newName)) { alert(`${newName} is already added to phonebook`); setNewName(''); return }
    
        let newObject = {
          name: newName,
          number: newNumber,
          id: props.persons.length + 1,
        }
        props.setPersons(props.persons.concat(newObject))
    
        setNewName('')
        setNewNumber('')
      }
      const [newName, setNewName] = useState('')
      const [newNumber, setNewNumber] = useState('')

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

export default AddPerson