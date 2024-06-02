import React from 'react';
import PropTypes from 'prop-types';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setCartItems } from './cartSlice'; // Import the action creator to set cart items

const Pay = ({ amount }) => {
  const dispatch = useDispatch(); // Initialize useDispatch hook

  const paypalOptions = {
    'client-id': "AZb2bSgGy27W9siZa4Aw7L2NXemnK1BDrlOERkUYMmYxStrcOvrkB0aCe_UPkLYaE46oKlGh3-cnx94M", // Replace with your actual PayPal client ID
    currency: 'USD',
  };

  const createOrder = (data, actions) => {
    const roundedAmount = amount.toFixed(2); // Round amount to two decimal places
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: roundedAmount, // Use the rounded amount
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      // Handle successful payment
      console.log(details);
      toast.success('Payment successful!');
      // Reset cart to an empty state after successful payment
      dispatch(setCartItems([])); // Dispatch action to set cart items to empty array
    });
  };

  const onError = (err) => {
    // Handle errors
    console.error(err);
    toast.error('Payment failed.');
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

Pay.propTypes = {
  amount: PropTypes.number, // Define prop type for amount
};

export default Pay;
