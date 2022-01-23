const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {        
        product_id:[{type: mongoose.Schema.Types.ObjectId, ref:"product", required:true}],

        qty: {type: Number, required: true},
        totalprice : {type: Number, required: true},
        user_id:{type:mongoose.Schema.Types.ObjectId, ref:"users",required:true}
    },
    {
        timestamps:true,
        versionKey:false,
    }
)
module.exports = mongoose.model("cart",cartSchema);