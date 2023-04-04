import React, { useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../cart/CheckoutSteps.jsx";
import MetaData from "../../more/Metadata";
import HomeIcon from "@material-ui/icons/Home";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { saveShippingInfo } from "../../actions/CartAction";
import BottomTab from "../../more/BottomTab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Shipping = ({ history }) => {
  const dispatch = useDispatch();

  const { shippingInfo } = useSelector((state) => state.cart);

 
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [province, setProvince] = useState(shippingInfo.province);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if ( phoneNo.length < 10 || phoneNo.length > 10) {
      toast.error("Số điện thoại nên phải 11 số trở lên");
      return;
    }
    else {dispatch(saveShippingInfo({address, city, province, phoneNo }));
    history.push("/payment");
  }
  };

  return (
    <>
      <MetaData title="Shipping Details" />

      <CheckoutSteps activeStep={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Thông tin giao hàng</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >


            <input type="text" placeholder="Địa chỉ" 
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
            <input type="text" placeholder=" Nhập vào thành phố" 
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
            <input type="text" placeholder=" Nhập vào tỉnh" 
              value={province}
              required
              onChange={(e) => setProvince(e.target.value)}
            />
            <input type="text" placeholder=" Nhập vào sđt"
              value={phoneNo}
              required
              onChange={(e) => setPhoneNo(e.target.value)}
            />
           

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
             
            />
          </form>
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
      <BottomTab />
    </>
  );
};

export default Shipping;
