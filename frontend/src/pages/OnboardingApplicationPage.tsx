import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, Typography, Container, Paper } from '@mui/material';

const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    address: Yup.string().required('Address is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
  });
  
  const OnboardingApplication = () => {
    const dispatch = useDispatch();
   // const status = useSelector(selectOnboardingStatus);
   const status = 'loading';
   const error = 'error';
    //const error = useSelector(selectOnboardingError);
  
    const handleSubmit = (values: any) => {
      //dispatch(submitOnboardingApplication(values));
    };
  
    return (
      <Container component="main" maxWidth="sm">
        <Paper style={{ padding: '16px', marginTop: '16px' }}>
          <Typography component="h1" variant="h5" align="center">
            Onboarding Application
          </Typography>
          <Formik
            initialValues={{ firstName: '', lastName: '', address: '', email: '', phone: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="firstName"
                      label="First Name"
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="lastName"
                      label="Last Name"
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="address"
                      label="Address"
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="email"
                      label="Email Address"
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="phone"
                      label="Phone Number"
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '16px' }}
                  disabled={status === 'loading'}
                >
                  Submit
                </Button>
                {/* {status === 'failed' && <Typography color="error">{error}</Typography>} */}
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    );
  };
  
  export default OnboardingApplication;