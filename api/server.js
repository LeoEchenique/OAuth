const server = require("./src/app.js");
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");

const { MONGO_DB_SECRET } = process.env;

// Mongo conn

mongoose.connect(`mongodb+srv://Me:${MONGO_DB_SECRET}@oauth.ymrlfdd.mongodb.net/?retryWrites=true&w=majority`)
    .then(res => {
        console.log(`server listening on atlas`)
    })
// api conn
server.listen(PORT, () => console.log(`server listening on ${PORT}`));


