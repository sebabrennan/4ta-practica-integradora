import Controllers from "./class.controller.js";
import ProductService from "../services/product.services.js";
import httpResponse from "../utils/http.response.js";
const prodService = new ProductService();

export default class ProductController extends Controllers {
    constructor(){
        super(prodService)
    }

    createProductsMockController = async (req, res, next) => {
        try {
          const {cant} = req.query;
          const data = await prodService.createProductsMockService(cant);
          httpResponse.Ok(res, data)
        } catch (error) {
          next(error)
        }
    }

    updateProduct = async(req, res, next) => {
      try {
        const { id } = req.params;
        const product = await this.service.getById(id);
        const { owner } = product;
        const { email } = req.user
        if(owner === "admin" || owner === email){
          const data = await this.service.update(id, req.body);
          !data ? httpResponse.NotFound(res, data) : httpResponse.Ok(res, data);
        }
      } catch (error) {
        next(error);
      }
    };

    deleteProduct = async(req, res, next) => {
      try {
        const { id } = req.params;
        const product = await this.service.getById(id);
        const { owner } = product;
        const { email, role } = req.user;
        
        if (role === "admin" || owner === email) {
          const data = await this.service.delete(id);
          !data ? httpResponse.NotFound(res, data) : httpResponse.Ok(res, data);
        } else {
          httpResponse.Forbidden(res, { message: "No tienes permisos para realizar esta acción" });
        }
        
      } catch (error) {
        next(error);
      }
    };
};