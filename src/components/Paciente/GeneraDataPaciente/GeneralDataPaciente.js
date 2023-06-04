import React from 'react'
import { Grid, Segment, Label } from 'semantic-ui-react'
import "./GeneralDataPaciente.scss"

export function GeneralDataPaciente(props) {
    const { fechaNacimiento, genero, domicilio, peso,
        estatura, diabetes, alergia, cardiopatias, cancer,
        cirugias, transfusiones, fracturas,
        enfReumaticas, espContraMus, tabaquismo, actividadFisica,
        alcoholismo, automedica, drogas,
        pasatiempo, inputDiabetes, inputAlcoholismo, inputAlergia, inputCardiopatias, inputCancer, inputCirugias,
        inputTransfusiones, inputFracturas, inputEnf, inputEsp,
        inputTabaquismo, inputActividadFisica, inputAutomedica,
        inputDrogas, inputPasatiempo, } = props;

    return (
        <div>
            <div className='paciente-generalData'>
                <Grid columns={3} divided>
                    <Grid.Row stretched>
                        <Grid.Column>
                            <Segment>
                                <Label color='orange' ribbon>Datos del paciente</Label>
                                <div className='paciente-generalData__content'>
                                    <p>Fecha de Nacimiento: <br /><span>{fechaNacimiento}</span></p>
                                    <p>Género: <br /><span>{genero}</span></p>
                                    <p>Domicilio: <br /><span>{domicilio}</span></p>
                                    <p>Peso inicial: <br /><span>{peso} kg</span></p>
                                    <p>Estatura: <br /><span>{estatura} m</span></p>
                                </div>
                            </Segment>
                        </Grid.Column>


                        <Grid.Column>
                            <Segment>
                                <Label color='orange' ribbon>Antecedentes patológicos y heredofamiliares</Label>
                                <div className='paciente-generalData__content'>
                                    <p>Diabetes: <br /><span>{verifi(diabetes)}.</span>{inputDiabetes}</p>
                                    <p>Alergias: <br /><span>{verifi(alergia)}.</span>{inputAlergia}</p>
                                    <p>Cardiopatías: <br /><span>{verifi(cardiopatias)}.</span>{inputCardiopatias}</p>
                                    <p>Cáncer: <br /><span>{verifi(cancer)}.</span>{inputCancer}</p>
                                    <p>Transfusiones: <br /><span>{verifi(transfusiones)}.</span>{inputTransfusiones}</p>
                                    <p>Fracturas: <br /><span>{verifi(fracturas)}.</span>{inputFracturas}</p>
                                    <p>Cirugias: <br /><span>{verifi(cirugias)}.</span>{inputCirugias}</p>
                                </div>

                            </Segment>

                            <Segment>
                               
                                <div className='paciente-generalData__content'>
                                    <p>Enfermedades Reumáticas: <br /><span>{verifi(enfReumaticas)}.</span>{inputEnf}</p>
                                    <p>Espasmo o Contracturas Musculares: <br /><span>{verifi(espContraMus)}.</span>{inputEsp}</p>
                                </div>

                            </Segment>
                        </Grid.Column>

                        
                        <Grid.Column>
                            <Segment>
                                <Label color='orange' ribbon>Hábitos de salud</Label>
                                <div className='paciente-generalData__content'>
                                    <p>Tabaquismo: <br /><span>{verifi(tabaquismo)}.</span>{inputTabaquismo}</p>
                                    <p>Alcoholismo: <br /><span>{verifi(alcoholismo)}.</span> {inputAlcoholismo}</p>
                                    <p>Drogas: <br /><span>{verifi(drogas)}.</span>{inputDrogas}</p>
                                    <p>Se automedica: <br /><span>{verifi(automedica)}.</span>{inputAutomedica}</p>
                                    <p>Pasatiempos: <br /><span>{verifi(pasatiempo)}.</span>{inputPasatiempo}</p>
                                </div>
                                <div className='paciente-generalData__content'>
                                    <p>Actividad Fisica: <br /><span>{verifi(actividadFisica)}.</span>{inputActividadFisica}</p>
                                </div>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>


            </div>

        </div>
    )
}

function verifi(check) {
    let v = check ? "Si" : "No";
    return v;

}
