

function closeSort(){
    document.getElementById('sortproduct').style.display = 'none'
}

function openSort(){
    document.getElementById('sortproduct').style.display = 'flex'
}

function openFilter(){
    document.getElementById('filterproduct').style.display = 'flex'
}
function closeFilter(){
    document.getElementById('filterproduct').style.display = 'none'
}





async function addWishlist(element){
    const id = element.id
    await fetch(`/home/checkwishlist`,{
        method:'POST',
        headers: {
                'Content-Type': 'application/json',
              },
        body: JSON.stringify( {
            id : id
        })
        }
    )

    .then(async (response) => {
        if (response.status == 200) {
            let res = await response.json()
            
            if(res.status == 'item added to wishlist'){
                Toastify({
                    text: "item added to wishlist",
                    duration: 2000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                      background: "black",
                    },
                    onClick: function(){} // Callback after click
                  }).showToast();
                element.className = 'material-icons rounded-full h-[40px] w-[40px] bg-white absolute top-1 right-1 flex items-center justify-center text-blue-500'
            }else{
                deleteWishlist(element)
            }
        }
        else {
            alert("failed")
        }
    })
    .catch((err) => console.log("failed", err))

}


async function deleteWishlist(element){
    const id = element.id

    await fetch(`/home/removewishlist`,{
        method:'POST',
        headers: {
                'Content-Type': 'application/json',
              },
        body: JSON.stringify( {
            id : id
        })
        }
    )

    .then(async (response) => {
        
        if (response.status == 200) {
            let res = await response.json()

            if(res.status == 'item removed from wishlist'){
                Toastify({
                    text: "item removed from wishlist",
                    duration: 2000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                      background: "black",
                    },
                    onClick: function(){} // Callback after click
                  }).showToast();
                element.className = 'material-symbols-outlined rounded-full h-[40px] w-[40px] bg-white absolute top-1 right-1 flex items-center justify-center text-blue-500'
            }else{
                element.className = 'material-icons rounded-full h-[40px] w-[40px] bg-white absolute top-1 right-1 flex items-center justify-center text-blue-500'
                
            }
        }
        else {
            alert("failed")
        }
    })
    .catch((err) => console.log("failed", err))
}



async function sortProduct(element){
    const type = element.id
    const table = document.getElementById("table-container")
    const category = document.getElementById("sort-category").value
    const link = await fetch(`/home/product/sort`,{
        method:'POST',
        headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
        body: `type=${category}:${type}`
        }
    )
    const data = await link.text();
    table.innerHTML=data
}

function showFilterCard(element){
    if(element.id == 'brand-div'){
        element.className = 'bg-white py-3 w-full flex items-start px-4 border-b-[1px] border-gray-300'
        document.getElementById('filter-brand-card').style.display = 'flex'
        document.getElementById('filter-price-card').style.display = 'none'
        document.getElementById('filter-discount-card').style.display = 'none'
        document.getElementById('price-div').className = 'py-3 w-full flex items-start px-4 border-b-[1px] border-gray-300'
        document.getElementById('discount-div').className = 'py-3 w-full flex items-start px-4 border-b-[1px] border-gray-300'
    }else if(element.id == 'price-div'){
        element.className = 'bg-white py-3 w-full flex items-start px-4 border-b-[1px] border-gray-300'
        document.getElementById('filter-brand-card').style.display = 'none'
        document.getElementById('filter-price-card').style.display = 'flex'
        document.getElementById('filter-discount-card').style.display = 'none'
        document.getElementById('brand-div').className = 'py-3 w-full flex items-start px-4 border-b-[1px] border-gray-300'
        document.getElementById('discount-div').className = 'py-3 w-full flex items-start px-4 border-b-[1px] border-gray-300'
    }else if(element.id == 'discount-div'){
        element.className = 'bg-white py-3 w-full flex items-start px-4 border-b-[1px] border-gray-300'
        document.getElementById('filter-brand-card').style.display = 'none'
        document.getElementById('filter-price-card').style.display = 'none'
        document.getElementById('filter-discount-card').style.display = 'flex'
        document.getElementById('price-div').className = 'py-3 w-full flex items-start px-4 border-b-[1px] border-gray-300'
        document.getElementById('brand-div').className = 'py-3 w-full flex items-start px-4 border-b-[1px] border-gray-300'
    }
}
var brandlist =[]
function brandSelected(element){
    const brandinp = document.getElementById('brand-inp')
    if(element.checked == true){
        brandlist.push(element.id)
    }else{
        brandlist.pop(element.id)
    }
    brandinp.value = JSON.stringify(brandlist)
}

var pricelist =[]
function priceSelected(element){
    const priceinp = document.getElementById('price-inp')
    if(element.checked == true){
        pricelist.push(element.id)
    }else{
        pricelist.splice(pricelist.indexOf(element.id),1)
    }
    priceinp.value = JSON.stringify(pricelist)
}

var discountlist =[]
function discountSelected(element){
    const discountinp = document.getElementById('discount-inp')
    if(element.checked == true){
        discountlist.push(element.id)
    }else{
        discountlist.splice(discountlist.indexOf(element.id),1)
    }
    discountinp.value = JSON.stringify(discountlist)
}


async function filterProduct(){
    const category = document.getElementById("sort-category").value
    const table = document.getElementById("table-container")
    const priceinp = document.getElementById("price-inp")
    const pricelist = priceinp.value
    const brandinp = document.getElementById("brand-inp")
    const brandlist = brandinp.value
    const discountinp = document.getElementById("discount-inp")
    const discountlist = discountinp.value
    const link = await fetch(`/home/product/filter`,{
        method:'POST',
        headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
        body: `data=${brandlist}:${pricelist}:${discountlist}:${category}`
        }
    )
    const data = await link.text();
    table.innerHTML=data
    document.getElementById('filterproduct').style.display = 'none'
}

function clearFilter(){
    const priceinp = document.getElementById("price-inp")
    priceinp.value = '[]'
    const brandinp = document.getElementById("brand-inp")
    brandinp.value = '[]'
    const discountinp = document.getElementById("discount-inp")
    discountinp.value = '[]'
    const checklist = document.getElementsByName('check')
    checklist.forEach(item=>{
        item.checked = false
    })

}
async function searchProduct(){
    
    const search = document.getElementById("search-product")
    const table = document.getElementById("table-container")
    const link = await fetch(`/home/product/search`,
        {
            method:'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: 'searchValue=' + search.value,
        }
    
    );
    const data = await link.text();
    table.innerHTML=data

}
async function searchProductNew(){
    const search = document.getElementById("search-product-new")
    const table = document.getElementById("table-container")
    const link = await fetch(`/home/product/search`,
        {
            method:'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: 'searchValue=' + search.value,
        }
    
    );
    const data = await link.text();
    table.innerHTML=data

}

async function moveToCart(element){
    const id = element.id
    await fetch(`/home/movetocart`,{
        method:'POST',
        headers: {
                'Content-Type': 'application/json',
              },
        body: JSON.stringify( {
            id : id
        })
        }
    )

    .then(async (response) => {
        if (response.status == 200) {
            let res = await response.json()
            if(res.status == 'item added to cart'){
                Toastify({
                    text: "item added to cart",
                    duration: 3000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                      background: "black",
                    },
                    onClick: function(){} // Callback after click
                  }).showToast();
                
            }else{
                Toastify({
                    text: "item already exsist in cart",
                    duration: 3000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                      background: "black",
                    },
                    onClick: function(){} // Callback after click
                  }).showToast();
                
            }
        }
        else {
            alert("failed")
        }
    })
    .catch((err) => console.log("failed", err))

}


//desktop filter

var desbrandlist =[]
function desbrandSelected(element){
    const brandinp = document.getElementById('desbrand-inp')
    if(element.checked == true){
        brandlist.push(element.id.split('des')[1])
    }else{
        brandlist.pop(element.id.split('des')[1])
    }
    brandinp.value = JSON.stringify(brandlist)
}

var despricelist =[]
function despriceSelected(element){
    const priceinp = document.getElementById('desprice-inp')
    if(element.checked == true){
        pricelist.push(element.id.split('des')[1])
    }else{
        pricelist.splice(pricelist.indexOf(element.id.split('des')[1]),1)
    }
    priceinp.value = JSON.stringify(pricelist)
}

var desdiscountlist =[]
function desdiscountSelected(element){
    const discountinp = document.getElementById('desdiscount-inp')
    if(element.checked == true){
        discountlist.push(element.id.split('des')[1])
    }else{
        discountlist.splice(discountlist.indexOf(element.id.split('des')[1]),1)
    }
    discountinp.value = JSON.stringify(discountlist)
}


async function desfilterProduct(){
    const category = document.getElementById("desfilter-category").value
    const table = document.getElementById("table-container-des")
    const priceinp = document.getElementById("desprice-inp")
    const pricelist = priceinp.value
    const brandinp = document.getElementById("desbrand-inp")
    const brandlist = brandinp.value
    const discountinp = document.getElementById("desdiscount-inp")
    const discountlist = discountinp.value
    const link = await fetch(`/home/product/filter`,{
        method:'POST',
        headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
        body: `data=${brandlist}:${pricelist}:${discountlist}:${category}`
        }
    )
    const data = await link.text();
    table.innerHTML=data
}

function desclearFilter(){
    const priceinp = document.getElementById("desprice-inp")
    priceinp.value = '[]'
    const brandinp = document.getElementById("desbrand-inp")
    brandinp.value = '[]'
    const discountinp = document.getElementById("desdiscount-inp")
    discountinp.value = '[]'
    const checklist = document.getElementsByName('check')
    checklist.forEach(item=>{
        item.checked = false
    })

}


async function dessortProduct(){
    const type = document.getElementById("dessort-select").value

    const table = document.getElementById("table-container-des")
    const category = document.getElementById("desfilter-category").value
    const link = await fetch(`/home/product/sort`,{
        method:'POST',
        headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
        body: `type=${category}:${type}`
        }
    )
    const data = await link.text();
    console.log(data);
    table.innerHTML=data
}

async function moveWishlist(element){
    const id = element.id
    await fetch(`/home/checkwishlist`,{
        method:'POST',
        headers: {
                'Content-Type': 'application/json',
              },
        body: JSON.stringify( {
            id : id
        })
        }
    )

    .then(async (response) => {
        if (response.status == 200) {
            let res = await response.json()
            
            if(res.status == 'item added to wishlist'){
                Toastify({
                    text: "item added to wishlist",
                    duration: 2000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                      background: "black",
                    },
                    onClick: function(){} // Callback after click
                  }).showToast();
                
            }else{
                Toastify({
                    text: "item already exist in wishlist !",
                    duration: 2000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                      background: "black",
                    },
                    onClick: function(){} // Callback after click
                  }).showToast();
            }
        }
        else {
            alert("failed")
        }
    })
    .catch((err) => console.log("failed", err))

}