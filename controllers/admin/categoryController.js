const categorySchema = require("../../models/admin/category");
const productSchema = require("../../models/admin/product");
const cloudinary = require("../../util/cloudinary");
const uploader = require("../../util/multer");
const mongoose = require('mongoose');
const multer = require('multer');
var searchdata = [];
var sortdata = [];
var filterdata = [];

module.exports = {

    get: async (req,res)=>{
        const data = await categorySchema.find();
        listData=data
        res.render('./admin/categories',{list:data})
    },
    search: async (req,res)=>{
        searchdata = [];
        listData.forEach((item)=>{
          if(item.name.toLowerCase().includes(req.body.searchValue.toLowerCase())){
            searchdata.push(item);
          }
        })
        res.render('./admin/partials/tabledata',{list:searchdata})
    },
    sort: async (req,res)=>{
        sortdata = [];
        const type = req.body.type
        if(type == 'ct-sort-id-asc'){
          res.render('./admin/partials/tabledata',{list:listData});
        }else if(type == 'ct-sort-id-des'){
          res.render('./admin/partials/tabledata',{list:listData.reverse()});
        }else if(type == 'ct-sort-category-asc'){
          sortdata = listData.sort(sortArrayAtoZ)
          res.render('./admin/partials/tabledata',{list:sortdata});
        }else if(type == 'ct-sort-category-des'){
          sortdata = listData.sort(sortArrayZtoA)
          res.render('./admin/partials/tabledata',{list:sortdata});
        }else if(type == 'ct-sort-product-asc'){
          sortdata = listData.sort( (a, b) => a.products - b.products);
          res.render('./admin/partials/tabledata',{list:sortdata});
        }else if(type == 'ct-sort-product-des'){
          sortdata = listData.sort( (a, b) => b.products - a.products);
          res.render('./admin/partials/tabledata',{list:sortdata});
        }
    },
    filter: async (req,res)=>{
        filterdata = [];
        const type = req.body.type
        if(type == 'All'){
          res.render('./admin/partials/tabledata',{list:listData});
        }else if(type == 'Listed'){
          listData.forEach((item)=>{
            if(item.status == type){
              filterdata.push(item);
            }
          })
          res.render('./admin/partials/tabledata',{list:filterdata});
        }else if(type == 'Unlisted'){
          listData.forEach((item)=>{
            if(item.status == type){
              filterdata.push(item);
            }
          })
          res.render('./admin/partials/tabledata',{list:filterdata});
        }else{
          res.render('./admin/partials/tabledata',{list:listData});
        }
        
    },
    addcategory:  async (req, res) => {

        try {
            uploader.single('add-category-upload')(req, res, async function (err) {
              if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
              }
                const upload = await cloudinary.v2.uploader.upload(req.file.path,{folder:'ecommerce/category'},async function(error, result){
                  if(result){
                    let lastid
                    const id = await categorySchema.find().sort({_id:-1}).limit(1)
                    if(id.length > 0){
                      lastid = id[0].category_id
                    }else{
                      lastid = 0
                    }

                    const newcategory = new categorySchema({
                      category_id : lastid + 1,
                      name: req.body.add_category_name,
                      icon: upload.secure_url,
                      icon_id: upload.public_id,
                      products: 0,
                      mainCategory: req.body.add_category_main,
                      status: req.body.add_category_status
                      });
                      newcategory.save();
                      res.redirect('/admin/categories')
                  }else{
                    res.json(error)
                  }
                });

            });
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
        
    },
    delete: async(req,res)=>{
        const id = req.body.id
        const deletefile = await categorySchema.findById(id);
        //const cldry = await cloudinary.uploader.destroy(deletefile.icon_id);
        const data = await categorySchema.findByIdAndDelete(id);
        res.redirect('/admin/categories')
    },
    edit:  async (req, res) => {

        try {
            uploader.single('edit-category-upload')(req, res, async function (err) {
              if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
              }
              if(req.file){
                var upload = await cloudinary.v2.uploader.upload(req.file.path,{folder:'ecommerce/category'});
              }
              const filter = { id: req.body.edit_category_id };
              const data = await categorySchema.findById(req.body.edit_category_id)
              data.name=req.body.edit_category_name;
              if(req.file){
                await cloudinary.uploader.destroy(data.icon_id);
                data.icon=upload.secure_url;
                data.icon_id= upload.public_id;
              }
              data.mainCategory = req.body.edit_category_main;
              data.status = req.body.edit_category_status
              await data.save();
              res.redirect('/admin/categories')
            });
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
        
    },
    showedit: async(req,res)=>{
        const id = req.params.id
        console.log(id);
        const data = await categorySchema.findById(id);
        res.json(data)
    }   
  }

  function sortArrayZtoA(a,b){
    if(a.name < b.name){
      return 1
    }
    if(a.name > b.name){
      return -1
    }
    return 0;
  }
  function sortArrayAtoZ(a,b){
    if(a.name < b.name){
      return-1
    }
    if(a.name > b.name){
      return 1
    }
    return 0;
  }
  
  
  
  

  

  
