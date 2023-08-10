// Import de CartService:
import CartService from '../services/carts.service.js'

// Import mongoose para validación de IDs:
import mongoose from 'mongoose';

// Clase para el Controller de carritos:
export default class CartController {

    constructor() {
        // Instancia de CartsService:
        this.cartService = new CartService();
    }

    // Métodos de CartController:

    // Crear un carrito - Controller:
    async createCartController() {
        const result = await this.cartService.createCartService();
        return result;
    }

    // Traer un carrito por su ID - Controller:
    async getCartByIdController(req, res) {
        let response = {}
        const cid = req.params.cid;
        if (!cid) {
            response.status = "error";
            response.message = "No se ha proporcionado un ID de carrito.";
            response.statusCode = 400;
        }
        if (!mongoose.Types.ObjectId.isValid(cid)) {
            response.status = "error";
            response.message = "El ID de carrito proporcionado no es válido.";
            response.statusCode = 400;
        } else {
            const result = await this.cartService.getCartByIdService(cid);
            response = result;
        }
        return response;
    }

    // Traer todos los carritos - Controller: 
    async getAllCartsController(req, res) {
        const result = await this.cartService.getAllCartsService();
        return result;
    };



    // Agregar un producto a un carrito - Controller:
    async addProductInCartController(req, res) {
        let response = {}; // Inicializar la variable response fuera de las validaciones
        const cid = req.params.cid;
        const pid = req.params.pid;
        if (!cid || !pid) {
            response.status = "error";
            response.message = "No se han proporcionado ID de carrito ni ID de producto.";
            response.statusCode = 400;
        } else if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid)) {
            response.status = "error";
            response.message = "Al menos uno de los ID proporcionados no es válido.";
            response.statusCode = 400;
        } else {
            const result = await this.cartService.addProductToCartService(cid, pid);
            response = result.result;
        }
        return response;
    };


















}































// NO

/*























export const eliminarProductoDelCarrito = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        await managerCarts.deleteProductFromCart(cartId, productId);
        res.send({
            status: 'Success.'
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            error: 'Error al eliminar un producto del carrito.'
        });
    }
};

export const eliminarTodosLosProductosDelCarrito = async (req, res) => {
    try {
        const cartId = req.params.cid;
        await managerCarts.deleteAllProductFromCart(cartId);
        res.send({
            status: 'Success.'
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            error: 'Error al eliminar todos los productos del carrito.'
        });
    }
};

export const actualizarCarrito = async (req, res) => {
    try {
        const cid = req.params.cid;
        const updatedCartFields = req.body;
        const updatedCart = await managerCarts.actualizarCarrito(cid, updatedCartFields);
        if (!updatedCart) {
            res.status(404).json({
                error: `No se encontró ningún carrito con el ID ${cid}.`
            });
        } else {
            res.send(updatedCart);
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            error: 'Error al actualizar el carrito.'
        });
    }
};

export const actualizarProductoEnCarrito = async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const updatedProdInCart = req.body;
        const updatedProdCart = await managerCarts.actualizarProductoEnCarrito(cid, pid, updatedProdInCart);
        if (!updatedProdCart) {
            res.status(404).json({
                error: 'No se encontró el producto en el carrito.'
            });
        } else {
            res.send(updatedProdCart);
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            error: 'Error al actualizar el producto en el carrito.'
        });
    }


};
*/