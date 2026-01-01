// Array of books data
const books = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 10.99, image: "https://via.placeholder.com/150x200?text=Book+1" },
    { title: "To Kill a Mockingbird", author: "Harper Lee", price: 12.99, image: "https://via.placeholder.com/150x200?text=Book+2" },
    { title: "1984", author: "George Orwell", price: 9.99, image: "https://via.placeholder.com/150x200?text=Book+3" },
    { title: "Pride and Prejudice", author: "Jane Austen", price: 11.99, image: "https://via.placeholder.com/150x200?text=Book+4" },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", price: 8.99, image: "https://via.placeholder.com/150x200?text=Book+5" },
    { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", price: 14.99, image: "https://via.placeholder.com/150x200?text=Book+6" },
    { title: "The Lord of the Rings", author: "J.R.R. Tolkien", price: 19.99, image: "https://via.placeholder.com/150x200?text=Book+7" },
    { title: "The Hobbit", author: "J.R.R. Tolkien", price: 13.99, image: "https://via.placeholder.com/150x200?text=Book+8" },
    { title: "Dune", author: "Frank Herbert", price: 15.99, image: "https://via.placeholder.com/150x200?text=Book+9" },
    { title: "Neuromancer", author: "William Gibson", price: 11.49, image: "https://via.placeholder.com/150x200?text=Book+10" }
];

// Function to get cart from localStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Function to save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to add book to cart
function addToCart(book) {
    const cart = getCart();
    cart.push(book);
    saveCart(cart);
    showMessage(`${book.title}, it has been added to the cart ✅`);
}

// Function to show temporary message
function showMessage(text) {
    const message = document.createElement('div');
    message.className = 'message';
    message.textContent = text;
    document.body.appendChild(message);
    setTimeout(() => {
        document.body.removeChild(message);
    }, 3000); // Message disappears after 3 seconds
}

// Function to render books on books.html
function renderBooks() {
    const booksGrid = document.getElementById('books-grid');
    if (!booksGrid) return;

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';

        bookCard.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p class="book-price">$${book.price.toFixed(2)}</p>
            <button class="add-to-cart-btn">Add to Cart</button>
        `;

        const addButton = bookCard.querySelector('.add-to-cart-btn');
        addButton.addEventListener('click', () => addToCart(book));

        booksGrid.appendChild(bookCard);
    });
}

// Function to render cart on cart.html
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    if (!cartItems || !totalPriceElement) return;

    const cart = getCart();
    cartItems.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceElement.textContent = 'Total Price: $0.00';
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div>
                <h3>${item.title}</h3>
                <p>$${item.price.toFixed(2)}</p>
            </div>
        `;

        cartItems.appendChild(cartItem);
        total += item.price;
    });

    totalPriceElement.textContent = `Total Price: $${total.toFixed(2)}`;
}

// Initialize based on current page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('books-grid')) {
        renderBooks();
    }
    if (document.getElementById('cart-items')) {
        renderCart();
    }
});
