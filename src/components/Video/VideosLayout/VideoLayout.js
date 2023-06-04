import React, { useState } from 'react'
import { ShowVideo } from '../../Video'
import { BasicModal } from "../../Shared"
import { AddVideoForm, DeleteVideoForm } from '../../Video'
import { Button, Grid } from 'semantic-ui-react'
import './VideoLayout.scss'

export function VideoLayout(props) {
    const { idPaciente } = props
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("")
    const [contentModal, setContentModal] = useState(null);

    const closeModal = () => {
        setShowModal(false);
        setTitleModal("");
        setContentModal(null);
    }

    const openModal = (type) => {
        if (type === "addVideo") {
            setTitleModal("Agregar Video");
            setContentModal(<AddVideoForm onClose={closeModal} idPaciente={idPaciente} />);
        }
        if (type === "deleteVideo") {
            setTitleModal("Eliminar Video");
            setContentModal(<DeleteVideoForm onClose={closeModal} idPaciente={idPaciente} />);
        }

        setShowModal(true);
    }
    return (
        <>
            <div>

                <ShowVideo idPaciente={idPaciente} />
                <Grid divided='vertically'>
                    <Grid.Row centered columns={2}>
                        <Grid.Column>
                            <Button fluid color='green' onClick={() => openModal("addVideo")}>
                                Añadir un video
                            </Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Button fluid  color='red' onClick={() => openModal("deleteVideo")}>
                                Eliminar un video
                            </Button>
                        </Grid.Column>


                    </Grid.Row>

                </Grid>


            </div>

            <BasicModal
                show={showModal}
                onClose={closeModal}
                title={titleModal}
                children={contentModal}
            />
        </>
    )
}
