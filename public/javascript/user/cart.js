async function updateQuantity(element){
    const type = document.getElementById('type-page').textContent
    const index = element.id.split('-')[1]
    const id = element.id.split('-')[2]
    const span = document.getElementById(`quantity-${index}`)
    const discount = document.getElementById(`discount-${id}`)
    const price = document.getElementById(`price-${id}`)
    const saving = document.getElementById(`saving-${id}`)
    const totalamount = document.getElementById('paymentdetails-totalamount')
    const total = document.getElementById('paymentdetails-total')
    const disc = document.getElementById('paymentdetails-discount')
    const savingtotal = document.getElementById('paymentdetails-saving')
    const baskettotal = document.getElementById('basket-total')



    if(element.id.includes('plus') ){
        span.textContent = Number(span.textContent)+1
    }else{
        if(Number(span.textContent) > 1){
            span.textContent = Number(span.textContent)-1
        }
        
    }

    await fetch('/home/updatequantity', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            quantity: Number(span.textContent),
            id : id
        })
    })
        .then(async (response) => {
            if (response.status == 200) {
                let res = await response.json()
                saving.textContent = `You save ₹${res.card_saving}`
                price.textContent = `₹${res.card_price}`
                discount.textContent = `₹${res.card_discount}`
                disc.textContent = `-₹${res.total_discount}.00`
                total.textContent = `₹${res.total}.00`
                totalamount.textContent = `₹${res.total_amount}.00`
                savingtotal.textContent = `You save ₹${res.total_discount}.00`
                baskettotal.textContent = `₹${res.total}.00`
                if(type == "cart"){
                    const cartsaving = document.getElementById('cart-saving')
                    const carttotal = document.getElementById('cart-total')
                    carttotal.textContent = `₹${res.total}.00`
                    cartsaving.textContent = `You save ₹${res.total_discount}.00`
                }else{
                    const ordersaving = document.getElementById('ordersummarysaving')
                    const ordertotal = document.getElementById('ordersummarytotal')
                    ordersaving.textContent = `You save ₹${res.total_discount}.00`
                    ordertotal.textContent = `₹${res.total}.00`
                }
            }
            else {
                alert("failed")
            }
        })
        .catch((err) => console.log("failed", err))

    
}

function setCashOnDelivery(){
    const paymentmethod = document.getElementById('payment_method')
    const form = document.getElementById('verify')
    paymentmethod.value = 'cash on delivery'
    form.submit()

}