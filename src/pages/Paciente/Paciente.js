import React, { useState, useEffect} from 'react';
import { Paciente as PacienteController} from "../../api";
import { useParams } from "react-router-dom"
import { PacienteAvatar, GeneralDataPaciente, VideosPaciente } from "../../components/Paciente"
import { ShowVideo } from "../../components/Video"
import { Tab } from 'semantic-ui-react'
import "./Paciente.scss"

const pacienteController = new PacienteController();

export function Paciente(props) {

  const { id } = useParams();

  const [paciente, setPaciente] = useState(null)

  useEffect(() => {
    (async () =>{
      try {
        const response = await pacienteController.getPaciente(id);
        setPaciente(response);
      } catch (error) {
        console.error(error)
      }
    })()
  }, [id])

  const panes = [
  
    {
      menuItem: 'Datos del paciente',
      render: () => <Tab.Pane>   <div className='paciente-page__slider'>
      <h2>Datos generales del paciente</h2>
      <GeneralDataPaciente fechaNacimiento={paciente.fechaNacimiento} genero={paciente.genero}
        domicilio={paciente.domicilio} peso={paciente.peso} estatura={paciente.estatura} diabetes={paciente.diabetes}
        alergia={paciente.alergia} cardiopatias={paciente.cardiopatias} cancer={paciente.cancer} 
        cirugias={paciente.cirugias} transfusiones={paciente.transfusiones} fracturas={paciente.fracturas}
        enfReumaticas={paciente.enfReumaticas} espContraMus={paciente.espContraMus} tabaquismo={paciente.tabaquismo}
        actividadFisica={paciente.actividadFisica} alcoholismo={paciente.alcoholismo} automedica={paciente.automedica}
        drogas={paciente.drogas} pasatiempo={paciente.pasatiempo} inputDiabetes={paciente.inputDiabetes} inputAlcoholismo={paciente.inputAlcoholismo}
        inputAlergia={paciente.inputAlergia} inputCardiopatias={paciente.inputCardiopatias} inputCancer={paciente.inputCancer} inputCirugias={paciente.inputCirugias}
        inputTransfusiones={paciente.inputTransfusiones} inputFracturas={paciente.inputFracturas} inputEnf={paciente.inputEnfReumaticas} inputEsp={paciente.inputEsp}
        inputTabaquismo={paciente.inputTabaquismo} inputActividadFisica={paciente.inputActividadFisica} inputAutomedica={paciente.inputAutomedica}
        inputDrogas={paciente.inputDrogas} inputPasatiempo={paciente.inputPasatiempo} />
  </div> </Tab.Pane>
    },
    {
      menuItem: 'Videos',
      render: () => <Tab.Pane> <div className='paciente-page__slider'>
     
      <ShowVideo idPaciente={paciente.id}/>

    </div> </Tab.Pane>
    }
    
  ]

  if(!paciente) return null;
  
  return (
    <div className='paciente-page'>
        <PacienteAvatar image={paciente.image} name={paciente.nombre} id={paciente.id} />

        <Tab panes={panes} />

        
    </div>
  )
}
