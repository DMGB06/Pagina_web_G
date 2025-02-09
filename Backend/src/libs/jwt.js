const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config");

function createAccesToken(payload) {
    return new Promise((resolve, reject) => {   // no olvidar el return   
        jwt.sign( 
            payload,
            TOKEN_SECRET,
            { expiresIn: "1d" },
            (err, token) => {
                if (err) reject(err); 
                resolve(token); 
            }
        );
    });  
}

module.exports = { createAccesToken }; // exportamos la funcion