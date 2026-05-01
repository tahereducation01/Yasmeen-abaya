// AL Yasmeen Abaya - Wishlist Logic
const Wishlist = {
    items: JSON.parse(localStorage.getItem('yasmeen_wishlist')) || [],

    init() {
        this.updateBadge();
        this.syncProductHearts();
        this.renderDrawer();
    },

    toggle(productName, price, image) {
        const index = this.items.findIndex(item => item.name === productName);
        
        if (index === -1) {
            this.items.push({ name: productName, price, image });
            this.save();
            this.renderDrawer();
            return true; // Added
        } else {
            this.items.splice(index, 1);
            this.save();
            this.renderDrawer();
            return false; // Removed
        }
    },

    save() {
        localStorage.setItem('yasmeen_wishlist', JSON.stringify(this.items));
        this.updateBadge();
    },

    updateBadge() {
        const badges = document.querySelectorAll('.wishlist-count');
        const count = this.items.length;
        
        badges.forEach(badge => {
            badge.textContent = count;
            if (count > 0) {
                badge.classList.add('active');
            } else {
                badge.classList.remove('active');
            }
        });
    },

    toggleDrawer() {
        const drawer = document.getElementById('wishlist-drawer');
        const overlay = document.getElementById('drawer-overlay');
        if (drawer && overlay) {
            drawer.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
            if (drawer.classList.contains('active')) {
                this.renderDrawer();
            }
        }
    },

    renderDrawer() {
        const container = document.getElementById('wishlist-items-container');
        if (!container) return;

        if (this.items.length === 0) {
            container.innerHTML = `
                <div class="wishlist-empty-state">
                    <i class="fa-regular fa-heart" style="font-size: 3rem; margin-bottom: 20px; color: #EEE;"></i>
                    <p>Your wishlist is currently empty.</p>
                    <a href="shop.html" class="remove-from-wishlist" style="margin-top: 20px; text-decoration: none; color: var(--primary); font-weight: 600;">Start Exploring</a>
                </div>
            `;
            return;
        }

        container.innerHTML = this.items.map(item => `
            <div class="wishlist-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="wishlist-item-info">
                    <h5>${item.name}</h5>
                    <div class="price">${item.price}</div>
                    <span class="remove-from-wishlist" onclick="Wishlist.removeFromWishlist('${item.name}')">Remove</span>
                </div>
            </div>
        `).join('');
    },

    removeFromWishlist(name) {
        const index = this.items.findIndex(item => item.name === name);
        if (index !== -1) {
            this.items.splice(index, 1);
            this.save();
            this.renderDrawer();
            this.syncProductHearts();
        }
    },

    syncProductHearts() {
        document.querySelectorAll('.action-btn[title="Add to Wishlist"]').forEach(btn => {
            const card = btn.closest('.product-card');
            if (card) {
                const name = card.querySelector('h4').textContent;
                const isLiked = this.items.some(item => item.name === name);
                const icon = btn.querySelector('i');
                
                if (isLiked) {
                    btn.classList.add('liked');
                    if(icon) icon.classList.replace('fa-regular', 'fa-solid');
                } else {
                    btn.classList.remove('liked');
                    if(icon) icon.classList.replace('fa-solid', 'fa-regular');
                }
            }
        });
    }
};

// Global Listener for Wishlist Toggles
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.action-btn');
    if (btn && btn.title === "Add to Wishlist") {
        const card = btn.closest('.product-card');
        if (!card) return;

        const name = card.querySelector('h4').textContent;
        const price = card.querySelector('.price').textContent;
        const image = card.querySelector('img').src;

        const isAdded = Wishlist.toggle(name, price, image);
        
        const icon = btn.querySelector('i');
        if (icon) {
            btn.classList.toggle('liked', isAdded);
            if (isAdded) {
                icon.classList.replace('fa-regular', 'fa-solid');
            } else {
                icon.classList.replace('fa-solid', 'fa-regular');
            }
        }
    }

    // Close drawer when clicking overlay
    if (e.target.id === 'drawer-overlay') {
        Wishlist.toggleDrawer();
    }
});

// Initialize on load
document.addEventListener('DOMContentLoaded', () => Wishlist.init());



