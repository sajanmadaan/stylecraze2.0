const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        mobile_No: { type: Number, required: true },
        address: { type: String, required: true },
        pincode: { type: Number, required: true },
        password: { type: String, required: true }
    }, {
    timestamps: true,
    versionKey: false,
}
);

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hashSync(this.password, 8);
    return next();
});



userSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("users", userSchema);