import React, { useState, useEffect } from 'react'
import { Notas } from '../../../api'
import { Slider } from '../../Shared'
import { size } from "lodash"
import { Loader } from "semantic-ui-react";
import './ShowNotes.scss'

const notasController =  new Notas();

export  function ShowNotes(props) {
    const {idPaciente} = props 
    const [notas, setNotas] = useState(null);
    useEffect(() => {
      (async () => {
        try {
            const response =  await notasController.getNotesbyPx(idPaciente)
            setNotas(response)
        } catch (error) {
            console.error(error);
        }
      })()
    }, [idPaciente])

    if (size(notas) === 0) {
      return (
          <Loader active inline="centered" size='large' >
              Cargando

          </Loader>
      )
  }
    
  return (
    <div>
        <Slider data={notas}/>
    </div>
  )
}

