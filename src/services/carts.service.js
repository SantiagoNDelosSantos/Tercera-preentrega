// Import la clase del DAO de carritos:
import CartDAO from "../daos/mongodb/CartMongo.dao.js";

// Import de ProductsService para acceder a productos desde los carritos:
import ProductsService from "./products.service.js";

// Clase para el Service de carrito:
export default class CartsService {

    // Constructor de CartService:
    constructor() {
        this.cartDao = new CartDAO();
        this.productsService = new ProductsService();
    }

    // Metodos de CartService:

    // Crear un carrito:
    async createCartService() {
        const result = await this.cartDao.createCart();
        return result;
    }

    // Traer un carrito por su ID:
    async getCartByIdService(id) {
        const result = await this.cartDao.getCartById(id);
        if (!result) {
            return {
                error: "Carrito no encontrado."
            };
        }else{
            return result;
        }
    }

    // Traer todos los carritos:
    async getAllCarts() {
        const result = await this.cartDao.getAllCarts();
        if (!result) {
            return {
                error: "Error los carritos no han sido encontrados."
            };
        }else{
            return result;
        }
    }

    // Agregar un producto a un carrito:
    async addProductToCartService(cid, pid) {
        const product = await this.productsService.getProductsByIdService(pid);
        const result = await this.cartDao.addProductToCart(cid, product);
        if (!result) {
            return {
                error: "Error no se ha podido agregar el producto al carrito."
            };
        }else{
            return result;
        }
    }

    // Borrar un producto de un carrito: 
    async deleteProductFromCartService(cid, pid) {
        const product = await this.productsService.getProductsByIdService(pid);
        const result = await this.cartDao.addProductToCart(cid, product);
        if (!result) {
            return {
                error: "Error no se ha podido agregar el producto al carrito."
            };
        }else{
            return result;
        }
    }

}