import data from './assets/data.js'

//smooth scrolling 
window.scrollBy({
    behavior: 'smooth'
})

const itemsContainer = document.querySelector('#items')
const cartContainer = document.querySelector('.cart-items')
const modalContainer = document.querySelector('#modal-content')

let cart = []

const addItem = (name, price, image) => {
    const index = cart.findIndex(item => item.name == name)
    if (index != -1) {
        cart[index].quantity += 1;
    } else {
        const item = { name, price, quantity: 1, image: image }
        if (cart.length <= 0) {
            document.getElementById('myCart').style.width = '540px'
        }
        cart.push(item)
    }

    updateCart()
}

const getTotal = () => {
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    })
    console.log(`${total} ---> ${cart}`)
    return total.toFixed(2)
}


const removeItem = (index) => {
    if (index != -1) {
        if (cart.length === 1) {
            document.getElementById('myCart').style.width = '0'
        }
        cart.splice(index, 1)
    }
    updateCart()
}

const reduceQuant = (index) => {
    if (index != -1) {
        const item = cart[index]
        if (item.quantity === 1) {
            if (cart.length === 1) {
                document.getElementById('myCart').style.width = '0'
            }
            cart.splice(index, 1)

        } else {
            cart[index].quantity -= 1
        }
        updateCart()
    }
}

const incQuant = (index) => {
    const item = cart[index]
    if (index != -1) {
        cart[index].quantity += 1
    }
    updateCart()
}

const openModal = item => {
    //disable body scrolling
    document.querySelector("body").style.overflow = 'hidden';

    const newDiv = document.createElement('div')
    newDiv.id = 'modal-item'

    //img
    const imgDiv = document.createElement('div')
    const img = document.createElement('img')
    imgDiv.className = 'modal-img-bg'

    //image
    img.src = item.image

    imgDiv.appendChild(img)

    //div for details
    const detailsDiv = document.createElement('div')
    detailsDiv.className = 'modal-details'

    //name 
    const name = document.createElement('h1')
    name.innerText = item.name.charAt(0).toUpperCase() + item.name.substr(1)

    //description
    const desc = document.createElement('p')
    desc.innerText = item.desc

    //flex 
    const priceATCDiv = document.createElement('div')
    priceATCDiv.id = 'price-atc'
    //price 
    const price = document.createElement('h2')
    price.innerText = `$${item.price}`

    //add to cart
    const addTC = document.createElement('button')
    addTC.innerHTML = 'Add To Cart'
    addTC.onclick = () => {
        //close modal 
        document.getElementById('itemsModal').style.display = 'none'

        //erase modal 
        document.getElementById('modal-item').remove()

        //enable scrolling
        document.querySelector("body").style.overflow = 'auto';

        //add to cart
        addItem(item.name, item.price, item.image)

        //open cart 
        document.getElementById('myCart').style.width = '540px'
    }

    //add price/ATC 
    priceATCDiv.appendChild(price)
    priceATCDiv.appendChild(addTC)

    //add details 
    detailsDiv.appendChild(name)
    detailsDiv.appendChild(desc)
    detailsDiv.appendChild(priceATCDiv)

    //add elements
    newDiv.appendChild(imgDiv)
    newDiv.append(detailsDiv)

    //add to dom
    modalContainer.appendChild(newDiv)

    //display modal
    document.getElementById('itemsModal').style.display = 'block'
}

data.forEach((item, index) => {
    const newDiv = document.createElement('div');
    newDiv.className = 'item'

    const img = document.createElement('img');

    //img div 
    const imgDiv = document.createElement('div')
    imgDiv.className = 'img-bg'

    //image
    img.src = item.image;
    img.width = 300;
    img.height = 300;
    img.onclick = () => openModal(item)

    imgDiv.appendChild(img)


    //star icons
    const starDiv = document.createElement('div')
    starDiv.className = 'stars'

    for (var i = 0; i < 5; i++) {
        const star = document.createElement('i')
        star.className = 'far fa-star fa-lg'
        starDiv.appendChild(star)
    }

    //name
    const name = document.createElement('p')
    let newName = item.name.charAt(0).toUpperCase() + item.name.substr(1)
    name.innerText = newName
    name.id = 'name'

    //description 
    const desc = document.createElement('p')
    desc.innerText = item.desc
    desc.id = 'desc'

    //price 
    const price = document.createElement('p')
    price.innerText = `$${item.price}`
    price.id = 'price'

    //add to cart 
    const button = document.createElement('button')
    button.id = item.name
    button.dataset.price = data.price
    button.innerHTML = "Add To Cart"
    button.onclick = () => addItem(item.name, item.price, item.image)

    //add elements to parent div
    newDiv.appendChild(imgDiv)
    newDiv.appendChild(starDiv)
    newDiv.appendChild(name)
    newDiv.appendChild(desc)
    newDiv.appendChild(price)
    newDiv.appendChild(button)

    itemsContainer.appendChild(newDiv)
});

//display cart
const displayCart = () => {
    // const container = document.createElement('div')
    cart.forEach((item, index) => {
        const newDiv = document.createElement('div')
        newDiv.className = 'cart-item'

        //img
        const img = document.createElement('img')
        img.src = item.image
        console.log(item)
        img.width = 100
        img.height = 100

        //name/price/quantitiy
        const itemText = document.createElement('p')
        const price = `$${item.price}`
        const newname = item.name.charAt(0).toUpperCase() + item.name.substr(1)
        itemText.innerText = `${index + 1}. ${newname} - ${price} (${item.quantity})`
        itemText.className = 'item-info'
        itemText.id = `item-${index}`
        //increase quantity
        const addQuant = document.createElement('button')
        addQuant.innerHTML = '+'
        addQuant.className = 'change-btn'
        addQuant.onclick = () => incQuant(index)

        //decrease quantity
        const subQuant = document.createElement('button')
        subQuant.innerHTML = '-'
        subQuant.className = 'change-btn'
        subQuant.onclick = () => reduceQuant(index)

        //remove from cart
        const removeTC = document.createElement('button')
        removeTC.innerHTML = 'Remove'
        removeTC.className = 'change-btn'
        removeTC.onclick = () => removeItem(index)

        //append elements
        newDiv.appendChild(img)
        newDiv.appendChild(itemText)
        newDiv.appendChild(addQuant)
        newDiv.appendChild(subQuant)
        newDiv.appendChild(removeTC)

        cartContainer.appendChild(newDiv)
    })
}

//update cart info
const updateCart = () => {
    let cartDisplay = document.getElementById('cart-display')
    let total = document.getElementById('total')
    if (cart.length > 0) {
        cartDisplay.innerText = `Cart (${cart.length})`
    } else {
        cartDisplay.innerText = `Cart`
    }
    total.innerText = `Total: $${getTotal()}`
    document.querySelectorAll('.cart-item').forEach(product => product.remove())
    displayCart()
}

updateCart()