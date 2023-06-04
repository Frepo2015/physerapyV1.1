import React, { useState, useEffect, } from 'react'
import { Paciente } from "../../api";
import { ListPacientes } from "../../components/Paciente"
import "./Pacientes.scss"

const pacienteController =  new Paciente();

export function Pacientes() {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response  = await pacienteController.obtainAll();
        setPacientes(response);
      } catch (error) {
        console.error(error);
      }
    })()
  }, [])
  
  return (
    <div className='pacientes-page'>
        <h1>Pacientes</h1>
        <ListPacientes pacientes={pacientes}/>
        
    </div>
  )
}
