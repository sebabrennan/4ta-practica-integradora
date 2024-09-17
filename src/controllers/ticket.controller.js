import Controllers from "./class.controller.js";
import TicketService from "../services/ticket.service.js";
import httpResponse from "../utils/http.response.js";
const ticketService = new TicketService();

export default class TicketController extends Controllers {
  constructor() {
    super(ticketService);
  }

  async generateTicket(req, res, next) {
    try {
      const user = req.user;
      const ticket = await ticketService.generateTicket(user);
      !ticket ? httpResponse.NotFound(res, ticket) : httpResponse.Ok(res, ticket);
    } catch (error) {
      next(error);
    }
  }
}
