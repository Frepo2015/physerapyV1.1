import React, {useState} from 'react'
import { Paciente } from '../../../api'
import { BasicModal } from "../../Shared"
import { DeleteCitaAgendaForm } from "../DeleteCitaAgendaForm"
import { Button } from 'semantic-ui-react'

const pacienteController = new Paciente();

export function DeleteCitaAgenda() {

  const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("")
    const [contentModal, setContentModal] = useState(null);

const closeModal = () =>{
  setShowModal(false);
  setTitleModal("");
  setContentModal(null);
}

const openModal = (type) => {
  if(type === "deleteCita"){
      setTitleModal("Eliminar Cita");
      setContentModal(<DeleteCitaAgendaForm onClose={closeModal} />);
  }

  setShowModal(true);
}

  return (

    <>
  
    <div>
      <Button color='red' onClick={() => openModal("deleteCita")}>
          Eliminar Cita
      </Button>
    </div>

<BasicModal 
        show={showModal}
        onClose={closeModal}
        title={titleModal}
        children={contentModal}
    />
    </>

  )}