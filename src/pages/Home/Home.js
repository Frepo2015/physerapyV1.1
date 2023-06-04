import React, { useState, useEffect } from 'react'
import { bannerHome } from '../../assets'
import { Paciente } from "../../api"
import { SliderLastPacientes } from "../../components/Shared"
import './Home.scss'

const pacienteController = new Paciente();

export function Home() {

  const [pacientes, setPacientes] = useState(null);

  useEffect(() => {
    (async () => {
      try {
          const response = await pacienteController.getLastPacientes(5);
          setPacientes(response)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])
  

  return (
    <div className='home-page'>
      <div 
      className='home-page__banner' 
      style={{backgroundImage: `url(${bannerHome})` }}>

      </div>
       
    <div className='home-page__slider'>
      <h2>Ultimos pacientes</h2>
      <SliderLastPacientes data={pacientes}/>
    </div>

    </div>
  )
}
