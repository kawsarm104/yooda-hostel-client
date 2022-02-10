import React from "react";
import { Link } from "react-router-dom";
import './Footer.css'

const Footer = () => {
  return (


    <div className="footer">
      <div className="inner-footer">

        <div className="footer-items">
          <h1>Travel Blog</h1>
          <p>We provide the best security and service</p>
        </div>

     
        <div className="footer-items">
          <h3>Quick Links</h3>
          <div className="border1"></div> 
          <ul>
            <Link to="#"><li>Home</li></Link>
            <Link to="#"><li>Search</li></Link>
            <Link to="#"><li>Contact</li></Link>
            <Link to="#"><li>About</li></Link>
          </ul>
        </div>

        <div className="footer-items">
          <h3>Country</h3>
          <div className="border1"></div>  
          <ul>
            <Link to="#"><li>South Korea</li></Link>
            <Link to="#"><li>Germany</li></Link>
            <Link to="#"><li>Bali</li></Link>
            <Link to="#"><li>Italy</li></Link>
          </ul>
        </div>

        <div className="footer-items">
          <h3>Contact us</h3>
          <div className="border1"></div>
          <ul>
            <li><i className="fa fa-map-marker" aria-hidden="true"></i>Dhaka, Bangladesh</li>
            <li><i className="fa fa-phone" aria-hidden="true"></i>+8801515247103</li>
            <li><i className="fa fa-envelope" aria-hidden="true"></i>kawsarm104@gmail.com</li>
          </ul>

          <div className="social-media">
            <Link to="#"><i className="fab fa-instagram"></i></Link>
            <Link to="#"><i className="fab fa-facebook"></i></Link>
            <Link to="#"><i className="fab fa-google-plus-square"></i></Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        Copyright &copy; kawsarm104@gmail.com
      </div>
    </div>



  );
};

export default Footer;
