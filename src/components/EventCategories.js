/**
 * Created by tomaszwojcik on 05.07.17.
 */
import React from 'react'
import {ButtonToolbar, Button, Grid, Row, Col} from 'react-bootstrap'
import './EventCategories.css'

const categories = {
  techno: 'Techno',
  rock: 'Rock',
  house: 'House',
  blues: 'Blues',
  drumnbase: 'Drum&Base',
  hipHop: 'HipHop'
}

export default class EventCategories extends React.Component {

  state = {
    activeFilterNames: []
  }

  handleClick = (event) => this.setState({
    activeFilterNames: this.state.activeFilterNames.includes(event.target.dataset.category) ?
      this.state.activeFilterNames.filter(item => item !== event.target.dataset.category) :
      this.state.activeFilterNames.concat(event.target.dataset.category)
  })


  render() {
    return (
      <div className="EventCategories">
        <Grid>
          <Row>
            {
              Object.keys(categories).map(
                key => (
                  <Col xs={4} className="padded">
                    <Button
                      onClick={this.handleClick}
                      bsClass="btn-block btn-warning btn-lg"
                      active={this.state.activeFilterNames.includes(key)}
                      data-category={key}
                    >
                      {categories[key]}
                    </Button>
                  </Col>
                )
              )
            }
          </Row>
        </Grid>
      </div>
    )
  }
}

