const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const logger = require("morgan");
const productRouter = require("./app/products/routes");
const path = require("path");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1", productRouter);
app.use((req, res) => {
  res.send({
    status: "failed",
    response: "Resource not found.",
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
