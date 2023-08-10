// Import Router:
import {
    Router
} from "express";

// Import CartController:
import CartController from '../controllers/cartController.js'

// Instancia de Router:
const cartRouter = Router();

// Instancia de CartController: 
let cartController = new CartController();

// Crear un carrito - Router:
cartRouter.post("/", async (req, res) => {
    const result = await cartController.createCartController();
    res.status(result.statusCode).send(result);

});

// Traer un carrito por su ID - Router:
cartRouter.get("/:cid", async (req, res) => {
    const result = await cartController.getCartByIdController(req, res);
    res.status(result.statusCode).send(result);
});

// Traer todos los carritos - Router: 
cartRouter.get('/', async (req, res) => {
    const result = await cartController.getAllCartsController();
    res.status(result.statusCode).send(result);
});

// Agregar un producto a un carrito - Router:
cartRouter.post('/:cid/products/:pid', async (req, res) => {
    const result = await cartController.addProductInCartController(req, res);
    res.status(result.statusCode).send(result);
});


























/*





cartRouter.delete('/:cid/products/:pid', eliminarProductoDelCarrito);

cartRouter.delete('/:cid', 
eliminarTodosLosProductosDelCarrito);

cartRouter.put('/:cid', actualizarCarrito);

cartRouter.put('/:cid/products/:pid', actualizarProductoEnCarrito);
¨
*/

export default cartRouter;