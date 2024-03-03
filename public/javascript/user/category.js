async function searchCategory(){
    
    const search = document.getElementById("search-category")
    const table = document.getElementById("category-container")
    const link = await fetch(`/home/category/search`,
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
