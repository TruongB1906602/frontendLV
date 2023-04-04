import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./AllProducts.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteQrcode,
  getAdminQrcodes,
} from "../../actions/QrcodeAction";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../../more/Metadata";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import { DELETE_QRCODE_RESET } from "../../constans/QrcodeConstans";
// import { getAdminQrcodes } from "../../actions/QrcodeAction";


const AllQrcodes = ({history}) => {

const dispatch = useDispatch();

const { error, qrcodes } = useSelector((state) => state.qrcodes);

const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteQrcode
  );

  const deleteQrcodeHandler = (id) => {
    dispatch(deleteQrcode(id));
  };

useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
        toast.error(deleteError);
        dispatch(clearErrors());
      }
  
      if (isDeleted) {
        toast.success("Qrcode Deleted Successfully");
        history.push("/dashboard");
        dispatch({ type: DELETE_QRCODE_RESET });
      }
    dispatch(getAdminQrcodes());
  }, [dispatch, alert, error, history]);

const columns = [
    { field: "id", headerName: "Id sản phẩm", minWidth: 100, flex: 0.3 },

    {
      field: "name",
      headerName: "Tên sản phẩm",
      minWidth: 150,
      flex: 0.5,
    },
   
    {
        field: "exprire_date",
        headerName: "HSD",
        type: "string",
        minWidth: 50,
        flex: 0.4,
      },

    {
      field: "price",
      headerName: "Giá",
      type: "number",
      minWidth: 50,
      flex: 0.2,
    },

    {
      field: "actions",
      flex: 0.,
      headerName: "Chức năng",
      minWidth: 255,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/edit/qrcode/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
            onClick={() =>
                deleteQrcodeHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  qrcodes &&
    qrcodes.forEach((item) => {
      rows.push({
        id: item._id,
        price: item.price,
        name: item.name,
        exprire_date: item.exprire_date,
      });
    });

    return (
       <Fragment>
      <MetaData title={`ALL Qrcode - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">Danh sách Qrcode</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
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
    </Fragment>
    )
}

export default AllQrcodes
