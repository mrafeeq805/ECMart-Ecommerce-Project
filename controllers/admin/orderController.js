const usersSchema = require("../../models/user/users");
const ordersSchema = require("../../models/user/orders");
const cloudinary = require("../../util/cloudinary");
const uploader = require("../../util/multer");
const mongoose = require('mongoose');
const multer = require('multer');
var searchdata = [];
var sortdata = [];
var filterdata = [];
var listData = [];


module.exports = {
    get: async (req,res)=>{
        const data = await ordersSchema.find();
        listData=data
        res.render('./admin/orders',{list:data})
    },
    sort: async (req,res)=>{
        sortdata = [];
        const type = req.body.type
        if(type == 'od-sort-id-asc'){
          res.render('./admin/partials/tabledata-orders',{list:listData});
        }else if(type == 'od-sort-id-des'){
          res.render('./admin/partials/tabledata-orders',{list:listData.reverse()});
        }else if(type == 'od-sort-name-asc'){
          sortdata = listData.sort(sortNameAtoZ)
          res.render('./admin/partials/tabledata-orders',{list:sortdata});
        }else if(type == 'od-sort-name-des'){
          sortdata = listData.sort(sortNameZtoA)
          res.render('./admin/partials/tabledata-orders',{list:sortdata});
        }else if(type == 'od-sort-amount-asc'){
          sortdata = listData.sort( (a, b) => a.total - b.total);
          res.render('./admin/partials/tabledata-orders',{list:sortdata});
        }else if(type == 'od-sort-amount-des'){
          sortdata = listData.sort( (a, b) => b.total - a.total);
          res.render('./admin/partials/tabledata-orders',{list:sortdata});
        }
    },
    search: async (req,res)=>{
        searchdata = [];
        const searchValue = req.body.search.split(':')[0];
        const searchType = req.body.search.split(':')[1];
        if(searchType == 'phone'){
            listData.forEach((item)=>{
                if(doesDigitExist(item.phone,searchValue)){
                  searchdata.push(item);
                }
            })
        }else{
            listData.forEach((item)=>{
                item['products'].forEach((i)=>{
                    if(i['title'].toLowerCase().includes(searchValue.toLowerCase())){
                      searchdata.push(item);
                    }
                })
                
            })
        }
        function doesDigitExist(phoneNumber, digit) {
            phoneNumber = phoneNumber.toString();
            return phoneNumber.indexOf(digit.toString()) !== -1;
        }
        
      
        res.render('./admin/partials/tabledata-orders',{list:searchdata})
    },
    filter: async (req,res)=>{
        filterdata = [];
        const type = req.body.type
        if(type == 'All'){
          res.render('./admin/partials/tabledata-orders',{list:listData});
        }else{
            listData.forEach((item)=>{
                if(item.status == type){
                    filterdata.push(item);
                }
            })
          res.render('./admin/partials/tabledata-orders',{list:filterdata});
        }
        
    },
    showedit: async(req,res)=>{
        const id = req.params.id
        const data = await ordersSchema.findById(id);
        res.json(data)
    },
    edit : async (req,res)=>{
      console.log(req.body);
      const id = req.body.id
      const data = await ordersSchema.findById(id)
      data.status = req.body.orderupdate
      await data.save();
      res.redirect('/admin/orders')
  },
  delete:  async(req,res)=>{
    const id = req.body.id
    const order_id = req.body.order_id
    const data = await ordersSchema.findByIdAndDelete(id);
    const deletefile = await ordersSchema.findById(id);
    const deleteod = await usersSchema.findOneAndUpdate(
      {phone:9567983967},
      {$pull:{orders:{order_id:order_id}}},
      {new:true}
    ).exec();
    res.redirect('/admin/orders')
},

}


  
function sortNameZtoA(a,b){
    if(a.title < b.title){
      return 1
    }
    if(a.title > b.title){
      return -1
    }
    return 0;
}
function sortNameAtoZ(a,b){
    if(a.title < b.title){
      return-1
    }
    if(a.title > b.title){
      return 1
    }
    return 0;
}

