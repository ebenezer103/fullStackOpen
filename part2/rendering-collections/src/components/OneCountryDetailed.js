// import React, { useState } from 'react'

const OneCountryDetailed = (props) => {
    if (props.countries.length === 1) {
        console.log(props.countries[0].languages)
        return (
            <div>
                <h1> {props.countries[0].name} </h1>

                <p>capital: {props.countries[0].capital} </p>
                <p>population: {props.countries[0].population} </p>

                <h3> languages </h3>
                {props.countries[0].languages.map((language) => <li key={language.iso639_2} > {language.name} </li>)}

                <img src={props.countries[0].flag} width="200" height="200" alt=""/>
            </div>
        )
    } else {
        return (null)
    }

}

export default OneCountryDetailed