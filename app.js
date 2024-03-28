require("dotenv").config()
const express = require('express');
const app = express();
const path = require('path')
const session = require('express-session')


const categorySchema = require("./models/admin/category");
const productSchema = require("./models/admin/product");
const userSchema = require("./models/user/users");

const db = require("./config/db");

app.use(session({  
  secret: 'some-secret-example',  
  resave: false,
  saveUninitialized: false, 
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const isAuthenticated = require('./middleware/auth');

const adminroute = require('./routes/admin')
app.use('/admin',adminroute)

const userroute = require('./routes/user')
app.use('/home',userroute)


app.get('/home',async(req,res)=>{
  const cate = await categorySchema.find({status:'Listed'}).limit(5);
  const data = await productSchema.find();
  res.render('./user/home',{categorylist:cate,productlist:data,phone:req.session.phone})

})
app.get('/',(req,res)=>{
  res.redirect('/home')

})
app.get('/home/wishlist',isAuthenticated,async(req,res)=>{
  const data =await userSchema.find({phone:req.session.phone},{wishlist:1})
  let list;
  let productidlist;
  if(!req.session.phone){
    productidlist = []
  }else{
    list = data[0].wishlist;
    productidlist = list.map(x=>x.product_id)

  }

  const productlist =await productSchema.find({product_id:{"$in":productidlist}})

  
  res.render('./user/wishlist',{list:productlist})
})
app.get('/home/cart',isAuthenticated,async(req,res)=>{
  const data =await userSchema.find({phone:req.session.phone},{cart:1})
  let productlist;
  if(!req.session.phone){
    productlist = []
  }else{
    productlist = data[0].cart;

  }
  let payment = {}
  if(productlist.length > 0){
    const amountlist = productlist.map(x => x.sell_price * x.quantity)
    const discountlist = productlist.map(x => Math.round((x.sell_price * x.discount) / 100) * x.quantity )
    const totalamount = amountlist.reduce((x,y)=> x+y )
    const totaldiscount = discountlist.reduce((x,y)=>x+y)
    const delivery = totalamount > 500 ? 0 : 40
    payment = {
      total_amount:totalamount,
      total_discount:totaldiscount,
      delivery_charge : delivery,
      total : totalamount-totaldiscount
  
    }
  }

  res.render('./user/cart',{list:productlist,payment:payment,phone:req.session.phone})
})

app.get('/productdetails/:id',async(req,res)=>{
  const data = await productSchema.find({"product_id":req.params.id});
  const datarelated = await productSchema.find({category:data[0].category});
  res.render('./user/productdescription',{item:data[0],productlist:datarelated})
})
app.get('/allcategories',async(req,res)=>{
  const cate = await categorySchema.find({status:'Listed'});
  //const data = await productSchema.find({"product_id":req.params.id});
  res.render('./user/categories',{categorylist:cate})
})

app.get('/categoryproducts/:category',async(req,res)=>{
  const data = await productSchema.find({category:req.params.category});
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
  //const data = await productSchema.find({"product_id":req.params.id});
  res.render('./user/categoryresult',{data:data,category:req.params.category,details:details,wishlist:productidlist})
})

app.use(function(req,res){
  res.status(404).render('./user/404notfound');
});



function frequency(list,count){
  for (let ele of list) {
    if (count[ele]) {
        count[ele] += 1;
    } else {
        count[ele] = 1;
    }
  }
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


app.listen(process.env.PORT || 5000);
