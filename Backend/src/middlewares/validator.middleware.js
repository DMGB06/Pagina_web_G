const { schema } = require("../models/user.model");

const validatorSchema = (schema) => (req,res,next) => {
    try {
       schema.parse(req.body);
       next(); 
    } catch (error) {
        return res.status(400).json(error.errors.map((error)=>error.message))
    }
}

module.exports = {validatorSchema};