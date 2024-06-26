const cart = [];

function addToCart(productId) {
    fetch(`/product/${productId}`)
        .then(response => response.json())
        .then(product => {
            const cartItem = cart.find(item => item.id === product.id);
            if (cartItem) {
                cartItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            displayCart();
        })
        .catch(error => console.error('Erreur de récupération du produit:', error));
}

function displayCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
    cart.forEach(product => {
        const div = document.createElement('div');
        div.textContent = `${product.name} - ${product.price}€ (Quantité: ${product.quantity})`;
        cartDiv.appendChild(div);
    });

    const orderButton = document.createElement('button');
    orderButton.textContent = 'Passer commande';
    const redirectioncommande = document.createElement('a');
    redirectioncommande.setAttribute("href","/success"); 
    orderButton.onclick = placeOrder;
    cartDiv.appendChild(redirectioncommande);
    redirectioncommande.appendChild(orderButton);
}

function placeOrder() {
    fetch('/success', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cart })
    })
    .then(response => response.json())
    .then(session => {
        return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(result => {
        if (result.error) {
            alert(result.error.message);
        }
    })
    .catch(error => console.error('Erreur lors de la commande:', error));
}

document.addEventListener('DOMContentLoaded', displayCart);
