const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("../models/Product");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error de conexión", error);
    process.exit(1);
  }
};

const importCSV = async () => {
  await connectDB();

  const results = [];
  const filePath = path.join(__dirname, "../../productos_barritos_bikes.csv");

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => {
      // Convertir valores del CSV a tipos correctos
      results.push({
        nombre: data.nombre,
        descripcion: data.descripcion,
        categoria: data.categoria,
        precio: parseFloat(data.precio),
        stock: parseInt(data.stock),
        destacado: data.destacado === "true",
        imagen: "" // Se puede usar Cloudinary más adelante
      });
    })
    .on("end", async () => {
      try {
        await Product.deleteMany(); // Opcional: limpiar antes
        await Product.insertMany(results);
        console.log("✅ Productos importados correctamente");
        process.exit();
      } catch (error) {
        console.error("❌ Error al insertar productos", error);
        process.exit(1);
      }
    });
};

importCSV();
