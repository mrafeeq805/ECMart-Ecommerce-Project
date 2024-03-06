const { json } = require("body-parser")






async function filterTransaction(element){
    
    const type= element.value
    const table = document.getElementById("table-container")
    const link = await fetch(`/admin/transaction/filter`,{
        method:'POST',
        headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
        body: 'type=' + type,
    })
    const data = await link.text();
    table.innerHTML=data

}

 async function sortTransaction(element){
    
    const type= element.id
    const table = document.getElementById("table-container")
    const link = await fetch(`/admin/transaction/sort`,{
        method:'POST',
        headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
        body: 'type=' + type,
    })
    const data = await link.text();
    table.innerHTML=data

}


function setType(){


}




async function searchTransaction(){
    
    const search = document.getElementById("transaction_search")
    const type = document.getElementById("transaction_search_type")
    const table = document.getElementById("table-container")
    const cont = {
        'searhValue':search.value,
        'type':type.value
    }
    const link = await fetch(`/admin/transaction/search`,
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

