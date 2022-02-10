import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider";
import About from "./Pages/About/About";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import MakeAdmin from "./Pages/Dashboard/Admin/MakeAdmin/MakeAdmin";
import Dashboard from "./Pages/Dashboard/Dashboard/Dashboard";
import DashboardHome from "./Pages/Dashboard/DashboardHome/DashboardHome";

import AuthRoute from "./ProtectedRoute/AuthRoute/AuthRoute";
import PrivateRoute from "./ProtectedRoute/PrivateRoute/PrivateRoute";
// react spinner 
import { useState } from 'react'
import { css } from "@emotion/react";
import { HashLoader } from "react-spinners";
import Home from "./Pages/Home/Home";
import BlogDetails from "./Pages/Home/Blogs/BlogDetails";
import PendingRequest from "./Pages/Dashboard/PendingRequest/PendingRequest";
import AddFood from "./Pages/Dashboard/AddFood/AddFood";
import AllStudents from "./Pages/Dashboard/AllStudents/AllStudents";
import ServeFood from "./Pages/Dashboard/ServeFood/ServeFood";
import ShowFood from "./Pages/Dashboard/ShowFood/ShowFood";
import AddNewStudent from "./Pages/Dashboard/AddNewStudent/AddNewStudent";
import ShowStudents from "./Pages/Dashboard/ShowStudents/ShowStudents";
// react spinner 
function App() {
  // react spinner 
  let [spinner, setSpinner] = useState(true);
  let [color, setColor] = useState("#36D7B7");
  const override = css`
  display: block;
  align:center;
  margin: 125px auto;
  border-color: red;
`;
  setTimeout(() => {
    setSpinner(false)
  }, 1000);

  if (spinner) {
    return <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {" "}
      <HashLoader color={color} spinner={spinner} css={override} size={65} />
    </div>
  }

  // react spinner 
  return (
    <AuthProvider style={{ backgroundColor: "#f0f2f5", width: "100%" }}>
      <Router>
        {/* <Header></Header> */}
        <Routes>
          <Route
            path="/"
            element={

              <Login></Login>

            }
          ></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route
            path={`/blogs/:id`}
            element={
              <PrivateRoute>
                <BlogDetails></BlogDetails>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard></Dashboard>
              </PrivateRoute>
            }
          >
            <Route
              path="/dashboard"
              element={<DashboardHome></DashboardHome>}
            ></Route>


            <Route
              path="/dashboard/makeadmin"
              element={<MakeAdmin />}
            ></Route>

            <Route
              path="/dashboard/addnewstudent"
              element={<AddNewStudent />}
            ></Route>
            <Route
              path="/dashboard/allstudents"
              element={<AllStudents />}
            ></Route>
            <Route
              path="/dashboard/addfood"
              element={<AddFood />}
            ></Route>
            <Route
              path="/dashboard/servefood"
              element={<ServeFood />}
            ></Route>
            <Route
              path="/dashboard/showfood"
              element={<ShowFood />}
            ></Route>
            <Route
              path="/dashboard/showstudents"
              element={<ShowStudents />}
            ></Route>


            <Route
              path="/dashboard/pendingrequest"
              element={<PendingRequest />}
            ></Route>


          </Route>

          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login></Login>
              </AuthRoute>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <AuthRoute>
                <Register></Register>
              </AuthRoute>
            }
          ></Route>

          {/* <Route path="/*">
          <NotFound></NotFound>
        </Route>  */}
        </Routes>
        {/* <Footer></Footer> */}
      </Router>
    </AuthProvider>
  );
}

export default App;
