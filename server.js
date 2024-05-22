import express from "express";
import cartRouter from './src/routes/cart-router.js';
import productsRouter from './src/routes/products-routes.js';
import { errorHandler } from './src/middlewares/errorHandler.js';

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use('/api/carts', cartRouter);

app.use('/api/products', productsRouter);

app.use(errorHandler);

const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));