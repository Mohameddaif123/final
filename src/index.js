import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import Prod from './components/PRODUCTS/Products';
import Register from './components/Register';
import Cart from './components/Cart/Cart';
import { setCartItems } from './components/Cart/cartSlice';
import Checkout from './components/Cart/Checkout';
import Pay from './components/Cart/Paypal';
import UpdateProfile from './components/UpdateProfile';
import Cat from './components/PRODUCTS/Cat';
import Dog from './components/PRODUCTS/Dog';
import AboutMe from './components/AboutMe';
import Reviews from './components/reviews/Reviews';
import EmailForm from './components/EmailForm';
import { ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider
import theme from './theme'; // Import your custom theme




// Define a wrapper component to access Redux store and pass cartItems to Checkout
const CheckoutWrapper = () => {
  const cartItems = useSelector(state => state.cart.cartItems); // Access cartItems from Redux store
  return <Checkout cartItems={cartItems} />;
};

const container = document.getElementById('root');
const root = createRoot(container);

// Load cart items from localStorage and initialize the Redux state
const storedCartItems = localStorage.getItem('cartItems');
if (storedCartItems) {
  store.dispatch(setCartItems(JSON.parse(storedCartItems)));
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
        <Routes> 
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/Products' element={<Prod/>} />
          <Route path='/Dogs' element={<Dog/>} />
          <Route path='/Cats' element={<Cat/>} />
          <Route path='/Register' element={<Register/>} />
          <Route path='/Cart' element={<Cart/>} />
          <Route path="/checkout" element={<CheckoutWrapper />} />
          <Route path='/Paypal' element={<Pay/>} />
          <Route path='/update_profile' element={<UpdateProfile/>} />
          <Route path='/EmailForm' element={<EmailForm/>} />
          <Route path='/AboutMe' element={<AboutMe/>} />
          <Route path='/reviews' element={<Reviews/>} />
          
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </Provider>
    
  </React.StrictMode>
);
