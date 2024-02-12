const { json } = require("body-parser")


function productPopup(){

    const popup = document.getElementById('addproduct')
    if(popup.style.display==='flex'){
        popup.style.display= 'none'
    }else{
        popup.style.display= 'flex'
    }
        
}

function productPopupEdit(){

    const popup = document.getElementById('editproduct')
    if(popup.style.display==='flex'){
        popup.style.display= 'none'
    }else{
        popup.style.display= 'flex'
    }
        
}


function deletePopup(){

    const popup = document.getElementById('delete')
    if(popup.style.display==='flex'){
        popup.style.display= 'none'
    }else{
        popup.style.display= 'flex'
    }
        
}
function categoryEditPopup(){

    const popup = document.getElementById('editcategory')
    if(popup.style.display==='flex'){
        popup.style.display= 'none'
    }else{
        popup.style.display= 'flex'
    }
        
}




async function showEdit(element){
    

    const id= element.id
    const link = await fetch(`/admin/customer/show/${id}`)
    const data = await link.json()
    const popup = document.getElementById("editcustomer")
    popup.style.display = 'flex'
    const name = document.getElementById('edit-customer-name')
    const email = document.getElementById('edit-customer-email')
    const phone = document.getElementById('edit-customer-phone')
    const customerID = document.getElementById('edit-customer-id')
    const status = document.getElementById('edit-customer-status')
    name.value = data.name
    email.value = data.email
    phone.value = data.phone
    status.value = data.status
    customerID.value = data._id


}


async function filterCustomer(element){
    
    const type= element.value
    const table = document.getElementById("table-container")
    const link = await fetch(`/admin/customer/filter`,{
        method:'POST',
        headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
        body: 'type=' + type,
    })
    const data = await link.text();
    table.innerHTML=data

}

 async function sortCustomer(element){
    
    const type= element.id
    const table = document.getElementById("table-container")
    const link = await fetch(`/admin/customer/sort`,{
        method:'POST',
        headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
        body: 'type=' + type,
    })
    const data = await link.text();
    table.innerHTML=data

}




async function searchCustomer(){
    
    const search = document.getElementById("customer_search")
    const type = document.getElementById("customer_search_type")
    const table = document.getElementById("table-container")
    const cont = {
        'searhValue':search.value,
        'type':type.value
    }
    const link = await fetch(`/admin/customer/search`,
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


function showDelete(element){
    const arr = element.id.split('-')
    const product_id= arr[0]
    const display_id= arr[1]
    const inp = document.getElementById("delete-customer-id")
    const display_text = document.getElementById("display-id")
    inp.value = product_id
    display_text.textContent = `(id=${display_id})`
    const popup = document.getElementById("delete")
    popup.style.display = 'flex'

}