import {Router} from "express"
import { addItemToCart, decreaseProductQuantity, getCartByUserId, increaseProductQuantity, removeFromCart, updateProductQuantity } from "../controllers/cart";

const cartRouter = Router();

cartRouter.post("/cart/add-to-cart", addItemToCart)
cartRouter.post("/cart/update", updateProductQuantity)
cartRouter.get("/cart/:userId", getCartByUserId)
cartRouter.post("/cart/remove", removeFromCart)
// Tăng số lượng của sản phẩm trong giỏ hàng
cartRouter.post("/cart/increase", increaseProductQuantity);
// Giảm số lượng của sản phẩm trong giỏ hàng
cartRouter.post("/cart/decrease", decreaseProductQuantity);
export default cartRouter;