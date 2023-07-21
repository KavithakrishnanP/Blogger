const express=require('express');
const cors=require('cors');
const colors=require('colors');
const morgan=require('morgan');
const dotenv=require('dotenv');
const connectDB = require('./config/db');
const path=require('path');


dotenv.config();

//router import
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require('./routes/blogRoutes');

//mongodb connect
connectDB();

dotenv.config()
const app=express()

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'./client/build')))


app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);


//rest api
app.use("*", function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"))
})
const PORT= process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log(
        `Server is running on ${process.env.DEV_MODE} mode port no ${PORT}`.bgCyan
        .white);
});
