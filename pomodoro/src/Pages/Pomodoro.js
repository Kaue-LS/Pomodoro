import React from "react"
import { Link, useLocation } from "react-router-dom"
import "../Styles/Pomodoro.css"
import MyTimer from "../Components/Timer"





export default function Pomodoro(){
    const location=useLocation()
    const {state}=location.state




    const hoursMinSecs = {trabalho:state.trabalho, pausa: state.pausa, sessoes: state.sessoes}

    return(
        <div id='Pomodoro'>
            {/* Header */}
        <div id="Header">
            <h1>Pomodoro</h1>
            <Link style={{textDecoration:'none'}}  to='/'><button>Início</button></Link>
        </div>
        {/* Cronometro */}

        <div id="TimerArea">
            <MyTimer hoursMinSecs={hoursMinSecs} />
        <div>
         
        </div>
        </div>
        </div>
    )
}