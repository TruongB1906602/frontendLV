import React from "react";
import "./ConfirmOrder.css";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import BottomTab from "../../more/BottomTab";
import {ORDER_CREATE_RESET} from "../../constans/OrderConstans"
import {createOrder} from "../../actions/OrderAction";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";
import Loading from "../../more/Loader";

export default function PlaceOrder({history}) {
      window.scrollTo(0,0);
      const dispatch= useDispatch();
      const { user } = useSelector((state) => state.user);
      const { shippingInfo, cartItems , paymentInfo1} = useSelector((state) => state.cart);

      const cart =  useSelector((state) => state.cart);
      
      let productPrice =  cartItems.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        );
    
      const subtotal = productPrice 
      cart.shippingCharges = ( cart.itemsPrice > 100000  ? 0 : 100000);

      cart.totalPrice = subtotal + cart.shippingCharges
   
      const address = `${shippingInfo.address}, ${shippingInfo.state}, ${shippingInfo.country}`;
      
      const orderCreate =  useSelector((state ) => state.orderCreate)
      const  {order,success,error,loading}=  orderCreate;
      useEffect(() =>{
        if(success){
          history.push(`order/$(order._id)`)
          dispatch({type: ORDER_CREATE_RESET})
        }
      }, [history,  dispatch,  success,order])

        const  placeOrderHandler = () =>{
          
         dispatch(
          createOrder({
            orderItems:cart.cartItems,
            shippingInfo: cart.shippingInfo,
            
            paymentInfo1:cart.paymentInfo1,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingCharges,
            taxPrice: cart.taxPrice,
            totalPrice:cart.totalPrice,
            
          })
          
         ) 
         history.push("/success");
        }
      

  return (
    
     <>
   {loading ? (
     <Loading />
   ) : (
    <>
   
    <CheckoutSteps activeStep={2} />
    <div className="confirmOrderPage">
      <div>
        <div className="confirmshippingArea">
          <Typography>Thông tin giao hàng</Typography>
          <div className="confirmshippingAreaBox">
            <div>
              <p>Tên khách hàng:</p>
              <span>{user.name}</span>
            </div>
            <div>
              <p>Số điện thoại:</p>
              <span>{shippingInfo.phoneNo}</span>
            </div>
            <div>
              <p>Địa chỉ:</p>
              <span>{shippingInfo.address}</span>
            </div>
            <div>
              <p>Phương thức thanh toán:</p>
              <span>{paymentInfo1.method}</span>
            </div>
          </div>
        </div>
        <div className="confirmCartItems">
          <Typography>Đơn hàng của bạn:</Typography>


          {cartItems.length === 0 ? 
            <div className="confirmCartItemsContainer">
               ""
             </div>
              :
         <div className="confirmCartItemsContainer">
         {cartItems.map((item) => (
           <div key={item.product}>
             <img src={item.image} alt="Product" />
             <Link to={`/product/${item.product}`}>
               {item.name}
             </Link>
             <span>
               {item.quantity} x 
               {`${
                    new Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format(item.price)
                  }`} ={" "}
               <b>{`${
                    new Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format(item.price *     
                      item.quantity)
                  }`}</b>
             </span>
           </div>
         ))
          }
       </div>
      }
 
        </div>
      </div>
      {/*  */}
      <div>
        <div className="orderSummary">
          <Typography>Đơn hàng</Typography>
          <div>
            <div>
              <p>Tạm tính:</p>
              <span>{`${
                    new Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format(subtotal)
                  }`}</span>
            </div>
            <div>
              <p>Phí vận chuyển:</p>
              <span>{`${
                    new Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format(  
                      cart.shippingCharges)
                  }`}</span>
            </div>
            <div>
            </div>
          </div>

          <div className="orderSummaryTotal">
            <p>
              <b>Tổng cộng:</b>
            </p>
            <span>{`${
                    new Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format( cart.totalPrice)
                  }`} </span>
                  
          </div>
              
          <button type ="submit" onClick={placeOrderHandler}>Thanh toán</button>
        </div>
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
    </div>
    <BottomTab />
  </>
   )}
   </>
  )

}
