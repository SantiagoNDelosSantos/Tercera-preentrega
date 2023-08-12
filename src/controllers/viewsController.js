// Import ProductService: 
import ProductService from "../services/products.service.js";
// Import MessageService:
import MessageService from "../services/message.service.js";


// Clase para el Controller de vistas: 
export default class ViewsController {

    constructor() {
        // Instancia de ViewsService:
        this.productService = new ProductService();
        this.messageService = new MessageService();
    }

    // PRODUCTOS - VISTAS:

    // Traer todos los productos - Controller: 
    async getAllProductsControllerV(limit, page, sort, filtro, filtroVal) {
        let response = {};
        let limitV = limit;
        let pageV = page;
        let sortV = sort;
        let filtroV = filtro;
        let filtroValV = filtroVal;
        try {
            // Aquí puedes obtener los valores de limit, page, sort, filtro y filtroVal de alguna manera
            // Pueden ser valores fijos o predefinidos para el contexto de Socket.IO
            const limit = limitV || 10;
            const page = pageV || 1;
            let sort = sortV || 1;
            let filtro = filtroV || null;
            let filtroVal = filtroValV || null;

            const responseService = await this.productService.getAllProductsService(limit, page, sort, filtro, filtroVal)
            response.status = responseService.status;
            response.message = responseService.message;
            response.statusCode = responseService.statusCode;
            if (responseService.status === "success") {
                response.result = responseService.result;
                response.hasNextPage = responseService.hasNextPage;
            };
            if (responseService.status === "error") {
                response.error = responseService.error;
            };
            console.log(response);
            return response;
        } catch (error) {
            console.error('Error: ', error.message);
            response.status = "error";
            response.message = "Error al obtener los productos." + error.message;
            response.error = error.message;
            response.statusCode = 500;
            return response;
        };
    };

    // CHAT - VISTA: 

    // Traer todos los mensajes en tiempo real:
    async getAllMessageControllerV() {
        let response = {};
        try {
            const responseService = await this.messageService.getAllMessageService();
            response.status = responseService.status;
            response.message = responseService.message;
            response.statusCode = responseService.statusCode;
            if (responseService.status === "success") {
                response.result = responseService.result;
                response.hasNextPage = responseService.hasNextPage;
            };
            if (responseService.status === "error") {
                response.error = responseService.error;
            };
            console.log(response);
            return response;
        } catch {
            console.error('Error:', error.message);
            res.status(500).json({
                error: "Error al obtener los mensajes: " + error.message
            });
        }
    }

}













/*








export const verChat = async (req, res) => {
    try {
        const messages = await managerMessage.verMensajes();
        res.render('chat', { title: 'Mensajes Actualizados', messages });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error al consultar los mensajes. Por favor, inténtelo de nuevo más tarde.' });
    }
};





export const verUsuario = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email });
        const cart = await managerCarts.consultarCartPorId(user.cart);
        const cartID = cart._id;
        res.send({ user, cartID });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al cargar el carrito. Por favor, inténtelo de nuevo más tarde.' });
    }
};




export const verPerfil = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email });
        if (!user) {
            return res.redirect('/login');
        }
        const { first_name, last_name, email, age, role } = user;
        res.render('profile', {
            user: {
                first_name,
                last_name,
                email,
                age,
                role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al cargar el perfil. Por favor, inténtelo de nuevo más tarde.' });
    }
};

*/