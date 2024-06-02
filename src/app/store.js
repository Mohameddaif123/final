import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger'; // Import the logger middleware
import navbarReducer from '../components/navbarSlice';
import loginReducer from '../components/loginSlice';
import prodReducer from '../components/PRODUCTS/productsSlice';
import cartReducer from '../components/Cart/cartSlice';
import reviewsReducer from '../components/reviews/reviewsSlice';
import userPreferenceReducer from '../components/reducers';


const middleware = [...getDefaultMiddleware()];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    login: loginReducer,
    prod: prodReducer,
    userPreference: userPreferenceReducer,
    reviews: reviewsReducer,
    cart: cartReducer,
   
  },
  middleware: middleware
});
