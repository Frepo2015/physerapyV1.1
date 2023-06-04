import React, { useState, useCallback } from 'react';
import { Checkbox, Form, Image, Label } from "semantic-ui-react"
import { useDropzone } from "react-dropzone";
import { Storage, Paciente } from "../../../api"
import { v4 as uuidv4 } from "uuid"
import { escalaDolor, defaultUser } from "../../../assets"
import { useFormik } from "formik"
import classNames from 'classnames';
import { initialValues, validationSchema } from "./NewPacienteForm.data"
import "./NewPacienteForm.scss";

const storageController = new Storage();
const pacienteController = new Paciente();


const escalaOptions = [
    { key: "0", value: "Dolor Inexistente", text: "0 - Dolor Inexistente" },
    { key: "1", value: "Dolor muy leve", text: "1 - Dolor muy leve" },
    { key: "2", value: "Molestia", text: "2 - Molestia" },
    { key: "3", value: "Dolor tolerabe", text: "3 - Dolor tolerabe" },
    { key: "4", value: "Dolor angustiante", text: "4 - Dolor angustiante" },
    { key: "5", value: "Dolor muy angustiante", text: "5 - Dolor muy angustiante" },
    { key: "6", value: "Dolor Intenso", text: "6 - Dolor Intenso" },
    { key: "7", value: "Dolor muy intenso", text: "7 - Dolor muy intenso" },
    { key: "8", value: "Dolor Horrible", text: "8 - Dolor Horrible" },
    { key: "9", value: "Dolor Insoportable", text: "9 - Dolor Insoportable" },
    { key: "10", value: "Dolor Indescriptible", text: "10 - Dolor Indescriptible" },

]


const genderOptions = [
    { key: "M", text: "Masculino", value: "Masculino" },
    { key: "F", text: "Femenino", value: "Femenino" },
    { key: "O", text: "Otro", value: "Otro" }
]

const eCivilOptions = [
    { key: "S", text: "Soltero", value: "Soltero" },
    { key: "C", text: "Casado", value: "Casado" },
    { key: "V", text: "Viudo", value: "Viudo" },
    { key: "O", text: "Otro", value: "Otro" }
]

export function NewPacienteForm(props) {
    const { onClose } = props;
    const [image, setImage] = useState(null)

    const onDrop = useCallback(async (acceptedFile) => {
        const file = acceptedFile[0];
        setImage(URL.createObjectURL(file));
        formik.setFieldValue("file", file)
    });

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValues) => {
            try {
                const { file, nombre, fechaNacimiento, genero, domicilio, peso, 
                    estatura, motivoConsulta, tratamientosPrevios, diabetes, inputDiabetes, alergia,
                    inputAlergia, cardiopatias, inputCardiopatias, cancer, inputCancer,
                    cirugias, inputCirugias, transfusiones, inputTransfusiones, fracturas, inputFracturas, 
                    enfReumaticas, inputEnfReumaticas, espContraMus, inputEsp, tabaquismo, inputTabaquismo, actividadFisica,
                    inputActividadFisica, alcoholismo, inputAlcoholismo, automedica, inputAutomedica, drogas, inputDrogas,
                    pasatiempo, inputPasatiempo, marcha, observacionesMarcha, escalaDolor } = formValues;
                const response = await storageController.uploadFile(file, "paciente", uuidv4());
                const url = await storageController.getUrlFile(response.metadata.fullPath);
                await pacienteController.create(url, nombre, fechaNacimiento, genero, domicilio, peso, 
                    estatura, motivoConsulta, tratamientosPrevios, diabetes, inputDiabetes, alergia,
                    inputAlergia, cardiopatias, inputCardiopatias, cancer, inputCancer,
                    cirugias, inputCirugias, transfusiones, inputTransfusiones, fracturas, inputFracturas, 
                    enfReumaticas, inputEnfReumaticas, espContraMus, inputEsp, tabaquismo, inputTabaquismo, actividadFisica,
                    inputActividadFisica, alcoholismo, inputAlcoholismo, automedica, inputAutomedica, drogas, inputDrogas,
                    pasatiempo, inputPasatiempo, marcha, observacionesMarcha, escalaDolor);
                    onClose();
            } catch (error) {
                console.error(error)
            }
        }
    })


    return (

        <Form onSubmit={formik.handleSubmit} className='new-paciente-form' >

            <div {...getRootProps()} className={classNames("new-paciente-form__banner", {
                error: formik.errors.file,
            })}>
                <input {...getInputProps()} />
                <Image src={image || defaultUser} className={classNames({ full: image })} />
            </div>

            <Label color='orange' ribbon>
                Datos del paciente
            </Label>
            <Form.Group widths='equal'>
                <Form.Input
                    label="Nombre completo"
                    name="nombre"
                    placeholder="Nombre del paciente"
                    fluid
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    error={formik.errors.nombre}
                />

                <Form.Input
                    label="Fecha de nacimiento"
                    name="fechaNacimiento"
                    placeholder="(DD/MM/AAAA)"
                    fluid
                    value={formik.values.fechaNacimiento}
                    onChange={formik.handleChange}
                    error={formik.errors.fechaNacimiento}
                />
            </Form.Group>

            <Form.Group widths='equal'>

                <Form.Dropdown
                    label="Genero"
                    name='genero'
                    placeholder='Escoge un genero'
                    options={genderOptions}
                    selection
                    search
                    value={formik.values.genero}
                    error={formik.errors.genero}
                    onChange={(_, data) => formik.setFieldValue('genero', data.value)}

                />

                <Form.Input
                    label="Domicilio"
                    name="domicilio"
                    placeholder="Calle, Numero, Colonia"
                    fluid
                    onChange={formik.handleChange}
                    value={formik.values.domicilio}
                    error={formik.errors.domicilio}
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input
                    label="Numero de contacto"
                    name="tel"
                    placeholder="Numero de contacto"
                    fluid
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    error={formik.errors.nombre}
                />

                <Form.Input
                    label="Ocupación"
                    name="ocupacion"
                    placeholder="Ocupacion del paciente"
                    fluid
                    value={formik.values.fechaNacimiento}
                    onChange={formik.handleChange}
                    error={formik.errors.fechaNacimiento}
                />
            </Form.Group>
            <Form.Group widths='equal'>
            <Form.Dropdown
                    label="Estado civil"
                    name='eCivil'
                    placeholder='Estado civil del paciente'
                    options={eCivilOptions}
                    selection
                    search
                    value={formik.values.genero}
                    error={formik.errors.genero}
                    onChange={(_, data) => formik.setFieldValue('genero', data.value)}

                />

                <Form.Input
                    label="Escolaridad"
                    name="escolariadd"
                    placeholder="Ocupacion del paciente"
                    fluid
                    value={formik.values.fechaNacimiento}
                    onChange={formik.handleChange}
                    error={formik.errors.fechaNacimiento}
                />
            </Form.Group>

            <Label color='orange' ribbon>
                Exploracion Fisica
            </Label>

            <Form.Group widths='equal'>
                <Form.Input
                    label='Peso'
                    name="peso"
                    placeholder="Peso (Kg)"
                    fluid
                    onChange={formik.handleChange}
                    value={formik.values.peso}
                    error={formik.errors.peso}
                />
                <Form.Input
                    label='Estatura'
                    name="estatura"
                    placeholder="Estatura (M)"
                    fluid
                    onChange={formik.handleChange}
                    value={formik.values.estatura}
                    error={formik.errors.estatura}
                />

            </Form.Group>
            

            <Label color='orange' ribbon>
                Otros datos
            </Label>

            <Form.Group widths='equal'>
                <Form.TextArea
                    label="Motivo de la consulta"
                    name="motivoConsulta"
                    placeholder="Describir el motivo por el cual acude a la consulta"
                    onChange={formik.handleChange}
                    value={formik.values.motivoConsulta}
                    error={formik.errors.motivoConsulta}
                />
            </Form.Group>

            <Form.Group widths='equal'>
                <Form.TextArea
                    label="Tratamientos previos"
                    name="tratamientosPrevios"
                    placeholder="Describir si ha tenido tratamientos previos relacionados al motivo de la consulta"
                    onChange={formik.handleChange}
                    value={formik.values.tratamientosPrevios}
                    error={formik.errors.tratamientosPrevios}
                />

            </Form.Group>

            <Label color='orange' ribbon>
                Antecedentes patológicos y heredofamiliares
            </Label>

            <Form.Group widths='equal'>
                <Form.Checkbox
                    label="Diabetes"
                    name='diabetes'
                    onChange={(_, data) => formik.setFieldValue("diabetes", data.checked)}
                    checked={formik.values.diabetes}
                    error={formik.errors.diabetes}
                />
                <Form.Input
                    name="inputDiabetes"
                    placeholder='Especifique'
                    fluid
                    onChange={formik.handleChange}
                    checked={formik.values.inputDiabetes}
                    error={formik.errors.inputDiabetes}
                />
                <Form.Checkbox
                    label="Accidentes"
                    name='accidentes'
                    onChange={(_, data) => formik.setFieldValue("accidentes", data.checked)}
                    checked={formik.values.accidentes}
                    error={formik.errors.accidentes}
                />
                <Form.Input
                    name="inputAccidentes"
                    placeholder='Especifique'
                    fluid
                    onChange={(formik.handleChange)}
                    value={formik.values.inputAccidentes}
                    error={formik.errors.inputAccidentes}
                />

            </Form.Group>

            <Form.Group widths='equal'>
                <Form.Checkbox
                    label="Alergia"
                    name='alergia'
                    onChange={(_, data) => formik.setFieldValue("alergia", data.checked)}
                    checked={formik.values.alergia}
                    error={formik.errors.alergia}
                />
                <Form.Input
                    name="inputAlergia"
                    placeholder='Especifique'
                    fluid
                    onChange={formik.handleChange}
                    value={formik.values.inputAlergia}
                    error={formik.errors.inputAlergia}
                />

                <Form.Checkbox
                    label="Cardiopatías"
                    name='cardiopatias'
                    onChange={(_, data) => formik.setFieldValue("cardiopatias", data.checked)}
                    checked={formik.values.cardiopatias}
                    error={formik.errors.cardiopatias}
                />
                <Form.Input
                    name="inputCardiopatias"
                    placeholder='Especifique'
                    fluid
                    onChange={formik.handleChange}
                    value={formik.values.inputCardiopatias}
                    error={formik.errors.inputCardiopatias}
                />
            </Form.Group>

            <Form.Group widths='equal'>
                <Form.Checkbox
                    label="Cáncer"
                    name='cancer'
                    onChange={(_, data) => formik.setFieldValue("cancer", data.checked)}
                    checked={formik.values.cancer}
                    error={formik.errors.cancer}
                />
                <Form.Input
                    name="inputCancer"
                    placeholder='Especifique'
                    fluid
                    onChange={formik.handleChange}
                    value={formik.values.inputCancer}
                    error={formik.errors.inputCancer}
                />

                <Form.Checkbox
                    label="Cirugías"
                    name='cirugias'
                    onChange={(_, data) => formik.setFieldValue("cirugias", data.checked)}
                    checked={formik.values.cirugias}
                    error={formik.errors.cirugias}
                />
                <Form.Input
                    name="inputCirugias"
                    placeholder='Especifique'
                    fluid
                    onChange={formik.handleChange}
                    value={formik.values.inputCirugias}
                    error={formik.errors.inputCirugias}
                />
            </Form.Group>

            <Form.Group widths='equal'>
                <Form.Checkbox
                    label="Transfusiones"
                    name='transfusiones'
                    onChange={(_, data) => formik.setFieldValue("transfusiones", data.checked)}
                    checked={formik.values.transfusiones}
                    error={formik.errors.transfusiones}
                />
                <Form.Input
                    name="inputTrasnfusiones"
                    placeholder='Especifique'
                    fluid
                    onChange={formik.handleChange}
                    value={formik.values.inputTransfusiones}
                    error={formik.errors.inputTransfusiones}
                />
                <Form.Checkbox
                    label="Fracturas"
                    name='fracturas'
                    onChange={(_, data) => formik.setFieldValue("fracturas", data.checked)}
                    checked={formik.values.fracturas}
                    error={formik.errors.fracturas}
                />
                <Form.Input
                    name="inputFracturas"
                    placeholder='Especifique'
                    fluid
                    onChange={formik.handleChange}
                    value={formik.values.inputFracturas}
                    error={formik.errors.inputFracturas}
                />
            </Form.Group>

            <Form.Group widths='equal'>
                <Form.Checkbox
                    label="Enf. Reumáticas"
                    name='enfReumaticas'
                    onChange={(_, data) => formik.setFieldValue("enfReumaticas", data.checked)}
                    checked={formik.values.enfReumaticas}
                    error={formik.errors.enfReumaticas}
                />
                <Form.Input
                    name="inputEnfReumaticas"
                    placeholder='Especifique'
                    fluid
                    onChange={formik.handleChange}
                    value={formik.values.inputEnfReumaticas}
                    error={formik.errors.inputEnfReumaticas}
                />
                <Form.Checkbox
                    label="Espasmos o Contractura Muscular"
                    name='espContraMus'
                    onChange={(_, data) => formik.setFieldValue("espContraMus", data.checked)}
                    checked={formik.values.espContraMus}
                    error={formik.errors.espContraMus}
                />
                <Form.TextArea
                    name="inputEsp"
                    placeholder='Especifique'
                    onChange={formik.handleChange}
                    value={formik.values.inputEsp}
                    error={formik.errors.inputEsp}
                />
            </Form.Group>

            <Label color='orange' ribbon>
                Hábitos de salud
            </Label>
            <Form.Group widths='equal'>
                <Form.Checkbox
                    label="Tabaquismo"
                    name='tabaquismo'
                    onChange={(_, data) => formik.setFieldValue("tabaquismo", data.checked)}
                    checked={formik.values.tabaquismo}
                    error={formik.errors.tabaquismo}
                />
                <Form.Input
                    name="inputTabaquismo"
                    placeholder='Especifique'
                    fluid
                    onChange={formik.handleChange}
                    value={formik.values.inputTabaquismo}
                    error={formik.errors.inputTabaquismo}
                />
                <Form.Checkbox
                    label="Actividad Fisica"
                    name='actividadFisica'
                    onChange={(_, data) => formik.setFieldValue("actividadFisica", data.checked)}
                    checked={formik.values.actividadFisica}
                    error={formik.errors.actividadFisica}
                />
                <Form.Input
                    name="inputActividadFisica"
                    placeholder='Especifique'
                    fluid
                    onChange={formik.handleChange}
                    value={formik.values.inputActividadFisica}
                    error={formik.errors.inputActividadFisica}
                />
            </Form.Group>

            <Form.Group widths='equal'>
                <Form.Checkbox
                    label="Alcoholismo"
                    name='alcoholismo'
                    onChange={(_, data) => formik.setFieldValue("alcoholismo", data.checked)}
                    checked={formik.values.alcoholismo}
                    error={formik.errors.alcoholismo}
                />
                <Form.Input
                    name="inputAlcoholismo"
                    placeholder='Especifique'
                    fluid
                    onChange={formik.handleChange}
                    value={formik.values.inputAlcoholismo}
                    error={formik.errors.inputAlcoholismo}
                />
                <Form.Checkbox
                    label="Se automedica"
                    name='automedica'
                    onChange={(_, data) => formik.setFieldValue('automedica', data.checked)}
                    checked={formik.values.automedica}
                    error={formik.errors.automedica}
                />
                <Form.Input
                    name="inputAutomedica"
                    placeholder='Especifique'
                    fluid
                    onChange={formik.handleChange}
                    value={formik.values.inputAutomedica}
                    error={formik.errors.inputAutomedica}
                />
            </Form.Group>

            <Form.Group widths='equal'>
                <Form.Checkbox
                    label="Drogas"
                    name='drogas'
                    onChange={(_, data) => formik.setFieldValue('drogas', data.checked)}
                    checked={formik.values.drogas}
                    error={formik.errors.drogas}
                />
                <Form.Input
                    name="inputDrogas"
                    placeholder='Especifique'
                    fluid
                    onChange={formik.handleChange}
                    value={formik.values.inputDrogas}
                    error={formik.errors.inputDrogas} />
                <Form.Checkbox
                    label="Pasatiempo"
                    name='pasatiempo'
                    onChange={(_, data) => formik.setFieldValue('pasatiempo', data.checked)}
                    checked={formik.values.pasatiempo}
                    error={formik.errors.pasatiempo}
                />
                <Form.Input
                    name="inputPasatiempo"
                    placeholder='Especifique'
                    fluid
                    onChange={formik.handleChange}
                    value={formik.values.inputPasatiempo}
                    error={formik.errors.inputPasatiempo}
                />
            </Form.Group>

            <Label color='orange' ribbon>
                Marcha / Deambulación
            </Label>
            <Form.Group widths='equal'>
                <Form.Field
                    control='input'
                    type='radio'
                    label="Libre"
                    name='marcha'
                    value='Libre'
                    onChange={formik.handleChange}
                    error={formik.errors.marcha}

                />

                <Form.Field
                    control='input'
                    type='radio'
                    label="Espáticas"
                    value='Espáticas'
                    name='marcha'
                    onChange={formik.handleChange}
                    error={formik.errors.marcha}

                />
                <Form.Field
                    control='input'
                    type='radio'
                    value="Claudicante"
                    label="Claudicante"
                    name='marcha'
                    onChange={formik.handleChange}
                    error={formik.errors.marcha}

                />

            </Form.Group>

            <Form.Group widths='equal'>
                <Form.Field
                    control='input'
                    type='radio'
                    value='Atáxica'
                    label="Atáxica"
                    name='marcha'
                    onChange={formik.handleChange}
                    error={formik.errors.marcha}

                />

                <Form.Field
                    control='input'
                    type='radio'
                    value='Con ayuda'
                    label="Con ayuda"
                    name='marcha'
                    onChange={formik.handleChange}
                    error={formik.errors.marcha}

                />
                <Form.Field
                    control='input'
                    type='radio'
                    value='Otros'
                    label="Otros"
                    name='marcha'
                    onChange={formik.handleChange}
                    error={formik.errors.marcha}

                />
            </Form.Group>

            <Form.TextArea
                name="observacionesMarcha"
                label='Observaciones'
                placeholder='Especifique'
                onChange={formik.handleChange}
                value={formik.values.observacionesMarcha}
                error={formik.errors.observacionesMarcha}
            />

            <Label color='orange' ribbon>
                Escala de dolor
            </Label>

            <Form.Group widths='equal' >

                <Form.Dropdown
                    label="Escala de dolor"
                    name='escalaDolor'
                    placeholder='Selecciona escala de dolor'
                    options={escalaOptions}
                    selection
                    value={formik.values.escalaDolor}
                    error={formik.errors.escalaDolor}
                    onChange={(_, data) => formik.setFieldValue('escalaDolor', data.value)}

                />

            </Form.Group>

            <Image src={escalaDolor} />





            <Form.Button
                type='submit'
                primary
                fluid
                loading={formik.isSubmitting}>
                Crear expediente
            </Form.Button>
        </Form>

    )
}
