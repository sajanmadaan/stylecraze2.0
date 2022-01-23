const express = require("express");
const articlesController = require("./src/controllers/articles.controller")
const cartController = require("./src/controllers/cart.controller")
const { body } = require("express-validator");



const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/styles", express.static(__dirname+ "public/styles"))
app.use("/scripts", express.static(__dirname+ "public/scripts"))
app.use("/img", express.static(__dirname+ "public/img"))

app.use("/styles", express.static(__dirname + "public/styles"));
app.use("/scripts", express.static(__dirname + "public/scripts"));
app.use("/img", express.static(__dirname + "public/img"));
app.use(express.json());

app.use("/articles", articlesController)
app.set("view engine", "ejs"); // root directory for views views/
app.use(express.static("public"));


const product = require("./src/controllers/product.controller");
app.use("/products",product);

app.use("/cart", cartController);
app.get("/", async (req, res)=>{
    res.render("index")
})
app.get("/", async (req, res) => {
    let user = "";
    res.render("index",user);
});


app.get("/about-us", async (req, res) => {
    res.render("about-us");
});

app.get("/bridalmakeup", async (req, res) => {
    res.render("bridalmakeup");
});

app.get("/cart", async (req, res) => {
    
    res.render("cart");
});

app.get("/celebrity", async (req, res) => {
    res.render("celebrity");
});

app.get("/eyemakeup", async (req, res) => {
    res.render("eyemakeup");
});


app.get("/face", async (req, res) => {
    res.render("face");
});

app.get("/haircare", async (req, res) => {
    res.render("haircare");
});

app.get("/hairstyles", async (req, res) => {
    res.render("hairstyles");
});

app.get("/health", async (req, res) => {
    res.render("health");
});

app.get("/item", async (req, res) => {
    res.render("item");
});

app.get("/lipmakeup", async (req, res) => {
    res.render("lipmakeup");
});

app.get("/makeup", async (req, res) => {
    res.render("makeup");
});

app.get("/makeupidea", async (req, res) => {
    res.render("makeupidea");
});

app.get("/mehndi", async (req, res) => {
    res.render("mehndi");
});

app.get("/nailart", async (req, res) => {
    res.render("nailart");
});

app.get("/news", async (req, res) => {
    res.render("news");
});

app.get("/payment", async (req, res) => {
    res.render("payment");
});


app.get("/skincare", async (req, res) => {
    res.render("skincare");
});

app.get("/team", async (req, res) => {
    res.render("team");
});

app.get("/thankyou", async (req, res) => {
    res.render("thankyou");
});

app.get("/articles", async (req, res) => {
    res.render("articles");
})

const { register, login } = require("./src/controllers/authcontroller");

app.post("/register",
    body("email").notEmpty().withMessage("Email is required"),
    body("mobile_no").notEmpty().isLength({ min: 10 }).withMessage("Mobile Number is required "),
    body("address").notEmpty().withMessage("Please enter the Address"),
    body("pincode").notEmpty().isLength({ min: 6 }).withMessage("Pincode is required and must be 6 digit"),
    body("password").notEmpty().isLength({ min: 8 }).withMessage("password atleast have 8 Character and have no Special character"),
    register);

app.post("/login",
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().isLength({ min: 8 }).withMessage("password atleast have 8 Character and have no Special character"),
    login);


module.exports = app;
