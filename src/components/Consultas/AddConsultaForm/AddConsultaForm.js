import React, {useState, useEffect} from 'react'
import { Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { Paciente } from '../../../api'
import { map } from 'lodash'
import { useNavigate } from "react-router-dom"; 
import { initialValues, validationSchema } from './AddConsultaForm.data'
import './AddConsultaForm.scss'

const pacienteController = new Paciente();


export function AddConsultaForm(props) {
    const { onClose } = props
    const navigate = useNavigate();

    const [pacientesOptions, setPacientesOptions] = useState([]);

    useEffect(() => {
      (async () => {
        try {
            const response = await pacienteController.obtainAll();

            const newData = map(response, (paciente) => ({
                key: paciente.id,
                value: paciente.id,
                text: paciente.nombre,
            }));
            setPacientesOptions(newData)
        } catch (error) {
            console.error(error);
        }
      })()
    }, [])
    

    const formik =  useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                navigate(`/Consulta/${formValue.paciente}`);
                onClose();
            } catch (error) {
                throw error
            }
            
        }
    })
    return (
        <Form className='add-consulta-form' onSubmit={formik.handleSubmit}>
            <div className='add-consulta-form__content'>
                <div className='add-consulta-form__content-inputs'>
                    <Form.Dropdown
                        name='paciente'
                        placeholder='La consulta será para...'
                        fluid
                        search
                        selection
                        options={pacientesOptions}
                        value={formik.values.paciente}
                        onChange={(_, data) => formik.setFieldValue("paciente", data.value)}
                        error={formik.errors.paciente}
                    />

                </div>
            </div>

            <Form.Button
                type='submit'
                primary
                fluid
                loading={formik.isSubmitting}
                >Iniciar consulta
            </Form.Button>
        </Form>
    )
}
