import axios from "axios";
import React, { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { FaArrowLeft } from "react-icons/fa";
// React toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFirebase from "../../../Hooks/useFirebase";
import "./Register.css";
// React toastify

const Register = () => {
  const [loadRegister, setLoadRegister] = useState(false)
  // React Toastify
  const notify = () => toast("Registration Successfull");
  // React Toastify
  // Alert Bootstrap
  const [show, setShow] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, handleUserRegister, updateName, setIsLoading } =
    useFirebase();
  // console.log(isLoading)
  const url = location.state?.from || "/";
  //hook form
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoadRegister(true)
    console.log(data);
    if (data.password === data.confirmpassword) {
      handleUserRegister(data.email, data.password)
        .then((result) => {
          setIsLoading(true);

          setUser(result.user);
          // save user to the database
          saveUserInTheDb(data);
          console.log("user saving er niche");
          navigate(url);
          updateName(data.displayName);
          setErrorMessage("");
          setLoadRegister(false)
          // window.location.reload(); //for stopping reload
        })
        .catch((error) => {
          //  window.location.reload();
          const errorMessage = error.message;
          console.log(errorMessage);
          setErrorMessage("Email already in use");
          setShow(true);
          setLoadRegister(false)
        });
    } else {
      setErrorMessage("password and confirm password did not matched ");
      setShow(true);
      setLoadRegister(false)
    }


    setUser(data);
    // console.log(data.email);
  };

  // save user in the database
  const saveUserInTheDb = (data) => {
    const user = { ...data };
    console.log(user, "from outside axios");
    const api = "https://sheltered-dusk-87467.herokuapp.com/register";
    axios.post(api, user).then((res) => {
      console.log(res, "inside axios");
      if (res.data.insertedId) {
        // alert("data inserted successfully");
        notify();
        reset();
      }
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="border ">

        <Link to="/login" style={{ textDecoration: "none" }} ><Button variant="outlined" className=""><FaArrowLeft className="me-2" />Back to Login</Button> <br /></Link>
        {/* <h2>Please Register Here</h2> */}
        {errorMessage ? (
          <div className="">
            <Alert
              variant="danger"
              className="w-100"
              onClose={() => setShow(false)}
            >
              <p className="error">{errorMessage}</p>
            </Alert>
          </div>
        ) : (
          <></>
        )}
        <Form.Label>Name</Form.Label>
        <input
          id="standard-basic"
          label="Enter your Name "
          type="text"
          placeholder="Enter your name"
          {...register("displayName", {
            required: true,
            minLength: 4,
            maxLength: 40,
          })}
          variant="standard"
        />
        {errors.displayName && errors.displayName.type === "required" && (
          <>
            <span className="error ">Name is required</span>
            <br />
          </>
        )}
        {errors.displayName && errors.displayName.type === "maxLength" && (
          <>
            <span className="error ">Max length exceeded</span>
            <br />
          </>
        )}
        {errors.displayName && errors.displayName.type === "minLength" && (
          <>
            <span className="error ">Name Should be more than 4 charecter</span>
            <br />
          </>
        )}

        <Form.Label className="mt-3">Email Address</Form.Label>
        <input
          id="standard-basic"
          label="Enter Your Email"
          type="email"
          placeholder="Enter your Email"
          {...register("email", { required: true })}
          variant="standard"
        />
        {errors.email && (
          <>
            <span className="error">Email is required </span>
            <br />
          </>
        )}
        {/* Phone Number start  */}
        <Form.Label>Mobile Number</Form.Label>
        <input
          type="number"
          placeholder="Please Enter Mobile Number"
          {...register("mobilenumber", {
            required: true,
            minLength: 11,
            maxLength: 14,
          })}
        />
        {errors.mobilenumber && errors.mobilenumber.type === "required" && (
          <>
            <span className="error">Mobile Number is required </span>
            <br />
          </>
        )}
        {errors.mobilenumber && errors.mobilenumber.type === "minLength" && (
          <>
            <span className="error">Mobile Number must be 11 digit</span>
            <br />
          </>
        )}
        {errors.mobilenumber && errors.mobilenumber.type === "maxLength" && (
          <>
            <span className="error">Mobile Number must be 11 digit</span>
            <br />
          </>
        )}

        {/* Phone Number end   */}
        {/* DatePicker  */}

        <Form.Label>Password</Form.Label>
        <input
          {...register("password", { required: true, minLength: 6 })}
          id="standard-basic"
          placeholder="Please Enter Your Password"
          type="password"
        />
        {errors.password && errors.password.type === "required" && (
          <>
            <span className="error">Password is required </span>
            <br />
          </>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <>
            <span className="error">
              Password should be more than 6 charecters
            </span>
            <br />
          </>
        )}
        <Form.Label>Confirm Password</Form.Label>
        <input
          {...register("confirmpassword", { required: true })}
          id="standard-basic"
          placeholder="Confirm Your Password"
          type="password"
        />
        {errors.confirmpassword && (
          <>
            <span className="error">Confirm Password is required </span>
            <br />
          </>
        )}
        {loadRegister ?
          <input type="submit" value="Registering Please wait " className="submit-btn" /> :
          <input type="submit" value="Register " className="submit-btn" />
        }
      </form>

      <ToastContainer />
    </div>
  );
};

export default Register;
