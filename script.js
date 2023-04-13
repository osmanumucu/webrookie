const productData = JSON.parse(localStorage.getItem('productData'));
const productRow = document.getElementById('product-row');

console.log(productData);

if (productData) {
    productData.forEach((item) => {
        const div = document.createElement('div');
        div.classList.add('col-md-12', 'col-lg-4', 'col-xl-2', 'col-sm-12', 'mb-3', 'd-flex', 'justify-content-center');
        div.innerHTML = `
        <div class="card text-center position-relative" style="width: 18rem;">
            <div class="carousel-item active d-flex flex-column">
            <div class="image-container d-flex align-items-center" style="height: 200px; overflow: hidden;">
                <img src="${item.foto}" class="d-block w-100" alt="Image 1" style="object-fit: cover;">
            </div>
            </div>
            <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">Price: ${item.price}€</p>
            <div class="d-flex flex-row justify-content-center">
            </div>
            </div>
            <button class="btn position-absolute top-0 end-0 m-2" onclick="addToCart(${item.id})">
            <i class="bi bi-cart-plus"></i>
            </button>
        </div>`;
        productRow.appendChild(div);
    });
} else {
    // If there is no product data in local storage, fetch it from the JSON file
    fetch('data.json')
        .then((response) => response.json())
        .then((data) => {
        localStorage.setItem('productData', JSON.stringify(data));
        location.reload();
        });
}

let cart = [];
const cartContainer = document.getElementById("cart-container");

function addToCart(id) {
    const clothing = JSON.parse(localStorage.getItem("clothing"));
    const item = clothing.find((product) => product.id.toString() === id.toString());

    const existingItemIndex = cart.findIndex((cartItem) => cartItem.id.toString() === id.toString());
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCartDisplay();
}

function removeFromCart(id) {
    const itemIndex = cart.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
    }
    updateCartDisplay();
}

const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

function updateCartDisplay() {
    let total = 0;
    cartItems.innerHTML = "";

    cart.forEach((item) => {
        const li = document.createElement("li");
        li.classList.add("mb-3");

        li.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h6>${item.name}</h6>
                     <p>Quantity: ${item.quantity}</p>    
                        <div class="d-flex flex-row">
                            <button onclick="increaseQuantity(${item.id})" class="btn btn-success mx-1" style="width: 45px;">+</button>
                            <button onclick="decreaseQuantity(${item.id})" class="btn btn-danger mx-1" style="width: 45px;">-</button>
                        </div>
                </div>
                <div>
                    <p>€${(item.price * item.quantity).toFixed(2)}</p>
                    <button onclick="removeFromCart(${item.id})" class="btn btn-danger"><i class="bi bi-trash-fill"></i></button>
                    </div>
                </div>
            `;
    
            cartItems.appendChild(li);
            total += item.price * item.quantity;
        });
        totalPrice.textContent = `€${total.toFixed(2)}`;
    }
    
    function increaseQuantity(id) {
        const itemIndex = cart.findIndex((item) => item.id === id);
        if (itemIndex !== -1) {
            cart[itemIndex].quantity += 1;
        }
        updateCartDisplay();
    }
    
    function decreaseQuantity(id) {
        const itemIndex = cart.findIndex((item) => item.id === id);
        if (itemIndex !== -1 && cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        }
        updateCartDisplay();
    }
    
    function checkout() {
        if (cart.length === 0) {
          alert('The cart is empty.');
        } else {
          let orders = JSON.parse(localStorage.getItem('orders')) || [];
          orders.push({ date: new Date(), cart: cart });
          localStorage.setItem('orders', JSON.stringify(orders));
      
          alert('Thanks for your order!');
          cart = [];
          updateCartDisplay();
        }
      }
    
