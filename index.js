const express = require("express");
const dotenv = require("dotenv").config()
const authRoutes = require('./routes/auth/authRoutes')
const buyerRoutes = require('./routes/buyer/buyerRoutes')
const sellertRoutes = require('./routes/seller/sellerRoutes')


const app = express()

app.use('/api/auth',authRoutes)
app.use('/api/buyer',authRoutes)
app.use('/api/seller',authRoutes)


const port = process.env.PORT||5000


app.listen(port,()=> console.log(`Server started at ${port}`))