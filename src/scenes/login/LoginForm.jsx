import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import FormControl from '../../components/form/FormControl';
import ButtonControl from '../../components/form/ButtonControl';
import CheckboxControl from '../../components/form/CheckboxControl';


import { loginCall } from './actions';

const schema = Yup.object({
  email: Yup
    .string()
    .email('Not a proper email')
    .required('Email required'),
  password: Yup
    .string()
    .required('Password is required')
    .min(5, 'Min of 5 characters')
});

const RenderForm = (formik) => (
  <Form noValidate onSubmit={formik.handleSubmit}>
    <Form.Row className="justify-content-md-center">
      <Form.Group as={Col} md="6" controlId="email">
        <FormControl 
          type="text"
          placeholder="Email"
          name="email"
          formik={formik}
        />
      </Form.Group>
      <Form.Group as={Col} md="6" controlId="password">
        <FormControl 
          type="password"
          placeholder="Password"
          name="password"
          formik={formik}
        />
      </Form.Group>
    </Form.Row>
    <Form.Row className="justify-content-md-center">
      <Form.Group as={Col} md="12" controlId="rememberMe">
        <CheckboxControl
          label="Remember me"
          name="rememberMe"
          formik={formik}
        />
      </Form.Group>
    </Form.Row>
    <Form.Row className="justify-content-md-center">
      <Form.Group as={Col} md="12">
        <ButtonControl
          formik={formik}
          label="Login" />
      </Form.Group>
    </Form.Row>
  </Form>
);

const RenderFormik = (submitFunction) => (
  <Formik
    validationSchema={schema}
    onSubmit={submitFunction}
    initialValues={
      { email: '', password: '', rememberMe: true }
    }
  >
    {f => RenderForm(f) }
  </Formik >
);

const LoginForm = ({setToken, history}) => {
  const [apiErrors, setApiErrors] = useState(false);

  const renderApiErrors = () => {
    return apiErrors.map((e,i) => (
      <div key={i} className="alert alert-primary" role="alert">
        {e}
      </div>
    ) );
  };

  const submitFunction = async (values, { setSubmitting }) => {
    var result = await loginCall(values);
    setSubmitting(false);
    if(result.success)
    {
      setToken(result.value);
      history.push('/');
    }
    else 
    {
      setApiErrors(result.errors);
    }
  };

  return (
    <>
      <Card body>
        <Card.Title>Login</Card.Title>
        {RenderFormik(submitFunction)}
        {apiErrors && 
        renderApiErrors()
        }
      </Card>
      <hr />
      <small>test@test.com</small>
      <small>Test!@34</small>
    </>
  );
};

export default LoginForm;