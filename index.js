const express = require("express");

const app = express();

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use("/styles", express.static(__dirname+ "public/styles"))
app.use("/scripts", express.static(__dirname+ "public/scripts"))
app.use("/img", express.static(__dirname+ "public/img"))
app.use(express.json());

app.set("view engine", "ejs"); // root directory for views views/
app.use(express.static("public"));

app.get("/", async (req, res)=>{
    res.render("index")
})

app.get("/about-us", async (req,res) =>{
    res.render("about-us");
})

app.get("/bridalmakeup", async (req, res) =>{
    res.render("bridalmakeup");
})

app.get("/cart", async (req, res) =>{
    res.render("cart")
})

app.get("/celebrity", async (req, res) =>{
    res.render("celebrity");
})

app.get("/eyemakeup", async (req, res) =>{
    res.render("eyemakeup");
})


app.get("/face", async (req, res) =>{
    res.render("face");
})

app.get("/haircare", async (req, res) =>{
    res.render("haircare");
})

app.get("/hairstyles", async (req, res) =>{
    res.render("hairstyles");
})

app.get("/health", async (req, res) =>{
    res.render("health");
})

app.get("/item", async (req, res) =>{
    res.render("item");
})

app.get("/lipmakeup", async (req, res) =>{
    res.render("lipmakeup");
})

app.get("/makeup", async (req, res) =>{
    res.render("makeup");
})

app.get("/makeupidea", async (req, res) =>{
    res.render("makeupidea");
})

app.get("/mehndi", async (req, res) =>{
    res.render("mehndi");
})

app.get("/nailart", async (req, res) =>{
    res.render("nailart");
})

app.get("/news", async (req, res) =>{
    res.render("news");
})

app.get("/payment", async (req, res) =>{
    res.render("payment");
})

app.get("/products", async (req, res) =>{
    res.render("products");
})

app.get("/products1", async (req, res) =>{
    res.render("products1");
})

app.get("/skincare", async (req, res) =>{
    res.render("skincare");
})

app.get("/team", async (req, res) =>{
    res.render("team");
})

app.get("/thankyou", async (req, res) =>{
    res.render("thankyou");
})

app.get("/tools", async (req, res) =>{
    res.render("tools");
})


module.exports = app;