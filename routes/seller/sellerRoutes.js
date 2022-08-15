const express = require("express")
const router = express.Router()


router.get('/orders',sellerOrders)

router.post('/create-catalog',createCatalog)

module.exports = router