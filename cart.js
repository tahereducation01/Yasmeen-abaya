// cart.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart from localStorage or empty array
    let cart = JSON.parse(localStorage.getItem('Yasmeen_cart')) || [];

    // --- Helper for Price Formatting (Matches region.js logic) ---
    const formatPrice = (amount) => {
        const selectedRegionJson = localStorage.getItem('yasmeen_selected_country');
        const lang = localStorage.getItem('yasmeen_lang') || 'en';
        if (!selectedRegionJson) return amount + ' KWD';

        const regionData = JSON.parse(selectedRegionJson);
        const config = {
            'Kuwait': { rate: 1, symbol: 'KWD' },
            'India': { rate: 275, symbol: '₹' },
            'UAE': { rate: 12, symbol: 'AED' },
            'Saudi Arabia': { rate: 12.2, symbol: 'SAR' },
            'Bahrain': { rate: 1.23, symbol: 'BHD' }
        }[regionData.name] || { rate: 1, symbol: 'KWD' };

        const converted = (amount * config.rate).toLocaleString(undefined, {
            minimumFractionDigits: config.rate > 10 ? 0 : 2,
            maximumFractionDigits: config.rate > 10 ? 0 : 2
        });
        return `${config.symbol} ${converted}`;
    };

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
            const priceText = document.querySelector('.product-price').dataset.basePrice || document.querySelector('.product-price').innerText;
            const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
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
                price, // Store base price in KWD
                quantity: qty,
                size,
                color,
                image
            };

            const existing = cart.find(i => i.id === item.id);
            if (existing) {
                existing.quantity += qty;
            } else {
                cart.push(item);
            }

            localStorage.setItem('Yasmeen_cart', JSON.stringify(cart));
            updateCartCounter();

            // Feedback
            const originalText = btnAddCart.innerText;
            btnAddCart.innerText = localStorage.getItem('yasmeen_lang') === 'ar' ? 'تمت الإضافة!' : 'Added to Cart!';
            btnAddCart.style.backgroundColor = 'var(--secondary)';
            setTimeout(() => {
                btnAddCart.innerText = originalText;
                btnAddCart.style.backgroundColor = 'var(--primary)';
            }, 2000);
        });

        // Quantity selector logic
        const qtyInputs = document.querySelectorAll('.quantity-selector');
        qtyInputs.forEach(selector => {
            const btns = selector.querySelectorAll('.qty-btn');
            const input = selector.querySelector('.qty-input');
            if (btns.length >= 2 && input) {
                btns[0].addEventListener('click', () => {
                    let val = parseInt(input.value);
                    if (val > 1) input.value = val - 1;
                });
                btns[1].addEventListener('click', () => {
                    let val = parseInt(input.value);
                    input.value = val + 1;
                });
            }
        });

        // Option selection
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

    // --- Shop & Index Pages: Quick Add ---
    const quickAddBtns = document.querySelectorAll('.action-btn[title="Add to Cart"]');
    quickAddBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = e.target.closest('.product-card');
            if (card) {
                const title = card.querySelector('h4').innerText;
                const priceEl = card.querySelector('.price');
                
                // Prioritize data-base-price attribute
                let basePrice = parseFloat(priceEl.dataset.basePrice);
                
                // Fallback to text parsing if attribute missing
                if (isNaN(basePrice)) {
                    const priceText = priceEl.innerText;
                    basePrice = parseFloat(priceText.replace(/[^\d.]/g, ''));
                    
                    // If already converted (not KWD), we need a mapping as fallback
                    const selectedRegion = JSON.parse(localStorage.getItem('yasmeen_selected_country'));
                    if (selectedRegion && selectedRegion.name !== 'Kuwait' && !priceText.includes('KWD')) {
                        const priceMap = {
                            "Midnight Noir Abaya": 45,
                            "Gilded Embroidery Abaya": 52,
                            "Pearl Drape Elegance": 49,
                            "Cashmere Blend Hijab": 15,
                            "Onyx Shimmer Abaya": 65,
                            "Desert Rose Evening Abaya": 58,
                            "Pure Silk Ivory Hijab": 22,
                            "Midnight Satin Hijab": 18
                        };
                        basePrice = priceMap[title] || 45;
                    }
                }
                
                const item = {
                    id: title + '-Standard-Standard',
                    title,
                    price: basePrice,
                    quantity: 1,
                    size: 'Standard',
                    color: 'Standard',
                    image: card.querySelector('img').src
                };

                const existing = cart.find(i => i.id === item.id);
                if (existing) {
                    existing.quantity += 1;
                } else {
                    cart.push(item);
                }

                localStorage.setItem('Yasmeen_cart', JSON.stringify(cart));
                updateCartCounter();

                const icon = btn.querySelector('i');
                if (icon) {
                    icon.className = 'fa-solid fa-check';
                    setTimeout(() => {
                        icon.className = 'fa-solid fa-cart-plus';
                    }, 1500);
                }
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
                const emptyMsg = localStorage.getItem('yasmeen_lang') === 'ar' ? 'عربة التسوق فارغة' : 'Your cart is empty.';
                const shopBtnTxt = localStorage.getItem('yasmeen_lang') === 'ar' ? 'مواصلة التسوق' : 'Continue Shopping';
                cartTableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 40px 0;">${emptyMsg} <br><br><a href="shop.html" class="btn btn-primary">${shopBtnTxt}</a></td></tr>`;
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
                                <button class="remove-btn" data-index="${index}">${localStorage.getItem('yasmeen_lang') === 'ar' ? 'إزالة' : 'Remove'}</button>
                            </div>
                        </div>
                    </td>
                    <td><span class="item-price">${formatPrice(item.price)}</span></td>
                    <td>
                        <div class="quantity-selector">
                            <button class="qty-btn dec-btn" data-index="${index}">-</button>
                            <input type="text" class="qty-input" value="${item.quantity}" readonly>
                            <button class="qty-btn inc-btn" data-index="${index}">+</button>
                        </div>
                    </td>
                    <td><span class="item-total">${formatPrice(itemTotal)}</span></td>
                `;
                cartTableBody.appendChild(tr);
            });

            updateSummary(subtotal);
            attachCartListeners();
        };

        const updateSummary = (subtotal) => {
            const selectedRegionJson = localStorage.getItem('yasmeen_selected_country');
            const regionData = selectedRegionJson ? JSON.parse(selectedRegionJson) : null;
            const regionName = regionData ? regionData.name : 'Kuwait';
            
            // Tax calculation (based on regionConfig in region.js)
            const taxRates = {
                'Kuwait': 0, 'India': 12, 'UAE': 5, 'Saudi Arabia': 15,
                'Bahrain': 10
            };
            const taxRate = taxRates[regionName] || 0;
            const taxAmount = (subtotal * taxRate) / 100;
            const total = subtotal + taxAmount;

            const taxRow = document.getElementById('tax-row');
            if (taxRow) {
                if (taxRate > 0) {
                    taxRow.style.display = 'flex';
                    const taxLabel = document.getElementById('tax-label');
                    const taxValue = document.getElementById('tax-value');
                    if (taxLabel) taxLabel.innerText = localStorage.getItem('yasmeen_lang') === 'ar' ? `ضريبة (${taxRate}%)` : `Estimated Tax (${taxRate}%)`;
                    if (taxValue) taxValue.innerText = formatPrice(taxAmount);
                } else {
                    taxRow.style.display = 'none';
                }
            }

            const subtotalSpans = document.querySelectorAll('.summary-row span:last-child');
            if (subtotalSpans.length >= 2) {
                // Find subtotal and total spans specifically to avoid index confusion
                const subtotalLabel = Array.from(document.querySelectorAll('.summary-row span:first-child')).find(el => el.textContent.includes('Subtotal') || el.textContent.includes('المجموع'));
                if (subtotalLabel) subtotalLabel.nextElementSibling.innerText = formatPrice(subtotal);

                // Discount Logic
                const promo = JSON.parse(localStorage.getItem('Yasmeen_promo')) || null;
                let discountAmount = 0;
                const discountRow = document.getElementById('discount-row') || createDiscountRow();
                
                if (promo) {
                    if (promo.type === 'percent') {
                        discountAmount = (subtotal * promo.value) / 100;
                    } else {
                        discountAmount = promo.value;
                    }
                    discountRow.style.display = 'flex';
                    discountRow.querySelector('span:last-child').innerText = '-' + formatPrice(discountAmount);
                    discountRow.querySelector('span:first-child').innerText = `Discount (${promo.code})`;
                } else {
                    discountRow.style.display = 'none';
                }

                const finalTotal = Math.max(0, subtotal - discountAmount + taxAmount);
                const totalLabel = document.querySelector('.summary-total span:first-child');
                if (totalLabel) totalLabel.nextElementSibling.innerText = formatPrice(finalTotal);
            }
        };

        const createDiscountRow = () => {
            const summary = document.querySelector('.cart-summary');
            if (!summary) return null;
            const totalRow = document.querySelector('.summary-total');
            const row = document.createElement('div');
            row.id = 'discount-row';
            row.className = 'summary-row';
            row.style.color = '#e53e3e';
            row.innerHTML = '<span>Discount</span><span>-0 KWD</span>';
            totalRow.parentNode.insertBefore(row, totalRow);
            return row;
        };

        const attachCartListeners = () => {
            document.querySelectorAll('.remove-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.target.getAttribute('data-index');
                    cart.splice(idx, 1);
                    localStorage.setItem('Yasmeen_cart', JSON.stringify(cart));
                    updateCartCounter();
                    renderCart();
                });
            });

            document.querySelectorAll('.inc-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.target.getAttribute('data-index');
                    cart[idx].quantity += 1;
                    localStorage.setItem('Yasmeen_cart', JSON.stringify(cart));
                    updateCartCounter();
                    renderCart();
                });
            });

            document.querySelectorAll('.dec-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.target.getAttribute('data-index');
                    if (cart[idx].quantity > 1) {
                        cart[idx].quantity -= 1;
                        localStorage.setItem('Yasmeen_cart', JSON.stringify(cart));
                        updateCartCounter();
                        renderCart();
                    }
                });
            });
        };

        // Promo Code Logic
        const promoInput = document.querySelector('.coupon-box input');
        const promoBtn = document.querySelector('.coupon-box button');
        if (promoInput && promoBtn) {
            promoBtn.addEventListener('click', () => {
                const code = promoInput.value.trim().toUpperCase();
                const validCodes = {
                    'YASMEEN10': { type: 'percent', value: 10 },
                    'WELCOME20': { type: 'percent', value: 20 },
                    'VIP50': { type: 'percent', value: 50 },
                    'LUXURY5': { type: 'percent', value: 5 }
                };

                if (validCodes[code]) {
                    localStorage.setItem('Yasmeen_promo', JSON.stringify({
                        code: code,
                        ...validCodes[code]
                    }));
                    alert('Promo code applied successfully!');
                    renderCart();
                } else {
                    alert('Invalid promo code.');
                }
            });
        }

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

