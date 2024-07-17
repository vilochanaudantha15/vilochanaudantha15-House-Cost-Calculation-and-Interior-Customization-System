import React, { useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddProduct() {
  const [value, setValue] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const CloseRef = useRef();

  const handleOnChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const addProduct = await axios.post(
        "http://localhost:8000/api/products/",
        value
      );
      const response = addProduct.data;
      if (response.success) {
        toast.success(response.message);
        CloseRef.current.click();
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div id="addProductModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h4 className="modal-title">Add Product</h4>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-hidden="true"
                  ref={CloseRef}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    value={value.name}
                    name="name"
                    onChange={handleOnChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    value={value.description}
                    name="description"
                    onChange={handleOnChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="text"
                    value={value.price}
                    name="price"
                    onChange={handleOnChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="text"
                    value={value.quantity}
                    name="quantity"
                    onChange={handleOnChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-bs-dismiss="modal"
                  onClick={() =>
                    setValue({
                      name: "",
                      description: "",
                      price: "",
                      quantity: "",
                    })
                  }
                >
                  Cancel
                </button>
                <input type="submit" className="btn btn-primary" value="Add" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
