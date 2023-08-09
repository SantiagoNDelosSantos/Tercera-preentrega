// Import mongoose para el mongoose.connect:
import mongoose from "mongoose";

// Import del modelo de carritos:
import { cartModel } from "./models/carts.model.js";

// Import de variables de entorno:
import { envMongoURL } from "../../config.js";

// Clase para el DAO de carrito:
export default class CartsDAO {

    // Conexión Mongoose:
    connection = mongoose.connect( envMongoURL );

    // Crear un carrito:
    async createCart() {
        const result = await cartModel.create({
            products: []
        });
        return {
            status: "success",
            result
        };
    };

    // Traer un carrito por su ID:
    async getCartById(id) {
        const result = await cartModel.findOne({_id: id}).populate('products.product');
        return result;
    };
    
    // Traer todos los carritos: 
    async getAllCarts() {
        const result = await cartModel.find();
        return result;
    };

    // Agregar un producto a un carrito:
    async addProductToCart(cid, product) {
        const cart = await this.getCartById(cid);
        cart.products.push({ product: product });
        await cart.save();
        return {
            status: 'success'
        };
    };

    // Borrar un producto de un carrito: 
    async deleteProductFromCart(cid, pid) {
        const cart = await this.getCartById(cid);
        cart.products.pull(pid);
        await cart.save();
        return {
            status: 'success'
        };
    };

    // Borrar todos los productos de un carrito: 
    async deleteAllProductsFromCart(cid) {
        const cart = await this.getCartById(cid);
        cart.products = [];
        await cart.save();
        return {
            status: 'success'
        };
    };

    // Actualizar un carrito:
    async updateCart(cid, updatedCartFields) {
        let result = await cartModel.updateOne({
            _id: cid
        }, {
            $set: updatedCartFields
        });
        return {
            status: 'success',
            result
        };
    };

    // Actualizar la cantidad de un produco en carrito: 
    async updateProductToCart(cid, pid, updatedProdInCart) {
        const cart = await this.getCartById(cid);
        const product = cart.products.find((p) => p._id.toString() === pid);
        product.quantity = updatedProdInCart.quantity;
        await cart.save();
        return {
            status: 'success',
            cart
        };
    };

}