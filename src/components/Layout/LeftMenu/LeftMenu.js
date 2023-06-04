import React, {useState} from 'react';
import { Menu } from "semantic-ui-react"
import { Link, useLocation } from "react-router-dom";
import { BasicModal } from "../../Shared"
import { NewPacienteForm} from "../../Paciente"
import { NewCitaAgendaForm } from "../../Agenda"
import { AddConsultaForm } from "../../Consultas"
import "./LeftMenu.scss";

export function LeftMenu() {

    const {pathname} = useLocation();

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("")
    const [contentModal, setContentModal] = useState(null);

    const isCurrentPage = (route) => {
        return route === pathname
    }


    const closeModal = () =>{
        setShowModal(false);
        setTitleModal("");
        setContentModal(null);
    }

    const openModal = (type) => {
        if(type === "paciente"){
            setTitleModal("Nuevo Paciente");
            setContentModal(<NewPacienteForm onClose={closeModal} />);
        }
        if(type === "cita"){
            setTitleModal("Nueva Cita");
            setContentModal(<NewCitaAgendaForm onClose={closeModal} />);
        }
        if(type === "consulta"){
            setTitleModal("Nueva Consulta");
            setContentModal(<AddConsultaForm onClose={closeModal} />);
        }



        setShowModal(true);
    }
    


  return (
    <>
        <div className='left-menu'>
        <Menu secondary vertical fluid>
            <Menu.Item
                as={Link}
                to='/'
                name='Inicio' 
                icon='home'
                active = {isCurrentPage("/")}
            />
            <Menu.Item
                as={Link}
                to='/Pacientes'
                name='Pacientes' 
                icon='user'
                active = {isCurrentPage("/Pacientes")}
            />
            <Menu.Item
                as={Link}
                to='/Agenda'
                name='Agenda' 
                icon='calendar alternate'
                active = {isCurrentPage("/Agenda")}
            />
            
        </Menu>

        <Menu secondary vertical fluid>
        <Menu.Item
            name='Iniciar Consulta' 
            icon='sticky note' 
            link 
            onClick={() => openModal("consulta")}  
            />
            <Menu.Item
            name='Añadir nueva cita' 
            icon='calendar plus' 
            link
            onClick={() => openModal("cita")}  
            />
            <Menu.Item
            name='Registrar paciente' 
            icon='user plus' 
            link 
            onClick={() => openModal("paciente")} 
            />
            
            
        </Menu>
    </div>

    <BasicModal 
        show={showModal}
        onClose={closeModal}
        title={titleModal}
        children={contentModal}
    />
    </>
    
  )
}
