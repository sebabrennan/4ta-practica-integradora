import Services from "./class.services.js";
import CartServices from "./cart.services.js";
import ProductService from "./product.services.js";
import TicketDaoMongo from "../daos/ticket.dao.js";

const ticketDao = new TicketDaoMongo();
const prodService = new ProductService();
const cartService = new CartServices();

export default class TicketService extends Services {
  constructor() {
    super(ticketDao);
  }

  async generateTicket(user) {
    try {
      const cart = await cartService.getById(user.cart);
      if (!cart) return null;

      let amountAcc = 0;
      if (cart.products.length > 0) {
        for (const prodInCart of cart.products) {
          const idProd = prodInCart.product;
          const prodDB = await prodService.getById(idProd);

          if (prodInCart.quantity <= prodDB.stock) {
            const amount = prodInCart.quantity * prodDB.price;
            amountAcc += amount;
            const updateStock = prodDB.stock - prodInCart.quantity
            await prodService.update(idProd, { stock: updateStock })
          } else return null;
        }
        
        const ticket = await this.dao.create({
          purchase_datetime: new Date().toLocaleString(),
          amount: amountAcc,
          purchaser: user.email,
        });
        await cartService.clearCart(user.cart);
        return ticket;
      } else return { msg: "No es posible generar la compra porque el carrito está vacío"}
    } catch (error) {
      throw new Error(error);
    }
  }
}
