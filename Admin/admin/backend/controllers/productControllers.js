import ProductModel from "../models/Product.js";

// Controller function to create a new product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, quantity } = req.body;
        const newProduct = new ProductModel({
            name,
            description,
            price,
            quantity
        });
        await newProduct.save();
        res.status(201).json({ success: true, message: "Product created successfully", newProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Controller function to get all products
const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Controller function to update a product
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, message: 'Product updated successfully', updatedProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Controller function to delete a product
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export { createProduct, getProducts, updateProduct, deleteProduct };
