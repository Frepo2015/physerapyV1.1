import React from 'react'
import { Form } from 'semantic-ui-react'
import { useFormik } from "formik";
import { Notas } from "../../../api"
import { initialValues, validationSchema } from './AddNotesForm.data'
import Swal from 'sweetalert2'
import './AddNotesForm.scss'
import { da } from 'date-fns/locale';

const notasController = new Notas();

export function AddNotesForm(props) {

  const { idPaciente } = props

  const paciente = idPaciente
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      Swal.fire({
        title: '¿Esta seguro que desea guardar la nota?',
        text: "Al confirmar se guardaran los cambios",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, guardar nota'
      }).then((result) => {
        if (result.isConfirmed) {
          const {notes, title} = formValue;
          notasController.create(title, notes, paciente)
        }
      })
      
    },
  })
  
  return (
    
    <div>
      <Form onSubmit={formik.handleSubmit}>

        <Form.Input
          label="Motivo de la consulta"
          placeholder='Ingrese el motivo de la consulta de manera general'
          name='title'
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.errors.title}
        />
        <Form.TextArea
          name='notes'
          placeholder='Ingresa detalles acerca de la consulta'
          label='Detalles'
          value={formik.values.notes}
          onChange={formik.handleChange}
          error={formik.errors.notes}

        />


        <Form.Button type='submit' primary fluid loading={formik.isSubmitting}
        >
          Guardar nota
        </Form.Button>
      </Form>
    </div>
  )
}
