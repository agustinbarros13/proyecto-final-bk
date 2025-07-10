const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/product.controller");

const { verifyToken, isAdmin } = require("../middleware/auth");
const { upload } = require("../utils/cloudinary"); //  subida de imágenes

// ✅ Obtener todos los productos
router.get("/", getAllProducts);

// ✅ Obtener un producto por su ID
router.get("/:id", getProductById);

// ✅ Crear producto (solo admin)
router.post("/", verifyToken, isAdmin, createProduct);

// ✅ Editar producto (solo admin)
router.put("/:id", verifyToken, isAdmin, updateProduct);

// ✅ Eliminar producto (solo admin)
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

// ✅ Subir imagen de producto (solo admin)
router.post(
  "/upload",
  verifyToken,
  isAdmin,
  upload.single("imagen"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ msg: "No se subió ninguna imagen" });
    }

    res.status(200).json({
      msg: "Imagen subida correctamente",
      url: req.file.path, // esta URL se puede usar como `imagen` en el producto
    });
  }
);

module.exports = router;
