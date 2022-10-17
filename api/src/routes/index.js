const { Router } = require("express");
const router = Router();
const logUser = require("./controllers/logUser");

router.get("/", (req, res) => {

    res.status(200).json({ message: "nice" })
})

router.use('/login', logUser);








module.exports = router;