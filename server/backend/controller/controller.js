

const User = require("../../Schema/UserSchema");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



//  FOR REGISTERING A NEW USER


const register = async (req, res) => {
    try{
        const {firstName, lastName, email, password} = req.body;
        const photo = req.file.path;

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);


        const user = await User.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
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
            photo:verifyUser.photo,
            isAdmin:verifyUser.isAdmin
        }, process.env.JWT_SECRET);
        
        if(token){
            res.status(200).json({
                token:token,
                id:verifyUser._id,
                message:"Login Successful"
            })
        }
    } catch (error) {
        res.status(400).json({msg:"Error while login : ",error:error})
    }

}


module.exports = {
    register,
    login
}

