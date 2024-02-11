


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

var specs =''
var speclistdata = []
var speclistdataTitles = []

function addToSpecs(){

    const spectitle = document.getElementById('spec-title')
    const specvalue = document.getElementById('spec-value')
    const speclist = document.getElementById('add-product-speclist')
    const specerror = document.getElementById('add-product-speclisterror')
    if(!speclistdataTitles.includes(spectitle.value)){
        if(!spectitle.value.trim() == '' && !specvalue.value.trim() == ''){
            specerror.style.display = 'none'
            specs =''
            specs = `${spectitle.value} : ${specvalue.value}`
            speclistdata.push(specs)
            speclistdataTitles.push(spectitle.value)
            speclist.value = JSON.stringify(speclistdata)
            const maindiv = document.getElementById('spec-list')
            const div = document.createElement('div')
            div.id = `${spectitle.value}+div`
            div.className = 'flex bg-blue-500 rounded-full p-1 w-max gap-2 h-max'
            const textdiv = document.createElement('div')
            const span = document.createElement('span')
            span.className = 'text-white'
            span.textContent = `${spectitle.value} : ${specvalue.value}`
            textdiv.appendChild(span)
            div.appendChild(textdiv)
            const button = document.createElement('button')
            button.type = 'button'
            let index = speclistdata.length-1
            button.onclick = function (){
                if(speclistdata.length > 0){
                    document.getElementById(div.id).remove()
                    speclistdata.splice(speclistdata.indexOf(span.textContent),1)
                    speclistdataTitles.splice(speclistdata.indexOf(span.textContent),1)
                    speclist.value = JSON.stringify(speclistdata)
                }
            }
            button.id = `${spectitle.value}+button`
            button.className = 'material-symbols-outlined text-white'
            button.textContent = 'cancel'
            div.appendChild(button)
            maindiv.appendChild(div)
            spectitle.value = ''
            specvalue.value = ''
        }
    }else{
        alert('match found')
    }
    
}

var speclistdataTitleEdit =[]

function editToSpecs(){
    
    const spectitle = document.getElementById('edit-spec-title')
    const specvalue = document.getElementById('edit-spec-value')
    const speclist = document.getElementById('edit-product-speclist')
    const specerror = document.getElementById('edit-product-speclisterror')

    if(!speclistdataTitleEdit.includes(spectitle.value)){
    
        if(!spectitle.value.trim() == '' && !specvalue.value.trim() == ''){
            specerror.style.display = 'none'
            specs =''
            specs = `${spectitle.value} : ${specvalue.value}`
            editspeclist.push(specs)
            speclistdataTitleEdit.push(spectitle.value)
            speclist.value = JSON.stringify(editspeclist)
            const maindiv = document.getElementById('edit-spec-list')
            const div = document.createElement('div')
            div.id = `${spectitle.value}+div`
            div.className = 'flex bg-blue-500 rounded-full p-1 w-max gap-2 h-max'
            const textdiv = document.createElement('div')
            const span = document.createElement('span')
            span.className = 'text-white'
            span.textContent = `${spectitle.value} : ${specvalue.value}`
            textdiv.appendChild(span)
            div.appendChild(textdiv)
            const button = document.createElement('button')
            button.type = 'button'
            let index = speclistdata.length-1
            button.onclick = function (){
                if(editspeclist.length > 0){
                    document.getElementById(div.id).remove()
                    editspeclist.splice(editspeclist.indexOf(span.textContent),1)
                    speclistdataTitleEdit.splice(editspeclist.indexOf(span.textContent),1)
                    speclist.value = JSON.stringify(editspeclist)
                }
            }
            button.id = `${spectitle.value}+button`
            button.className = 'material-symbols-outlined text-white'
            button.textContent = 'cancel'
            div.appendChild(button)
            maindiv.appendChild(div)
            spectitle.value = ''
            specvalue.value = ''
        }
    }else{
        alert('match found')
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

document.getElementById('add-product-upload').addEventListener("change",function(){
    const files = document.getElementById('add-product-upload').files[0];
    if (files) {
        const imgPreview = document.getElementById('add-product-preview') 
        const imgPreviewdiv = document.getElementById('add-product-preview-div')
        const imguploaddiv = document.getElementById('add-product-upload-div')
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener("load", function () {
            imgPreviewdiv.style.display = "flex";
            imguploaddiv.style.display = "none";
            imgPreview.src = this.result;
        });    
    }
})
document.getElementById('edit-product-upload').addEventListener("change",function(){
    const files = document.getElementById('edit-product-upload').files[0];
    if (files) {
        const imgPreview = document.getElementById('edit-product-preview') 
        const imgPreviewdiv = document.getElementById('edit-product-preview-div')
        const imguploaddiv = document.getElementById('edit-product-upload-div')
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener("load", function () {
            imgPreviewdiv.style.display = "flex";
            imguploaddiv.style.display = "none";
            imgPreview.src = this.result;
        });    
    }
})

function validateAddProduct(){

    const productName = document.getElementById('add-product-name')
    const productNameError = document.getElementById('add-product-nameerror')
    const productDescription = document.getElementById('add-product-description')
    const productDescriptionError = document.getElementById('add-product-descriptionerror')
    const productSpecification = document.getElementById('add-product-speclist')
    const productSpecificationError = document.getElementById('add-product-speclisterror')
    const productSeller = document.getElementById('add-product-seller')
    const productSellerError = document.getElementById('add-product-sellererror')
    const productPrice = document.getElementById('add-product-price')
    const productPriceError = document.getElementById('add-product-priceerror')
    const productPercentage = document.getElementById('add-product-discount')
    const productPercentageError = document.getElementById('add-product-discounterror')
    const productQuantity = document.getElementById('add-product-quantity')
    const productQuantityError = document.getElementById('add-product-quantityerror')
    const productIcon = document.getElementById('add-product-upload').files[0];
    const productImageError = document.getElementById('add-product-imageerror')
    productNameError.style.display = 'none'
    productDescriptionError.style.display = 'none'
    productSellerError.style.display = 'none'
    productSpecificationError.style.display = 'none'
    productPriceError.style.display = 'none'
    productPercentageError.style.display = 'none'
    productQuantityError.style.display = 'none'
    productImageError.style.display = 'none'

    alert(specs)
    if(productName.value.trim() == ''){
        productNameError.style.display = 'block'
        productName.focus()
        return false
    }else if(productDescription.value.trim() ==''){
        productDescription.focus()
        productDescriptionError.style.display = 'block'
        return false
    }else if(!productIcon){
        productImageError.style.display = 'block'
        return false
    }else if(productSpecification.value.trim() =='[]'){
        productSpecification.focus()
        productSpecificationError.style.display = 'block'
        productSpecificationError.textContent  = 'specification cannot empty !'
        return false
    }else if(productSeller.value.trim() ==''){
        productSeller.focus()
        productSellerError.style.display = 'block'
        return false
    }else if(productPrice.value.trim() ==''){
        productPrice.focus()
        productPriceError.style.display = 'block'
        return false
    }else if(productPercentage.value.trim() ==''){
        productPercentage.focus()
        productPercentageError.style.display = 'block'
        return false
    }else if(productQuantity.value.trim() ==''){
        productQuantity.focus()
        productQuantityError.style.display = 'block'
        return false
    }else{
        return true
    }
    

}

function validateEditProduct(){

    const productName = document.getElementById('edit-product-name')
    const productNameError = document.getElementById('edit-product-nameerror')
    const productDescription = document.getElementById('edit-product-description')
    const productDescriptionError = document.getElementById('edit-product-descriptionerror')
    const productSpecification = document.getElementById('edit-product-speclist')
    const productSpecificationError = document.getElementById('edit-product-speclisterror')
    const productSeller = document.getElementById('edit-product-seller')
    const productSellerError = document.getElementById('edit-product-sellererror')
    const productPrice = document.getElementById('edit-product-price')
    const productPriceError = document.getElementById('edit-product-priceerror')
    const productPercentage = document.getElementById('edit-product-discount')
    const productPercentageError = document.getElementById('edit-product-discounterror')
    const productQuantity = document.getElementById('edit-product-quantity')
    const productQuantityError = document.getElementById('edit-product-quantityerror')
    const productIcon = document.getElementById('edit-product-upload').files[0];
    const productImageError = document.getElementById('edit-product-imageerror')
    productNameError.style.display = 'none'
    productDescriptionError.style.display = 'none'
    productSellerError.style.display = 'none'
    productSpecificationError.style.display = 'none'
    productPriceError.style.display = 'none'
    productPercentageError.style.display = 'none'
    productQuantityError.style.display = 'none'
    productImageError.style.display = 'none'

    if(productName.value.trim() == ''){
        productNameError.style.display = 'block'
        productName.focus()
        return false
    }else if(productDescription.value.trim() ==''){
        productDescription.focus()
        productDescriptionError.style.display = 'block'
        return false
    }else if(productSpecification.value.trim() =='[]'){
        productSpecification.focus()
        productSpecificationError.style.display = 'block'
        productSpecificationError.textContent  = 'specification cannot empty !'
        return false
    }else if(productSeller.value.trim() ==''){
        productSeller.focus()
        productSellerError.style.display = 'block'
        return false
    }else if(productPrice.value.trim() ==''){
        productPrice.focus()
        productPriceError.style.display = 'block'
        return false
    }else if(productPercentage.value.trim() ==''){
        productPercentage.focus()
        productPercentageError.style.display = 'block'
        return false
    }else if(productQuantity.value.trim() ==''){
        productQuantity.focus()
        productQuantityError.style.display = 'block'
        return false
    }else{
        return true
    }
    

}





async function showEdit(element){
    

    const product_id= element.id
    const link = await fetch(`/admin/product/show/${product_id}`)
    const data = await link.json()
    const popup = document.getElementById("editproduct")
    popup.style.display = 'flex'
    const imgPreviewdiv = document.getElementById('edit-product-preview-div')
    const imguploaddiv = document.getElementById('edit-product-upload-div')
    const imgPreview = document.getElementById('edit-product-preview')
    const productName = document.getElementById('edit-product-name')
    const productDescription = document.getElementById('edit-product-description')
    const productSpecification = document.getElementById('edit-product-speclist')
    const productSeller = document.getElementById('edit-product-seller')
    const productPrice = document.getElementById('edit-product-price')
    const productPercentage = document.getElementById('edit-product-discount')
    const productQuantity = document.getElementById('edit-product-quantity')
    const productStatus = document.getElementById('edit-product-status')
    const productCategory = document.getElementById('edit-product-category')
    const productID = document.getElementById('edit-product-id')
    productName.value = data.title
    productDescription.value = data.description
    productSeller.value = data.seller
    productCategory.value = data.category
    productPrice.value = data.sell_price
    productPercentage.value = data.discount
    productQuantity.value = data.quantity
    productStatus.value = data.status
    imgPreviewdiv.style.display = "flex";
    imguploaddiv.style.display = "none";
    imgPreview.src = data.image;
    productID.value = data._id
    productSpecification.value = JSON.stringify(data.specifications)
    createSpecsCard(data.specifications)

}

var editspeclist=[]
function createSpecsCard(list){
    editspeclist=list
    editspeclist.forEach((item)=>{
        speclistdataTitleEdit.push(item.split(' : ')[0])
    })

    
    const maindiv = document.getElementById('edit-spec-list')
    const productSpecification = document.getElementById('edit-product-speclist')
    editspeclist.forEach((x) => {
        const div = document.createElement('div')
        div.id = `${x}+editdiv`
        div.className = 'flex bg-blue-500 rounded-full p-1 w-max gap-2 h-max'
        const textdiv = document.createElement('div')
        const span = document.createElement('span')
        span.className = 'text-white'
        span.textContent = x

        textdiv.appendChild(span)
        div.appendChild(textdiv)
        const button = document.createElement('button')
        button.type = 'button'
        button.onclick = function (){
            if(editspeclist.length > 0){
                document.getElementById(div.id).remove()
                editspeclist.splice(editspeclist.indexOf(x),1)
                productSpecification.value = JSON.stringify(list)
            }

        }
        button.id = `${x}+editbutton`
        button.className = 'material-symbols-outlined text-white'
        button.textContent = 'cancel'
        div.appendChild(button)
        maindiv.appendChild(div)
    });

}

async function filterProduct(element){
    
    const type= element.value
    const table = document.getElementById("table-container")
    const link = await fetch(`/admin/product/filter`,{
        method:'POST',
        headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
        body: 'type=' + type,
    })
    const data = await link.text();
    table.innerHTML=data

}

 async function sortProduct(element){
    
    const type= element.id
    const table = document.getElementById("table-container")
    const link = await fetch(`/admin/product/sort`,{
        method:'POST',
        headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
        body: 'type=' + type,
    })
    const data = await link.text();
    table.innerHTML=data

}




async function searchProduct(){
    
    const search = document.getElementById("product_search")
    const type = document.getElementById("product_search_type")
    const table = document.getElementById("table-container")
    const cont = {
        'searhValue':search.value,
        'type':type.value
    }
    const link = await fetch(`/admin/product/search`,
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
    const inp = document.getElementById("delete-product-id")
    const display_text = document.getElementById("display-id")
    inp.value = product_id
    display_text.textContent = `(id=${display_id})`
    const popup = document.getElementById("delete")
    popup.style.display = 'flex'

}