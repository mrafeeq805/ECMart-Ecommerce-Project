const categorySchema = require("../../models/admin/category");
const productSchema = require("../../models/admin/product");
const userSchema = require("../../models/user/users");
const mongoose = require('mongoose');
const fast2sms = require('fast-two-sms');



module.exports = {

    verify: async(req,res)=>{
      
      if(req.session.phone){
        res.redirect('/home')
      }else{
        const otpent = req.body.otp
        if(req.session.otp == otpent){
          
          req.session.phone = req.session.number
          const check = await userSchema.find({phone:req.session.phone})
          console.log(check);
  
          if(check.length == 0){
            const id = await userSchema.find().sort({_id:-1}).limit(1)
            let lastid;
            if(id.length > 0){
              lastid = id[0].customer_id
            }else{
              lastid = 0
            }
            const newuser = new userSchema({
              phone : req.session.phone,
              purchases: 0,
              status: 'Active',
              alt_name: '',
              alt_phone: 0,
              customer_id: lastid + 1,
              email:'',
              name: '',
              dob: '',
              sex:'',
              joined: new Date().toJSON().slice(0, 10),
              icon: '',
              icon_id: ''
        
            });
            await newuser.save()
            res.redirect('/home')
            
          }else{
  
            res.redirect('/home')
          
          }
      
        }else{
          res.render('./user/otp',{error:'Invalid OTP',phone:req.session.number})
        }
      }
    },
    send: async(req,res)=>{
      
      if(req.session.phone){
        res.redirect('/home')

      }else{

        const otp = generateOTP()
        req.session.otp = otp
        req.session.number = req.body.phone
        
        const response = await fast2sms.sendMessage(
          {
            authorization:process.env.FAST_API,
            message:`${otp} is your otp`,
            numbers:[req.body.phone]
          }
        )
        res.render('./user/otp',{phone:req.body.phone})

      }

    },
    login: async(req,res)=>{
      if(req.session.phone){
        res.redirect('/home')
      }else{
        res.render('./user/login')
      }

    },
    logout: async(req,res)=>{
      req.session.destroy((err) => {
        if (err) {
          return console.log(err);
        }
        res.redirect('/home')
      })

    }

       
  }




  function generateOTP(){
    return Math.floor(100000 + Math.random() * 900000)
  }

  
  
  
  

  

  
