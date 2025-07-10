const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} = require("../controllers/order.controller");

const { verifyToken, isAdmin } = require("../middleware/auth");

// Crear pedido (usuario logueado)
router.post("/", verifyToken, createOrder);

// Ver mis pedidos (usuario logueado)
router.get("/", verifyToken, getUserOrders);

// Ver todos los pedidos (solo admin)
router.get("/all", verifyToken, isAdmin, getAllOrders);

// Actualizar estado del pedido (solo admin)
router.put("/:id", verifyToken, isAdmin, updateOrderStatus);

module.exports = router;
