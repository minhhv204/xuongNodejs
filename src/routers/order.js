import { Router } from "express";
import { createOrder, getOrderById, getOrders } from "../controllers/order";

const oderRouter = Router();

oderRouter.post("/order", createOrder);
oderRouter.get("/order", getOrders);
oderRouter.get("/order/:userId/:orderId", getOrderById);
export default oderRouter;