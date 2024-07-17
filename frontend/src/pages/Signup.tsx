import React, { useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomTextField from "../components/CustomTextField";
import "../style/PopUp.css";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../redux/userThunks";
import { UnknownAction } from "@reduxjs/toolkit";
import { selectIsAuthenticated } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  // firstName: Yup.string().required("First Name is required"),
  // lastName: Yup.string().required("Last Name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
});


export default function SignUp() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSignUp = async (values: any) => {
      dispatch(signUp(values) as unknown as UnknownAction);
  }
  
  return (
    <Grid container component="main" className="root">
      <CssBaseline />
      <Grid
        className="size"
        item
        xs={12}
        sm={8}
        component={Paper}
        elevation={1}
        square
      >
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik
            initialValues={{
              // firstName: "",
              // lastName: "",
              username: "",
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSignUp(values);
            }}
          >
            {({ handleSubmit }) => (
              <Form className="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  {/* <Grid item xs={12} sm={6}>
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
                  </Grid> */}
                  <Grid item xs={12}>
                    <CustomTextField
                      name="username"
                      label="Username"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      name="email"
                      label="Email Address"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      name="password"
                      label="Password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                  style={{ marginTop: '10px' }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item style={{ paddingTop: '10px' }}>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </Grid>
    </Grid>
  );
}