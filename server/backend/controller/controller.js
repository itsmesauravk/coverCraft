

const User = require("../../Schema/UserSchema");
const Product = require("../../Schema/AddSchema");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');




//  FOR REGISTERING A NEW USER


const register = async (req, res) => {
    try{
        const {firstName, lastName, email, password, number} = req.body;
        const photo = req.file.path;

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);


        const user = await User.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            number:number,
            password:hashedPassword,
            photo:photo
        })

        if(user){
            res.status(200).json({
                message:"User Registered Successfully",
                data:user
            })
        }else{
            res.status(400).json({
                message:"Error registering the user"
            })
        }

    }catch(error){
        res.status(400).json({
            message:"Error registering the user : ",
            error:error
        })
    }
    
}



//login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ msg: "Invalid Password" });
        }

        const token = jwt.sign({
            id: user._id,
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            email: user.email,
            number: user.number,
            photo: user.photo,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

        res.status(200).json({
            message: "Login Successful",
            user: {
                id: user._id,
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                email: user.email,
                number: user.number,
                photo: user.photo,
                isAdmin: user.isAdmin
            },
            token
        });
    } catch (error) {
        console.error("Error while login:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};




//  FOR GETTING THE PROFILE OF THE USER
const profile = async (req, res) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ message: "Token not found" });
        }

        const userInfo = jwt.verify(token, process.env.JWT_SECRET);

        if (userInfo) {
            return res.status(200).json({
                firstName:userInfo.firstName,
                middleName:userInfo.middleName,
                lastName:userInfo.lastName,
                email:userInfo.email,
                isAdmin:userInfo.isAdmin
            });
        }
    } catch (error) {
        // Handle token verification errors
        console.error("Error while getting the profile:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

//  FOR LOGGING OUT THE USER
const logout = async (req, res) => {
    try {
        // res.clearCookie("token");
        res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
        res.status(200).json({ message: "User logged out" });
    } catch (error) {
        console.error("Error while logging out:", error);
        return res.status(400).json({ message: "Error while logging out" });
    }
};


// Users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error("Error while getting users:", error);
        return res.status(400).json({ message: "Error while getting users" });
    }
}


//products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1});
        res.status(200).json(products);
    } catch (error) {
        console.error("Error while getting products:", error);
        return res.status(400).json({ message: "Error while getting products" });
    }
}

// single product
const getSingleProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.error("Error while getting single product:", error);
        return res.status(400).json({ message: "Error while getting single product" });
    }
}

// showing the product according to Type (mobile, laptop, wraps)

const getProductsByType = async (req, res) => {
    try {
        const type = req.params.type;
        const products = await Product.find({coverType:type});
        res.status(200).json(products);
    } catch (error) {
        console.error("Error while getting products by type:", error);
        return res.status(400).json({ message: "Error while getting products by type" });
    }
}

module.exports = {
    register,
    login,
    profile,
    logout,
    getUsers,
    getProducts,
    getSingleProduct,
    getProductsByType
}

