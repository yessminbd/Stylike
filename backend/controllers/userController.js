import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js"
import validator from 'validator';
import bcrypt from 'bcrypt';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// user login 
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: 'Utilisateur introuvable' })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Mot de passe invalide" })
        }
    }

    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// user register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "Utilisateur déjà existant" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Veuillez entrer une adresse e-mail valide' })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Veuillez entrer un mot de passe d’au moins 8 caractères" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new userModel({
            name, email, password: hashedPassword
        })
        const user = await newUser.save()
        const token = createToken(user._id)

        res.json({ success: true, token })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// admin User
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Données incorrectes" })
        }
    }
    catch (error) {

    }
}
export { loginUser, registerUser, adminLogin }


