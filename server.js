import express from "express";
import userManager from "./fs/files/UserManager.fs.js";
import productManager from "./fs/files/ProductManager.fs.js";
import { read } from "fs";

const server = express();

const port = 8080;

const ready = () => console.log("Server ready on por " + port);

server.listen(port, ready);

server.use(express.urlencoded({ extended: true }));



//Get para la creacion de un Usuario nuevo
server.get("/createUsers/:photo/:email/:password", async (req, res) => {
  try {
    const { photo, email, password } = req.params;
    const data = { photo, email, password };
    const one = await userManager.create(data);
    return res.status(201).json({ response: one, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ response: "ERROR", success: false });
  }
});

//Get para la creacion de un Producto nuevo
server.get(
  "/createProducts/:title/:photo/:category/:price/:stock",
  async (req, res) => {
    try {
      const { title, photo, category, price, stock } = req.params;
      const data = { title, photo, category, price, stock };
      const one = await productManager.create(data);
      return res.status(201).json({ response: one, success: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ response: "ERROR", success: false });
    }
  }
);

//Get para la lectura de los Usuarios
server.get("/readUsers", async (req, res) => {
  try {
    const { email } = req.query;
    const all = await userManager.read(email);
    return res.status(200).json({ response: all, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      response: "ERROR",
      success: false,
    });
  }
});

//Get para la lectura de Productos
server.get("/readProducts", async (req, res) => {
  try {
    const { category } = req.query;
    const all = await productManager.read(category);
    return res.status(200).json({ response: all, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      response: "ERROR",
      success: false,
    });
  }
});

//Get para realizar el ProductManagers.readOne()
server.get("/readProductsId/:nid", async (req, res) => {
  try {
    const { nid } = req.params;
    const one = await productManager.readOne(nid);
    if (one) {
      return res.status(200).json({
        response: one,
        success: true,
      });
    } else {
      const error = new Error("Not Found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return res.status(error.statusCode).json({
      response: error.message,
      succes: false,
    });
  }
});

//Get para realizar el UsersManagers.readOne()

server.get("/readUsersId/:nid", async (req, res) => {
  try {
    const { nid } = req.params;
    const one = await userManager.readOne(nid);
    if (one) {
      return res.status(200).json({
        response: one,
        success: true,
      });
    } else {
      const error = new Error("Not Found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return res.status(error.statusCode).json({
      response: error.message,
      succes: false,
    });
  }
});
