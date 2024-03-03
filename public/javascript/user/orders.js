async function filterMyOrders(mode){
    let ne = ''
    const table = document.getElementById('table-container')
    const tabledes = document.getElementById('table-container-des')
    const type = document.getElementById('filter-myorder')
    const destype = document.getElementById('filter-myorder-des')
    if(mode == 'des'){
        ne = destype.value
    }else{
        ne = type.value
    }
    const link = await fetch(`/home/myorders/filter`,{
        method:'POST',
        headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
        body: `type=${ne}`
        }
    )
    const data = await link.text();
    table.innerHTML=data
    tabledes.innerHTML = data
    document.getElementById('filterproduct').style.display = 'none'
}
