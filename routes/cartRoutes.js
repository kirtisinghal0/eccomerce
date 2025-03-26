const express=require("express");
const cart_route=express();
const bodyparser=require("body-parser");
cart_route.use(bodyparser.json());
cart_route.use(bodyparser.urlencoded({extended:true}));

const auth=require("../middlewares/isAuthenticated");
const cart_controller=require("../controllers/cartController")

cart_route.post('/add-to-cart',cart_controller.add_to_cart);


module.exports=cart_route;