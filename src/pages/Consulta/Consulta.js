import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Paciente as PacienteController } from '../../api'
import { ConsultasNotasDiarias } from "../../components/Consultas"
import './Consulta.scss'

const pacienteController = new PacienteController();
export function Consulta(props) {

    const { id } = useParams();
    const [paciente, setPaciente] = useState(null)



    useEffect(() => {
        (async () => {
            try {
                const response = await pacienteController.getPaciente(id);
                setPaciente(response);
            } catch (error) {
                console.error(error)
            }
        })()
    }, [id])

    if(!paciente) return null;

    return (
        <div className='consulta-page'>
            <h1>Consulta de {paciente.nombre}</h1>
            <p><span>Expediente: </span> {paciente.id}</p>

            <div className='consulta-page__notasDiarias'>
            <ConsultasNotasDiarias idPaciente={paciente.id} />
            
            </div>
        </div>

        
    )
}
