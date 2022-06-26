import React from "react";
import playstore from "../../../images/playstore.png";
import appstore from "../../../images/Appstore.png";
import "./Footer.css"


function Footer() {
  return (
    <footer>
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download APP for Android and IOS</p>
        <img src={playstore} alt="" />
        <img src={appstore} alt="" />
      </div>
      <div className="midFooter">
        <h1>ECOMMERCE</h1>
        <p>High Quality Is Our First Priority</p>
        <p>copyright 2022 &copy; dijoop</p>
      </div>
      <div className="rightFooter">
          <h4>follow us</h4>
          <a href="">instagram</a>
          <a href="">facebook</a>
          <a href="">youtube</a>
          </div>
    </footer>
  );
}

export default Footer;
