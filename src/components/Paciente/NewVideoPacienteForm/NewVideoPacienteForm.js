import React from 'react'
import classNames from 'classnames'
import { Form, Image, Label } from 'semantic-ui-react'
import { useFormik } from 'formik'
import './NewVideoPacienteForm.scss'

export function NewVideoPacienteForm() {
    return (
        <div>
            <Form className='add-video-form'>
                <Label>Añadir video</Label>
                <div className='add-video-form__content'>
                    <div className={classNames("add-video-form__content-image", {
                        error: false
                    })}>
                        {/* <input /> */}
                        <Image src={null} className={classNames({ full: null })} />

                    </div>
                    <div className='add-video-form__content-inputs'>
                    <Form.Input
                        name='titulo'
                        label='Titulo del video'
                        placeholder='Ingresa el titulo del video.'

                    />

                    <Form.TextArea
                        name='descripcion'
                        label='Descripcion del video'
                        placeholder='Ingresa una descripcion del video.'

                    />

                    </div>
                    
                </div>

            </Form>

        </div>
    )
}
