import fs from "fs";
import { v4 as uuid } from "uuid";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts(querylimit) {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf8");
        if (!products) return []
        else return JSON.parse(products);
      } else return [];
    } catch (error) {
      console.error(error);
    }
  }

  async newProducts(obj) {
    try {
      const newProduct = {
        id: uuid(),
        status: true,
        ...obj,
      };
      const products = await this.getProducts();
      products.push(newProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return newProduct;
    } catch (error) {
      console.error(error);
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const productExist = products.find((product)=>product.id === id);
      return productExist || null;
    } catch (error) {
      console.error(error);
    }
  }

  async modifyProduct(id, obj) {
    try {
      const products = await this.getProducts();
      let productExists = products.find((product)=>product.id === id);
      if (productExists) {
        productExists = { ...productExists, ...obj };
      } else return null;
      const productsUpdated = products.filter((product) => product.id !== id);
      productsUpdated.push(productExists);
      await fs.promises.writeFile(this.path,JSON.stringify(productsUpdated, null, "\t"));
      return productExists;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const productListed = products.find((product) => product.id === id);
      if (!productListed) return null;
      const productsUpdated = products.filter((product) => product.id !== id);
      await fs.promises.writeFile(this.path,JSON.stringify(productsUpdated, null, "\t"));
      return productListed;
    } catch (error) {
      console.error(error);
    }
  }
}

export default ProductManager;