const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {        
        brand:{type:String,required:true},
        name:{type:String,required:true},
        price:{type:String,required:true},
        image_link:{type:String,required:true},
        description:{type:String,required:false},
        rating:{type:String,required:false},
        category:{type:String,required:false},
        product_type:{type:String,required:false},
        product_colors:[{type:String,required:true}]
    },
    {
        timestamps:true,
        versionKey:false,
    }
)
module.exports = mongoose.model("product",productSchema);