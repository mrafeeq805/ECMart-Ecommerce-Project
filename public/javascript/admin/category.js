

function categoryPopup(){

    const popup = document.getElementById('addcategory')
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

document.getElementById('add-category-upload').addEventListener("change",function(){
    const files = document.getElementById('add-category-upload').files[0];
    if (files) {
        const imgPreview = document.getElementById('add-category-preview') 
        const imgPreviewdiv = document.getElementById('add-category-preview-div')
        const imguploaddiv = document.getElementById('add-category-upload-div')
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener("load", function () {
            imgPreviewdiv.style.display = "flex";
            imguploaddiv.style.display = "none";
            imgPreview.src = this.result;
        });    
    }
})
document.getElementById('edit-category-upload').addEventListener("change",function(){
    const files = document.getElementById('edit-category-upload').files[0];
    if (files) {
        const imgPreview = document.getElementById('edit-category-preview') 
        const imgPreviewdiv = document.getElementById('edit-category-preview-div')
        const imguploaddiv = document.getElementById('edit-category-upload-div')
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener("load", function () {
            imgPreviewdiv.style.display = "flex";
            imguploaddiv.style.display = "none";
            imgPreview.src = this.result;
        });    
    }
})

function validateAddCategory(){

    const categoryName = document.getElementById('add-category-name')
    const categoryNameError = document.getElementById('add-category-name-error')
    const categoryIcon = document.getElementById('add-category-upload').files[0];
    const categoryImageError = document.getElementById('add-category-image-error')

    if(categoryName.value == ''){
        categoryNameError.style.display = 'block'
        categoryImageError.style.display = 'none'
        return false
    }else if(!categoryIcon){
        categoryImageError.style.display = 'block'
        categoryNameError.style.display = 'none'
        return false
    }else{
        categoryImageError.style.display = 'none'
        categoryNameError.style.display = 'none'
        return true
    }
    

}
function validateEditCategory(){

    const categoryName = document.getElementById('edit_category_name')
    const categoryNameError = document.getElementById('edit-category-name-error')


    if(categoryName.value == ''){
        categoryNameError.style.display = 'block'
        return false
    }else{
        categoryNameError.style.display = 'none'
        return true
    }
    

}

async function showEdit(element){

    const category_id= element.id
    const link = await fetch(`/admin/category/show/${category_id}`)
    const data = await link.json()
    const popup = document.getElementById("editcategory")
    
    popup.style.display = 'flex'
    const imgPreviewdiv = document.getElementById('edit-category-preview-div')
    const imguploaddiv = document.getElementById('edit-category-upload-div')
    const imgPreview = document.getElementById('edit-category-preview') 
    const name = document.getElementById('edit_category_name')
    const main = document.getElementById('edit-category-main')
    const status = document.getElementById('edit-category-status')
    const id = document.getElementById('edit_category_id')
    name.value = data.name
    id.value = data._id
    status.value = data.status
    imgPreviewdiv.style.display = "flex";
    imguploaddiv.style.display = "none";
    imgPreview.src = data.icon;
    main.value = data.mainCategory

}

async function filterCategory(element){
    
    const type= element.value
    const table = document.getElementById("table-container")
    const link = await fetch(`/admin/category/filter`,{
        method:'POST',
        headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
        body: 'type=' + type,
    })
    const data = await link.text();
    table.innerHTML=data

}

 async function sortCategory(element){
    
    const type= element.id
    const table = document.getElementById("table-container")
    const link = await fetch(`/admin/category/sort`,{
        method:'POST',
        headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
        body: 'type=' + type,
    })
    const data = await link.text();
    table.innerHTML=data

}




async function searchCategory(){
    
    const search = document.getElementById("category_search")
    const table = document.getElementById("table-container")
    const link = await fetch(`/admin/category/search`,
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


function showDelete(element){
    const arr = element.id.split('-')
    const category_id= arr[0]
    const display_id= arr[1]
    const inp = document.getElementById("delete-category-id")
    const display_text = document.getElementById("display-id")
    inp.value = category_id
    display_text.textContent = `(id=${display_id})`
    const popup = document.getElementById("delete")
    popup.style.display = 'flex'

}