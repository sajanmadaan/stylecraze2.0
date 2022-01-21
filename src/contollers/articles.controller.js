const express = require("express");
const Article = require("../models/articles.model")
const router = express.Router();

router.post("", async (req, res) => {

    try{
        const article = await Article.create(req.body); 

        return res.status(201).send(article)
    }
    catch(err)
    {
       return res.status(501).send({error: err.message})
    }
})

router.get("/", async (req, res) =>{
    try{
        const articles = await Article.find().lean().exec();

        return res.status(200).send(articles)
    }
    catch(err){
        return res.status(500).send(err.message)
    }
})

module.exports = router;
