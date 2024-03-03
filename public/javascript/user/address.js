function categorySelect(element){
    const id = element.id
    const category = document.getElementById('category')
    const home = document.getElementById('home')
    const homespan = document.getElementById('home-span')
    const office = document.getElementById('office')
    const officespan = document.getElementById('office-span')
    const descategory = document.getElementById('category-des')
    const deshome = document.getElementById('home-des')
    const deshomespan = document.getElementById('home-span-des')
    const desoffice = document.getElementById('office-des')
    const desofficespan = document.getElementById('office-span-des')
    if(id == 'home'){
        category.value = 'home'
        home.className = 'py-[1px] bg-[#1a91ff] w-max rounded-2xl px-6'
        homespan.className = 'text-white'
        office.className = 'py-[1px] border-2 border-gray-400 w-max rounded-2xl px-6'
        officespan.className = 'text-gray-500'
    }else if(id == 'home-des'){
        descategory.value = 'home'
        deshome.className = 'py-[1px] bg-[#1a91ff] w-max rounded-2xl px-6'
        deshomespan.className = 'text-white'
        desoffice.className = 'py-[1px] border-2 border-gray-400 w-max rounded-2xl px-6'
        desofficespan.className = 'text-gray-500'
    }else if(id == 'office-des'){
        descategory.value = 'office'
        desoffice.className = 'py-[1px] bg-[#1a91ff] w-max rounded-2xl px-6'
        desofficespan.className = 'text-white'
        deshome.className = 'py-[1px] border-2 border-gray-400 w-max rounded-2xl px-6'
        deshomespan.className = 'text-gray-500'
    }else{
        category.value = 'office'
        office.className = 'py-[1px] bg-[#1a91ff] w-max rounded-2xl px-6'
        officespan.className = 'text-white'
        home.className = 'py-[1px] border-2 border-gray-400 w-max rounded-2xl px-6'
        homespan.className = 'text-gray-500'
    }
}

function categorySelectEdit(element){
    const id = element.id
    const category = document.getElementById('category-edit')
    const home = document.getElementById('home-edit')
    const homespan = document.getElementById('home-span-edit')
    const office = document.getElementById('office-edit')
    const officespan = document.getElementById('office-span-edit')
    const descategory = document.getElementById('category-edit-des')
    const deshome = document.getElementById('home-edit-des')
    const deshomespan = document.getElementById('home-span-edit-des')
    const desoffice = document.getElementById('office-edit-des')
    const desofficespan = document.getElementById('office-span-edit-des')
    if(id == 'home-edit'){
        category.value = 'home'
        home.className = 'py-[1px] bg-[#1a91ff] w-max rounded-2xl px-6'
        homespan.className = 'text-white'
        office.className = 'py-[1px] border-2 border-gray-400 w-max rounded-2xl px-6'
        officespan.className = 'text-gray-500'
    }else if(id == 'home-edit-des'){
        descategory.value = 'home'
        deshome.className = 'py-[1px] bg-[#1a91ff] w-max rounded-2xl px-6'
        deshomespan.className = 'text-white'
        desoffice.className = 'py-[1px] border-2 border-gray-400 w-max rounded-2xl px-6'
        desofficespan.className = 'text-gray-500'
    }else if(id == 'office-edit-des'){
        descategory.value = 'office'
        desoffice.className = 'py-[1px] bg-[#1a91ff] w-max rounded-2xl px-6'
        desofficespan.className = 'text-white'
        deshome.className = 'py-[1px] border-2 border-gray-400 w-max rounded-2xl px-6'
        deshomespan.className = 'text-gray-500'
    }else{
        category.value = 'office'
        office.className = 'py-[1px] bg-[#1a91ff] w-max rounded-2xl px-6'
        officespan.className = 'text-white'
        home.className = 'py-[1px] border-2 border-gray-400 w-max rounded-2xl px-6'
        homespan.className = 'text-gray-500'
    }
}


function addAddressValidate(type){
    
    if(type == 'des'){
        var name = document.getElementById('name-des')
        var phone = document.getElementById('phone-des')
        var building = document.getElementById('building-des')
        var area = document.getElementById('area-des')
        var city = document.getElementById('city-des')
        var pin = document.getElementById('pin-des')
        var state = document.getElementById('state-des')
        var landmark = document.getElementById('landmark-des')
    }else{
        var name = document.getElementById('name')
        var phone = document.getElementById('phone')
        var building = document.getElementById('building')
        var area = document.getElementById('area')
        var city = document.getElementById('city')
        var pin = document.getElementById('pin')
        var state = document.getElementById('state')
        var landmark = document.getElementById('landmark')
    }


    name.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2'
    phone.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2'
    building.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2'
    area.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2'
    city.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2'
    pin.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2'
    state.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2'
    landmark.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2'


    if(name.value.trim() == ''){
        name.focus()
        name.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2 border-red-500'
        return false
    }else if(phone.value.trim() == ''){
        phone.focus()
        phone.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2 border-red-500'
        return false
    }else if(building.value.trim() == ''){
        building.focus()
        building.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2 border-red-500'
        return false
    }else if(area.value.trim() == ''){
        area.focus()
        area.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2 border-red-500'
        return false
    }else if(pin.value.trim() == ''){
        pin.focus()
        pin.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2 border-red-500'
        return false
    }else if(city.value.trim() == ''){
        city.focus()
        city.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2 border-red-500'
        return false
    }else if(state.value.trim() == ''){
        state.focus()
        state.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2 border-red-500'
        return false
    }else if(landmark.value.trim() == ''){
        landmark.focus()
        landmark.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2 border-red-500'
        return false
    }else{
        return true
    }


}
function editAddressValidate(type){
    if(type == 'des'){
        var name = document.getElementById('name-edit-des')
        var phone = document.getElementById('phone-edit-des')
        var building = document.getElementById('building-edit-des')
        var area = document.getElementById('area-edit-des')
        var city = document.getElementById('city-edit-des')
        var pin = document.getElementById('pin-edit-des')
        var state = document.getElementById('state-edit-des')
        var landmark = document.getElementById('landmark-edit-des')
    }else{
        var name = document.getElementById('name-edit')
        var phone = document.getElementById('phone-edit')
        var building = document.getElementById('building-edit')
        var area = document.getElementById('area-edit')
        var city = document.getElementById('city-edit')
        var pin = document.getElementById('pin-edit')
        var state = document.getElementById('state-edit')
        var landmark = document.getElementById('landmark-edit')
    }

    name.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2'
    phone.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2'
    building.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2'
    area.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2'
    city.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2'
    pin.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2'
    state.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2'
    landmark.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2'


    if(name.value.trim() == ''){
        name.focus()
        name.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2 border-red-500'
        return false
    }else if(phone.value.trim() == ''){
        phone.focus()
        phone.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2 border-red-500'
        return false
    }else if(building.value.trim() == ''){
        building.focus()
        building.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2 border-red-500'
        return false
    }else if(area.value.trim() == ''){
        area.focus()
        area.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2 border-red-500'
        return false
    }else if(pin.value.trim() == ''){
        pin.focus()
        pin.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2 border-red-500'
        return false
    }else if(city.value.trim() == ''){
        city.focus()
        city.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2 border-red-500'
        return false
    }else if(state.value.trim() == ''){
        state.focus()
        state.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2 border-red-500'
        return false
    }else if(landmark.value.trim() == ''){
        landmark.focus()
        landmark.className = 'w-full h-8 px-1 text-sm  outline-none border-b-2 border-red-500'
        return false
    }else{
        return true
    }


}

