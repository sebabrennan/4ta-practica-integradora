import Services from "./class.services.js";
import ProductDaoMongo from "../daos/product.dao.js";
import { generateProducts } from "../utils/products.utils.js";

const prodDao = new ProductDaoMongo();

export default class ProductService extends Services {
    constructor(){
        super(prodDao);
    }

    createProductsMockService = async (cant = 100) => {
        try {
            const productsArray= [];
            for (let i = 0; i < cant; i++) {
                const product = generateProducts();
                productsArray.push(product)
            }
            return await prodDao.create(productsArray)
        } catch (error) {
            throw new Error(error);
        }
    }

};