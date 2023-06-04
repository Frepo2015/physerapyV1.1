import React from 'react'
import { Grid, Loader } from "semantic-ui-react";
import { map, size } from "lodash"
import { Link } from "react-router-dom"; 
import "./ListPacientes.scss"

export function ListPacientes(props) {
    const { pacientes } = props;

    if (size(pacientes) === 0) {
        return (
            <Loader active inline="centered" size='large' >
                Cargando

            </Loader>
        )
    }

    return (
        <Grid className='list-pacientes'>
            <Grid.Row columns={5}>
                {map(pacientes, (paciente) => (
                    <Grid.Column key={paciente.id} as={Link} to={`/paciente/${paciente.id}`} className='list-pacientes__paciente'>
                        <div style={{backgroundImage: `url(${paciente.image})`}} />
                        <p>{paciente.nombre}</p>
                    </Grid.Column>
                ))}
            </Grid.Row>

        </Grid>
    );
}
