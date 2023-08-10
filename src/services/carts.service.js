// Import clase del DAO de carritos:
import CartDAO from "../DAO/mongodb/CartMongo.dao.js";

// Import de ProductService para acceder a productos desde los carritos:
import ProductService from "./products.service.js";

// Clase para el Service de carrito:
export default class CartService {

    // Constructor de CartService:
    constructor() {
        this.cartDao = new CartDAO();
        this.productService = new ProductService();
    }

    // Métodos de CartService:

    // Crear un carrito - Service:
    async createCartService() {
        let response = {};
        try {
            const result = await this.cartDao.createCart();
            response.status = "success";
            response.message = "Cart created successfully.";
            response.result = result;
            response.statusCode = 200;
        } catch (error) {
            response.status = "error";
            response.message = "No se pudo crear el carrito.";
            response.error = error.message;
            response.statusCode = 500;
        }
        return response;
    }

    // Traer un carrito por su ID - Service:
    async getCartByIdService(cid) {
        let response = {};
        try {
            const result = await this.cartDao.getCartById(cid);
            if (!result) {
                response.status = "error";
                response.message = "Carrito no encontrado.";
                response.statusCode = 404;
            } else {
                response.status = "success";
                response.message = "Carrito obtenido exitosamente.";
                response.result = result;
                response.statusCode = 200;
            }
        } catch (error) {
            response.status = "error";
            response.message = "No se pudo obtener el carrito.";
            response.error = error.message;
            response.statusCode = 500;
        }
        return response;
    }

    // Traer todos los carritos - Service:
    async getAllCartsService() {
        let response = {};
        try {
            const result = await this.cartDao.getAllCarts();
            if (!result) {
                response.status = "error";
                response.message = "Carritos no encontrados.";
                response.statusCode = 404;
            } else {
                response.status = "success";
                response.message = "Carritos obtenidos exitosamente.";
                response.result = result;
                response.statusCode = 200;
            }
        } catch (error){
            response.status = "error";
            response.message = "No se pudo obtener los carritos.";
            response.error = error.message;
            response.statusCode = 500;
        }
        return response;
    }
















    

    // Agregar un producto a un carrito - Service:
    async addProductToCartService(cid, pid) {
        let response = {}
        const product = await this.productService.getProductByIdService(pid)
        const soloProduct = product.result
        console.log(soloProduct)


        const result = await this.cartDao.addProductToCart(cid, soloProduct);

        if (!result) {
            return {
                error: "Error no se ha podido agregar el producto al carrito."
            };
        } else {
                response.status = "success";
                response.message = "Carritos obtenidos exitosamente.";
                response.result = result;
                response.statusCode = 200;
        }
        return  response
    }







    





























    // Borrar un producto de un carrito: 
    async deleteProductFromCartService(cid, pid) {

        const product = await this.productsService.getProductsByIdService(pid);

        const result = await this.cartDao.addProductToCart(cid, product);

        if (!result) {
            return {
                error: "Error no se ha podido agregar el producto al carrito."
            };
        } else {
            return result;
        }
    }

}