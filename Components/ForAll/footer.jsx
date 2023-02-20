import React from "react";
import "./Styles/footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer_Container">
        <div className="footer_Social_medias">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/achyut.adhikari.566/"
          >
            <i class="fa-brands fa-facebook fa-2x"></i>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Achyut770/"
          >
            <i class="fa-brands fa-2x fa-github"></i>{" "}
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/AchyutA46243914"
          >
            <i class="fa-brands fa-2x fa-twitter"></i>
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/achyut_7777/"
          >
            <i class="fa-brands fa-2x fa-instagram"></i>{" "}
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/achyut-adhikari-806476237/"
          >
            <i class="fa-brands fa-2x fa-linkedin"></i>
          </a>
        </div>
        {/* <div className="footerLink">
          {navLink.map((items, index) => {
            return <NavLink to={items.to}>{items.name}</NavLink>;
          })}
        </div> */}
      </div>
    </>
  );
};

export default Footer;
