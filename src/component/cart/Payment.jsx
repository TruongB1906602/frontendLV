import React, {useEffect, useRef, useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../more/Metadata";
import { Typography } from "@material-ui/core";

import axios from "axios";
import "./payment.css";
// import CreditCardIcon from "@material-ui/icons/CreditCard";
// import EventIcon from "@material-ui/icons/Event";
// import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { createOrder, clearErrors } from "../../actions/OrderAction";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../more/Loader";
import { savePaymentMethod } from "../../actions/CartAction";

const Payment = ({ history }) => {

  const dispatch = useDispatch();

  const { paymentInfo1 } = useSelector((state) => state.cart);

  const [method, setMethod] = useState(paymentInfo1.method);
 
  if(!paymentInfo1){
    history.push("/shipping");

  }


  const submitHandler = async (e) => {
    dispatch(savePaymentMethod({method}));
    e.preventDefault();
    history.push("/placeorder");
  };

  return (
   <>
   

    <MetaData title="Payment" />
    <CheckoutSteps activeStep={2} />
    <div className="paymentContainer">
      <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
        <Typography>Chọn phương thức thanh toán</Typography>
      

              <div className="methods">
                  
              <span className="code" >
             
                 <input type="radio" name="method" value="Thanh toán khi giao hàng (COD)"  onChange={(e) => 
                      setMethod(e.target.value)} />
                         <img src="https://cdn-icons-png.flaticon.com/512/9457/9457476.png" alt="" />
                       Thanh toán khi giao hàng (COD)
             </span>
            <span  className="vnpay">
              <input type="radio" name="method" value="Thanh toán bằng VnPay"  onChange={(e) => 
                setMethod(e.target.value)} />
                  <img src="https://downloadlogomienphi.com/sites/default/files/logos/download-logo-vnpayqr-mien-phi.jpg" alt="" />
                
                 VnPay
            </span>
              </div>
             
        <button class="btn-2"><span>Tiếp tục</span></button>
      
        
      </form>
    </div>
     <ToastContainer 
     position="bottom-center"
     autoClose={5000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
     /> 



     
  </>
   )}
  


export default Payment;