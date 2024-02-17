const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/authAdmin');

const categorycontroller = require('../controllers/admin/categoryController');
const productcontroller = require('../controllers/admin/productController');
const customerscontroller = require('../controllers/admin/customersController');
const transactionsController = require('../controllers/admin/transactionsController');
const ordersController = require('../controllers/admin/orderController');
const loginController = require('../controllers/admin/loginController');
//categories
router.get('/categories',isAuthenticated,categorycontroller.get)
router.post('/category/search',isAuthenticated,categorycontroller.search)
router.post('/category/sort',isAuthenticated,categorycontroller.sort)
router.post('/category/filter',isAuthenticated,categorycontroller.filter)
router.post("/addcategory",isAuthenticated,categorycontroller.addcategory)
router.post('/deletecategory',isAuthenticated,categorycontroller.delete)
router.post('/editcategory',isAuthenticated,categorycontroller.edit)
router.get('/category/show/:id',isAuthenticated,categorycontroller.showedit)

//products

router.get('/products',isAuthenticated,productcontroller.get);
router.post('/product/search',isAuthenticated,productcontroller.search)
router.post('/product/filter',isAuthenticated,productcontroller.filter);
router.post('/admin/product/sort',isAuthenticated,productcontroller.sort)
router.post("/editproduct",isAuthenticated,productcontroller.edit)
router.post("/addproduct",isAuthenticated,productcontroller.add)
router.post('/deleteproduct',isAuthenticated,productcontroller.delete)
router.get('/product/show/:id',isAuthenticated,productcontroller.showedit)

//customers

router.get('/customers',isAuthenticated,customerscontroller.get)
router.post('/customer/sort',isAuthenticated,customerscontroller.sort)
router.post('/customer/search',isAuthenticated,customerscontroller.search)
router.post('/customer/filter',isAuthenticated,customerscontroller.filter);
router.post('/deletecustomer',isAuthenticated,customerscontroller.delete)
router.get('/customer/show/:id',isAuthenticated,customerscontroller.showedit)
router.post("/editcustomer",isAuthenticated,customerscontroller.edit)

//transactions

router.get('/transactions',isAuthenticated,transactionsController.get)
router.post('/transaction/sort',isAuthenticated,transactionsController.sort)
router.post('/transaction/search',isAuthenticated,transactionsController.search)
router.post('/transaction/filter',isAuthenticated,transactionsController.filter);

//orders

router.get('/orders',isAuthenticated,ordersController.get)
router.post('/order/sort',isAuthenticated,ordersController.sort)
router.post('/order/search',isAuthenticated,ordersController.search)
router.post('/order/filter',isAuthenticated,ordersController.filter);
router.get('/order/show/:id',isAuthenticated,ordersController.showedit)
router.post("/editorder",isAuthenticated,ordersController.edit)
router.post('/deleteorder',isAuthenticated,ordersController.delete)

//dashboard

router.get('/dashboard',isAuthenticated,productcontroller.dashboard)

//login

router.get('/login',loginController.show)
router.post('/login',loginController.check)
router.post('/logout',loginController.logout)


module.exports = router