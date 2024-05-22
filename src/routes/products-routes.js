import { Router } from "express";
import { __dirname } from "../path.js";
import ProductManager from "../managers/products-manager.js";
import {productValidator} from '../middlewares/productValidator.js'

const productsRouter = Router();
const productManager = new ProductManager(`${__dirname}/db/products.json`);

productsRouter.get('/', async(req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts(limit);
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);
    }
});

productsRouter.get("/:idProd", async (req, res) => {
    try {
      const { idProd } = req.params;
      const product = await productManager.getProductById(idProd);
      if (!product) res.status(404).json({ msg: "product not found" });
      else res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });

productsRouter.post('/', productValidator, async (req, res)=>{
    try {
        const product = req.body;
        const newProduct = await productManager.newProducts(product);
        res.json(newProduct);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

productsRouter.put("/:idProd", async (req, res) => {
    try {
      const { idProd } = req.params;
      const prodObj = req.body;
      const prodUpd = await productManager.modifyProduct(idProd, prodObj);
      !prodUpd ? res.status(404).json({ error: "Product not found" }) : res.status(200).json(prodUpd);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });

productsRouter.delete("/:idProd", async (req, res) => {
    try {
      const { idProd } = req.params;
      const delProd = await productManager.deleteProduct(idProd);
      if(!delProd) res.status(404).json({ msg: "Error delete product" });
      else res.status(200).json({msg : `product id: ${idProd} deleted successfully`})
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });

export default productsRouter;