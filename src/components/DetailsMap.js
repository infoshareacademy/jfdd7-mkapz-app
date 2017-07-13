import React from "react";
import GoogleMapReact from "google-map-react";
import {connect} from "react-redux";
import {fetchDetailsMap} from "../state/detailsmap";
import "./DetailsMap.css";
import FontAwesome from "react-fontawesome";


const AnyReactComponent = ({text, $hover}) => <div><span style={{display: $hover ? 'inline' : 'none'}}>{text}</span><FontAwesome className="fa fa-map-marker" size='5x' /></div>;

export default connect(
  state => ({
    detailsmap: state.detailsmap
  }),
  dispatch => ({
    fetchDetailsMap: () => dispatch(fetchDetailsMap())
  })
)(
  class DetailsMap extends React.Component {

    static defaultProps = {
      center: {lat: 20.4033754, lng: 18.5700186},
      zoom: 14
    };

    componentWillMount() {
      this.props.fetchDetailsMap()
    }

    render() {
      const {data, fetching, error} = this.props.detailsmap;
      return (
        <div>
          { error === null ? null : <p>{error.message}</p> }
          {
            fetching === false ? null : <p>Fetching data...</p>
          }
          <div className="center-block" style={{maxWidth:'100%', height: 600,}}>
            <GoogleMapReact
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              hoverDistance={10}
            >
              {
                data !== null && data.map(
                  event => (


                    <AnyReactComponent
                      lat={parseFloat(event.lat)}
                      lng={parseFloat(event.lng)}
                      text={event.place}
                    />

                  )
                )
              }
            </GoogleMapReact>
          </div>
        </div>
      )
    }
  }
)



