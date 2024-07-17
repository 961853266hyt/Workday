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
import { selectUser, selectIsAuthenticated } from "../redux/userSlice";
import { useLocation, useNavigate } from 'react-router-dom';
import { signIn } from "../redux/userThunks";
import { UnknownAction } from "@reduxjs/toolkit";



const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});


export default function SignIn() {
  const dispatch = useDispatch();
  //const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  const handleLogin = async (values: any) => {
    dispatch(signIn(values) as unknown as UnknownAction);
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
            Log in
          </Typography>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              //alert(JSON.stringify(values, null, 2));
              handleLogin(values);
            }}
          >
            {({ handleSubmit }) => (
              <Form className="form" onSubmit={handleSubmit} noValidate>
                <CustomTextField
                  name="username"
                  label="Username"
                />
                <CustomTextField
                  name="password"
                  label="Password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                  style={{ marginTop: '10px' }}
                >
                  Sign In
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item style={{ paddingTop: '10px' }}>
                    <Link href="#" variant="body2">
                      {"Forget your password? Reset"}
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