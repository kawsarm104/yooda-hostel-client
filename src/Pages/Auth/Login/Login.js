import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useFirebase from "../../../Hooks/useFirebase";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import "./Login.css";

const Login = () => {
  // Bootstarp modal start
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLogin, setIsLogin] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Bootstarp modal end
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    setUser,
    signInWithGoogle,
    setIsLoading,
    loginWithEmailAndPassword,
  } = useFirebase();
  // console.log(isLoading)
  const url = location.state?.from || "/dashboard";
  //hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setIsLogin(true)
    loginWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        setIsLoading(true);
        setUser(res.user);
        setIsLogin(false)
        navigate(url);
        setErrorMessage(false);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(
          "sign in error code ",
          errorCode
        );
        setIsLogin(false)
        setErrorMessage(true);
        setShowAlert(true);
      })
      .finally(() => {

        setIsLoading(false);
      });
    // console.log(data);
    setUser(data);
    // console.log(data.email);
  };
  // google login 
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {

        navigate(url);
        // console.log(location.state?.from,"google er te");

        setUser(result.user);
      })
      .finally(() => {
        // const success = true;
        setIsLoading(false)
      });

  };

  return (
    <>
      <div className="container fluid" style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}>
        {/* <h1>from auth folder</h1> */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ backgroundColor: "", padding: "" }}
          className=" w-100 text-center form-class"
        >

          <div className=" d-flex justify-content-center">
            {errorMessage && showAlert && (
              <>

                <Alert severity="error"
                  className="w-75"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => setShowAlert(false)}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  Invalid credentials!
                </Alert>
                ,{" "}
              </>
            )}
          </div>

          <TextField
            className="my-3  form-textField"

            label="Enter Your Email"
            type="email"
            placeholder="Enter your Email"
            {...register("email", { required: true })}
            variant="standard"
          />
          <br />
          {errors.exampleRequired && <span>This field is required</span>}
          {/* <Form.Label>Password</Form.Label> */}
          <TextField
            className="my-3 form-textField"
            {...register("password", { required: true })}

            placeholder="Enter Password"
            type="password"
            variant="standard"
          />{" "}
          <br />

          <Button type="submit" variant="outlined" disabled={isLogin} className="form-textField">
            {isLogin ? "Login...." : "Login"}
          </Button>
          <div className="d-grid mb-2 mx-5 border">
            <button
              onClick={handleGoogleLogin}
              className="btn btn-google btn-login text-uppercase fw-bold text-center"
              type="submit"
            >
              <i className="fab fa-google me-2"></i> Sign in with Google
            </button>
          </div>
          <p
            // variant="primary"


            className="mt-1 border-0 shadow-none ms-0 register-account-link"
            style={{ color: "blue" }}
          >
            Need an account ?  <Link to="/register">Register here</Link>
          </p>
          {/* <div className="mt-2 text-primary"></div> */}
        </form>
      </div>


    </>
  );
};

export default Login;
