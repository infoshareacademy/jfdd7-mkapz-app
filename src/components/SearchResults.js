/**
 * Created by tomaszwojcik on 05.07.17.
 */
import React from 'react'
import {connect} from 'react-redux'
import {
  Grid,
  Row,
  Col,
  Thumbnail,
  Button
} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './SearchResults.css'
import {fetchSearchResults} from '../state/searchresults'
import moment from 'moment'
import {favEvent} from '../state/favevent'
import { removeEvent} from '../state/favevent'
import geolib from 'geolib'
import categories from '../_utils/categories'

const removeFavButton = {
    textAlign: 'center',
    borderRadius: '30px',

};

const AddtoFavButton = {
    textAlign: 'center',
    borderRadius: '30px',
};


export default connect(
  state => ({
    searchresults: state.searchresults,
    location: state.searchFilters.location,
    searchDate: state.searchFilters.searchDate,
    searchPhrase: state.searchengine.searchPhrase,
    activeCategoryNames: state.categoryButtons.activeCategoryNames,
    favouriteEventIds: state.favevent.eventIds || [],
    coords: state.geolocation.position,
    user: state.auth.user
  }),
  dispatch => ({
    fetchSearchResults: () => dispatch(fetchSearchResults()),
    addToFav: id => dispatch(favEvent(id)),
    removeFromFav: id => dispatch(removeEvent(id))
  })
)(
  class SearchResults extends React.Component {

    componentWillMount() {
      this.props.fetchSearchResults()
    }

    render() {
      const locationCurrent = this.props.coords
      if (this.props.coords === null) {
        return <p>Loading data...</p>
      }
      console.log(locationCurrent.lat)


      const {data, fetching, error} = this.props.searchresults
      const words = this.props.searchPhrase.split(' ').map(word => word.toLowerCase())
      return (
        <div className="mainresults">
          <Grid>
            <Row>
              { error === null ? null : <p>{error.message}</p> }
              { fetching === false ? null : <p>Fetching data...</p>}
              {
                data !== null && data.filter(
                  item => geolib.getDistance(
                    {latitude: locationCurrent.lat, longitude: locationCurrent.lng},
                    {latitude: item.lat, longitude: item.lng },
                    100, 1
                  ) / 1000 < this.props.location
                ).filter(
                  item => moment(item.startdate).isAfter(
                    moment().add(this.props.searchDate, 'days'))
                ).filter(
                  event => words.every(
                    word => [event.city, event.place, event.category].map(n => n.toLowerCase()).some(item => item.includes(word))
                  )
                ).filter(
                  event => this.props.activeCategoryNames.length === 0 ?
                    true :
                    this.props.activeCategoryNames.includes(
                      Object.keys(categories).find(key => categories[key] === event.category)
                    )
                ).map(
                  event => {
                    console.log(this.props.favouriteEventIds)
                    console.log(event.id)
                    return (
                      <Col xs={12} md={6}>
                        <Thumbnail src={event.image}>
                          <h2>Impreza: {event.category}</h2>
                          <h3>Kiedy: {event.startdate} | Godzina: {event.starttime}</h3>
                          <h4>Za ile wjazd: {event.cost} PLN | Jak
                            daleko: {
                              geolib.getDistance(
                                {latitude: locationCurrent.lat, longitude: locationCurrent.lng},
                                {latitude: event.lat, longitude: event.lng },
                                100, 1
                              ) / 1000
                            }
                            km</h4>
                          <p>{event.place} | {event.city}</p>
                          <p>
                            <Link to={'/detale/' + event.id}>
                              <Button bsStyle="primary">Zobacz szczegóły</Button>
                            </Link>&nbsp;
                            {this.props.favouriteEventIds[event.id] ?
                              <Button onClick={() => this.props.removeFromFav(event.id)}
                                      bsStyle="danger"
                                      style = {removeFavButton}
                              >Usuń z kalendarza
                              </Button>:
                              this.props.user === null ?
                                <Link to={'/kalendarz'}>
                                <Button
                                    bsStyle="success"
                                    style = {AddtoFavButton}
                                >Dodaj do kalendarza</Button>
                                </Link>:
                              <Button
                                  onClick={() => this.props.addToFav(event.id)}
                                  bsStyle="success"
                                  style = {AddtoFavButton}
                              >Dodaj do kalendarza</Button>
                            }
                          </p>
                        </Thumbnail>
                      </Col>
                    )
                  }
                )
              }
            </Row>
          </Grid>
        </div>
      )
    }
  }
)