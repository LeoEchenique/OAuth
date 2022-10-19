
const mongoose = require("mongoose");

// validators:  min-length | max-length
const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        minlength: 3,
        maxlength: 22

    },
    lastName: {
        type: String,
        minlength: 3,
        maxlength: 22
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        default: "No image provided",
    },
    email: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        maxlength: 500,
    },
    phone: {
        type: Number,
        minlength: 8,
        maxlength: 18
    },
    from: {
        type: String,
        enum: ["Linkedin", "Google", "Facebook", "Github", "Local"],
        default: "Local",
        required: true
    }
});

userSchema.virtual("FullName").get(function () {
    return this.firstName + " " + this.lastName;
})

userSchema.pre("save", async function () {


})

module.exports = mongoose.model("User", userSchema);