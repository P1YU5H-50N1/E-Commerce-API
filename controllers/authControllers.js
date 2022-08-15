const registerUser = (req,res)=>{
    res.status(200).json({message:"User Registered"})
}

const loginUser = (req,res) =>{
    res.status(200).json({message:"User Logged in"})
}

module.exports = {
    registerUser,
    loginUser
}