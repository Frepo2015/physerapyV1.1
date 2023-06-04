import React, { useState, useEffect } from 'react'
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { Citas } from "../../../api"
import { Loader } from "semantic-ui-react";
import { size } from "lodash"
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarioAgenda.scss"

const citasController =  new Citas();

const locales = {
  "en-US ": require('date-fns/locale/en-US')
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});


export function CalendarioAgenda() {

  const [citas, setCitas] = useState([])
  const events = [];
  
  useEffect(() => {
    (async () => {
      try {
        const response  = await citasController.obtainAll();
        setCitas(response);
      } catch (error) {
        console.error(error);
      }
    })()
  }, [])
  if (size(citas) === 0) {
    return (
        <Loader active inline="centered" size='large' >
            Cargando

        </Loader>
    )
}



for (let i = 0; i < citas.length; i++) {
  const event = 
    {title: citas[i].title,
      start: convertDate(citas[i].start.seconds),
      end: convertDate(citas[i].end.seconds)
    };
    events.push(event);
}

  return (
    
    <div>
        <Calendar 
          localizer={localizer} 
          startAccessor='start' 
          events={events} 
          endAccessor='end' 
          style={{height: 700, margin:"10px"}} 

          messages={{
            next: "Siguente",
            previous: "Anterior",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día"
          }}
        />
    </div>
  )
}

function convertDate(utcSeconds){
  let timestamp = utcSeconds*1000
  let d = new Date(timestamp);
  return d
}
