import React, { useState, useEffect, useRef } from 'react'
import { Grid, TextArea } from 'semantic-ui-react'
import Slick from 'react-slick'
import { Player, BigPlayButton } from "video-react"
import { map } from "lodash"
import "./SliderVideos.scss"

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    centerMode: true
}

export function SliderVideos(props) {
    const { data } = props
    return (
        <div className='container-slider'>
            <Slick {...settings} className='slider'>
                {map(data, (item) => {
                    const d = item.created_at.seconds
                    const date = convertDate(d)
                    return (
                        <div key={item.id} className='slider__item'>
                            <div className='slider__item-header'>
                                <h3>{item.title}</h3>
                                <p> Fecha de asignacion:<span> {date.toDateString()}</span></p>
                            </div>
                            <div className='slider__item-player'>
                                <Grid divided='vertically'>
                                    <Grid.Row columns={2}>
                                        <Grid.Column>
                                            <Player
                                                playsInline
                                                src={item.file}
                                                fluid={false}
                                            >
                                                <BigPlayButton position="center" />
                                            </Player>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <TextArea disabled value={item.description} />
                                        </Grid.Column>
                                    </Grid.Row>

                                </Grid>

                            </div>
                        </div>
                    )
                })}
            </Slick >
        </div>
    )
}

function convertDate(utcSeconds) {
    let timestamp = utcSeconds * 1000
    let d = new Date(timestamp);
    return d
}
