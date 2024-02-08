const categorySchema = require("../../models/admin/category");
const productSchema = require("../../models/admin/product");
const ordersSchema = require("../../models/user/orders");
const customersSchema = require("../../models/user/users");
const cloudinary = require("../../util/cloudinary");
const uploader = require("../../util/multer");
const mongoose = require('mongoose');
const multer = require('multer');

var productlistData= []
var productsearchdata = [];
var productfilterdata = [];
var productsortdata = [];

module.exports = {
  
    dashboard: async (req,res)=>{
      const data = await ordersSchema.find().limit(2);
      const customers = await customersSchema.find().count();
      const products = await productSchema.find().count();
      const orders = await ordersSchema.find().count();
      const orderslist = await ordersSchema.find();
      const amountlist = orderslist.map(x=>x.total)
      const totalsales = amountlist.reduce((x,y)=>x+y)

      const details = {
        sales : totalsales,
        customers : customers,
        products : products,
        orders : orders
      }
      res.render('./admin/dashboard',{list:data,details:details})
    },

    get: async (req,res)=>{
        const cate = await categorySchema.find();
        const data = await productSchema.find();
        productlistData=data
        res.render('./admin/products',{list:data,category:cate})
    },
    search: async (req,res)=>{
        productsearchdata = [];
        const searchValue = req.body.search.split(':')[0];
        const searchType = req.body.search.split(':')[1];
        productlistData.forEach((item)=>{
          if(item[searchType].toLowerCase().includes(searchValue.toLowerCase())){
            productsearchdata.push(item);
          }
        })
      
        res.render('./admin/partials/tabledata-products',{list:productsearchdata})
    },
    filter: async (req,res)=>{
        productfilterdata = [];
        const type = req.body.type
        if(type == 'All'){
          res.render('./admin/partials/tabledata-products',{list:productlistData});
        }else if(type == 'In Stock'){
          productlistData.forEach((item)=>{
            if(item.status == type){
              productfilterdata.push(item);
            }
          })
          res.render('./admin/partials/tabledata-products',{list:productfilterdata});
        }else if(type == 'Out of Stock'){
          productlistData.forEach((item)=>{
            if(item.status == type){
              productfilterdata.push(item);
            }
          })
          res.render('./admin/partials/tabledata-products',{list:productfilterdata});
        }else{
          res.render('./admin/partials/tabledata-products',{list:productlistData});
        }
        
    },
    sort: async (req,res)=>{
        productsortdata = [];
        const type = req.body.type
        if(type == 'pt-sort-id-asc'){
          res.render('./admin/partials/tabledata-products',{list:productlistData});
        }else if(type == 'pt-sort-id-des'){
          res.render('./admin/partials/tabledata-products',{list:productlistData.reverse()});
        }else if(type == 'pt-sort-name-asc'){
          productsortdata = productlistData.sort(sortNameAtoZ)
          res.render('./admin/partials/tabledata-products',{list:productsortdata});
        }else if(type == 'pt-sort-name-des'){
          productsortdata = productlistData.sort(sortNameZtoA)
          res.render('./admin/partials/tabledata-products',{list:productsortdata});
        }else if(type == 'pt-sort-category-asc'){
          productsortdata = productlistData.sort(sortCategoryAtoZ)
          res.render('./admin/partials/tabledata-products',{list:productsortdata});
        }else if(type == 'pt-sort-category-des'){
          productsortdata = productlistData.sort(sortCategoryZtoA)
          res.render('./admin/partials/tabledata-products',{list:productsortdata});
        }else if(type == 'pt-sort-qty-asc'){
          productsortdata = productlistData.sort( (a, b) => a.quantity - b.quantity);
          res.render('./admin/partials/tabledata-products',{list:productsortdata});
        }else if(type == 'pt-sort-qty-des'){
          productsortdata = productlistData.sort( (a, b) => b.quantity - a.quantity);
          res.render('./admin/partials/tabledata-products',{list:productsortdata});
        }else if(type == 'pt-sort-price-asc'){
          productsortdata = productlistData.sort( (a, b) => a.sell_price - b.sell_price);
          res.render('./admin/partials/tabledata-products',{list:productsortdata});
        }else if(type == 'pt-sort-price-des'){
          productsortdata = productlistData.sort( (a, b) => b.sell_price - a.sell_price);
          res.render('./admin/partials/tabledata-products',{list:productsortdata});
        }else if(type == 'pt-sort-seller-asc'){
          productsortdata = productlistData.sort(sortSellerAtoZ)
          res.render('./admin/partials/tabledata-products',{list:productsortdata});
        }else if(type == 'pt-sort-seller-des'){
          productsortdata = productlistData.sort(sortSellerZtoA)
          res.render('./admin/partials/tabledata-products',{list:productsortdata});
        }
    },
    edit: async (req, res) => {

        try {
            uploader.single('edit-product-upload')(req, res, async function (err) {
              if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
              }
              const id = req.body.id
              const data = await productSchema.findById(id)
              if(req.file){
                const upload =  await cloudinary.v2.uploader.upload(req.file.path,{folder:'ecommerce/products'});
                const cldry = await cloudinary.uploader.destroy(data.image_id); 
                data.image = upload.secure_url
                data.image_id = upload.public_id
              }
            
              data.title = req.body.edit_product_name
              data.description = req.body.edit_product_description;
              data.specifications = JSON.parse(req.body.edit_product_speclist)
              data.sell_price = req.body.edit_product_price
              data.price = Math.round(req.body.edit_product_price - (req.body.edit_product_price * req.body.edit_product_discount / 100)),
              data.category = req.body.edit_product_category
              data.status = req.body.edit_product_status
              data.discount = req.body.edit_product_discount
              data.quantity = req.body.edit_product_quantity
              data.seller = req.body.edit_product_seller
              await data.save();
              res.redirect('/admin/products')
            });
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
        
    },
    add: async (req, res) => {

        try {
            uploader.single('add-product-upload')(req, res, async function (err) {
              if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
              }
              const upload =  await cloudinary.v2.uploader.upload(req.file.path,{folder:'ecommerce/products'},async function(error,result){
                const id = await productSchema.find().sort({_id:-1}).limit(1)
                let lastid;
                console.log(id);
                if(id.length > 0){
                  lastid = id[0].product_id
                }else{
                  lastid = 0
                }
                if(result){
                  const newproduct = new productSchema({
                    product_id : lastid + 1,
                    title: req.body.add_product_name,
                    description: req.body.add_product_description,
                    specifications: JSON.parse(req.body.add_product_speclist),
                    image: upload.secure_url,
                    image_id: upload.public_id,
                    sell_price: req.body.add_product_price,
                    price : Math.round(req.body.add_product_price - (req.body.add_product_price * req.body.add_product_discount / 100)),
                    category: req.body.add_product_category,
                    status: req.body.add_product_status,
                    discount: req.body.add_product_discount,
                    quantity: req.body.add_product_quantity,
                    seller: req.body.add_product_seller
                  });
                  newproduct.save();
                  res.redirect('/admin/products')
                }
              });
  

            });
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
        
    },
    delete:  async(req,res)=>{
        const id = req.body.id
        const deletefile = await productSchema.findById(id);
        //const cldry = await cloudinary.uploader.destroy(deletefile.image_id);
        const data = await productSchema.findByIdAndDelete(id);
        res.redirect('/admin/products')
    },
    showedit: async(req,res)=>{
        const id = req.params.id
        const data = await productSchema.findById(id);
        res.json(data)
    }



}

  function sortSellerZtoA(a,b){
    if(a.seller < b.seller){
      return 1
    }
    if(a.seller > b.seller){
      return -1
    }
    return 0;
  }
  function sortSellerAtoZ(a,b){
    if(a.seller < b.seller){
      return-1
    }
    if(a.seller > b.seller){
      return 1
    }
    return 0;
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
  function sortCategoryZtoA(a,b){
    if(a.category < b.category){
      return 1
    }
    if(a.category > b.category){
      return -1
    }
    return 0;
  }
  function sortCategoryAtoZ(a,b){
    if(a.category < b.category){
      return-1
    }
    if(a.category > b.category){
      return 1
    }
    return 0;
  }