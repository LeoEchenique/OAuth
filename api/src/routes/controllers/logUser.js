const { Router } = require("express");
const router = Router();
const getUserInfo = require("../../helpers/getUserInfo");
const bcrypt = require('bcrypt');
const User = require("../../models/User");


router.get("/github", async (req, res) => {
    const { code } = req.query; //  code is returned by the successful consent of the user in the github page
    let { path } = req.query; /* if i pass the 2cd parameter will be redirect to this by putting it to res.redirect(PATH) */

    try {
        let user = await getUserInfo.githubUser(code); // here u already have the user who logs to the page, remain: .-create user on DB or if exist, display data


        // create user on DB...


        return res.send(user); // this will redirect to react component who displays the user data with an id on params to fetch the data from there (PATH)
    } catch (error) {
        return res.send(error.message);
    }
    res.redirect(path); // this will redirect to react component who displays the user data
});

router.get("/linkedin", async (req, res) => {
    const { code } = req.query; // code grant

    try {
        let user = await getUserInfo.linkedinUser(code);


        // create user on DB...


        return res.send(user);
    } catch (error) {
        console.log(error.message)
    }

    res.send({ userImg, getEmail, user });      // this should redirect to /profile with an id to grab and fetch the data
});

router.get("/google", async (req, res) => {
    const { code } = req.query;
    try {
        let user = await getUserInfo.googleUser(code);

        // create user on DB....

        res.send(user);
    } catch (err) {
        console.log(err.message);
        return res.send("nope");
    }
});

router.get("/facebook", async (req, res) => {
    const { code } = req.query; // code grant

    try {
        let user = await getUserInfo.facebookUser(code);
        return res.send(user);
    } catch (error) {
        res.send(error.message)
    }

});

router.get("/local", async (req, res) => {

    res.send("nice");
})

router.post("/local", async (req, res) => {

    const saltRounds = 10;
    const { name, from, email, password, lastName } = req.query;


    // console.log(password, "before encrypt");


    let hashedPass = await bcrypt.hash(password, saltRounds).then(hash => hash);    // resolve on hash value

    // console.log(hashedPass, "encrypted")
    let compare = await bcrypt.compare(password, password).then(result => result) // compare if it is actually the same password and if true means yes it is!
    //  console.log(compare, "if true they're the same and it should be all ok")

    let user = new User({
        firstName: name,
        email,
        password,
        from,
        lastName
    })
    await user.save();
    console.log(user.FullName)
    res.send(user)
})


module.exports = router;
