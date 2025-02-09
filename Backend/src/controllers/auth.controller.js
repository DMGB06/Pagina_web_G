const User = require("../models/user.model.js"); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {createAccesToken} = require("../libs/jwt.js");

const register = async (req, res) => {
    const {username, email, password, role, membership} = req.body
    try {
        // password hashed

        const existgUser = await User.findOne({email});

        if(existgUser){
            return res.status(400).json({message: "email ya en uso"});
        }

        const passwordhash = await bcrypt.hash(password, 10)

        // create a new user
        const newUser = new User({
            username,
            email,
            password: passwordhash,
            role,
            membership
        })

        const userSaved = await newUser.save(); // Save in the database

        // create token with id
        const token = await createAccesToken({id: userSaved._id});
        
        // send the token
        res.cookie("token",token)
        
        // what the frontend will receive
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            role: userSaved.role,
            membership: userSaved.membership,
        })

        res.send("register");

    } catch (error) {
        console.log(error)   
    }
};

const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        // Find a user
        const userFound = await User.findOne({email});
        if (!userFound) return res.status(400).json({message: "User not found"});
        
        //Compare user password
        const isMatch = await bcrypt.compare (password, userFound.password);
        if (!isMatch) return res.status(400).json({message: "Incorrect password"})

        // find a user token  
        const token = await createAccesToken ({id: userFound._id });
        
        res.cookie("token", token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            role:  userFound.role,
            membership: userFound.membership
        });

    } catch (error) {
        console.log(error)
    }

};

const logout = (req,res ) => {
    res.cookie('token',"",{
        expires: new Date(0)
    }) 
    return res.sendStatus(200);
};

const profile = (req, res) => {
    res.send("profile")
};

module.exports = { register, login, logout, profile };
