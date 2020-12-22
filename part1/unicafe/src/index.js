import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}> {props.title} </button>
)

const FooterStat = (props) => (
  <tr>
    <td>{props.title} </td>
    <td>{props.stats}</td>
  </tr>
)

const Buttons = (props) => {
  const incrementValue = (newValue, eventHandler) => {

    eventHandler(newValue + 1)
  };

  return (
    <div>
      <Button title={"good"} handleClick={() => incrementValue(props.good, props.setGood)} />
      <Button title={"neutral"} handleClick={() => incrementValue(props.neutral, props.setNeutral)} />
      <Button title={"bad"} handleClick={() => incrementValue(props.bad, props.setBad)} />
    </div>)
}

const FooterStats = ({ good, neutral, bad }) => {
  const all = good + bad + neutral;
  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <FooterStat title="good" stats={good} />
          <FooterStat title="neutral" stats={neutral} />
          <FooterStat title="bad" stats={bad} />
          <FooterStat title="all" stats={all} />
          <FooterStat title="average" stats={(all) ? (good - bad / all) + "" : null} />
          <FooterStat title="positive" stats={(all) ? (good / all) * 100 + "%" : null} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Buttons good={good} neutral={neutral} bad={bad} setGood={setGood} setNeutral={setNeutral} setBad={setBad} />

      <h1>statistics</h1>
      <FooterStats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
