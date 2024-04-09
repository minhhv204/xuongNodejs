import {Router} from "express";
import { create, deleteproductById,  getAllProducts, getproductById, related, updateproductById } from "../controllers/product";

const productRouter = Router();
productRouter.post('/products',create);
productRouter.get('/products',getAllProducts);
productRouter.get('/products/:categoryId/related/:productId',related);
productRouter.get('/products/:id',getproductById);
productRouter.put('/products/:id',updateproductById);
productRouter.delete('/products/:id',deleteproductById);
export default productRouter;