const express = require("express");
const dotenv = require("dotenv").config()
const authRoutes = require('./routes/auth/authRoutes')
const buyerRoutes = require('./routes/buyer/buyerRoutes')
const sellerRoutes = require('./routes/seller/sellerRoutes')
const connectDB = require('./config/db');
const { connect } = require("./routes/seller/sellerRoutes");

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/auth',authRoutes)
app.use('/api/buyer',buyerRoutes)
app.use('/api/seller',sellerRoutes)


const port = process.env.PORT || 5000


app.listen(port,()=> console.log(`Server started at ${port}`))