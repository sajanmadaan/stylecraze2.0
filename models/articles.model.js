const mongoose = require("mongoose");

const articlesSchema = new mongoose.Schema({

    prodUrl :{type: String, required: true},
    category: {type: String, required: true},
    title: {type: String, required: true},
    desc: {type: String, required: true}
},
{
    versionKey: false,
    timestamps: true
}
)
module.exports = mongoose.model("article", articlesSchema);