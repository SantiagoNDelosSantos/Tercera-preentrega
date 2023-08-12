
import { Router } from 'express';
import passport from 'passport';

//import { verProductosEnTiempoReal, verChat, verUsuario, verPerfil} from '../controllers/viewsController.js';

const viewsRouter = Router();


/// Acá solo vamos a poner las funcionalidades para las vista no las cosas que tienen que renderizar en en tiempo real en las vistas, get all products, get cart by id y get all message lo tengo que poner en el server.js que va a a estar conectado con los controladores. 


viewsRouter.get('/products', (req, res) => {
    res.render('products', { title: 'Productos' })
});

viewsRouter.get('/cart', (req, res) => {
    res.render('cart', { title: 'Carrito' });
});

viewsRouter.get('/chat', (req, res) => {
res.render('chat', {title: 'Chat' })
});

/*
viewsRouter.get('/register', (req, res) => {
    res.render('register', { title: 'Registro' });
});

viewsRouter.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

viewsRouter.get('/api/user', passport.authenticate('jwt', { session: false }), verUsuario);

viewsRouter.get('/', passport.authenticate('jwt', { session: false }), verPerfil);
*/

export default viewsRouter;
