

const User = require("../../Schema/UserSchema");
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


//LOGIN

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        const verifyUser = await User.findOne({email:email});
        if(!verifyUser){
            res.status(400).json({msg:"User not found"})
        }
        const verifyPassword = bcrypt.compareSync(password, verifyUser.password);
        if(!verifyPassword){
            res.status(400).json({msg:"Invalid Password"})
        }
        const token = jwt.sign({
            id:verifyUser._id,
            firstName:verifyUser.firstName,
            middleName:verifyUser.middleName,
            lastName:verifyUser.lastName,
            email:verifyUser.email,
            number: verifyUser.number,
            photo:verifyUser.photo,
            isAdmin:verifyUser.isAdmin
        }, process.env.JWT_SECRET);
        
        if(token){
            res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
            res.status(200).json({
                token:token,
                id:verifyUser._id,
                firstName:verifyUser.firstName,
                middleName:verifyUser.middleName,
                lastName:verifyUser.lastName,
                email:verifyUser.email,
                number: verifyUser.number,
                photo:verifyUser.photo,
                isAdmin:verifyUser.isAdmin,
                message:"Login Successful"
            })
        }
    } catch (error) {
        res.status(400).json({msg:"Error while login : ",error:error})
    }

}

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
                isAdmin:userInfo.email
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


module.exports = {
    register,
    login,
    profile,
    logout
}

