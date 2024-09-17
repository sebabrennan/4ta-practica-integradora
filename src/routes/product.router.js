import { Router } from 'express';
import ProductController from "../controllers/product.controller.js";
import { checkAdmin } from "../middlewares/checkAdmin.js";
import { checkAuth } from "../middlewares/authJwt.js";
import { checkPremium } from '../middlewares/checkPremium.js';
import { checkAdminOrPremium } from '../middlewares/checkAdminOrPremium.js';

const controller = new ProductController();

const router = Router()

router.get('/', [checkAuth], controller.getAll);

router.get('/:id', [checkAuth], controller.getById);

router.post('/', [checkAuth, checkAdminOrPremium], controller.create);

router.post('/mockingproducts', [checkAuth, checkAdmin], controller.createProductsMockController);

router.put('/:id', [checkAuth, checkAdmin], controller.updateProduct);

router.delete('/:id', [checkAuth, checkAdminOrPremium], controller.deleteProduct);

export default router;