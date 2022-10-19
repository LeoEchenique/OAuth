const axios = require("axios");
const querystring = require("querystring");
const jwt_decode = require("jwt-decode");



const envSecrets = {
    LINKEDIN_CLIENT_ID,
    LINKEDIN_REDIRECT_URL,
    LINKEDIN_CLIENT_SECRET,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET,
    REDIRECT_URI
} = process.env;



function User(firstName, lastName, picture, email, id) {
    (this.firstName = firstName),
        (this.lastName = lastName),
        (this.picture = picture),
        (this.email = email),
        (this.id = id);
}

module.exports = {
    githubUser: async (code) => {
        const githubToken = await axios
            .post(
                `https://github.com/login/oauth/access_token?client_id=${envSecrets.GITHUB_CLIENT_ID}&client_secret=${envSecrets.GITHUB_CLIENT_SECRET}&code=${code}` //post code grant for an access token
            )
            .then((res) => res.data)
            .catch((err) => {
                throw err;
            });

        const decoded = querystring.parse(githubToken); // decode the token
        const accessToken = decoded.access_token; // decoded token
        let email = await axios
            .get("https://api.github.com/user/emails", {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((res) => res.data[0].email);

        let user = await axios
            .get("https://api.github.com/user", {
                headers: { Authorization: `Bearer ${accessToken}` }, // get user info with access token authorization
            })
            .then((res) => {
                let json = JSON.stringify(res.data);
                let parse = JSON.parse(json);
                return parse;
            }) // here we can also return the access token to store it in the DB and compare in edit section if it still being the same person
            .catch((err) => {
                console.error("nope"); // if token is invalid, logs error, wich will be contained on var USER in the route below. So in case there's an error two cases: or user don't consent or accessToken is invalid
                throw err;
            });

        return new User(
            user.login,
            "Github only recieves single field name",
            user.avatar_url,
            email,
            user.id
        );
    },
    linkedinUser: async (code) => {
        let access = await axios
            .post(
                `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&client_id=${envSecrets.LINKEDIN_CLIENT_ID}&client_secret=${envSecrets.LINKEDIN_CLIENT_SECRET}&code=${code}&redirect_uri=${envSecrets.LINKEDIN_REDIRECT_URL}`
            )
            .then((res) => res.data.access_token); // access_token
        let user = await axios
            .get(
                `https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,emailAddress,profilePicture(displayImage~:playableStreams))&oauth2_access_token=${access}`
            )
            .then((res) => res.data); // first name, last name and img to display --> will be converted into single lines to more accessibility.
        let getEmail = await axios
            .get(
                "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
                { headers: { Authorization: `Bearer ${access}` } }
            )
            .then((res) => {
                res.data.elements[0];
                let encoded_email = Object.getOwnPropertyDescriptor(
                    res.data.elements[0],
                    "handle~"
                );
                let email = encoded_email.value.emailAddress; // plain Email
                return email;
            }); // request email because it's not on scope (aparently) in the get user.
        let encoded_img = Object.getOwnPropertyDescriptor(
            user.profilePicture,
            "displayImage~"
        );
        /*  let userImg = encoded_img.value.elements[1].identifiers[0].identifier;  */ // plain user img
        return new User(
            Object.values(user.firstName.localized)[0],
            Object.values(user.lastName.localized)[0],
            encoded_img.value.elements[1].identifiers[0].identifier,
            getEmail,
            user.id
        );
    },

    googleUser: async (code) => {
        // For sending form data in the body, you can just format the data in url params like this
        //    'grant_type=client_credentials&client_id=12345&client_secret=678910' and attached it to data in the config for axios.
        let token_acccess = await axios
            .request({
                method: "post",
                url: "https://oauth2.googleapis.com/token",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data: `code=${code}&client_id=${envSecrets.GOOGLE_CLIENT_ID}&client_secret=${envSecrets.GOOGLE_CLIENT_SECRET}&redirect_uri=http://localhost:3001/login/google&grant_type=authorization_code`,
            })
            .then((res) => res.data)
            .catch(function (err) {
                throw new Error(err.response.data);
            });

        let json_token = JSON.stringify(token_acccess); // transform response into JSON
        let decoded_token = JSON.parse(json_token).id_token; // transform JSON into JS Object
        let decoded_user = jwt_decode(decoded_token); // decode ID_TOKEN for user information (as we aim to an https rest api dont need to authenticate the given token response of let token_access)

        return new User(
            decoded_user.given_name,
            decoded_user.family_name,
            decoded_user.picture,
            decoded_user.email,
            decoded_user.sub
        );
    },

    facebookUser: async (code) => {
        const token = await axios
            .get(
                `https://graph.facebook.com/v15.0/oauth/access_token?client_id=${envSecrets.FACEBOOK_CLIENT_ID}&redirect_uri=http://localhost:3001/login/facebook&client_secret=${envSecrets.FACEBOOK_CLIENT_SECRET}&code=${code}`
            )
            .then((res) => res.data); // access_token

        const user = await axios
            .get(
                `https://graph.facebook.com/me?fields=email,first_name,last_name,picture.type(large)&access_token=${token.access_token}`
            )
            .then((res) => res.data); // user data
        user.picture = user.picture.data.url;

        return new User(user.first_name, user.last_name, user.picture, user.email, user.id)
    },
};
