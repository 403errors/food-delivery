import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}


// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success:false, message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({success:false, message:"Invalid crendentials"})
        }

        const token = createToken(user._id)
        res.json({success:true, token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

// register user
const registerUser = async (req, res) => {
    const {name, password, email} = req.body
    try {
        // checking if user already exist
        const exist = await userModel.findOne({email})
        if (exist) {
            return res.json({success:false, message:"User already exist!"})
        } 

        // validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter a valid email!"})
        } 

        if (password.length < 8) {
            return res.json({success: false, message: "Please enter a strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)  // 5 <= input <= 15 | higher -> more encrypted, more time
        const hashedPass = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPass // important !!!
        })

        const user = await newUser.save()
        const token = createToken(user._id) // _id is given by default

        res.json({success:true, token})


    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export { loginUser, registerUser }