const { json } = require("body-parser")






async function filterOrder(element){
    
    const type= element.value
    const table = document.getElementById("table-container")
    const link = await fetch(`/admin/order/filter`,{
        method:'POST',
        headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
        body: 'type=' + type,
    })
    const data = await link.text();
    table.innerHTML=data

}

 async function sortOrder(element){
    
    const type= element.id
    const table = document.getElementById("table-container")
    const link = await fetch(`/admin/order/sort`,{
        method:'POST',
        headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
        body: 'type=' + type,
    })
    const data = await link.text();
    table.innerHTML=data

}




async function searchOrder(){
    
    const search = document.getElementById("order_search")
    const type = document.getElementById("order_search_type")
    const table = document.getElementById("table-container")
    const cont = {
        'searhValue':search.value,
        'type':type.value
    }
    const link = await fetch(`/admin/order/search`,
        {
            method:'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: 
                `search=${search.value}:${type.value}`
            
        }
    
    );
    const data = await link.text();
    table.innerHTML=data

}
async function showDetails(element){

    const orderid= element.id
    const link = await fetch(`/admin/order/show/${orderid}`)
    const data = await link.json()
    const list = data.products
    const container = document.getElementById("container")
    const popup = document.getElementById("showorder")
    popup.style.display = 'flex'


    list.forEach((item,index) => {

    const content =  `
    <div class="flex">
    <div class="bg-[#1a91ff1f] rounded-lg md:w-42">
        <div class="h-24 md:h-24 md:w-24 flex justify-center p-3">
            <img class="h-full object-cover" src="${item.image}" alt="thumb">
        </div>
        
    </div>
    <div class="px-2 md:px-4">
        <span class="block font-medium text-sm">${item.title}</span>
        <span id="price-<%= ${item._id} %>" class="font-bold">₹${Math.round(item.sell_price - ((item.sell_price * item.discount) / 100) ) * item.quantity}  </span>
        <span class="text-gray-400 ml-1 text-sm font-medium"><s id="discount-${item._id}">₹ ${item.sell_price * item.quantity} </s></span>
        <div class="flex justify-between">
            <div class="md:mt-1">
                <span class="text-xs font-medium text-gray-400 mt-1  md:mt-2">Sold By: </span><span class="text-xs ml-2 font-medium "> ${item.seller}</span>
            </div>
            <div class="flex gap-2 items-center">
                <span class="text-gray-400 text-sm ">Qty :</span>
            
                <span id="quantity-${index}">${item.quantity}</span>

            </div>
        </div>
        
        
    </div>
    
    
</div>
  `;

container.innerHTML += content
});                               

    const addname = document.getElementById('order-name')
    const addphone = document.getElementById('order-phone')
    const addbuilding = document.getElementById('order-building')
    const addarea = document.getElementById('order-area')
    const addcity = document.getElementById('order-city')
    const addstate = document.getElementById('order-state')
    const addpin = document.getElementById('order-pin')
    const addland = document.getElementById('order-landmark')
    const paymentmethod = document.getElementById('order-payment-method')
    const shippingcharge = document.getElementById('order-shipping-charge')
    const discount = document.getElementById('order-discount')
    const total = document.getElementById('order-total')
    const phone = document.getElementById('order-ph')
    const created = document.getElementById('order-created')
    const odid = document.getElementById('orderid')

    addname.textContent = data.address.name
    addphone.textContent = data.address.phone
    addbuilding.textContent = data.address.building
    addarea.textContent = data.address.area
    addcity.textContent = data.address.city
    addstate.textContent = data.address.state
    addpin.textContent = data.address.pin
    addland.textContent = data.address.landmark
    paymentmethod.textContent = data.method
    shippingcharge.textContent = `₹${data.shipping_charge}`
    discount.textContent = `₹${data.discount}`
    total.textContent = `₹${data.total}`
    phone.textContent = data.phone
    created.textContent = data.date
    const status = data.status
    const orderupdate = document.getElementById('orderupdate')
    orderupdate.value = data.status
    odid.value = element.id

    const radiolist = document.getElementsByName('order-status')
    const statuslist = ['Processing','Delivered','Out Of Delivery','Shipped','Cancelled']
    radiolist.forEach((item)=>{
        item.checked = false
    })
    radiolist[statuslist.indexOf(status)].checked = true


}

function changeStatus(status){
    const orderupdate = document.getElementById('orderupdate')
    const radiolist = document.getElementsByName('order-status')
    const statuslist = ['Processing','Delivered','Out Of Delivery','Shipped','Cancelled']
    orderupdate.value = status
    radiolist.forEach((item)=>{
        item.checked = false
    })
    radiolist[statuslist.indexOf(status)].checked = true
    alert(orderupdate.value)
}

 function closePopup(){
    const popup = document.getElementById("showorder")
    popup.style.display = 'none'
 }

 
function showDelete(element){
    const arr = element.id.split('-')
    const product_id= arr[0]
    const display_id= arr[1]
    const inp = document.getElementById("delete-order-id")
    const inpod = document.getElementById("delete-id")
    const display_text = document.getElementById("display-id")
    inp.value = product_id
    inpod.value = display_id
    display_text.textContent = `(id=${display_id})`
    const popup = document.getElementById("delete")
    popup.style.display = 'flex'

}

function deletePopup(){

    const popup = document.getElementById('delete')
    if(popup.style.display==='flex'){
        popup.style.display= 'none'
    }else{
        popup.style.display= 'flex'
    }
        
}