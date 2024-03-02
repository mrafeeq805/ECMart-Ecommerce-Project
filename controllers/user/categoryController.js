const categorySchema = require("../../models/admin/category");
const transactionsSchema = require("../../models/user/transactions");
const ordersSchema = require("../../models/user/orders");
const productSchema = require("../../models/admin/product");
const userSchema = require("../../models/user/users");
var listData = []
call()

module.exports = {

    search: async (req,res)=>{
        searchdata = [];

        listData.forEach((item)=>{
          if(item.name.toLowerCase().includes(req.body.searchValue.toLowerCase())){
            searchdata.push(item);
          }
        })
        res.render('./user/categorylistview',{categorylist:searchdata})
    },
    showSearchPage: async (req,res)=>{
      const data = await productSchema.find();
      const brands = data.map(x=>x.seller)
      const brandscount = {};
      frequency(brands,brandscount)
      var discountranges = ['0-10', '10-20', '20-30', '30-40','40-50', '50 +'];
      var discountrangeStops = [0,10,20,30,40,50];
      const discount = data.map(x=>x.discount)
      const discountcount = rangeFrequency(discount,discountranges,discountrangeStops)
      var priceranges = ['0-299', '300-499', '500-699', '700-999', '1000 +'];
      var pricerangeStops = [0,299,499,699,999];
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
  
      res.render('./user/searchresult',{details:details,category:'',data:[]})
  },
}

async function call(){
    listData = await categorySchema.find()
}

function frequency(list,count){
  for (let ele of list) {
    if (count[ele]) {
        count[ele] += 1;
    } else {
        count[ele] = 1;
    }
  }
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