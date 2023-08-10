// Importaciones de paquetes y módulos
import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server, Socket } from 'socket.io';

// Importación de rutas:
import cartRouter from './routes/cart.router.js';
import msmRouter from './routes/message.router.js';
import productsRouter from './routes/products.router.js';
import sessionRouter from './routes/session.router.js'
import viewsRouter from "./routes/views.router.js";

// Importación de managers:
import ManagerProducts from './DAO/mongodb/ProductsManager.class.js';
import ManagerMessage from './DAO/mongodb/MessagesManager.class.js';
import ManagerCarts from './DAO/mongodb/CartManager.class.js';
// import { logout } from './public/js/profile.js';

// Importación de configuraciones de Passport:
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { initializePassportLocal } from './config/local.passport.js';
import { initializePassportGitHub } from './config/gitHub.passport.js';
import { initializePassportJWT } from './config/jwt.passport.js';

// Importación de variables de entorno:
import { envMongoURL, envPort } from './config.js';

// Iniciamos el servidor Express:
const app = express();

// Conexión Mongoose: 
const connection = mongoose.connect(envMongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Configuración de Middlewares
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Inicialización de Passport 
app.use(cookieParser());
initializePassportLocal();
initializePassportJWT();
initializePassportGitHub();
app.use(passport.initialize());

// Creamos el servidor HTTP con Express:
const expressServer = app.listen(envPort, () => {
    console.log(`Servidor iniciado en el puerto ${envPort}.`);
});

// Creamos el servidor Socket.io escuchando el servidor HTTP
const socketServer = new Server(expressServer);

// Managers:
export const pdcMANGR = new ManagerProducts();
export const smsMANGR = new ManagerMessage();
export const cartMANGR = new ManagerCarts();

// Eventos y acciones para el servidor Socket.io:
socketServer.on("connection", async (socket) => {

    // Mensaje de nuevo cliente conectado:
    console.log("¡Nuevo cliente conectado!", socket.id)

    // Products:

    // Carga de productos inicial (Sin presionar el Boton de Filtrar):
    // Traigo los productos de ManagerProducts sin filtrar y los guardo en products:
    const products = await pdcMANGR.consultarProductos();
    // Envio a traves del canal 'productos' todos los products sin filtrar:
    socket.emit('productos', products);

    // Recibo el producto para agregar al carrtito:
    socket.on("agregarProductoEnCarrito", async ({
        cartID,
        productID
    }) => {
        if (cartID && productID) {
            await cartMANGR.agregarProductoEnCarrito(cartID, productID);
            console.log(`server-prodc: ${productID}`)
            console.log(`server-cart: ${cartID}`)
        }
    });

    // Buscamos el title del product para el Alert:
    socket.on("buscarTile", async (productIDValue) => {
        let product = await pdcMANGR.consultarProductoPorId(productIDValue);
        socket.emit("titleEncontrado", product);
    });


    // Recibo los filtros de main.js en busquedaProducts:

    socket.on('busquedaFiltrada', async (busquedaProducts) => {

        const {
            limit,
            page,
            sort,
            filtro,
            filtroVal
        } = busquedaProducts;

        const products = await pdcMANGR.consultarProductos(limit, page, sort, filtro, filtroVal);

        socket.emit('productos', products);

    });

    // Otros sockets de Prodcuts:

    // Escuchamos el evento addProduct y recibimos el producto:
    socket.on("addProduct", (data) => {
        products.push(data);
        socketServer.emit("productos", products);
    })

    // Escuchamos el evento deleteProduct y recibimos el id del producto:
    socket.on("deleteProduct", (id) => {
        products.splice(
            products.findIndex((product) => product.id === id), 1
        );
        socketServer.emit("productos", products);
    })

    // Carts:

    // Traigo todos los carritos y los guardo en carts:
    // const carts = await cartMANGR.consultarCarts();
    // Envio a traves del canal 'carritos' todos los carritos:
    // socket.emit('carritos', {
    //    docs: carts
    // });

    
    // Accedo a los productos de un carrito especifico: 
    socket.on("CartCid", async (cartID) => {
        const cartCID = await cartMANGR.consultarCartPorId(cartID);
        socketServer.emit("CARTID", (cartCID));
    })

    //Messages:

    // Escuchamos el evento addMessage y recibimos el mensaje:
    socket.on("addMessage", (sms) => {
        messages.push(sms);
        socketServer.emit("messages", messages);
    })

    // Enviamos los mensajes al usuario:
    const messages = await smsMANGR.verMensajes();
    socket.emit("messages", messages);

    // Escuchamos el evento deleteMessage y recibimos el id del mensaje.
    socket.on("deleteMessage", (id) => {
        messages.splice(
            messages.findIndex((message) => message.id === id), 1
        );
        socketServer.emit("messages", messages);
    })

});

// Middleware para acceder al servidor Socket.io desde las rutas
app.use((req, res, next) => {
    req.socketServer = socketServer;
    next()
});

// Rutas:
app.use('/api/carts/', cartRouter);
app.use('/api/chat/', msmRouter);
app.use('/api/realtimeproducts', productsRouter);
app.use('/api/sessions', sessionRouter);
app.use('/', viewsRouter);