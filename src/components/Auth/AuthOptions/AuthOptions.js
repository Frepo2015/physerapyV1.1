import React from 'react'
import {Button} from "semantic-ui-react";
import {} from "./AuthOptions.scss"

export function AuthOptions(props) {
  const {openLogin, openRegister} = props;

  return (
    <div className='auth-options'>
        <h1>Bienvenido</h1>

        <Button className='register' onClick={openRegister}>Registrate</Button>
        <Button className='login' onClick={openLogin}>Inicia sesion</Button>
    </div>
  )
}
