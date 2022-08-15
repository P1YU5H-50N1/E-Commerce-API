const getSellerList = (req,res) =>{
    res.status(200).json({message:"Seller list"})
}

const getCatalog = (req,res) => {
    res.status(200).json({message:"Get Catalog"})
}

const createOrder = (req,res) => {
    res.status(200).json({message:"Order Created"})
}