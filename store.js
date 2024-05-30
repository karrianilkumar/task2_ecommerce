if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    if (document.getElementsByClassName('btn-purchase').length > 0) {
        document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
    }

    loadCart()
}

function purchaseClicked() {
    showAlert('Thank you for your purchase', 'success')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
    localStorage.removeItem('cart')
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
    saveCart()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
    saveCart()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    if (addItemToCart(title, price, imageSrc)) {
        showAlert('Product added to cart', 'success')
    } else {
        showAlert('This item is already added to the cart', 'warning')
    }
    updateCartTotal()
    saveCart()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title) {
            return false
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    return true
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

function saveCart() {
    var cartItems = []
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var titleElement = cartRow.getElementsByClassName('cart-item-title')[0]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var item = {
            title: titleElement.innerText,
            price: priceElement.innerText,
            quantity: quantityElement.value,
            imageSrc: cartRow.getElementsByClassName('cart-item-image')[0].src
        }
        cartItems.push(item)
    }
    localStorage.setItem('cart', JSON.stringify(cartItems))
}

function loadCart() {
    var cartItems = JSON.parse(localStorage.getItem('cart'))
    if (cartItems) {
        for (var i = 0; i < cartItems.length; i++) {
            var item = cartItems[i]
            addItemToCart(item.title, item.price, item.imageSrc)
            var cartRows = document.getElementsByClassName('cart-row')
            var cartRow = cartRows[cartRows.length - 1]
            cartRow.getElementsByClassName('cart-quantity-input')[0].value = item.quantity
        }
        updateCartTotal()
    }
}

function showAlert(message, type) {
    var existingAlert = document.getElementById('custom-alert')
    if (existingAlert) {
        existingAlert.remove()
    }

    var alertContainer = document.createElement('div')
    alertContainer.id = 'custom-alert'
    alertContainer.className = `alert alert-${type}`
    alertContainer.innerHTML = `<strong>${type === 'success' ? 'Success' : 'Warning'}!</strong> ${message}`
    document.body.appendChild(alertContainer)
    setTimeout(function() {
        alertContainer.remove()
    }, 3000)
}

