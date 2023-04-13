let producten = JSON.parse(localStorage.getItem('productData')) || [];

if (producten.length === 0) {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
        producten = data;
        localStorage.setItem('productData', JSON.stringify(producten));
        displayData();
        });
} else {
    displayData();
}

function displayData() {
    const productList = document.getElementById('admin-content');
    productList.innerHTML = '';
    producten.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('border', 'p-2', 'rounded', 'my-2');
        productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>Price: ${product.price}</p>
        <p>${product.foto}</p>
        `;

        const editButton = document.createElement('button');
        editButton.classList.add('mx-1');
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', () => editProduct(index));
        productDiv.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => deleteProduct(index));
        productDiv.appendChild(deleteButton);

        productList.appendChild(productDiv);
    });
}

function editProduct(index) {
    const product = producten[index];
    document.getElementById('product-id').value = index;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-description').value = product.description;
}

function deleteProduct(index) {
    if (confirm('Are you sure you want to delete this product?')) {
        producten.splice(index, 1);
        localStorage.setItem('productData', JSON.stringify(producten));
        displayData();
    }
}

const productForm = document.getElementById('product-form');
productForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = document.getElementById('product-id').value;
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const foto = document.getElementById('product-image-url').value;

    if (id) {
        producten[id] = { name, price, foto };
    } else {
        producten.push({ name, price, foto });
    }

    localStorage.setItem('productData', JSON.stringify(producten));
    productForm.reset();
    document.getElementById('product-id').value = '';
    displayData();
});

document.getElementById('reset-products').addEventListener('click', resetProductsToOriginal);

function resetProductsToOriginal() {
    if (confirm('Are you sure you want to reset the products to their original state?')) {
      fetch('data.json')
        .then(response => response.json())
        .then(data => {
          producten = data;
          localStorage.setItem('productData', JSON.stringify(producten));
          displayData();
        });
    }
}
  
function displayOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';
  
    orders.forEach((order, index) => {
      const orderDiv = document.createElement('div');
      orderDiv.classList.add('border', 'p-2', 'rounded', 'my-2');
      orderDiv.innerHTML = `
        <h4>Order #${index + 1}</h4>
        <p>Date: ${new Date(order.date).toLocaleString()}</p>
      `;
  
      const itemList = document.createElement('ul');
      order.cart.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <span>${item.name} (Quantity: ${item.quantity})</span>
        `;
        itemList.appendChild(listItem);
      });
      orderDiv.appendChild(itemList);
  
      orderList.appendChild(orderDiv);
    });
}
  
displayOrders();

const resetOrdersButton = document.getElementById('reset-orders');
resetOrdersButton.addEventListener('click', resetOrders);

function resetOrders() {
    if (confirm('Are you sure you want to reset the orders?')) {
        localStorage.removeItem('orders');
        displayOrders();
    }
}