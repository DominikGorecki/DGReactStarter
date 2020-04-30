import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from './ioRecipesLogo.svg';

const DGNavbar = () => {
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
    </Navbar>
  );
};

export default DGNavbar;


