import React, { useState, useEffect } from 'react'
import { Video } from "../../../api"
import { SliderVideos } from "../../Shared"
import { size } from "lodash"
import { Loader } from "semantic-ui-react";

const videoController = new Video();

export function ShowVideo(props) {
  const {idPaciente} = props
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    (async () =>{
      try {
        const response = await videoController.obtainAllByPx(idPaciente);
        setVideos(response)
      } catch (error) {
        console.error(error)
      }
    })()
    
  }, [idPaciente])

  if (size(videos) === 0) {
    return (
        <Loader active inline="centered" size='large' >
            Cargando

        </Loader>
    )
}
  
  
  
  return (
    <div>
      <SliderVideos data={videos}/>

    </div>
  )
}
