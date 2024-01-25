

const mongoose = require('mongoose');


function connectDB() {
    try{
        if(!process.env.CONNECT_URI){
            console.log("Please provide a connection string")
            process.exit(1);
        }
        mongoose.connect(
            process.env.CONNECT_URI
        ).then(()=>console.log("Connected to database"))
        .catch((error)=>{
            console.log("Error occured while connecting to database :" + error)
            process.exit(1);
        })

    }catch(err){
        console.log("Error occured while connecting to database :" + err)
    }
}

module.exports = connectDB;