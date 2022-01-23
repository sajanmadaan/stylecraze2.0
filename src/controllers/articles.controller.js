const express = require("express");
const Article = require("../models/articles.model")
const articleRouter = express.Router();

articleRouter.post("", async (req, res) => {

    try{
        const article = await Article.create(req.body); 

        return res.status(201).send(article)
    }
    catch(err)
    {
       return res.status(501).send({error: err.message})
    }
})

articleRouter.get("/", async (req, res) =>{
    try{
        let filter = req.query.category;
        let page = +req.query.page || 1;
        let size = +req.query.size || 16;
        let skip = (page-1)*size;
        let articles;
      
        if(filter)
        {
        filter = filter.charAt(0).toUpperCase() + filter.slice(1)
        articles = await Article.find({category: filter}).skip(skip).limit(size).lean().exec();
        }
        else{
             articles = await Article.find().skip(skip).limit(size).lean().exec();
        }
        res.render("articles", {articles:articles})
    }
    catch(err){
        return res.status(500).send(err.message)
    }
})
module.exports = articleRouter;
