const categorySchema = require("../../models/admin/category");
const transactionsSchema = require("../../models/user/transactions");
const ordersSchema = require("../../models/user/orders");
const productSchema = require("../../models/admin/product");
const userSchema = require("../../models/user/users");
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { log } = require("console");
const category = require("../../models/admin/category");
const { json } = require("body-parser");
const flash = require('connect-flash'); 
const { data } = require("autoprefixer");

var instance = new Razorpay({ key_id: process.env.API_KEY, key_secret: process.env.API_SECRET })
async function call(){
  listData = await productSchema.find()
}
var listData = []
var searchData = []
call()
var list=[]
var productidlist=[]
async function wishlist(phone){
  const dataw =await userSchema.find({phone:phone},{wishlist:1})
  if(!phone){
    list = []
    productidlist = []
    
  }else{
    list = dataw[0].wishlist;
    productidlist = list.map(x=>x.product_id)

  }
}

module.exports = {
    remove_wishlist : async(req,res)=>{
      
      const id = Number(req.body.id)
      const data =await userSchema.find({phone:req.session.phone,'wishlist.product_id':id})
      
      if(data.length > 0){
        
        const deletewish = await userSchema.findOneAndUpdate(
            {phone:req.session.phone},
            {$pull:{wishlist:{product_id:id}}},
            {new:true}
          ).exec();

          res.status(200).send({
            status:'item removed from wishlist'
  
          })


      }else{
        
        res.status(200).send({
          status:'error'
  
        })

      }
      

    },

    wishlist: async(req,res)=>{
      
      const id = req.body.id
      const data =await userSchema.find({phone:req.session.phone,'wishlist.product_id':id})

      if(data.length===0){
        const newData = {
          product_id:id
        }

        const create = await userSchema.findOneAndUpdate(
          {phone:req.session.phone},
          {$push:{wishlist:newData}},
          {new:true}
        ).exec();
        res.status(200).send({
          status:'item added to wishlist'
  
        })

      }else{
        res.status(200).send({
          status:'already exist'
  
        })

      }
      

    },
    delete_wishlist: async(req,res)=>{
      
      const id = req.body.id
      const deletewish = await userSchema.findOneAndUpdate(
          {phone:req.session.phone},
          {$pull:{wishlist:{product_id:id}}},
          {new:true}
        ).exec();
      res.redirect('/home/wishlist')
  
    },
    addtocart: async(req,res)=>{
      
      const id = req.body.id
      const data =await userSchema.find({phone:req.session.phone,'cart.product_id':id})
      const product =await productSchema.find({product_id:id})
      const details = product[0]
      console.log(details);
      if(data.length===0){

        const newData = {
          quantity : 1,
          product_id : details.product_id,
          title : details.title,
          description : details.description,
          specifications : details.specifications,
          image : details.image,
          image_id : details.image_id,
          category : details.category,
          discount : details.discount,
          sell_price : details.sell_price,
          price : details.price,
          status : details.status,
          seller : details.seller
        }

        const create = await userSchema.findOneAndUpdate(
          {phone:req.session.phone},
          {$push:{cart:newData}},
          {new:true}
        ).exec();
        res.redirect('/home/cart')
      }else{
        res.redirect('/home/cart')
      }
      

    },
    movetocart: async(req,res)=>{
      
      const id = req.body.id
      const data =await userSchema.find({phone:req.session.phone,'cart.product_id':id})
      const product =await productSchema.find({product_id:id})
      const details = product[0]
      console.log(details);
      if(data.length===0){

        const newData = {
          quantity : 1,
          product_id : details.product_id,
          title : details.title,
          description : details.description,
          specifications : details.specifications,
          image : details.image,
          image_id : details.image_id,
          category : details.category,
          discount : details.discount,
          sell_price : details.sell_price,
          price : details.price,
          status : details.status,
          seller : details.seller
        }

        const create = await userSchema.findOneAndUpdate(
          {phone:req.session.phone},
          {$push:{cart:newData}},
          {new:true}
        ).exec();
        res.status(200).send({
          status:'item added to cart'
  
        })
      }else{
        res.status(200).send({
          status:'error'
  
        })
      }
      

    },
    delete_cart: async(req,res)=>{
      
      const id = req.body.id
      const deletewish = await userSchema.findOneAndUpdate(
          {phone:req.session.phone},
          {$pull:{cart:{product_id:id}}},
          {new:true}
        ).exec();
      res.redirect('/home/cart')
  
    },
    updateQuantity: async(req,res)=>{
      const id = req.body.id
      const quantity = req.body.quantity
      const update = await userSchema.findOneAndUpdate(
        {phone:req.session.phone,'cart._id':id},
        {$set: {
          'cart.$.quantity': quantity,
          }
        },
        {new:true}
      ).exec();
      const data =await userSchema.find({phone:req.session.phone},{cart:1})
      const productlist = data[0].cart;
      const amountlist = productlist.map(x => x.sell_price * x.quantity)
      const discountlist = productlist.map(x => Math.round((x.sell_price * x.discount) / 100) * x.quantity )
      const totalamount = amountlist.reduce((x,y)=> x+y )
      const totaldiscount = discountlist.reduce((x,y)=>x+y)
      const delivery = totalamount > 500 ? 0 : 40
      const oneitem =await userSchema.findOne({phone:req.session.phone,'cart._id':id},{'cart.$':1})
      const list = oneitem.cart[0];
      const card_price = Math.round(list.sell_price - (list.sell_price * list.discount) / 100) * list.quantity
      const card_discount = list.sell_price *list.quantity
      const card_saving = card_discount - card_price
      res.status(200).send({
        total_amount:totalamount,
        total_discount:totaldiscount,
        delivery_charge : delivery,
        total : totalamount-totaldiscount,
        card_price : card_price,
        card_discount : card_discount,
        card_saving :  card_saving

      })
  
    },
    showAddress: async(req,res)=>{
      const data =await userSchema.find({phone:req.session.phone},{address:1})
      const list = data[0].address;
      res.render('./user/addressmanager',{list:list})
  
    },
    showAddAddress: async(req,res)=>{

      const meth = req.params.meth
      res.render('./user/addaddress',{meth:meth})
    },
    addAdress: async(req,res)=>{
      const newData = {
        name : req.body.name,
        phone : req.body.phone,
        building : req.body.building,
        area : req.body.area,
        pin : req.body.pin,
        state : req.body.state,
        landmark : req.body.landmark,
        city : req.body.city,
        category :req.body.category
      }
      const create = await userSchema.findOneAndUpdate(
          {phone:req.session.phone},
          {$push:{address:newData}},
          {new:true}
        ).exec();
        if(req.body.meth == 'check_add'){
          res.redirect('/home/cartcheckout')
        }else{
          res.redirect('/home/addressmanager')
        }
        
    },
    delete_address: async(req,res)=>{
      
      const id = req.body.id
      const deleteadd = await userSchema.findOneAndUpdate(
          {phone:req.session.phone},
          {$pull:{address:{_id:id}}},
          {new:true}
        ).exec();
      res.redirect('/home/addressmanager')
  
    },
    showEditAddress: async(req,res)=>{
      const id = req.body.id
      const data =await userSchema.findOne({phone:req.session.phone,'address._id':id},{'address.$':1})
      console.log(data);
      const list = data.address[0];
      const meth = req.body.meth
      
      res.render('./user/editaddress',{list:list,meth:meth})
  
    },
    edit_address: async(req,res)=>{
      const id = req.body.id
      const update = await userSchema.findOneAndUpdate(
        {phone:req.session.phone,'address._id':id},
        {$set: {
          'address.$.name': req.body.name,
          'address.$.phone': req.body.phone,
          'address.$.city': req.body.city,
          'address.$.building': req.body.building,
          'address.$.area': req.body.area,
          'address.$.pin': req.body.pin,
          'address.$.state': req.body.state,
          'address.$.category': req.body.category,
          'address.$.landmark': req.body.landmark
          }
        },
        {new:true}
      ).exec();
      if(req.body.meth == 'check_add'){
        res.redirect('/home/cartcheckout')
      }else{
        res.redirect('/home/addressmanager')
      }
  
    },
    cart_checkout: async(req,res)=>{
      const data =await userSchema.find({phone:req.session.phone},{cart:1})
      const productlist = data[0].cart;
      const payment = getamount(productlist)
      const addressdata =await userSchema.find({phone:req.session.phone},{address:1})
      const address = addressdata[0].address;
      res.render('./user/selectaddress',{list:address,payment:payment})
  
    },
    address_checkout: async(req,res)=>{
      const data =await userSchema.find({phone:req.session.phone},{cart:1})
      const productlist = data[0].cart;
      const payment = getamount(productlist)
      const address = JSON.parse(req.body.address);
      req.session.address = req.body.address;
      res.render('./user/ordersummary',{list:productlist,address:address,payment:payment})
  
    },
    payment_checkout:  async(req,res)=>{
      const data =await userSchema.find({phone:req.session.phone},{cart:1})
      const productlist = data[0].cart;
      req.session.image = productlist[0].image
      req.session.title = productlist[0].title
      const payment = getamount(productlist)
      res.render('./user/paymentmethod',{payment:payment})
  
    },
    payonline: async (req,res)=>{
      const data =await userSchema.find({phone:req.session.phone},{cart:1})
      const productlist = data[0].cart;
      console.log(productlist);
      const payment = getamount(productlist)

      var options = {
        amount: payment.total * 100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };
      instance.orders.create(options, (err, order) => {
        if (order) {
            console.log(order, ": order success")
            res.status(200).send({
                success: true,
                msg: "Order Created",
                order_id: order.id,
                amount: payment.total * 100,
                key_id: process.env.API_KEY,
                name: 'rafeeq',
                email: 'muhammedrafeeqvr@gmail.com',
                contact: '957983967'
      
            })
        }
        else if (err) {
            console.log("Error in creating razorpay order :", err)
            res.status(500).send()
        }
      })
      

    },
    verifypayment: async (req, res)=>{ 
      const datas =await userSchema.find({phone:req.session.phone},{cart:1})
      const list = datas[0].cart; 
      const payment = getamount(list)
      var neworder;
      if(req.body.payment_method == 'cash on delivery'){
        const datas =await userSchema.find({phone:req.session.phone},{cart:1})
        const list = datas[0].cart;
        const id = await ordersSchema.find().sort({_id:-1}).limit(1)
        req.session.method = 'cash on delivery'
        let lastid;
        if(id.length > 0){
          lastid = id[0].order_id
        }else{
          lastid = 0
        }
        neworder = new ordersSchema({
          order_id : lastid + 1,
          phone: req.session.phone,
          method : 'cash on delivery',
          status : 'Processing',
          date: new Date().toJSON().slice(0, 10),
          amount: req.session.total,
          tracking_link : '',
          shipping_charge : 0,
          total :payment.total,
          discount : payment.total_discount,
          address : JSON.parse(req.session.address),
          products : list,
    
        });
        await neworder.save();
      }else{
        const data = await instance.payments.fetch(req.body.payment_id)
        req.session.method = data.method
        if(data.status == 'captured'){
          const id = await transactionsSchema.find().sort({_id:-1}).limit(1)
          let lastid;
          if(id.length > 0){
            lastid = id[0].transaction_id
          }else{
            lastid = 0
          }
         const newtransaction = new transactionsSchema({
           payment_id : data.id,
           phone: req.session.phone,
           method : data.method,
           status : data.status,
           date: new Date().toJSON().slice(0, 10),
           amount: data.amount/100,
           transaction_id : lastid + 1
     
         });
         await newtransaction.save();
         const datas =await userSchema.find({phone:req.session.phone},{cart:1})
          const list = datas[0].cart;
          const idd = await ordersSchema.find().sort({_id:-1}).limit(1)
          let lasti;
          if(idd.length > 0){
            lasti = idd[0].order_id
          }else{
            lasti = 0
          }
          neworder = new ordersSchema({
          order_id : lasti + 1,
          phone: req.session.phone,
          method : data.method,
          status : 'Processing',
          date: new Date().toJSON().slice(0, 10),
          amount: payment.total,
          tracking_link : '',
          shipping_charge : 0,
          total : payment.total,
          discount : payment.total_discount,
          address : JSON.parse(req.session.address),
          products : list,
    
        });
        await neworder.save();

        }
      }
      const create = await userSchema.findOneAndUpdate(
        {phone:req.session.phone},
        {$push:{orders:neworder}},
        {new:true}
      ).exec();
      const details = {
        address: JSON.parse(req.session.address),
        image : req.session.image,
        title : req.session.title,
        amount : payment.total,
        method : req.session.method


      }
      const id = req.body.id
      const deletecart = await userSchema.findOneAndUpdate(
          {phone:req.session.phone},
          {"$set":{cart:[]}},
          {new:true}
        ).exec();
      res.render('./user/orderplaced',{details:details})
     
      

    },
    sort: async (req, res)=>{
      const type = req.body.type.split(':')[1]
      const category = req.body.type.split(':')[0]
      const productlistData = await productSchema.find({category:category})
      wishlist(req.session.phone)
      if(type == 'Latest'){
        res.render('./user/productslist',{list:productlistData.reverse(),wishlist:productidlist});
      }else if(type == 'Oldest'){
        res.render('./user/productslist',{list:productlistData,wishlist:productidlist});
      }else if(type == 'Discount'){
        const sortdata = productlistData.sort( (a, b) => b.discount - a.discount);
        res.render('./user/productslist',{list:sortdata,wishlist:productidlist});
      }else if(type == 'HL'){
        const sortdata = productlistData.sort( (a, b) => (b.sell_price - b.discount) - (a.sell_price - a.discount));
        res.render('./user/productslist',{list:sortdata,wishlist:productidlist});
      }else if(type == 'LH'){
        const sortdata = productlistData.sort( (a, b) => (a.sell_price - a.discount) - (b.sell_price - b.discount));
        res.render('./user/productslist',{list:sortdata,wishlist:productidlist});
      }


    },
    filter: async (req, res)=>{
      var orConditions = []
      var brand = []
      brand = JSON.parse(req.body.data.split(':')[0])
      const price = JSON.parse(req.body.data.split(':')[1])
      const discount = JSON.parse(req.body.data.split(':')[2])
      const category = 'Resistors'

      if(price.length > 0){
        const pricelist = []
        price.forEach((itm) => {
            pricelist.push({'min': itm.split('-')[0], 'max': itm.split('-')[1]})
        })
        orConditions = pricelist.map(({ min, max }) => ({
          price: {
            $gte: min,
            $lte: max
          }
        }));
      }else{
        const price = []
      }
      if(discount.length > 0){
        const discountlist = []
        discount.forEach((itm) => {
            discountlist.push({'min': itm.split('-')[0], 'max': itm.split('-')[1]})
        })
        const Conditions = discountlist.map(({ min, max }) => ({
          discount: {
            $gte: min,
            $lte: max
          }
        }));
        Conditions.forEach(item=>{
          orConditions.push(item)
        })

      }else{
        const discount = []
      }
      console.log(orConditions);
      console.log(orConditions.length);
      var productlistData = []
      if(brand.length == 0 && orConditions.length == 0 ){
        productlistData = await productSchema.find({"category":category})
      }else if(brand.length == 0 && orConditions.length > 0 ){
        console.log('hg');
        productlistData = await productSchema.find({"category":category,"$or":orConditions})
      }else if(brand.length > 0 && orConditions.length == 0 ){
        productlistData = await productSchema.find({"category":category,"seller":{"$in":brand}})
      }else{
        productlistData = await productSchema.find({"category":category,"seller":{"$in":brand}, "$or":orConditions})
      }
      wishlist(req.session.phone)
      res.render('./user/productslist',{list:productlistData,wishlist:productidlist})


    },
    search: async (req,res)=>{
      searchData = [];
      // function doesDigitExist(phoneNumber, digit) {
      //   phoneNumber = phoneNumber.toString();
      //   return phoneNumber.indexOf(digit.toString()) !== -1;
      // }
      // listData.forEach((item)=>{
      //   if(doesDigitExist(item.title,req.body.searchValue)){
      //     searchData.push(item);
      //   }
      // })

      listData.forEach((item)=>{
        if(item.title.toLowerCase().includes(req.body.searchValue.toLowerCase())){
          searchData.push(item);
        }
      })

      wishlist(req.session.phone)
      res.render('./user/productslist',{list:searchData,wishlist:productidlist})
  },
  searchHome: async (req,res)=>{
    searchData = [];
    listData.forEach((item)=>{
      if(item.title.toLowerCase().includes(req.body.search.toLowerCase())){
        searchData.push(item);
      }
    })
    const data = await productSchema.find();
    const dataw =await userSchema.find({phone:req.session.phone},{wishlist:1})
    let list;
    var productidlist;
    console.log(dataw);
    if(!req.session.phone){
      list = []
      productidlist = []
      
    }else{
  
      list = dataw[0].wishlist;
      productidlist = list.map(x=>x.product_id)
    }
    
    const brands = data.map(x=>x.seller)
    const brandscount = findUniqueElementFrequencies(brands)
    console.log(brandscount);
    var discountranges = ['0-10', '11-20', '21-30', '31-40','41-50', '51 +'];
    var discountrangeStops = [0,11,21,31,41,51];
    const discount = data.map(x=>x.discount)
    const discountcount = rangeFrequency(discount,discountranges,discountrangeStops)
    var priceranges = ['0-299', '300-499', '500-699', '700-999', '1000 +'];
    var pricerangeStops = [0,300,500,700,1000];
    const price = data.map(x=>(x.sell_price - x.discount))
    const pricecount = rangeFrequency(price,priceranges,pricerangeStops)
    const details = {
      brands : brands,
      brandscount : brandscount,
      discount : discount,
      discountcount :discountcount,
      price : price,
      pricecount : pricecount,
    }


    wishlist(req.session.phone)
    res.render('./user/searchresult',{data:searchData,category:'all',wishlist:productidlist,details:details})
},

       
  }
function getamount(list){
    const productlist = list;

    const amountlist = productlist.map(x => x.sell_price * x.quantity)
    const discountlist = productlist.map(x => Math.round((x.sell_price * x.discount) / 100) * x.quantity )
    const totalamount = amountlist.reduce((x,y)=> x+y )
    const totaldiscount = discountlist.reduce((x,y)=>x+y)
    const delivery = totalamount > 500 ? 0 : 40
    const payment = {
      total_amount:totalamount,
      total_discount:totaldiscount,
      delivery_charge : delivery,
      total : totalamount-totaldiscount
  
    }
    return payment
  }




  function generateOTP(){
    return Math.floor(100000 + Math.random() * 900000)
  }



  function findUniqueElementFrequencies(arr) {
    // Initialize an object to store element frequencies
    const elementFrequencies = {};
    const list = []
    // Iterate through the array
    for (let i = 0; i < arr.length; i++) {
      const currentElement = arr[i];
  
      // Check if the element is already in the frequencies object
      if (elementFrequencies[currentElement]) {
        // Increment the frequency if it exists
        elementFrequencies[currentElement]++;
      } else {
        // Set the frequency to 1 if the element is not in the object
        elementFrequencies[currentElement] = 1;
      }
      list.push(elementFrequencies)
    }
  
    // Return the object with element frequencies
    return elementFrequencies;
  }
  function rangeFrequency(list,ranges,rangeStops){
  
    var rangeCounts = [0];
  
    list.sort(function(a,b){return a - b});
    var k = 0;
    for(var i = 0; i < list.length; i++){    
      if(rangeStops[k] > list[i]) continue;
      else if(rangeStops[k+1] <= list[i]&&k != rangeStops.length - 1){
          rangeCounts[++k] = 0;          
          i--;
      } else rangeCounts[k]++;
    }
    //output
    ranges = ranges.map(function(e,i){    
      var result = {};
      result[e] = rangeCounts[i];
      return result;
    });
    return ranges
  }
  

  
  
  
  

  

  
