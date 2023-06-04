import React, {useState} from 'react'
import { Form, Icon } from "semantic-ui-react"
import { useFormik } from "formik";
import {initialValues, validationSchema} from "./RegisterForm.data";
import { Auth } from "../../../api";
import "./RegisterForm.scss"

const auth = new Auth();

const genderOptions = [
  {key: "M", text: "Masculino", value: "Masculino"},
  {key: "F", text: "Femenino", value: "Femenino"},
  {key: "O", text: "Otro", value: "Otro"}
]

export function RegisterForm(props) {
  const {openLogin, goBack} = props;
  const [ showPassword, setShowPassword ] = useState(false);

  const onShowHidenPassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await auth.register(formValue.email, formValue.contrasenia);
      } catch (error) {
        console.error(error);
      }
    }
  });

  console.log(formik.errors)

  return (
    <div className='register-form'>
        <h1>Registrate</h1>
        <h2>Ingresa los datos solicitados</h2>

        <Form onSubmit={formik.handleSubmit}>

          <Form.Input 
            type='text' 
            name='email' 
            placeholder="Correo electronico" 
            icon="mail outline" 
            onChange={formik.handleChange} 
            value={formik.values.email} 
            error={formik.errors.email}
          />
            
          <Form.Input 
              type={showPassword ? "text" : "password"} 
              name='contrasenia' 
              placeholder="Contraseña" 
              onChange={formik.handleChange} 
              value={formik.values.contrasenia}
              error={formik.errors.contrasenia}
              icon={<Icon 
                      name={showPassword ? "eye slash" : "eye"} 
                      link 
                      onClick={onShowHidenPassword}
                      />}
          />

          <Form.Input 
            type='text' 
            name='nombre' 
            placeholder="Nombre Completo" 
            icon="user circle outline" 
            onChange={formik.handleChange} 
            value={formik.values.nombre}
            error={formik.errors.nombre}
          />

          <Form.Input 
            type='number' 
            name='telefono' 
            placeholder="Telefono" 
            icon="phone" 
            onChange={formik.handleChange} 
            value={formik.values.telefono}
            error={formik.errors.telefono}
          />


          <Form.Dropdown
                name='genero' 
                placeholder='Escoge un genero'
                icon="transgender alternate" 
                options = {genderOptions}
                selection
                value={formik.values.genero}
                error={formik.errors.genero}
                onChange={(_, data) => formik.setFieldValue('genero', data.value)}
            
            />

          <Form.Button 
            type='submit' 
            primary 
            fluid
            loading={formik.isSubmitting}
            >Continuar
          </Form.Button> 
        </Form>

        <div className='register-form__options'>
              <p onClick={goBack}>Volver</p>
              <p>
                ¿Ya tienes cuenta con nosotros? <span onClick={openLogin}>Iniciar sesión</span>
              </p>


        </div>

     </div>
  )
}
