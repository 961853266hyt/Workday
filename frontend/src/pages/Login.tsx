import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomTextField from "../components/CustomTextField";
import "../style/PopUp.css";
import "../App.css";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default function SignIn() {
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
              alert(JSON.stringify(values, null, 2));
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
                <Grid container justify="flex-end">
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