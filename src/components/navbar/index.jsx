import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from './ioRecipesLogo.svg';
import { Link } from 'react-router-dom';

const DGNavbar = ({token}) => {
  return(
    <Navbar bg="dark" variant="dark" >
      <Navbar.Brand href="https://iorecipes.com">
        <img
          alt=""
          src={logo}
          height="30"
          className="d-inline-block align-top"
        />{' '} ____ 
        Starter Project 
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          {token && 
      <Link to='/logout'>Logout</Link>
          }
          {!token && 
      <Link to='/login'>Login</Link>
          }
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default DGNavbar;


