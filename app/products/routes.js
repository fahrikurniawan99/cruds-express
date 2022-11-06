const express = require("express");
const router = express.Router();
const controller = require("./controller");
const multer = require("multer");
const upload = multer({ dest: "uploads" });

router.get("/product", controller.index);
router.get("/product/:id", controller.view);
router.post("/product", upload.single("image"), controller.store);
router.put("/product/:id", upload.single("image"), controller.update);
router.delete("/product/:id", controller.destroy);

module.exports = router;
