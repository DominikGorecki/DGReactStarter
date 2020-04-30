import React, { useEffect, useState } from 'react';
import Media from 'react-bootstrap/Media';
import Spinner from 'react-bootstrap/Spinner';

import { messageApi } from '../../services/api';
import messsageImage from './message.png';

const Main = ({token}) => {
  const [messages, setMessages] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    (async () => {
      try{
        var response = await messageApi(token).get();
        setMessages(response.data);
      }
      catch(e)
      {
        setErrors(e);
      }
    })();

  }, []);

  const renderMessages = () => messages.map((m,i) =>(
    <Media key={m.id}>
      <img 
        width={64}
        className="align-self-start mr-3"
        src={messsageImage}
        alt="Message Icon"
      />
      <Media.Body>
        <h5>From: {m.from}</h5>
        <h5>Subject: {m.subject}</h5>
        <p>{m.message}</p>
      </Media.Body>
    </Media>

  ));


  return(
    <div className="container">
      <h1>Main</h1>
      {!messages && <Spinner animation="border" />}
      {messages && renderMessages()}
    </div>
  );
};

export default Main;