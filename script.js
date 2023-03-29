function createItem(item) {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('clothing', JSON.stringify(data));
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card m-2 mx-5 text-center d-flex flex-column align-items-center col-4 col-sm-12" style="width: 18rem;">
                <img class="card-img-top" src="talhanks.png" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">Maat: ${item.size}</p>
                    <div class="d-flex flex-row justify-content-center">
                        <a href="#" style="width: 50px;" class="btn btn-success">+</a>
                        <p class="mx-3" id="amount">${item.amount}</p>
                        <a href="#" style="width: 50px;" class="btn btn-danger">-</a>
                    </div>
                </div>
            </div>`

        })
}

const row = document.getElementById('row');
row.appendChild(div);

createItem();

const plusbutton = document.getElementById('plus')
const minbutton = document.getElementById('min')

plusbutton.addEventListener('click', () => {
    const itemId = amountSpan.getAttribute('data-item-id');
    let clothing = JSON.parse(localStorage.getItem('clothing'));
    const itemToUpdate = clothing.find(items => items.id === itemId);
    itemToUpdate.amount++;
    localStorage.setItem('clothing', JSON.stringify(clothing));
    amountSpan.textContent = itemToUpdate.amount;
});

minbutton.addEventListener('click', () => {
    const itemId = amountSpan.getAttribute('data-item-id');
    let clothing = JSON.parse(localStorage.getItem('clothing'));
    const itemToUpdate = clothing.find(itemd => itemd.id === itemId);
    if (itemToUpdate.amount > 0) {
        itemToUpdate.amount--;
        localStorage.setItem('clothing', JSON.stringify(clothing));
        amountSpan.textContent = itemToUpdate.amount;
    } else if (itemToUpdate.amount === 0) {
        div.remove();
        clothing = clothing.filter(itemt => itemt.id !== itemId);
        localStorage.setItem('clothing', JSON.stringify(clothing));
    }
});
