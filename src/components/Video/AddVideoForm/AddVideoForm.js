import React, { useState, useCallback } from 'react'
import { Form, Icon } from 'semantic-ui-react'
import classNames from 'classnames'
import { useFormik } from 'formik'
import { useDropzone } from 'react-dropzone'
import { Storage, Video } from '../../../api'
import { v4 as uuidv4 } from 'uuid'
import { initialValues, validationSchema } from './AddVideoForm.data'
import './AddVideoForm.scss'

const storageController = new Storage();
const videoController = new Video();

export function AddVideoForm(props) {
    const { onClose, idPaciente } = props;
    const [videoName, setVideoName] = useState("");

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const { title, description, file } = formValue;
                const response = await storageController.uploadFile(
                    file,
                    "video",
                    uuidv4());

                const url = await storageController.getUrlFile(response.metadata.fullPath);

                await videoController.create(title, description, url, idPaciente);
                onClose();
            } catch (error) {
                console.error(error)
            }
        }
    });

    const onDrop = useCallback(async (acceptedFile) => {
        const file = acceptedFile[0];
        setVideoName(file.name)
        formik.setFieldValue('file', file);
        formik.setFieldValue('title', file.name);
    });

    const { getRootProps, getInputProps } = useDropzone({ onDrop })


    return (
            <Form className='add-video-form' onSubmit={formik.handleSubmit}>

                <Form.Input
                    label="Titulo del video"
                    placeholder="Ingrese el titulo del video"
                    name='title'
                    fluid
                    
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.errors.title}

                />

                <Form.TextArea

                    label="Descripcion del video"
                    placeholder="Ingrese una descripcion del video"
                    name='description'
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.errors.description}
                />

                <div
                    {...getRootProps()}
                    className={classNames("add-video-form__file", {
                        error: formik.errors.file,
                    })}>

                    <input {...getInputProps()} />
                    <Icon name='cloud upload' />

                    <div>
                        <p>Arrastra el video o haz click <span>aquí</span></p>

                        {videoName && <p className='video-name'>{videoName}</p>}

                    </div>

                </div>

                <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
                    Subir Video
                </Form.Button>
            </Form>
    )
}
