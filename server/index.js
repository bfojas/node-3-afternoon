const express =require('express');
const app = express();
const bodyParser= require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const checkForSession = require('./middleware/checkForSession');
const controller = require('./controllers/swag_controller')
const auth_controller = require('./controllers/auth_controller');
const cart_controller = require('./controllers/cart_controller')
const search_controller = require('./controllers/search_controller')

dotenv.config();



app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60*24*7*2
    }
}))
app.use(checkForSession);
app.use( express.static( `${__dirname}/../build` ) )


app.get('/api/swag', controller.read);
app.post('/api/login', auth_controller.login);
app.post('/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout);
app.get('/api/user', auth_controller.getUser);
app.post('/api/cart', cart_controller.add);
app.post('/api/cart/checkout', cart_controller.checkout);
app.delete('/api/cart', cart_controller.delete);
app.get('/api/search', search_controller.search);



const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, ()=>console.log(`listen ${PORT}`))



