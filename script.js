document.addEventListener('DOMContentLoaded', function(){
    const productList = document.getElementById('product-list')
    const cartItems = document.getElementById('cart-items')
    const cartTotal  = document.getElementById('cart-total')
    const totalPrice = document.getElementById('total-price')
    const checkoutBtn = document.getElementById('checkout-btn')
    const emptyCart = document.getElementById('empty-cart')
    const cartList = document.getElementById('cart-list')
    const products = [
        {id:1, name:'Product 1',price:25.75},
        {id:2, name:'Product 2',price:29.99},
        {id:3, name:'Product 3',price:49.99},       
    ] 

    let totalPriceAmt = 0
    let prodsInCart = []

    // Putting the elements into the DOM from the products, array of objects. 
    products.forEach((product)=>{
        const productDiv = document.createElement('div')
        productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id='${product.id}'>Add to Cart</button>
        `
        productDiv.classList.add('product')
        productList.appendChild(productDiv)
    })
  
    productList.addEventListener('click', function(e){
        // Using the event bubbling to ensure that the click works only if the button('Add to Cart') is clicked
        let x = {}
        if(e.target.tagName === "BUTTON")
            {
                const dis = parseInt(e.target.getAttribute("data-id"))
                products.filter((product)=>product.id === dis)
                .map((prod)=>{
                     x = {id: prod.id, name:prod.name, price:prod.price}                 
                })  
                
                if(prodsInCart.length === 0)
                {
                    prodsInCart.push(x)
                    totalPriceAmt += x.price
                    totalPriceAmt = Number(totalPriceAmt.toFixed(2))
                   
                    putToDom(prodsInCart)
                }
                else{
                    let alreadyInCart = false
                    for(const pr of prodsInCart)
                    {
                        if(pr['id'] === x['id'])
                        {
                            alreadyInCart = true
                        }
                    }

                    if(alreadyInCart)
                    {
                        alert('Item already in Cart!')
                    }
                    else{
                        prodsInCart.push(x)
                        totalPriceAmt += x.price
                        totalPriceAmt = Number(totalPriceAmt.toFixed(2))
                        
                        putToDom(prodsInCart)
                    }
                }
            }     
    })

    function putToDom(prodsInCart)
    {
        if(prodsInCart.length === 0)
        {
            cartTotal.classList.add('hidden')
            emptyCart.classList.remove('hidden')
            cartList.classList.add('hidden')

        }
        else{
            cartList.innerHTML = '' // We'll be rendering each and every item once again, each time a new item gets added in the cart, this helps us in the checkout process. 
            prodsInCart.forEach((prod)=>{
                const li = document.createElement('li')
                li.innerHTML = `
                  <span>${prod.name}</span>
                `
                cartList.appendChild(li)
                totalPrice.textContent = `$${totalPriceAmt}`
            })
            cartTotal.classList.remove('hidden')
            cartList.classList.remove('hidden')
            emptyCart.classList.add('hidden')
        }
    }


    checkoutBtn.addEventListener('click', function(){
        totalPriceAmt = 0
        prodsInCart = []
        putToDom(prodsInCart)     
       alert('Checked out successfully !')
    })

})