Pet Store Django Redux Application
Welcome to the Pet Store Django Redux application! This advanced application allows users to browse, purchase, and manage pet products through an intuitive web interface. It combines the power of Django on the backend with Redux on the frontend to provide a seamless and robust user experience.

Table of Contents
Features
Installation
Backend Setup
Frontend Setup
Usage
Technologies Used
Backend
Frontend
Additional Frontend Libraries
Contributing
License
Features
User Authentication: Users can register, log in, and log out securely.
Product Management: Admin users can add, edit, and delete pet products.
Shopping Cart: Users can add products to their cart and proceed to checkout.
Order Management: Admin users can manage orders and mark them as fulfilled.
Responsive Design: The application is optimized for various screen sizes and devices.
Installation
To run this application locally, follow the instructions below to set up the backend and frontend environments.

Backend Setup
Clone the repository to your local machine:
git clone <[repository_url](https://github.com/Mohameddaif123/pets-store)>
cd <pets-store>
Create a virtual environment and activate it:
virtualenv venv
source venv/bin/activate
Install the required Python packages:
pip install -r requirements.txt
Apply the migrations and create a superuser:
python manage.py migrate
python manage.py createsuperuser
Start the Django development server:
python manage.py runserver
Frontend Setup
Navigate to the frontend directory:
cd my-app
Install the required Node.js packages:
npm install
Start the React development server:
npm start
Usage
Once both the backend and frontend servers are running, you can access the application by navigating to http://localhost:3000 in your web browser. From there, you can:

Register a new account or log in with an existing one.
Browse the available pet products and add them to your cart.
Proceed to checkout and complete your purchase.
Technologies Used
Backend
Django: A high-level Python web framework for backend development.
Django REST Framework: A powerful toolkit for building Web APIs in Django.
Unit Testing: Django provides built-in support for unit testing with its unittest module.
Frontend
React: A JavaScript library for building user interfaces.
React Router: A routing library for React applications.
Redux: A predictable state container for managing the application's state.
React-Redux: Official React bindings for Redux.
React-Toastify: A simple and flexible toast notification library for React applications.
Additional Frontend Libraries
@emotion/react: CSS-in-JS library for styling React components.
@emotion/styled: A utility for writing styled-components with emotion.
@mui/material: A popular React UI framework for building responsive web applications.
@mui/icons-material: Material Design icons for use with MUI components.
@paypal/react-paypal-js: React components for integrating PayPal into applications.
@reduxjs/toolkit: A set of tools for simplifying Redux development.
@testing-library/jest-dom: Custom Jest matchers for asserting on DOM nodes.
@testing-library/react: Testing utilities for React components.
@testing-library/user-event: Fire events that mimic user events in testing.
antd: A design system for enterprise-level products, based on React.
axios: A promise-based HTTP client for the browser and Node.js.
jwt-decode: Library for decoding JSON Web Tokens (JWTs).
react-adsense: React component for integrating Google AdSense ads.
react-burger-menu: An off-canvas sidebar React component with a collection of effects and styles.
react-dom: Entry point to the React DOM package.
react-helmet: A document head manager for React.
react-icons: SVG icons library for React.
react-scripts: Configuration and scripts for Create React App.
react-router-dom: DOM bindings for React Router.
redux-logger: Logger middleware for Redux.
web-vitals: Library for measuring web vitals.
Contributing
Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

Admin Credentials:

Username: hadi
Password: 123
Admin/superuser will see more buttons and will be able to perform actions like updating, removing, and adding new products that other users cannot do.

Live server
-https://fluffyfreinds-store.onrender.com

License
This project is licensed under the MIT License. Feel free to modify and distribute the code for your own purposes.
