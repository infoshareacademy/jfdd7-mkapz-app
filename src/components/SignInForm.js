import React from 'react'
import firebase from 'firebase'
import { withRouter } from 'react-router'
import {
  FormControl,
  Row,
  Form,
  Col,
  Button,
  ControlLabel,
  FormGroup
}
  from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

const formText = {
  color: 'white'
};

const formTextPlaceholder = {
  textAlign: 'center',
};

const formButton = {
  textAlign: 'center',
  borderRadius: '30px',

};

const divStyle = {
  marginBottom: '2em',
  marginTop: '2em',
};

class SignInForm extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleEmailChange = event => {
    this.setState({
      email: event.target.value
    })
  }

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    firebase.auth().signInWithEmailAndPassword(
      this.state.email,
      this.state.password
    ).then(
      () => this.props.history.push('/')
    )
  }

  render() {
    return (
      <div

        style={divStyle}
      >
        <h3
          style={{color: 'white'}}
        >
          ZALOGUJ SIĘ
        </h3>
        <FontAwesome
          className="fa fa-sign-in"
          size='5x'
          style={{marginTop: '0.4em', marginBottom: '0.85em'}}
        />
        <Row>
          <Form onSubmit={this.handleSubmit}
                horizontal
          >

            <FormGroup controlId="formHorizontalEmail">
              <Col
                componentClass={ControlLabel}
                sm={2}
                style={formText}
              >
                Email:
              </Col>
              <Col
                sm={8}
              >
                <FormControl
                  type="text"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  placeholder="e-mail"
                  style={formTextPlaceholder}
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col
                componentClass={ControlLabel}
                sm={2}
                style={formText}
              >
                Hasło:
              </Col>

              <Col
                sm={8}
              >
                <FormControl
                  type="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  placeholder="twoje hasło"
                  style={formTextPlaceholder}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col
                smOffset={2}
                sm={8}
              >
                <Button
                  style={formButton}
                  bsStyle="success"
                  type="submit"
                >
                  Zaloguj się
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Row>
      </div>
    )
  }
}

export default withRouter(SignInForm)