import React from "react";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import Banner from './Banner/Banner'
import Blogs from "./Blogs/Blogs";
import UserExperience from "./UserExperince/UserExperince";

const Home = () => {
  return (
    <div>
      <Header></Header>
      <Banner></Banner>
      <Blogs></Blogs>
      <UserExperience />
      <Footer></Footer>
    </div>
  );
};

export default Home;
