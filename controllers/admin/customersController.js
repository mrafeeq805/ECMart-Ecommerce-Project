const categorySchema = require("../../models/admin/category");
const productSchema = require("../../models/admin/product");
const customersSchema = require("../../models/user/users");
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
        const data = await customersSchema.find();
        listData=data
        res.render('./admin/customers',{list:data})
    },
    sort: async (req,res)=>{
        sortdata = [];
        const type = req.body.type
        if(type == 'cs-sort-id-asc'){
          res.render('./admin/partials/tabledata-customers',{list:listData});
        }else if(type == 'cs-sort-id-des'){
          res.render('./admin/partials/tabledata-customers',{list:listData.reverse()});
        }else if(type == 'cs-sort-name-asc'){
          sortdata = listData.sort(sortNameAtoZ)
          res.render('./admin/partials/tabledata-customers',{list:sortdata});
        }else if(type == 'cs-sort-name-des'){
          sortdata = listData.sort(sortNameZtoA)
          res.render('./admin/partials/tabledata-customers',{list:sortdata});
        }else if(type == 'cs-sort-email-asc'){
          sortdata = listData.sort(sortEmailAtoZ)
          res.render('./admin/partials/tabledata-customers',{list:sortdata});
        }else if(type == 'cs-sort-email-des'){
          sortdata = listData.sort(sortEmailZtoA)
          res.render('./admin/partials/tabledata-customers',{list:sortdata});
        }else if(type == 'cs-sort-purchase-asc'){
          sortdata = listData.sort( (a, b) => a.purchases - b.purchases);
          res.render('./admin/partials/tabledata-customers',{list:sortdata});
        }else if(type == 'cs-sort-purchase-des'){
          sortdata = listData.sort( (a, b) => b.purchases - a.purchases);
          res.render('./admin/partials/tabledata-customers',{list:sortdata});
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
              if(item[searchType].toLowerCase().includes(searchValue.toLowerCase())){
                searchdata.push(item);
              }
          })
        }
        function doesDigitExist(phoneNumber, digit) {
          phoneNumber = phoneNumber.toString();
          return phoneNumber.indexOf(digit.toString()) !== -1;
        }
      
        res.render('./admin/partials/tabledata-customers',{list:searchdata})
    },
    filter: async (req,res)=>{
        filterdata = [];
        const type = req.body.type
        if(type == 'All'){
          res.render('./admin/partials/tabledata-customers',{list:listData});
        }else if(type == 'Active'){
          listData.forEach((item)=>{
            if(item.status == type){
              filterdata.push(item);
            }
          })
          res.render('./admin/partials/tabledata-customers',{list:filterdata});
        }else if(type == 'Blocked'){
          listData.forEach((item)=>{
            if(item.status == type){
              filterdata.push(item);
            }
          })
          res.render('./admin/partials/tabledata-customers',{list:filterdata});
        }else{
          res.render('./admin/partials/tabledata-customers',{list:listData});
        }
        
    },
    delete:  async(req,res)=>{
        const id = req.body.id
        const data = await customersSchema.findByIdAndDelete(id);
        res.redirect('/admin/customers')
    },
    showedit: async(req,res)=>{
        const id = req.params.id
        const data = await customersSchema.findById(id);
        res.json(data)
    },
    edit : async (req,res)=>{
        console.log(req.body);
        const id = req.body.id
        const data = await customersSchema.findById(id)
        data.status = req.body.edit_customer_status
        await data.save();
        res.redirect('/admin/customers')
    }
}


  
function sortNameZtoA(a,b){
    if(a.name < b.name){
      return 1
    }
    if(a.name > b.name){
      return -1
    }
    return 0;
}
function sortNameAtoZ(a,b){
    if(a.name < b.name){
      return-1
    }
    if(a.name > b.name){
      return 1
    }
    return 0;
}

function sortEmailZtoA(a,b){
    if(a.email < b.email){
      return 1
    }
    if(a.email > b.email){
      return -1
    }
    return 0;
}
function sortEmailAtoZ(a,b){
    if(a.email < b.email){
      return-1
    }
    if(a.email > b.email){
      return 1
    }
    return 0;
}
