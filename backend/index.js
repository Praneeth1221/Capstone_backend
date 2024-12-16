const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");


dotenv.config();

const UserRoutes = require('./Router/user.router.js');
const DeliveryRoutes = require('./Router/deliver.router.js');
const BeauticiansRoutes = require('./Router/BeauticianRoute.js');
const CommentRoutes = require('./Router/comment.router.js');
const CheckoutRoutes = require('./Router/checkout.router.js');
const AdditemRoutes = require('./Models/additem.model.js');
const ServiceRoutes = require('./Router/ServicesRoute.js');


const app = express();
app.use(cors());

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.use('/user', UserRoutes); 
app.use('/deliver', DeliveryRoutes); 
app.use('/beauticians', BeauticiansRoutes); 
app.use('/comment', CommentRoutes); 
app.use('/checkout',CheckoutRoutes ); 
app.use('/additem', AdditemRoutes); 
app.use('/services', ServiceRoutes); 

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("connected to db");
        app.listen(process.env.PORT, () => {
            console.log(`server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("connection error: " + err);
    });

   