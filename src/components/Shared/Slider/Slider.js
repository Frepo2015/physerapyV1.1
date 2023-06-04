import React, { useState, useEffect, useRef } from 'react'
import { TextArea } from 'semantic-ui-react'
import Slick from 'react-slick'
import { map } from "lodash"
import "./Slider.scss"

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    centerMode: true
}

export function Slider(props) {
    const { data } = props;
    return (
        <Slick {...settings} className='slider'>
            {map(data, (item) => {
                const d = item.create_at.seconds
                const date = convertDate(d)
                return (
                    <div key={item.id} className='slider__item'>
                        <div className='slider__item-header'>
                            <h3>{item.title}</h3>
                            <p> Fecha de la consulta:<span> {date.toDateString()}</span></p>
                        </div>
                        <div className='slider__item-detalles'>
                            <TextArea disabled value={item.notas} ></TextArea>
                        </div>


                    </div>
                )
            })}
        </Slick>
    )
}

function convertDate(utcSeconds) {
    let timestamp = utcSeconds * 1000
    let d = new Date(timestamp);
    return d
}
