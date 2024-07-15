import React from 'react';
import TextField, { TextFieldProps, OutlinedTextFieldProps } from '@mui/material/TextField';
import { useField,  FieldHookConfig } from 'formik';

interface CustomTextFieldProps extends Omit<TextFieldProps, 'variant'>  {
  name: string;
  label: string;
}

// const CustomTextField: React.FC<CustomTextFieldProps> = ({ label, ...props }) => {
//   const [field, meta] = useField(props);

//   return (
//     <TextField
//       variant="outlined"
//       margin="normal"
//       required
//       fullWidth
//       label={label}
//       {...field}
//       {...props}
//       error={meta.touched && Boolean(meta.error)}
//       helperText={meta.touched && meta.error}
//     />
//   );
// };

const CustomTextField: React.FC<CustomTextFieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props as FieldHookConfig<string>);

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