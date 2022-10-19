const bcrypt = require('bcrypt');
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

userSchema.pre("save", async function (next) {
    const saltRounds = 10;
    const user = this;
    if (this.isModified("password") || this.isNew) {
        await bcrypt.hash(user.password, saltRounds).then(hash => user.password = hash)
            .catch(err => {
                console.log(err)
            })
        next()
    }
});

userSchema.methods.comparePassword = function (password) {
    let result = bcrypt.compare(password, this.password).then(res => res);
    return result;
}


module.exports = mongoose.model("User", userSchema);