const Order = require("../models/Order");
const Product = require("../models/Product");

// ✅ Crear pedido (usuario autenticado)
const createOrder = async (req, res) => {
  try {
    const { productos } = req.body;

    let total = 0;

    for (let item of productos) {
      const producto = await Product.findById(item.producto);
      if (!producto) return res.status(404).json({ msg: "Producto no encontrado" });
      total += producto.precio * item.cantidad;
    }

    const nuevaOrden = new Order({
      usuario: req.user.id,
      productos,
      total,
      historialEstado: [{ estado: "pendiente" }]
    });

    const ordenGuardada = await nuevaOrden.save();
    res.status(201).json(ordenGuardada);
  } catch (error) {
    res.status(500).json({ msg: "Error al crear el pedido", error });
  }
};

// ✅ Obtener pedidos del usuario logueado
const getUserOrders = async (req, res) => {
  try {
    const pedidos = await Order.find({ usuario: req.user.id })
      .populate("productos.producto")
      .sort({ createdAt: -1 });

    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener pedidos", error });
  }
};

// ✅ Obtener todos los pedidos (solo admin) con filtro por estado
const getAllOrders = async (req, res) => {
  try {
    const { estado } = req.query;
    const filtro = estado ? { estado } : {};

    const pedidos = await Order.find(filtro)
      .populate("usuario", "name email")
      .populate("productos.producto")
      .sort({ createdAt: -1 });

    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener todos los pedidos", error });
  }
};

// ✅ Actualizar estado de un pedido (solo admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const pedido = await Order.findById(id);
    if (!pedido) return res.status(404).json({ msg: "Pedido no encontrado" });

    if (pedido.estado !== estado) {
      pedido.estado = estado;
      pedido.historialEstado.push({ estado });
      await pedido.save();
    }

    res.json({ msg: "Estado actualizado correctamente", pedido });
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar el estado", error });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
};
