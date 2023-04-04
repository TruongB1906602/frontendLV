import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  deleteProductReducer,
  deleteReviewReducer,
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReviewsReducer,
  productsReducer,
} from "./reducers/ProductReducer";


import {
  deleteQrcodeReducer,
  newQrcodeReducer,
  qrcodeDetailsReducer,
  qrcodesReducer,
} from "./reducers/QrcodeReducer";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/CartReducer";
import { favouriteReducer } from "./reducers/FavouriteReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
  orderPayReducer,
} from "./reducers/OrderReducer";

const reducer = combineReducers({
  products: productsReducer,
  qrcodes: qrcodesReducer,
  deleteQrcode:deleteQrcodeReducer,
  createQrcode:newQrcodeReducer,
  qrcodeDetails:qrcodeDetailsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  cart: cartReducer,
  favourite: favouriteReducer,
  orderCreate: newOrderReducer,
  myOrder: myOrdersReducer,
  myOrderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  createProduct: newProductReducer,
  deleteProduct: deleteProductReducer,
  AllOrders: allOrdersReducer,
  deleteOrder: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  deleteReview: deleteReviewReducer,
  productReviews: productReviewsReducer,
  forgotPassword:forgotPasswordReducer,
  orderPay: orderPayReducer

});

let initialState = {
  cart: {

    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
      paymentInfo1: localStorage.getItem("paymentInfo1")
      ? JSON.parse(localStorage.getItem("paymentInfo1"))
      : {},
    

   
   
  },
  favourite: {
    favouriteItems: localStorage.getItem("favouriteItems")
      ? JSON.parse(localStorage.getItem("favouriteItems"))
      : [],
  },
};

const middleWare = [thunk];

const Store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default Store;
