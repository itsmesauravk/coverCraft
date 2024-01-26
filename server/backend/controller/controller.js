

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
            message:"Error registering the user : ",error
        })
    }
    


}

