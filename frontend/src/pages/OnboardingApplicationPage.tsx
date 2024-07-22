import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, FieldArray, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, Typography, Container, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { profile } from 'console';
import CustomTextField from '../components/CustomTextField';
import { current, UnknownAction } from '@reduxjs/toolkit';
import { selectUser } from '../redux/userSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { submitOnboardingApplication } from '../redux/onboardingSlice';
import axios from 'axios';


const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
const phoneRegex = /^(\+?\d{1,4}[\s-]?)?((\d{3}[\s-]?\d{3}[\s-]?\d{4})|(\(\d{3}\)\s?\d{3}[\s-]?\d{4}))$/; // matches US phone numbers
const zipRegex = /^\d{5}$/;
const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    cell: Yup.string().matches(phoneRegex, 'phone number is not valid').required('Phone number is required'),
    ssn: Yup.string().matches(ssnRegex, 'SSN is not valid').required('SSN is required'),
    dateOfBirth: Yup.date().required('Date of Birth is required'),
    gender: Yup.string().oneOf(['male', 'female', 'i do not wish to answer']).required('Gender is required'),
    currentAddress: Yup.object().shape({
        building: Yup.string().required('Building is required'),
        street: Yup.string().required('Street is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        zip: Yup.string().matches(zipRegex, "zip code is not valid!").required('Zip code is required'),
      }),
    //   workAuthorization: Yup.object().shape({
    //     visaType: Yup.string().required('Visa Type is required'),
    //     startDate: Yup.date().required('Start Date is required'),
    //     endDate: Yup.date().required('End Date is required'),
    //     optReceipt: Yup.string(),
    //     otherVisaTitle: Yup.string(),
    //   }),
    references: Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        middleName: Yup.string(),
        phone: Yup.string()
          .matches(phoneRegex, 'Phone number is not valid')
          .notRequired(),
        email: Yup.string().email('Invalid email address').notRequired(),
        relationship: Yup.string().required('Relationship is required'),
      }),
      emergencyContacts: Yup.array().of(
        Yup.object().shape({
          firstName: Yup.string().required('First Name is required'),
          lastName: Yup.string().required('Last Name is required'),
          middleName: Yup.string(),
          phone: Yup.string()
            .matches(phoneRegex, 'Phone number is not valid')
            .notRequired(),
          email: Yup.string().email('Invalid email address').notRequired(),
          relationship: Yup.string().required('Relationship is required'),
        }),
      ).min(1, 'At least one emergency contact is required'),
      isCitizenOrPermanentResident: Yup.string().required('This field is required'),
  });
  
  const OnboardingApplication = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
   // const status = useSelector(selectOnboardingStatus);
    //const error = useSelector(selectOnboardingError);
    const user = useSelector(selectUser);

   
    // useEffect(() => {
    //     if (!user) {
    //         navigate('/login');
    //     }
    //     }
    // , [user, navigate]);


    const appendFormData = (formData: FormData, key: string, value:any) => {
      if (value instanceof File) {
        formData.append(key, value);
        console.log('file appended', key, value);
      } else if (typeof value === 'object' && value !== null) {
        Object.keys(value).forEach(subKey => {
          appendFormData(formData, `${key}.${subKey}`, value[subKey]);
        });
      } else {
        formData.append(key, value);
      }
    };

    const handleSubmit = async (values: any, { setSubmitting, setErrors }:FormikHelpers<any>) => {
      try{
        const formData = new FormData();
        // add user id to form data
        if (!user) {
            throw new Error('User is not logged in');
        } else {
            formData.append('userId', user.id);
        }
        
        Object.keys(values).forEach((key) => {
          if (values[key] !== null && values[key] !== undefined && values[key] !== '') {
            appendFormData(formData, key, values[key]);
          }
        });
        await dispatch(submitOnboardingApplication(formData));
        alert('Application submitted successfully!');      
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errorMessages: { [key: string]: string } = {};
          error.inner.forEach(err => {
            if (err.path) {
              errorMessages[err.path] = err.message;
            }
          });
          setErrors(errorMessages);
          //alert(error.message);
        } else {
            alert('An error occurred during submission. Please try again later.');
            console.log(error);
            }
        setSubmitting(false);
      }
      
    };


    return (
      <Container component="main" maxWidth="sm">
        <Paper style={{ padding: '16px', marginTop: '16px' }}>
          <Typography component="h1" variant="h5" align="center">
            Onboarding Application
          </Typography>
          <Formik
            initialValues={{ firstName: '', lastName: '', middleName: '',preferredName : '',
                profilePicture: null,
                currentAddress: { building: '', street: '', city: '', state: '', zip: '' },
                cell: '', work: '' , 
                ssn: '', dateOfBirth: null, gender: '',
                isCitizenOrPermanentResident: '',
                greenCardOrCitizen: '',
                workAuthorization: {
                    visaType: '',
                    startDate: null,
                    endDate: null,
                    optReceipt: null,
                    otherVisaTitle: '',
                },
                references: {
                    firstName: '', 
                    lastName: '', 
                    middleName: '', 
                    phone: '', 
                    email: '', 
                    relationship: ''
                },
                emergencyContacts: [
                    {
                        firstName: '', 
                        lastName: '', 
                        middleName: '', 
                        phone: '', 
                        email: '', 
                        relationship: ''
                    }
                ],
                }}
            validationSchema={validationSchema}
            enableReinitialize
            validate={(values) => {
                const errors: { [key: string]: string } = {};
                try {
                  validationSchema.validateSync(values, { abortEarly: false });
                } catch (validationError) {
                  if (validationError instanceof Yup.ValidationError) {
                    validationError.inner.forEach(err => {
                      if (err.path) {
                        errors[err.path] = err.message;
                      }
                    });
                  }
                }
                console.log(errors);
                return errors;
              }}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, setFieldValue, values }) => (
              <Form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      name="firstName"
                      label="First Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      name="lastName"
                      label="Last Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="middleName"
                      label="Middle Name"
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="preferredName"
                      label="Preferred Name"
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      name="cell"
                      label="Cell phone number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <Field
                      name="work"
                      label="Work phone number"
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" gutterBottom>
                        Please upload your profile picture:
                    </Typography>
                    <input
                        id="profilePicture"
                        name="profilePicture"
                        type="file"
                        onChange={(event: any) => {
                            setFieldValue('profilePicture', event.currentTarget.files[0]);
                        }}
                        />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography component="h6" variant="h6">
                      Current Address
                    </Typography>
                  </Grid>
                    <Grid item xs={12}>
                        <CustomTextField
                        name="currentAddress.building"
                        label="Building"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTextField
                        name="currentAddress.street"
                        label="Street"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTextField
                        name="currentAddress.city"
                        label="City"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTextField
                        name="currentAddress.state"
                        label="State"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTextField
                        name="currentAddress.zip"
                        label="Zip code"
                        />
                    </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="email"
                      //label="Email Address"
                      value = {user?.email}
                      component={TextField}
                      disabled={true} 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                        name="ssn"
                        label="SSN : xxx-xx-xxxx"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="dateOfBirth"
                      label="Date of Birth"
                      type="date"
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="gender-label">Gender</InputLabel>
                      <Select
                        labelId="gender-label"
                        id="gender"
                        name="gender"
                        value={values.gender}
                        onChange={(event) => setFieldValue('gender', event.target.value)}
                        label="Gender"
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="i do not wish to answer">I do not wish to answer</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography component="h6" variant="h6">
                      Reference (who referred you to this company?)
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <CustomTextField
                      name="references.firstName"
                      label="First Name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomTextField
                      name="references.lastName"
                      label="Last Name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Field
                      name="references.middleName"
                      label="Middle Name"
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Field
                      name="references.phone"
                      label="Phone number"
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Field
                      name="references.email"
                      label="Email Address"
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomTextField
                      name="references.relationship"
                      label="Relationship"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography component="h6" variant="h6">
                      Emergency Contacts
                    </Typography>
                </Grid>
                <FieldArray name="emergencyContacts">
                    {({ push, remove }) => (
                        <div>
                            {values.emergencyContacts.map((_, index) => (
                                <div key={index}>
                                    <Grid item xs={12}>
                                        <CustomTextField
                                            name={`emergencyContacts[${index}].firstName`}
                                            label="First Name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomTextField
                                            name={`emergencyContacts[${index}].lastName`}
                                            label="Last Name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            name={`emergencyContacts[${index}].middleName`}
                                            label="Middle Name"
                                            as={TextField}
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            name={`emergencyContacts[${index}].phone`}
                                            label="Phone number"
                                            as={TextField}
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            name={`emergencyContacts[${index}].email`}
                                            label="Email Address"
                                            as={TextField}
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomTextField
                                            name={`emergencyContacts[${index}].relationship`}
                                            label="Relationship"
                                        />
                                    </Grid>
                                    <Button
                                        type="button"
                                        onClick={() => remove(index)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                onClick={() => push({
                                    firstName: '',
                                    lastName: '',
                                    middleName: '',
                                    phone: '',
                                    email: '',
                                    relationship: ''
                                })}
                            >
                                Add Emergency Contact
                            </Button>
                        </div>
                    )}
                </FieldArray>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="is-citizen-label">Permanent resident or citizen of the U.S.?</InputLabel>
                      <Field
                        name="isCitizenOrPermanentResident"
                        as={Select}
                        labelId="is-citizen-label"
                        label="Permanent resident or citizen of the U.S.?"
                        margin="dense"
                      >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </Field>
                    </FormControl>
                  </Grid>
                  {values.isCitizenOrPermanentResident === 'Yes' && (
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="green-card-or-citizen-label">Green Card or Citizen</InputLabel>
                        <Field
                          name="greenCardOrCitizen"
                          as={Select}
                          labelId="green-card-or-citizen-label"
                          label="Green Card or Citizen"
                          margin="dense"
                        >
                          <MenuItem value="Green Card">Green Card</MenuItem>
                          <MenuItem value="Citizen">Citizen</MenuItem>
                        </Field>
                      </FormControl>
                    </Grid>
                  )}
                  {values.isCitizenOrPermanentResident === 'No' && (
                    <>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel id="work-authorization-label">Work Authorization</InputLabel>
                          <Field
                            name="workAuthorization.visaType"
                            as={Select}
                            labelId="work-authorization-label"
                            label="Work Authorization"
                            margin="dense"
                          >
                            <MenuItem value="H1-B">H1-B</MenuItem>
                            <MenuItem value="L2">L2</MenuItem>
                            <MenuItem value="F1(CPT/OPT)">F1(CPT/OPT)</MenuItem>
                            <MenuItem value="H4">H4</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                          </Field>
                        </FormControl>
                      </Grid>
                        {values.workAuthorization.visaType === 'F1(CPT/OPT)' && (
                            <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom>
                                Please upload your OPT Receipt:
                            </Typography>
                            <input
                                accept='application/pdf'
                                id="optReceipt"
                                name="optReceipt"
                                type="file"
                                onChange={(event: any) => {
                                    setFieldValue('workAuthorization.optReceipt', event.currentTarget.files[0]);
                                }}
                            />
                            </Grid>
                        )}
                        {values.workAuthorization.visaType === 'Other' && (
                            <Grid item xs={12}>
                            <Field
                                name="workAuthorization.otherVisaTitle"
                                label="Other Visa Title"
                                as={TextField}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            </Grid>
                        )}
                        <Grid item xs={12}>
                        <Field
                            name="workAuthorization.startDate"
                            label="Start Date"
                            type="date"
                            as={TextField}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <Field
                            name="workAuthorization.endDate"
                            label="End Date"
                            type="date"
                            as={TextField}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                        />
                        </Grid>
                        </>)}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '16px' }}
                //   disabled={status === 'loading'}
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