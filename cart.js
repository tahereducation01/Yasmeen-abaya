// cart.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart from localStorage or empty array
    let cart = JSON.parse(localStorage.getItem('Yasmin_cart')) || [];

    // --- Update Cart Counter in Navbar ---
    const updateCartCounter = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartIcons = document.querySelectorAll('.fa-bag-shopping');
        cartIcons.forEach(icon => {
            const parent = icon.parentElement;
            let badge = parent.querySelector('.cart-badge');
            if (totalItems > 0) {
                if (!badge) {
                    badge = document.createElement('span');
                    badge.className = 'cart-badge';
                    badge.style.cssText = 'position: absolute; top: -8px; right: -8px; background: var(--secondary); color: white; border-radius: 50%; padding: 2px 6px; font-size: 0.7rem; font-weight: bold; font-family: var(--font-body);';
                    parent.style.position = 'relative';
                    parent.appendChild(badge);
                }
                badge.innerText = totalItems;
            } else {
                if (badge) badge.remove();
            }
        });
    };

    updateCartCounter();

    // --- Product Details Page: Add to Cart ---
    const btnAddCart = document.querySelector('.btn-add-cart');
    if (btnAddCart) {
        btnAddCart.addEventListener('click', () => {
            const title = document.querySelector('.product-title').innerText;
            const priceText = document.querySelector('.product-price').innerText;
            const price = parseFloat(priceText.replace(' KWD', ''));
            const qty = parseInt(document.querySelector('.qty-input').value) || 1;

            const sizeEl = document.querySelector('.size-btn.active');
            const size = sizeEl ? sizeEl.innerText : 'Free Size';

            const colorEl = document.querySelector('.color-btn.active');
            const color = colorEl ? colorEl.title : 'Default';

            const imgEl = document.getElementById('main-image');
            const image = imgEl ? imgEl.src : 'images/luxury_abaya.png';

            const item = {
                id: title + '-' + size + '-' + color,
                title,
                price,
                qty,
                size,
                color,
                image
            };

            // Check if exists
            const existing = cart.find(i => i.id === item.id);
            if (existing) {
                existing.qty += qty;
            } else {
                cart.push({ ...item, quantity: qty });
            }

            localStorage.setItem('Yasmin_cart', JSON.stringify(cart));
            updateCartCounter();

            // Visual feedback
            const originalText = btnAddCart.innerText;
            btnAddCart.innerText = 'Added to Cart!';
            btnAddCart.style.backgroundColor = 'var(--secondary)';
            setTimeout(() => {
                btnAddCart.innerText = originalText;
                btnAddCart.style.backgroundColor = 'var(--primary)';
            }, 2000);
        });

        // Quantity selector logic for Product Details
        const qtyInputs = document.querySelectorAll('.quantity-selector');
        qtyInputs.forEach(selector => {
            const btns = selector.querySelectorAll('.qty-btn');
            const input = selector.querySelector('.qty-input');
            btns[0].addEventListener('click', () => {
                let val = parseInt(input.value);
                if (val > 1) input.value = val - 1;
            });
            btns[1].addEventListener('click', () => {
                let val = parseInt(input.value);
                input.value = val + 1;
            });
        });

        // Option selection logic
        document.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
            });
        });
    }

    // --- Shop & Index Pages: Quick Add to Cart ---
    const quickAddBtns = document.querySelectorAll('.action-btn[title="Add to Cart"]');
    quickAddBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = e.target.closest('.product-card');
            if (card) {
                const title = card.querySelector('h4').innerText;
                const priceText = card.querySelector('.price').innerText;
                const price = parseFloat(priceText.replace(' KWD', ''));
                const imgEl = card.querySelector('img');
                const image = imgEl ? imgEl.src : 'images/luxury_abaya.png';

                const item = {
                    id: title + '-Free Size-Default',
                    title,
                    price,
                    quantity: 1,
                    size: 'Standard',
                    color: 'Standard',
                    image
                };

                const existing = cart.find(i => i.id === item.id);
                if (existing) {
                    existing.quantity += 1;
                } else {
                    cart.push(item);
                }

                localStorage.setItem('Yasmin_cart', JSON.stringify(cart));
                updateCartCounter();

                // Feedback
                const icon = btn.querySelector('i');
                icon.className = 'fa-solid fa-check';
                setTimeout(() => {
                    icon.className = 'fa-solid fa-cart-plus';
                }, 1500);
            }
        });
    });

    // --- Cart Page Logic ---
    const cartTableBody = document.querySelector('.cart-table tbody');
    if (cartTableBody) {
        const renderCart = () => {
            cartTableBody.innerHTML = '';
            let subtotal = 0;

            if (cart.length === 0) {
                cartTableBody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 40px 0;">Your cart is empty. <br><br><a href="shop.html" class="btn btn-primary">Continue Shopping</a></td></tr>';
                updateSummary(0);
                return;
            }

            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>
                        <div class="item-info">
                            <img src="${item.image}" alt="${item.title}">
                            <div class="item-details">
                                <h4>${item.title}</h4>
                                <p>Size: ${item.size} | Color: ${item.color}</p>
                                <button class="remove-btn" data-index="${index}">Remove</button>
                            </div>
                        </div>
                    </td>
                    <td><span class="item-price">${item.price} KWD</span></td>
                    <td>
                        <div class="quantity-selector">
                            <button class="qty-btn dec-btn" data-index="${index}">-</button>
                            <input type="text" class="qty-input" value="${item.quantity}" readonly>
                            <button class="qty-btn inc-btn" data-index="${index}">+</button>
                        </div>
                    </td>
                    <td><span class="item-total">${itemTotal} KWD</span></td>
                `;
                cartTableBody.appendChild(tr);
            });

            updateSummary(subtotal);
            attachCartListeners();
        };

        const updateSummary = (subtotal) => {
            const summaryRows = document.querySelectorAll('.summary-row span:last-child');
            if (summaryRows.length >= 3) {
                summaryRows[0].innerText = subtotal + ' KWD'; // Subtotal
                // Shipping is 0
                summaryRows[2].innerText = subtotal + ' KWD'; // Total
            }
        };

        const attachCartListeners = () => {
            document.querySelectorAll('.remove-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.target.getAttribute('data-index');
                    cart.splice(idx, 1);
                    localStorage.setItem('Yasmin_cart', JSON.stringify(cart));
                    updateCartCounter();
                    renderCart();
                });
            });

            document.querySelectorAll('.inc-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.target.getAttribute('data-index');
                    cart[idx].quantity += 1;
                    localStorage.setItem('Yasmin_cart', JSON.stringify(cart));
                    updateCartCounter();
                    renderCart();
                });
            });

            document.querySelectorAll('.dec-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.target.getAttribute('data-index');
                    if (cart[idx].quantity > 1) {
                        cart[idx].quantity -= 1;
                        localStorage.setItem('Yasmin_cart', JSON.stringify(cart));
                        updateCartCounter();
                        renderCart();
                    }
                });
            });
        };

        renderCart();
    }

    // --- Wishlist Feedback ---
    document.querySelectorAll('.action-btn[title="Add to Wishlist"], .btn-wishlist').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = 'fa-solid fa-heart';
                icon.style.color = 'var(--secondary)';
            }
        });
    });
});
