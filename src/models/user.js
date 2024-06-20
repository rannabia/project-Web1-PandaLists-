const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

userSchema.methods.matchPassword = async function (givenPassword) {
    return givenPassword === password;
}

module.exports = mongoose.model("User", userSchema);