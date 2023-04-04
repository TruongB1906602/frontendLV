import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Đặt hàng thành công </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default Success;