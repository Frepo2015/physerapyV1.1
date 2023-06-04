
import React, {useState} from 'react'
import {Form } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { User } from '../../../api'
import { initialValues, validationSchema } from './EmailUpdateForm.data'

const userController= new User();

export function EmailUpdateForm(props) {
    
    const {onClose} = props
    const [showPassword, setShowPassword] = useState(false);
    const onShowHiddenPassword = () => setShowPassword((prevState) => !prevState)
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                await userController.updateUserEmail(formValue.email, formValue.password);
                onClose();

            } catch (error) {
                console.error(error)
            }
        }
    })
  return (
    <div>
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input 
                name='email'
                placeholder='Nuevo electronico' 
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email} />

            <Form.Input
                name='password'
                type={showPassword ? "text" : "password"}
                placeholder='Contraseña'
                icon={{
                    name: showPassword ? "eye slash" : "eye",
                    link: true,
                    onClick: onShowHiddenPassword
                }}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password} />
            <Form.Button 
                type='submit'
                fluid
                primary
                loading={formik.isSubmitting} > Actualizar email

            </Form.Button>
                
        </Form>
    </div>
  )
}
