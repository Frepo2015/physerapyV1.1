import React, { useState, useEffect } from 'react'
import { Form, Label } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { Citas, Paciente } from '../../../api'
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./NewCitaAgendaForm.data"
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import "./NewCitaAgendaForm.scss";

const citasController = new Citas();
const pacienteController = new Paciente();

export function NewCitaAgendaForm(props) {

  const pacientesOptions = [{text: "Nuevo Paciente", value:"Nuevo Paciente"}]
  const [pacientes, setPacientes] = useState([]);
  const { onClose } = props

  useEffect(() => {
    (async () => {
      try {
        const response = await pacienteController.obtainAll();
        setPacientes(response);
      } catch (error) {
        console.error(error);
      }
    })()
  }, [])


  for (let i = 0; i < pacientes.length; i++) {
    const paciente =
    {
      text: pacientes[i].nombre,
      value: pacientes[i].nombre,
      image: {avatar: true, src: pacientes[i].image},
    };
    pacientesOptions.push(paciente);
  }


  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const { paciente, title, startDate, startTimeH, startTimeM, endTimeH, endTimeM } = formValue;
      await citasController.create(paciente, title, startDate, startTimeH, startTimeM, endTimeH, endTimeM);
      onClose();
    },
  })

  return (
    <div>
      <Form className='new-cita-form' onSubmit={formik.handleSubmit}>
        <Label color='orange' ribbon>Asunto de la cita</Label>

        <Form.Dropdown
          label="Paciente"
          name='paciente'
          placeholder='Seleccione el paciente'
          options={pacientesOptions}
          search
          selection
          value={formik.values.genero}
          error={formik.errors.genero}
          onChange={(_, data) => formik.setFieldValue('paciente', data.value)}

        />
        <Form.Input
          name="title"
          label='Ingrese el asunto de la cita'
          placeholder="Ingrese el asunto de la cita"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.errors.title}
        />
        <Label color='orange' ribbon>Fecha de la cita</Label>
        <Form.Group widths='equal'>
          <SemanticDatepicker
            name="startDate"
            label='Ingrese fecha de la cita'
            format='DD-MMM-YYYY'
            value={formik.values.startDate}
            error={formik.errors.startDate}
            onChange={(_, data) => formik.setFieldValue("startDate", data.value)}
          // onChange={(event, data) => setDate(data.value)} 
          />

        </Form.Group >
        <Label color='orange' ribbon>Hora de inicio de la cita</Label>
        <Form.Group widths='equal'>
          <Form.Input
            name="startTimeH"
            label="Ingresa la hora"
            type='number'
            placeholder='Horas (24hrs)'
            min="00"
            max="24"
            fluid
            icon="clock"
            value={formik.values.startTimeH}
            onChange={formik.handleChange}
            error={formik.errors.startTimeH}
          />
          <Form.Input
            name="startTimeM"
            label="y los minutos"
            type='number'
            placeholder='Minutos'
            min="0"
            max="59"
            fluid
            icon="clock outline"
            value={formik.values.startTimeM}
            onChange={formik.handleChange}
            error={formik.errors.startTimeM}
          />
        </Form.Group>

        <Label color='orange' ribbon>Hora de termino de la cita</Label>
        <Form.Group widths='equal'>

          <Form.Input
            name="endTimeH"
            label="Ingresa la hora"
            type='number'
            placeholder='Horas (24hrs)'
            min="00"
            max="24"
            fluid
            icon="clock"
            value={formik.values.endTimeH}
            onChange={formik.handleChange}
            error={formik.errors.endTimeH}
          />
          <Form.Input
            name="endTimeM"
            label="y los minutos"
            type='number'
            placeholder='Minutos'
            min="0"
            max="59"
            fluid
            icon="clock outline"
            value={formik.values.endTimeM}
            onChange={formik.handleChange}
            error={formik.errors.endTimeM}
          />
        </Form.Group>





        <Form.Button
          type='submit'
          primary
          fluid
          loading={formik.isSubmitting}
        >
          Crear Nueva Cita
        </Form.Button>

      </Form>
    </div>
  )
}
