const categorySchema = require("../../models/admin/category");
const productSchema = require("../../models/admin/product");
const customersSchema = require("../../models/user/users");
const transactionsSchema = require("../../models/user/transactions");
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
        const data = await transactionsSchema.find();
        listData=data
        const methods = data.map(x => x.method)
        let unique = [...new Set(methods)];
        res.render('./admin/transactions',{list:data,methods:unique})
    },
    sort: async (req,res)=>{
        sortdata = [];
        const type = req.body.type
        if(type == 'ts-sort-id-asc'){
          res.render('./admin/partials/tabledata-transactions',{list:listData});
        }else if(type == 'ts-sort-id-des'){
          res.render('./admin/partials/tabledata-transactions',{list:listData.reverse()});
        }else if(type == 'ts-sort-method-asc'){
          sortdata = listData.sort(sortMethodAtoZ)
          res.render('./admin/partials/tabledata-transactions',{list:sortdata});
        }else if(type == 'ts-sort-method-des'){
          sortdata = listData.sort(sortMethodZtoA)
          res.render('./admin/partials/tabledata-transactions',{list:sortdata});
        }else if(type == 'ts-sort-amount-asc'){
          sortdata = listData.sort( (a, b) => a.amount - b.amount);
          res.render('./admin/partials/tabledata-transactions',{list:sortdata});
        }else if(type == 'ts-sort-amount-des'){
          sortdata = listData.sort( (a, b) => b.amount - a.amount);
          res.render('./admin/partials/tabledata-transactions',{list:sortdata});
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
        
      
        res.render('./admin/partials/tabledata-transactions',{list:searchdata})
    },
    filter: async (req,res)=>{
        filterdata = [];
        const type = req.body.type
        if(type == 'Filter By'){
          res.render('./admin/partials/tabledata-transactions',{list:listData});
        }else{
            listData.forEach((item)=>{
                if(item.method == type){
                    filterdata.push(item);
                }
            })
          res.render('./admin/partials/tabledata-transactions',{list:filterdata});
        }
        
    }

}


  
function sortMethodZtoA(a,b){
    if(a.method < b.method){
      return 1
    }
    if(a.method > b.method){
      return -1
    }
    return 0;
}
function sortMethodAtoZ(a,b){
    if(a.method < b.method){
      return-1
    }
    if(a.method > b.method){
      return 1
    }
    return 0;
}

