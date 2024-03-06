const categorySchema = require("../../models/admin/category");
const transactionsSchema = require("../../models/user/transactions");
const ordersSchema = require("../../models/user/orders");
const productSchema = require("../../models/admin/product");
const userSchema = require("../../models/user/users");
var orders =[]
var orderfilterdata = []

module.exports = {
    showprofile : async(req,res)=>{

        res.render('./user/profile',{phone:req.session.phone})
    
    },
    showMyOrder : async(req,res)=>{
        const data =await userSchema.find({phone:req.session.phone},{orders:1})
        const list = data[0].orders;
        orders = list
        res.render('./user/myorders',{list:list})
    
    },
    orderDetails : async(req,res)=>{
        const id = req.params.id
        const data =await ordersSchema.find({order_id:id})
        const orderDetails = data[0]
        console.log(orderDetails);

        res.render('./user/orderdetails',{details:orderDetails})
    
    },
    showEditProfile : async(req,res)=>{
        const data = await userSchema.find({phone:req.session.phone})
        const details = data[0] 
        res.render('./user/editprofile',{details:details})
    
    },
    editProfile : async (req,res)=>{
        const id = req.body.id
        const data = await userSchema.findById(id)
        data.name=req.body.profile_name;
        data.email=req.body.profile_email;
        data.dob=req.body.profile_dob;
        data.alt_name = req.body.profile_altname;
        data.alt_phone = req.body.profile_altphone
        await data.save();
        res.redirect('/home/editprofile')
    },
    filterMyOrders: async (req,res)=>{
        orderfilterdata = [];
        const type = req.body.type
        if(type == 'All'){
          res.render('./user/partials/myordersdiv',{list:orders});
        }else{
            orders.forEach((item)=>{
                if(item.status == type){
                  orderfilterdata.push(item);
                }
            })
          res.render('./user/partials/myordersdiv',{list:orderfilterdata});
        }
        
    },
}