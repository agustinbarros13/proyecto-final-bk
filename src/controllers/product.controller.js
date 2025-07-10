const Product = require("../models/Product");

// Crear producto (admin)
const createProduct = async (req, res) => {
  try {
    const { nombre, descripcion, categoria, precio, stock, destacado, imagen } = req.body;

    const nuevoProducto = new Product({
      nombre,
      descripcion,
      categoria,
      precio,
      stock,
      destacado,
      imagen
    });

    const guardado = await nuevoProducto.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(500).json({ msg: "Error al crear el producto", error });
  }
};

// Obtener todos los productos
const getAllProducts = async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener productos", error });
  }
};

// Obtener producto por ID
const getProductById = async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);
    if (!producto) return res.status(404).json({ msg: "Producto no encontrado" });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener producto", error });
  }
};

// Editar producto
const updateProduct = async (req, res) => {
  try {
    const producto = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!producto) return res.status(404).json({ msg: "Producto no encontrado" });

    res.json({ msg: "Producto actualizado correctamente", producto });
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar producto", error });
  }
};

// Eliminar producto
const deleteProduct = async (req, res) => {
  try {
    const producto = await Product.findByIdAndDelete(req.params.id);
    if (!producto) return res.status(404).json({ msg: "Producto no encontrado" });

    res.json({ msg: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar producto", error });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
