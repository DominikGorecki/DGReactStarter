import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

const Logout = ({ setToken, history }) => {
  useEffect(() => {
    setToken(null);
    Cookies.remove('JWT');
    history.push('/login');
  },[]);

  return (
    <div>Logging Out</div>
  );
};

export default Logout;
