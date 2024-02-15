const categorySchema = require("../../models/admin/category");
const productSchema = require("../../models/admin/product");

const mongoose = require('mongoose');


module.exports = {

    show: async (req,res)=>{
        res.render('./admin/login')
    },
    check: async (req,res)=>{
      const email = req.body.email
      const pass = req.body.pass
      if(email == 'admin@gmail.com' && pass == 'admin123'){
        req.session.admin = email
        res.redirect('/admin/dashboard')
        
      }else{
        res.render('./admin/login',{error:"email or password incorrect !"})
      }
      
    },
    
    logout: async (req,res)=>{
      req.session.destroy((err) => {
        if (err) {
          return console.log(err);
        }
        res.render('./admin/login')
      })
      
    },


      
  }


  
  
  
  

  

  
