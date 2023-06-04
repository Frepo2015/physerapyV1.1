import React, {useState} from 'react'
import { Image } from "semantic-ui-react";
import {AuthOptions, RegisterForm, LoginForm} from "../../components/Auth"
import { logoSinFondo2 } from "../../assets"
import "./Auth.scss";

export function Auth() {
  const [typeForm, setTypeForm] = useState(null);

  const openLogin = () => setTypeForm("Login");
  const openRegister = () => setTypeForm("Register");
  const goBack = () => setTypeForm(null);

  const renderForm = () => {
    if(typeForm === "Login"){
      return <LoginForm openRegister={openRegister} goBack={goBack}/>;
    }

    if(typeForm === "Register"){
      return <RegisterForm openLogin={openLogin} goBack={goBack} />
    }
    return <AuthOptions openLogin={openLogin} openRegister={openRegister} />
  }
  return (
    <div className='auth'>
      <div className='auth__content'>
        <Image 
         src={logoSinFondo2}
         alt={"Physerapy Solutions"}
         className='auth__content-logo'
        />

        {renderForm()}
      </div>
    </div>
  );
}
