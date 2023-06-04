import React, {useState} from 'react';
import { CalendarioAgenda, DeleteCitaAgenda} from '../../components/Agenda/'
import "./Agenda.scss"

export function Agenda() {
  return (
    <div className='agenda-page'>

        <h1>Agenda</h1>
        <div className='agenda-page__calendar'>
          <CalendarioAgenda />
        </div>

        <div className='agenda-page__delete'>
            <DeleteCitaAgenda />
        </div>

    </div>
  )
}
