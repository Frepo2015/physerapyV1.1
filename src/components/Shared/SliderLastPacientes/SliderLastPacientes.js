import React from 'react'
import Slick from 'react-slick';
import { Image, Loader, Grid } from 'semantic-ui-react'
import { map, size } from "lodash";
import { Link, } from "react-router-dom";
import "./SliderLastPacinetes.scss"

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    swipeToSlide: true,
    centerMode: true
}


export function SliderLastPacientes(props) {
    const { data } = props;
    if (size(data) === 0) {
        return (
            <Loader active inline="centered" size='large' >
                Cargando

            </Loader>
        )
    }
    return (
        <div>
            <Slick {...settings} className='slider' >
                {map(data, (item) => {
                    return (
                        <Grid.Column key={item.id} as={Link} to={`/paciente/${item.id}`}>
                            <div  className='slider__item'>
                                <Image src={item.image} />
                                <p>{item.nombre}</p>
                            </div>
                        </Grid.Column>
                    )
                })}

            </Slick>
        </div>
    )
}
