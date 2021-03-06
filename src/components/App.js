import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import "./App.css";
import MainMenu from "./MainMenu";
import SearchResults from "./SearchResults";
import EventCategories from "./EventCategories";
import EventDetails from "./EventDetails";
import DetailsMap from "./DetailsMap";
import EventCalendar from "./EventCalendar";
import {Grid, Row} from "react-bootstrap";
import SearchEngine from './SearchEngine';
import EventDetail from './EventDetail';
import AdditionalSearches from './AdditionalSearches';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import { connect } from 'react-redux'
import Footer from './Footer'

const App = ({user}) => (
  <Router>
    <div className="App">
      <div>
        <MainMenu/>
        <h3 style={{color: 'white', marginTop: '2em'}}>
            {user === null ? '':
                <h3 style={{color: 'white', marginTop: '4em'}}>{'Cześć ' + user.email}</h3>
            }
        </h3>
        <SearchEngine/>
        <Grid>
          <hr/>
        </Grid>
        <Route exact path="/" component={() => (
          <Grid>
            <AdditionalSearches/>
            <Row>
              <SearchResults/>
            </Row>
          </Grid>
        )}/>
        <Route path="/kategorie" component={EventCategories}/>
        <Route path="/kalendarz" component={EventCalendar}/>
        <Route path="/wydarzenia" component={EventCategories}/>
        <Route exact path="/detale" component={EventDetails}/>
        <Route path="/mapa" component={DetailsMap}/>
        <Route path="/signin" component={SignInForm}/>
        <Route path="/signup" component={SignUpForm}/>
        <Route path="/detale/:eventId" component={EventDetail}/>
      </div>
      <div>
      </div>
      <Footer/>
    </div>
  </Router>
);

export default connect(
  state => ({
    user: state.auth.user
  })
)(App)