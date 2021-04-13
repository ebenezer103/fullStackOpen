import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons'

const addPersonServerCall = (object) => {
  return( 
    axios
    .post(baseUrl, object)
  )
}

const deletePersonServerCall = (id) => {
  return( 
    axios
    .delete(`${baseUrl}/${id}`)
  )
}

const editPersonServerCall = (user, number) => {
  return( 
    axios
    .put(`${baseUrl}/${user.id}`, {name: user.name, number: number})
  )

}

export default { addPersonServerCall, deletePersonServerCall, editPersonServerCall }