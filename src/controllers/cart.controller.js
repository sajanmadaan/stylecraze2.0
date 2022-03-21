const express = require("express");
const router = express.Router();
const Product = require("../models/product.model")
const User = require("../models/user.model")
const Cart = require("../models/cart.model");
const { findById, findByIdAndUpdate } = require("../models/product.model");

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }


router.get("/:id",async(req,res)=>{ 
    try{
        let cart;
        var c = JSON.parse(localStorage.getItem("currentUser")) || {};
     
        let product = await Product.findById(req.params.id).lean().exec();
        cart =  await Cart.findOne({user_id: c._id}).lean().exec();
        if(cart)
        {
            cart.totalprice =  Number(cart.totalprice) + Number(product.price);
            let newprice = cart.totalprice;
            cart.product_id.push(product._id);
            product = cart.product_id;
            let newqty= cart.qty += 1;    
          let update_cart=  await Cart.findByIdAndUpdate(cart._id, {
                    product_id: product,
                    qty: newqty,
                    totalprice: newprice,
                    user_id : c._id
           }, {new: true}) 
           cart =await Cart.findById(update_cart._id).populate("product_id").populate("user_id").lean().exec();
           localStorage.setItem("stylecart",JSON.stringify(cart))
           res.render("cart",{cart})
        }
        else{
             cart = await Cart.create(
                {
                    product_id: req.params.id,
                    user_id : c._id,
                    qty: 1,
                    totalprice: product.price,
                }
            )
            cart =await Cart.findById(cart._id).populate("product_id").populate("user_id").lean().exec();
            localStorage.setItem("stylecart",JSON.stringify(cart))
            res.render("cart",{cart})
        }  
        // return res.send(cart).status(200)  <-- this is reason of unhandled error
    }
    catch(err){
        return res.status(500).send(err.message);
    }
});

router.get("/findpayment/:id", async (req,res) => {
    let cartItms = await Cart.findById(req.params.id).populate("user_id").populate("product_id").lean().exec();
    
    res.render("payment", {cartItms})
})


// Delete route 
// router.delete("/delete/:id1/:id2" , async (req, res) => {
//     try{
//     let dlt_cart = await Cart.findById(req.params.id2).lean().exec()
//     console.log("here")
  
//    for(var i=0; i< dlt_cart.length; i++)
//    {
//        if(dlt_cart.product_id[i]._id=== req.params.id1)
//        {
//            dlt_cart.product_id.splice(i,1)
//        }
//    }
//   let cart =  await Cart.findByIdAndUpdate( dlt_cart._id,{
//        product_id : dlt_cart.product_id,
//        qty: dlt_cart.qty,
//        totalprice: dlt_cart.totalprice,
//        user_id: dlt_cart.user_id
//    }, {new: true})

//  cart = await Cart.findById(cart._id).populate("product_id").populate("user_id").lean().exec()
//  console.log("newcart--> ", cart)   
//    res.render("cart",{cart})
// }
//     catch(err)
//     {
//         console.log(err)
//     }
// })

module.exports = router;