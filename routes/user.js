const express = require('express');
const router = express.Router();
const logincontroller = require('../controllers/user/loginController');
const productcontroller = require('../controllers/user/productController');
const profilecontroller = require('../controllers/user/profileController');
const categorycontroller = require('../controllers/user/categoryController');
const isAuthenticated = require('../middleware/auth');
// User 
router.post('/verifyotp',logincontroller.verify)
router.post('/sendotp',logincontroller.send)
router.get('/login',logincontroller.login)
router.post('/logout',logincontroller.logout)

//Wishlist
router.post('/checkwishlist',isAuthenticated,productcontroller.wishlist)
router.post('/deletewishlist',isAuthenticated,productcontroller.delete_wishlist)
router.post('/removewishlist',isAuthenticated,productcontroller.remove_wishlist)
//Cart
router.post('/addtocart',isAuthenticated,productcontroller.addtocart)
router.post('/movetocart',isAuthenticated,productcontroller.movetocart)
router.post('/deletecart',isAuthenticated,productcontroller.delete_cart)
router.get('/cartcheckout',isAuthenticated,productcontroller.cart_checkout)
router.post('/addresscheckout',isAuthenticated,productcontroller.address_checkout)
router.get('/paymentcheckout',isAuthenticated,productcontroller.payment_checkout)
router.post('/payonline',isAuthenticated,productcontroller.payonline)
router.post('/verifypayment',isAuthenticated,productcontroller.verifypayment)
router.post('/updatequantity',isAuthenticated,productcontroller.updateQuantity)
//Address
router.get('/addressmanager',isAuthenticated,productcontroller.showAddress)
router.get('/addaddress/:meth',isAuthenticated,productcontroller.showAddAddress)
router.post('/addaddressdetails',isAuthenticated,productcontroller.addAdress)
router.post('/deleteaddress',isAuthenticated,productcontroller.delete_address)
router.post('/showeditaddress',isAuthenticated,productcontroller.showEditAddress)
router.post('/editaddress',isAuthenticated,productcontroller.edit_address)

//products

router.post('/product/sort',productcontroller.sort)
router.post('/product/filter',productcontroller.filter)
router.post('/product/search',productcontroller.search)
router.post('/searchProduct',productcontroller.searchHome)

//profile
router.get('/profile',isAuthenticated,profilecontroller.showprofile)
router.get('/myorders',isAuthenticated,profilecontroller.showMyOrder)
router.get('/orderdetails/:id',isAuthenticated,profilecontroller.orderDetails)
router.get('/editprofile',isAuthenticated,profilecontroller.showEditProfile)
router.post('/editprofile',isAuthenticated,profilecontroller.editProfile)
router.post('/myorders/filter',isAuthenticated,profilecontroller.filterMyOrders)


//categoy

router.post('/category/search',categorycontroller.search)


router.get('/search',categorycontroller.showSearchPage)



module.exports = router