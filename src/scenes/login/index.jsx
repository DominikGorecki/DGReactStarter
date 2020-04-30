
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';

const Login = ({setToken, history, isSignedIn}) => {
  return(
    <Container className="pt-2">
      <Row className="justify-content-md-center">
        <Col xs md="10" lg="6">
          {isSignedIn && 
            <span>Already signed in. <Link to="/logout">Logout?</Link></span>}
          {!isSignedIn && <LoginForm setToken={setToken} history={history} /> }
        </Col>
      </Row>
    </Container>
  );
};

export default Login;