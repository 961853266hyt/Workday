import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import { useField } from 'formik';

interface CustomTextFieldProps extends TextFieldProps {
  name: string;
  label: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      label={label}
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};

export default CustomTextField;