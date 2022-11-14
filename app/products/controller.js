const Product = require("./model");
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");

const index = async (req, res) => {
  try {
    await Product.sync();
    const { search } = req.query;
    let result = "";
    if (search) {
      result = await Product.findAll({
        where: {
          name: {
            [Op.like]: `%${search}%`,
          },
        },
      });
    } else {
      result = await Product.findAll();
    }
    res.send({
      status: "success",
      response: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const view = async (req, res) => {
  try {
    await Product.sync();
    const { id } = req.params;
    const result = await Product.findOne({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      response: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const store = async (req, res) => {
  try {
    await Product.sync();
    const { user_id, name, price, stock, status } = req.body;
    const image = req.file;
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);

    const result = await Product.create({
      user_id,
      name,
      price,
      stock,
      status,
      image_url: `http://localhost:3000/public/${image.originalname}`,
    });
    res.send({
      status: "success",
      response: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const update = async (req, res) => {
  try {
    await Product.sync();
    const { id } = req.params;
    const image = req.file;
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);

    await Product.update(
      {
        ...req.body,
        image_url: `http://localhost:3000/public/${image.originalname}`,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(201).json({
      status: "succces",
      response: {
        ...req.body,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const destroy = async (req, res) => {
  try {
    await Product.sync();
    const { id } = req.params;
    await Product.destroy({ where: { id } });
    res.send({ status: "succces", response: `product delete successfully` });
  } catch (error) {
    res.send(destroy);
  }
};

module.exports = { index, view, store, update, destroy };
