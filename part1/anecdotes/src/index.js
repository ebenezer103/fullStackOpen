import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  // let [votes, setVote] = useState([0, 0, 0, 0, 0])
  let [votes, setVote] = useState({
    anecdotes: [0, 0, 0, 0, 0, 0]
  });
  const indexOfMaxValue = votes.anecdotes.indexOf(Math.max(...votes.anecdotes));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p> {props.anecdotes[selected]} <br /> has {votes.anecdotes[selected]} votes. </p>

      <Button title={"vote"} handleClick={() => {

        const newVotes = votes.anecdotes.slice() //copy the array
        newVotes[selected]++ //execute the manipulations
        setVote({ anecdotes: newVotes }) //set the new state

      }} />

      <Button title={"next anecdote"} handleClick={() => incrementValue(selected, setSelected)} />

      <h1>Anecdote with most votes</h1>

      <AnecdoteWithMost anecdoteText={anecdotes[indexOfMaxValue]} anecdoteVote={votes.anecdotes[indexOfMaxValue]} />
    </div>
  )
}
const incrementValue = (newValue, eventHandler) => {
  if (newValue === anecdotes.length - 1) {
    eventHandler(0)
  } else {
    eventHandler(newValue + 1)
  }
};

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleClick}>{props.title}</button>
    </div>
  )
}

const AnecdoteWithMost = (props) => {
  return(
  <p>{props.anecdoteText} <br /> has {props.anecdoteVote} votes.</p>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)