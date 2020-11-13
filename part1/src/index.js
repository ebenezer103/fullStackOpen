import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14

  return (
    <div>
      <Header name="Half Stack application development"/>

      <Content name="Fundamentals of React" exercise={exercises1}/>
      <Content name="Using props to pass data" exercise={exercises2}/>
      <Content name="State of a component" exercise={exercises3}/>
      
      <Footer exercises1={exercises1} exercises2={exercises1} exercises3={exercises3} />
    </div>
  )
}

const Header = (course) => {
  return(
    <div>
  <h1>{course.name}</h1>
  </div>
  )
}
const Content = (content) => {
  return(
    <div>
      <p>{content.name} {content.exercise}</p>
    </div>
  )
}
const Footer = (footerContent) => {
  return(
    <div>
      <p>Number of exercises {footerContent.exercises1 + footerContent.exercises2 + footerContent.exercises3} </p>
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById('root'))