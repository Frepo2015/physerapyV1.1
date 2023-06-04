import React, { useState } from 'react'
import { Tab } from 'semantic-ui-react'
import { AddNotesForm, ShowNotes } from '../../Notes'
import { ShowVideo, VideoLayout } from '../../Video'
import "./ConsultasNotasDiarias.scss"






export function ConsultasNotasDiarias(props) {
    const { idPaciente } = props

    const panes = [
  
      {
        menuItem: 'Historial',
        render: () => <Tab.Pane> <ShowNotes idPaciente = {idPaciente}/> </Tab.Pane>
      },
      {
        menuItem: 'Notas',
        render: () => <Tab.Pane> <AddNotesForm idPaciente = {idPaciente}/></Tab.Pane>
      },
      {
        menuItem: 'Videos',
        render: () => <Tab.Pane> <VideoLayout idPaciente = {idPaciente}  /> </Tab.Pane>
      }
      
    ]
  return (  
    <div>
        <div className='tab-menu'>
          <Tab panes={panes}  />
        </div>
    </div>
  )
}
