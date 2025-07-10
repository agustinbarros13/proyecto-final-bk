const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    categoria: {
      type: String,
      required: true,
      enum: ["bicicletas", "accesorios", "repuestos"],
    },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    destacado: { type: Boolean, default: false },
    imagen: { type: String, default: "" } // Cloudinary opcional más adelante
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
