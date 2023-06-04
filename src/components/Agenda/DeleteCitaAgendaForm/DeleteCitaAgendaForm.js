import React, { useState, useEffect } from 'react'
import { Form } from 'semantic-ui-react'
import { useFormik } from "formik";
import { Citas } from '../../../api'
import Swal from "sweetalert2"
import { validationSchema, initialValues } from "./DeleteCitaAgendaForm.data"

const citasController = new Citas();


export function DeleteCitaAgendaForm(props) {

    const citasOptions = []
    const [citas, setCitas] = useState([]);
    const { onClose } = props

    useEffect(() => {
        (async () => {
            try {
                const response = await citasController.obtainAll();
                setCitas(response);
            } catch (error) {
                console.error(error);
            }
        })()
    }, [])


    for (let i = 0; i < citas.length; i++) {
        const cita =
        {
            text: citas[i].title,
            value: citas[i].id,
        };
        citasOptions.push(cita);
    }

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            Swal.fire({
                title: '¿Esta seguro que desea eliminar la cita?',
                text: "Al confirmar se guardaran los cambios",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar cita'
              }).then((result) => {
                if (result.isConfirmed) {
                    const { cita } = formValue;
                    citasController.deleteCita(cita);
                    onClose();
                }
              })
            
        },
    })
    return (
        <div>
            <Form className='delete-cita-form' onSubmit={formik.handleSubmit}>
                <Form.Dropdown
                    label="Citas"
                    name='cita'
                    placeholder='Seleccione una cita'
                    options={citasOptions}
                    selection
                    search
                    value={formik.values.genero}
                    error={formik.errors.genero}
                    onChange={(_, data) => formik.setFieldValue('cita', data.value)}

                />

                <Form.Button
                    type='submit'
                    primary
                    fluid
                    loading={formik.isSubmitting}
                >
                    Eliminar Cita
                </Form.Button>
            </Form>
        </div>
    )
}
