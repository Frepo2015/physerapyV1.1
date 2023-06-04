import React, { useState } from 'react'
import { Form, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import { Auth } from "../../../api"
import { initialValues, validationSchema} from "./LoginForm.data";
import "./LoginForm.scss"

const auth = new Auth();

export function LoginForm(props) {
  const {openRegister, goBack} = props;
  const [showPassword, setShowPassword] = useState(false)

  const onShowHidenPassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await auth.login(formValue.email, formValue.contrasenia);
      } catch (error) {
          throw error
      }
    },
  })

  return (
    <div className='login-form'>
        <h1>Inicia sesion</h1>

        <Form onSubmit={formik.handleSubmit}>
          <Form.Input
            name="email"
            type="text"
            placeholder="Correo electronico"
            icon="mail outline"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
            />

            <Form.Input
              name="contrasenia"
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              icon={<Icon
                        name={ showPassword ? "eye slash" : "eye"}
                        link
                        onClick={onShowHidenPassword}
                          />}
              onChange={formik.handleChange}
              value={formik.values.contrasenia}
              error={formik.errors.contrasenia}  
            />

            <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
              Iniciar sesion
            </Form.Button>
        </Form>

        <div className='login-form__options'>
                <p onClick={goBack}>Volver</p>
                <p>¿No tienes cuenta? <span onClick={openRegister}>Registrarse</span></p>

        </div>
      </div>
  )
}
