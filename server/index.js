// started Jan 25 2024 (Thursday)

const express = require('express');
const app = express();

const cors = require('cors');

const adminRoute = require('./admin/AdminRoute/Route');


require('dotenv').config('path')

const port = 4000

const connectDB = require('./Database/DBconnect');
connectDB();


//middle ware

app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));
app.use(cors(
    {
        origin:'http://localhost:3000',
        credentials:true
    }
))


app.use('/admin', adminRoute);



app.get('/',(req,res)=>{
    res.send('Hello World');
}
);


app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});
