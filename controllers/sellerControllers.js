const sellerOrders = (req,res)=>{
    res.status(200).json({message:"seller Orders"})
}

const createCatalog = (req,res) =>{
    res.status(200).json({message:"Created catalog"})
}

module.exports = {
    sellerOrders,
    createCatalog
}