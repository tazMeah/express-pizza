import express, { request } from "express";
const route = express.Router();

route.get("/", (req, res)=> {
    res.render("homepage");
})

route.get("/specialty", (req, res) => {
    let name: string = req.query.name as string;
    let price: number = parseInt(req.query.price as string);
    let imageSrc;
    if (name == "Supreme"){
        imageSrc = "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80";
    } else if (name == "Veggie") {
        imageSrc = "https://images.unsplash.com/photo-1530632789071-8543f47edb34?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80";
    } else {
        imageSrc = "https://images.unsplash.com/photo-1620374645466-dc3ff1558148?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80";
    }


    res.render("specialty", {name, price, imageSrc});
})

route.get("/review", (req, res) => {
    res.render("review");
})


route.post("/review-thanks", (req, res) => {
    let name: string = req.body.name;
    let comment: string = req.body.comment;
    let rating = req.body.rating;
    

    res.render("review-thanks", {name, comment, rating});
})


// custom builder
route.get("/custom", (req, res) => {
    res.render("custom");
})

// your pizza confirmation
route.post("/confirmation", (req, res) => {
    
    let size = req.body.size;

    let toppings;
    if (req.body.toppings){
        if (typeof req.body.toppings == "string") {
            toppings = [req.body.toppings]
        } else {
            toppings = req.body.toppings;
        }
    } else {
        toppings = [];
    }

    let veganCheese: boolean = Boolean(req.body.veganCheese);
    let glutenFree: boolean = Boolean(req.body.glutenFree);
    let specialInstructions: string = req.body.specialInstructions || "";

    // console.log("req.body:", req.body);
    // console.log("toppings:", toppings);
    // console.log("vegan cheese: ", veganCheese);
    // console.log("gluten free: ", glutenFree);
    // console.log("special instructions: ", specialInstructions);
    
    let price = size  == "Small" ? 7 + toppings.length * .5
    : size == "Medium" ? 10 + toppings.length 
    : 12 + toppings.length * 1.25;

    if (glutenFree) {
        price += 2;
    }

    // determine free delivery?
    let freeDelivery = price >= 15

    // fix decimal places
    price = "$" + price.toFixed(2);



    res.render("confirmation", {size, toppings, veganCheese, glutenFree, specialInstructions, price, freeDelivery});
})



export default route;

