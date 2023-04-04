import React, { useState } from 'react';
import axios from 'axios';

const Vnpay = () => {

  const [vnpayUrl, setVnpayUrl] = useState('');

  const handlePayment = async () => {
    try {
      const response = await axios.post('/create_payment_url', {
      });
      const url = response.data.data;
      setVnpayUrl(url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>VNPAY Payment Gateway</h1>
     
      <button onClick={handlePayment}>Pay with VNPAY</button>
      {vnpayUrl && (
        <div>
          <a href={vnpayUrl} target="_blank" rel="noreferrer">
            Proceed to VNPAY Payment Page
          </a>
        </div>
      )}
    </div>
  );
};

export default Vnpay;
