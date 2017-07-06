/**
 * Created by tomaszwojcik on 05.07.17.
 */
import React from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import {Grid,
  Row,
  Col,} from 'react-bootstrap'

export default class TimeSlider extends React.Component {
  render() {
    return (
      <Col xs={12} sm={6}><h2>Wybierz datę</h2>
        <Slider/>
      </Col>
    )
  }
}
