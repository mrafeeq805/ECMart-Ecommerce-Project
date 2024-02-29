
function validateLogin(){

    const phoneerror = document.getElementById('phone-login-error')
    const phone = document.getElementById('phone-login')


    if(phone.value.trim() == ''){
        phoneerror.style.display = 'block'
        return false
    }else if(phone.value.length < 10){
        phoneerror.style.display = 'block'
        return false
    }else{
        phoneerror.style.display = 'none'
        return true
    }
    

}