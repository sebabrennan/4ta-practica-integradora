import Controllers from "./class.controller.js";
import CartService from '../services/cart.services.js';
import httpResponse from "../utils/http.response.js";
const cartService = new CartService();

export default class CartController extends Controllers{
  constructor(){
    super(cartService)
  }
  addProdToCart = async (req, res, next) => {
    try {
      const { cart, role, email } = req.user;
      const { idProd } = req.params;
      const newProdToUserCart = await this.service.addProdToCart(
        cart,
        idProd,
        role,
        email
      );
      !newProdToUserCart ? httpResponse.NotFound(res, newProdToUserCart) : httpResponse.Ok(res, newProdToUserCart)
    } catch (error) {
      next(error);
    }
  };

  removeProdToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const delProdToUserCart = await this.service.removeProdToCart(
        idCart,
        idProd,
      );
      !delProdToUserCart ? httpResponse.NotFound(res, delProdToUserCart) : httpResponse.Ok(res, delProdToUserCart)
    } catch (error) {
      next(error);
    }
  };

  updateProdQuantityToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const { quantity } = req.body;
      const  updateProdQuantity = await this.service.updateProdQuantityToCart(
        idCart,
        idProd,
        quantity
      );
      !updateProdQuantity ? httpResponse.NotFound(res, updateProdQuantity) : httpResponse.Ok(res, updateProdQuantity)
    } catch (error) {
      next(error);
    }
  };

  clearCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const clearCart = await this.service.clearCart(
        idCart,
      );
      !clearCart ? httpResponse.NotFound(res, clearCart) : httpResponse.Ok(res, clearCart)
    } catch (error) {
      next(error);
    }
  };
}