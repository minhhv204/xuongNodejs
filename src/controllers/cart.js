import { StatusCodes } from "http-status-codes";
import Cart from "../models/cart";


export const getCartByUserId = async (req,res) =>{
    //GET /cart/:userId
    const {userId} = req.params;
    try {
        
        const cart = await Cart.findOne({userId}).populate("products.productId");
        const cartData  = {
            products: cart.products.map((item)=>({
                productId: item.productId._id,
                price: item.productId.price,
                quantity: item.quantity,
                name: item.productId.name,
            }))
        }

        
        return res.status(StatusCodes.OK).json(cartData);
    } catch (error) {
        
    }
}
export const addItemToCart = async (req, res) =>{
    const {userId, productId, quantity} = req.body;
    try {
        // kiem tra gio hang ton tai chua ? bang userId
        let cart = await Cart.findOne({userId});
        // neu gio hang khong ton tai thi tao moi
        if (!cart) {
            cart = new Cart({userId, products: []});
        }
        //kiem tra xem sp co ton tai trong gio hang hay khong
        const existProductIndex = cart.products.findIndex((item)=> item.productId.toString() == productId);
        
        if (existProductIndex !== -1) {
            //neu sp ton tai thi cap nhat so luong
            cart.products[existProductIndex].quantity += quantity;
        }else{
            // neu sp chua co trong gio hang thi them moi
            cart.products.push({productId, quantity});
        }
        await cart.save();
        return res.status(StatusCodes.OK).json({cart})
    } catch (error) {
        
    }
}
export const removeFromCart = async (req,res) =>{
    const {userId, productId} = req.body;
    try {
        let cart = await Cart.findOne({userId});
        if (!cart) {
            return res.status(StatusCodes.NOT_FOUND).json({error: "Cart Not Found"});
        }
        cart.products = cart.products.filter((product)=> product.productId && product.productId.toString() !== productId);
        await cart.save();
        return res.status(StatusCodes.OK).json({cart})
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({error: "Internal Server Error"})
    }
}
export const updateProductQuantity = async (req,res) =>{
    const {userId, productId, quantity} = req.body;
    try {
        let cart = await Cart.findOne({userId});
        if (!cart) {
            return res.status(StatusCodes.NOT_FOUND).json({error: "Cart Not Found"});
        }
        const product = cart.products.find((item) => item.productId.toString() == productId);
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({error: "Product Not Found"});
        }
        product.quantity = quantity;
        await cart.save();
        return res.status(StatusCodes.OK).json({cart});
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({error: "Internal Server Error"})
    }
}
// Tăng số lượng của sản phẩm trong giỏ hàng
export const increaseProductQuantity = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const product = cart.products.find((item) => item.productId.toString() === productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        product.quantity++;

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Giảm số lượng của sản phẩm trong giỏ hàng
export const decreaseProductQuantity = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const product = cart.products.find((item) => item.productId.toString() === productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        if (product.quantity > 1) {
            product.quantity--;
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};