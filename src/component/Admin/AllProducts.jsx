import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./AllProducts.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,
} from "../../actions/ProductActions";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../../more/Metadata";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import { DELETE_PRODUCT_RESET } from "../../constans/ProductConstans";


const AllProducts = ({history}) => {

const dispatch = useDispatch();

const { error, products } = useSelector((state) => state.products);

const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteProduct
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
        toast.success("Product Deleted Successfully");
        history.push("/dashboard");
        dispatch({ type: DELETE_PRODUCT_RESET });
      }
    dispatch(getAdminProduct());
  }, [dispatch, alert, error, history]);

const columns = [
    { field: "id", headerName: "Id sản phẩm", minWidth: 100, flex: 0.2 },

    {
      field: "name",
      headerName: "Tên sản phẩm",
      Width: 150,
      flex: 0.2,
    },
    {
      field: "stock",
      headerName: "Còn lại",
      type: "number",
      minWidth: 50,
      flex: 0.2,
    },

    {
      field: "price",
      headerName: "Giá",
      type: "number",
      minWidth: 270,
      flex: 0.3,
    },

    {
      field: "actions",
      flex: 0.4,
      headerName: "Chức năng",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/edit/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
            onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
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

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

    return (
       <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">Danh sách sản phẩm</h1>

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

export default AllProducts
