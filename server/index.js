// started Jan 25 2024 (Thursday)

const express = require('express');
const app = express();
const adminRoute = require('./admin/AdminRoute/Route');

const port = 4000



app.use(express.json());

app.use('/admin', adminRoute);



app.get('/',(req,res)=>{
    res.send('Hello World');
}
);


app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});
