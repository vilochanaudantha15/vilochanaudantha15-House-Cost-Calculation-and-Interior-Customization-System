import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Table({ DeleteProduct, UpdateProduct }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function FeatchData() {
      try {
        const product = await axios.get("http://localhost:8000/api/products/");
        const response = product.data;
        // console.log(response.users)
        setData(response);
        // console.log(response.data.users.email, 'email')
      } catch (error) {
        console.log(error);
      }
    }
    FeatchData();
  }, [data]);

  return (
    <>
      <div className="container">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2>
                  Manage <b>Products</b>
                </h2>
              </div>
              <div className="col-sm-6">
                <a
                  href="#"
                  className="btn btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#addProductModal"
                >
                  <i className="material-icons">&#xE147;</i>{" "}
                  <span>Add New Product</span>
                </a>
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th></th>
                <th>Product Name</th>
                <th>Price</th>
                <th>price Per Kilo</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {data.products?.map((elem, index) => {
                return (
                  <tr>
                    <td></td>
                    <td>{elem.name}</td>
                    <td>{elem.price}</td>
                    <td>{elem.quantity}</td>
                    <td>{elem.description}</td>
                    <td>
                      <a
                        href="#"
                        className="edit cursor-pointer"
                        data-bs-toggle="modal"
                        data-bs-target="#editProductModal"
                        onClick={() => UpdateProduct(elem._id)}
                      >
                        <i
                          className="material-icons"
                          data-bs-toggle="tooltip"
                          title="Edit"
                        >
                          &#xE254;
                        </i>
                      </a>
                      <a
                        href="#"
                        className="delete cursor-pointer"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteProductModal"
                        onClick={() => DeleteProduct(elem._id)}
                      >
                        <i
                          className="material-icons"
                          data-bs-toggle="tooltip"
                          title="delete"
                        >
                          &#xE872;
                        </i>
                      </a>
                      {/* <a className="delete" data-bas-toggle='modal' data-bs-target='#deleteEmployeeModal'><i className="material-icons" data-bs-toggle="tooltip" title="Delete">&#xE872;</i></a> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
