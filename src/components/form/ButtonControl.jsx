import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const FormControl = ({ 
  formik,
  label,
  ...rest
}) => (
  <Button 
    {...rest}
    disabled={formik.isSubmitting} 
    type="submit">
    {formik.isSubmitting &&
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    }
    {!formik.isSubmitting &&
      <span>{label}</span>
    }
  </Button>
);

export default FormControl;