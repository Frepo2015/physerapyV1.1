import React from 'react'
import { Image } from 'semantic-ui-react'
import "./PacienteAvatar.scss"

export function PacienteAvatar(props) {
  const { image, name, id } = props;
  return (
    <div className='paciente-avatar'>
      <span>Paciente</span>
      <div className='paciente-avatar__image'>

        <Image src={image} />
        <h1>{name}</h1>

      </div>
      <p>Expediente: {id}</p>
    </div>
  )
}
