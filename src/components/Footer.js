// Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-4 bg-dark text-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <h5>About Us</h5>
            <p>We are passionate about providing high-quality products and services for your beloved pets. Our mission is to enhance the lives of pets and their owners through exceptional care and dedication.</p>
          </div>
          <div className="col-lg-4">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Phone: 052-648-0550</li>
              <li>Email: mohamed@yourpetstore.com</li>
              <li>Address: Tel Aviv Main St, City, State, ZIP</li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h5>check our products </h5>
            <ul className="list-unstyled">
              <li><a href="Cats">Cats</a></li>
              <li><a href="/Dogs">Dogs</a></li>
              <li><a href="/Products">Supplies</a></li>
            </ul>
          </div>
        </div>
        <hr className="bg-light" />
        <div className="row">
          <div className="col-lg-12 text-center">
            <p className="small mb-0">&copy; 2024 Your Pet Store. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
