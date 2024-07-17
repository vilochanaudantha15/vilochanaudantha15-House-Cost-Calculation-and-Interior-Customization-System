import { useState } from "react";
import ProductTable from "../Component/ProductTable";
import AddProduct from "../Component/AddProduct";
import UpdateProduct from "../Component/UpdateProduct";
import DeleteProduct from "../Component/DeleteProduct";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProductsTable() {
  const [productId, setProductId] = useState();
  const [updateproductId, setUpdateProductId] = useState();
  console.log(updateproductId);
  const [value, setValue] = useState({
    name: "",
    quantity: "",
    price: "",
    quantitykilo: "",
    priceperkilo: "",
  });
  const deleteproduct = (productid) => {
    setProductId(productid);
  };
  const handleProductDelete = async () => {
    try {
      const DeleteProduct = await axios.delete(
        `http://localhost:8000/api/products/:id'/${productId}`
      );
      const response = DeleteProduct.data;
      if (response.success) {
        toast.success(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlechange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const UpadteProductData = (Updateid) => {
    setUpdateProductId(Updateid);
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const UpdatedProduct = await axios.put(
        `http://localhost:8000/api/products/:id/${updateproductId}`,
        value
      );
      const response = UpdatedProduct.data;

      if (response.success) {
        toast.success(response.message);
      }
      // console.log(response)
    } catch (error) {
      console.log(error);
    }
    // console.log(value)
  };
  return (
    <>
      <ProductTable
        deleteproduct={deleteproduct}
        UpdateProduct={UpadteProductData}
      ></ProductTable>

      <AddProduct></AddProduct>
      <UpdateProduct
        handleOnSubmit={handleOnSubmit}
        value={value}
        handlechange={handlechange}
      ></UpdateProduct>
      <DeleteProduct handleProductDelete={handleProductDelete}></DeleteProduct>
    </>
  );
}
