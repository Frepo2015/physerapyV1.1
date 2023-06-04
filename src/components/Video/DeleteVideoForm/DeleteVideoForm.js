import React, { useState, useEffect } from 'react';
import { Form } from "semantic-ui-react";
import { Video, Storage } from "../../../api"
import { useFormik } from 'formik'; 
import { initialValues, validationSchema } from "./DeleteVideoForm.data"
import { map, split } from 'lodash'
import Swal from "sweetalert2"
import { Player, BigPlayButton } from 'video-react'

const videoController = new Video();
const storageController = new Storage();
export function DeleteVideoForm(props) {

  const { onClose, idPaciente } = props;
  const [videos, setVideos] = useState(null);
  const [videoPath, setVideoPath] = useState("");
  const videoOptions = []

  useEffect(() => {
    (async () => {
      try {
        const response = await videoController.obtainAllByPx(idPaciente);
        setVideos(response)
      } catch (error) {
        console.error(error);
      }
    })()
  }, [idPaciente])

  map(videos, (item) => {
    const video = {
      key: item.id,
      text: item.title,
      value: {id: item.id, url: item.file},
      src: item.file
    }
    videoOptions.push(video);
  })

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {

      try {
        Swal.fire({
          title: '¿Esta seguro que desea eliminar el video?',
          text: "Al confirmar se guardaran los cambios",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar video'
        }).then((result) => {
          if (result.isConfirmed) {
            const { videosDropdown } = formValue
            const response = videoController.deleteVideo(videosDropdown.id);
            const response2 = storageController.deleteFile(videosDropdown.url);
            onClose();
          }
        })
        
      } catch (error) {
        console.error(error);
      }
    }
  })


  return (
    <Form className='delete-video-form'  onSubmit={formik.handleSubmit}>

      <Form.Dropdown
        label="Videos"
        name='videosDropdown'
        placeholder='Seleccione el video a eliminar'
        options={videoOptions}
        search
        selection
        value={formik.values.videosDropdown}
        onChange={(_, data) => {formik.setFieldValue('videosDropdown', data.value)}}
        error={formik.errors.videosDropdown}

        />

      <Form.Button type='submit' fluid primary loading={formik.isSubmitting}>
        Eliminar Video
      </Form.Button>
    </Form>
  )
}
