import React from 'react'
import {BrowserRouter,  Routes, Route} from 'react-router-dom';
import { LoggedLayout } from "../layouts"
import {Home, Profile,  Agenda, Pacientes, Paciente, Consulta} from '../pages';
import { VideosConsulta } from '../components/Consultas';

export function LoggedNavigation() {
  return (
    <BrowserRouter>
      <LoggedLayout>
        <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/Profile' element={<Profile />} />
              <Route path='/Agenda' element={<Agenda />} />
              <Route path='/Pacientes' element={<Pacientes />} />
              <Route path='/Paciente/:id' element={<Paciente />} />
              <Route path='/Consulta/:id' element={<Consulta />} />
          </Routes>
      </LoggedLayout>
      
    </BrowserRouter>
  );
}
