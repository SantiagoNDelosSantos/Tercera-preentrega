// Imoprt Router:
import { Router } from "express";

// Import ProductController:
import ProductController from "../controllers/productsController.js";

// Instancia de Router:
const productsRouter = Router();

// Instancia de ProductController: 
let productController = new ProductController();

// Crear un producto - Router:
productsRouter.post('/', async (req,res) => {
    const result = await productController.createProductController(req, res);
    res.status(result.statusCode).send(result);
});

// Traer un producto por su ID - Router: 
productsRouter.get('/:pid', async (req, res) => {
    const result = await productController.getProductByIDController(req, res);
    res.status(result.statusCode).send(result);
});

// Traer todos los productos - Router: 
productsRouter.get('/', async (req, res) => {
    const result = await productController.getAllProductsController(req, res);
    res.status(result.statusCode).send(result);
});

// Eliminar un producto por su ID - Router:
productsRouter.delete('/:pid', async (req, res) => {
    const result = await productController.deleteProductController(req, res);
    res.status(result.statusCode).send(result);
});

// Actualizar un producto - Router:
productsRouter.put('/:pid', async (req, res) => {
    const result = await productController.updatedProductController(req, res);
    res.status(result.statusCode).send(result);
});

// Export productsRouter:
export default productsRouter;