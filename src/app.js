const express = require("express");
const cors = require("cors");
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 👇 Importar las rutas de usuarios aquí
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/orders", require("./routes/order.routes"));

// Ruta base
app.get("/", (req, res) => {
  res.send("🚴‍♂️ API Barritos Bikes funcionando");
});

module.exports = app;
