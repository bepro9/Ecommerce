require("dotenv").config();
require("./database");
const express = require("express");
const morgan = require("morgan");

const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");
const productRouter = require("./routes/product.routes");
const cartRouter = require("./routes/cart.routes");
const orderRouter = require("./routes/order.routes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

// Routes
app.get("/hc", (req, res) => res.send("Health Check..."));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);

app.listen(PORT, () => {
  console.log("---------------------------------");
  console.log(`🚀 App is listening on ${PORT} 🚀`);
  console.log("---------------------------------");
});
