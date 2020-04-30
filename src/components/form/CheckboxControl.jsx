import React from 'react';
import Form from 'react-bootstrap/Form';

const CheckboxControl = ({ 
  formik,
  name,
  ...rest
}) => (
  <>
    { /* formik.values[name] && <span>asdf</span> */ }
    <Form.Check
      {...rest}
      type='checkbox'
      name={name}
      value={formik.values[name]}
      checked={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      disabled={formik.isSubmitting}
      isInvalid={formik.touched[name] && formik.errors[name]}
    />
    {formik.touched[name] && formik.errors[name] &&
      <Form.Control.Feedback type="invalid">
        {formik.errors[name]}
      </Form.Control.Feedback>
    }
  </>
);

export default CheckboxControl;