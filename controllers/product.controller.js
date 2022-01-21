const express = require("express");
const router = express.Router();

const Product = require("../models/product.model");

router.get("",async(req,res)=>{
    
    try{
        let brand = req.query.brand
        let product_type = req.query.product_type 
        if(brand){
        let products = await Product.find({brand:brand}).lean().exec();
        res.render("products",{products})
        }
        else if(product_type){
        let products = await Product.find({product_type:product_type}).lean().exec();
        res.render("products",{products})
        }
        let products = await Product.find({brand:"maybelline"}).lean().exec();
        res.render("products",{products})
        
    }
    catch(err){
        return res.status(500).send(err.message);
    }
});
router.get("/:id",async(req,res)=>{
    
    try{
      let products_id = req.params.id;
      let product = await Product.findById(products_id).lean().exec();
    console.log(product)
      res.render("item",{product})
    }
    catch(err){
        return res.status(500).send(err.message);
    }
});


router.post("",async(req,res)=>{
    
    try{
        let product = await Product.create(req.body)
        return res.status(201).send(product);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
});

module.exports = router;