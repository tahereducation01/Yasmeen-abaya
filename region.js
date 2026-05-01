// AL Yasmeen Abaya - Region & Language Management System

const translations = {
    en: {
        home: "Home",
        atelier: "The Atelier",
        signature: "Signature",
        hijabs: "Hijabs",
        orders: "Orders",
        login: "Login",
        explore: "Explore The Collection",
        discover: "Discover New Arrivals",
        curated: "Curated Collections",
        signature_pieces: "Signature Pieces",
        masterpieces: "Masterpieces",
        join_society: "Join The Society",
        client_experiences: "Client Experiences",
        inner_circle: "The Inner Circle",
        join_btn: "Join",
        delivery: "Complimentary Delivery Across",
        quality: "Premium Quality Guaranteed",
        shopper: "Personal Shopper",
        epitome: "The Epitome of Grace & Heritage",
        hero_desc: "Discover our masterfully crafted collection of premium abayas, designed for the sophisticated woman.",
        buy_now: "Buy It Now",
        add_to_cart: "Add To Cart",
        inquire_whatsapp: "Inquire via WhatsApp",
        packaging: "Luxury Packaging Included",
        delivery_note: "Same Day Delivery",
        order_before: "Order before 2 PM",
        products: {
            "Midnight Noir Abaya": "Midnight Noir Abaya",
            "Gilded Embroidery Abaya": "Gilded Embroidery Abaya",
            "Pearl Drape Elegance": "Pearl Drape Elegance",
            "Cashmere Blend Hijab": "Cashmere Blend Hijab",
            "Velvet Rose Abaya": "Velvet Rose Abaya",
            "Linen Breeze Abaya": "Linen Breeze Abaya",
            "Diamond Sparkle Abaya": "Diamond Sparkle Abaya",
            "Satin Gold Hijab": "Satin Gold Hijab",
            "Emerald Silk Hijab": "Emerald Silk Hijab"
        }
    },
    ar: {
        home: "الرئيسية",
        atelier: "الأتيليه",
        signature: "سيجنيتشر",
        hijabs: "حجابات",
        orders: "طلباتي",
        login: "دخول",
        explore: "استكشف المجموعة",
        discover: "اكتشف الجديد",
        curated: "مجموعات مختارة",
        signature_pieces: "قطع مميزة",
        masterpieces: "روائع",
        join_society: "انضم إلى مجتمعنا",
        client_experiences: "تجارب العملاء",
        inner_circle: "الدائرة المقربة",
        join_btn: "انضم الآن",
        delivery: "توصيل مجاني في",
        quality: "جودة ممتازة مضمونة",
        shopper: "متسوق شخصي",
        epitome: "خلاصة الأناقة والتراث",
        hero_desc: "اكتشفي مجموعتنا المصممة ببراعة من العبايات الفاخرة، المصممة للمرأة العصرية المتطورة.",
        buy_now: "اشترِ الآن",
        add_to_cart: "أضف إلى السلة",
        inquire_whatsapp: "استفسر عبر واتساب",
        packaging: "تغليف فاخر متضمن",
        delivery_note: "توصيل في نفس اليوم",
        order_before: "اطلب قبل الساعة ٢ ظهراً",
        products: {
            "Midnight Noir Abaya": "عباية ميدنايت نوار",
            "Gilded Embroidery Abaya": "عباية مطرزة بالذهب",
            "Pearl Drape Elegance": "عباية لؤلؤية أنيقة",
            "Cashmere Blend Hijab": "حجاب كشمير ناعم",
            "Velvet Rose Abaya": "عباية الورد المخملية",
            "Linen Breeze Abaya": "عباية الكتان الناعمة",
            "Diamond Sparkle Abaya": "عباية بريق الماس",
            "Satin Gold Hijab": "حجاب ساتان ذهبي",
            "Emerald Silk Hijab": "حجاب حرير زمردي"
        }
    }
};

const regionConfig = {
    'Kuwait': { currency: 'KWD', rate: 1, delivery: 'Kuwait', ar_delivery: 'الكويت', house: "Kuwait's Premier Modest Fashion House", symbol: 'KWD', tax: 0 },
    'India': { currency: 'INR', rate: 275, delivery: 'India', ar_delivery: 'الهند', house: "India's Premier Modest Fashion House", symbol: '₹', tax: 12 },
    'UAE': { currency: 'AED', rate: 12, delivery: 'UAE', ar_delivery: 'الإمارات', house: "The Emirates' Premier Modest Fashion House", symbol: 'AED', tax: 5 },
    'Saudi Arabia': { currency: 'SAR', rate: 12.2, delivery: 'Saudi Arabia', ar_delivery: 'السعودية', house: "The Kingdom's Premier Modest Fashion House", symbol: 'SAR', tax: 15 },
    'Bahrain': { currency: 'BHD', rate: 1.23, delivery: 'Bahrain', ar_delivery: 'البحرين', house: "Bahrain's Premier Modest Fashion House", symbol: 'BHD', tax: 10 }
};

// Immediate Setup
(function() {
    const isLandingPage = window.location.pathname.includes('landing.html');
    const selectedRegion = localStorage.getItem('yasmeen_selected_country');
    const selectedLang = localStorage.getItem('yasmeen_lang') || 'en';

    if (!selectedRegion && !isLandingPage) {
        window.location.href = 'landing.html';
        return;
    }

    if (selectedLang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
    }
})();

function updateRegionUI() {
    const selectedRegionJson = localStorage.getItem('yasmeen_selected_country');
    const lang = localStorage.getItem('yasmeen_lang') || 'en';
    if (!selectedRegionJson) return;
    
    const regionData = JSON.parse(selectedRegionJson);
    const config = regionConfig[regionData.name];
    if (!config) return;
    const t = translations[lang];

    // Topbar
    document.querySelectorAll('.topbar span').forEach(el => {
        if (el.textContent.includes('Delivery Across') || el.textContent.includes('توصيل مجاني')) {
            el.innerHTML = `${t.delivery} ${lang === 'ar' ? config.ar_delivery : config.delivery}`;
        }
        if (el.textContent.includes('Premium Quality') || el.textContent.includes('جودة ممتازة')) el.innerHTML = `<i class="fa-solid fa-gem"></i> ${t.quality}`;
        if (el.textContent.includes('Personal Shopper') || el.textContent.includes('متسوق شخصي')) el.innerHTML = `<i class="fa-brands fa-whatsapp"></i> ${t.shopper}`;
    });

    // Nav Links
    document.querySelectorAll('.nav-links a').forEach(a => {
        const txt = a.textContent.trim().toLowerCase();
        if (txt.includes('home') || txt.includes('الرئيسية')) a.textContent = t.home;
        if (txt.includes('atelier') || txt.includes('الأتيليه')) a.textContent = t.atelier;
        if (txt.includes('signature') || txt.includes('سيجنيتشر')) a.textContent = t.signature;
        if (txt.includes('hijabs') || txt.includes('حجابات')) a.textContent = t.hijabs;
        if (txt.includes('orders') || txt.includes('طلباتي')) a.textContent = t.orders;
        if (txt.includes('login') || txt.includes('دخول')) a.textContent = t.login;
    });

    // Hero
    const heroH1 = document.querySelector('.hero h1');
    if (heroH1) heroH1.textContent = t.epitome;
    const heroP = document.querySelector('.hero p');
    if (heroP) heroP.textContent = t.hero_desc;
    const heroBtns = document.querySelectorAll('.hero .btn');
    if (heroBtns.length >= 2) {
        heroBtns[0].textContent = t.explore;
        heroBtns[1].textContent = t.discover;
    }

    // Product Details Specific
    const buyBtn = document.querySelector('.btn-buy-now');
    if (buyBtn) buyBtn.textContent = t.buy_now;
    const addBtn = document.querySelector('.btn-add-cart');
    if (addBtn) addBtn.textContent = t.add_to_cart;

    const deliveryInfo = document.querySelector('.delivery-info');
    if (deliveryInfo) {
        const pTags = deliveryInfo.querySelectorAll('p');
        if (pTags.length >= 3) {
            pTags[0].innerHTML = `<i class="fa-solid fa-truck-fast"></i> <strong>${t.delivery_note} ${lang === 'ar' ? config.ar_delivery : config.delivery}</strong> (${t.order_before})`;
            pTags[1].innerHTML = `<i class="fa-solid fa-box-open"></i> <strong>${t.packaging}</strong>`;
            pTags[2].innerHTML = `<i class="fa-brands fa-whatsapp"></i> <a href="https://wa.me/96597899852" style="color:var(--secondary); font-weight:500;" target="_blank">${t.inquire_whatsapp}</a>`;
        }
    }

    // Prices & Formats
    const format = (val) => {
        return (val * config.rate).toLocaleString(undefined, {
            minimumFractionDigits: config.rate > 10 ? 0 : 2,
            maximumFractionDigits: config.rate > 10 ? 0 : 2
        });
    };

    document.querySelectorAll('.price, .product-price, .item-price, .item-total, .summary-row span:last-child').forEach(el => {
        // Prioritize data-base-price
        let base = parseFloat(el.dataset.basePrice);
        
        // Fallback to text parsing
        if (isNaN(base)) {
            const originalText = el.textContent;
            if (originalText.includes('KWD')) {
                base = parseFloat(originalText.replace(/[^\d.]/g, ''));
            }
        }

        if (!isNaN(base)) {
            el.innerHTML = `${config.symbol} ${format(base)}`;
            // Keep data attribute for reference
            if (isNaN(parseFloat(el.dataset.basePrice))) {
                el.dataset.basePrice = base;
            }
        }
    });

    // Shop Sidebar Range
    const shopRange = document.querySelectorAll('.filter-widget span');
    shopRange.forEach(s => {
        if (s.textContent.includes('KWD')) {
            const base = parseFloat(s.textContent.replace(/[^\d.]/g, ''));
            if (!isNaN(base)) {
                const suffix = s.textContent.includes('+') ? '+' : '';
                s.innerHTML = `${config.symbol} ${format(base)}${suffix}`;
            }
        }
    });

    // Cart & Checkout Specifics
    const shippingRow = document.querySelector('.summary-row:nth-child(3) span:first-child');
    if (shippingRow && (shippingRow.textContent.includes('Shipping') || shippingRow.textContent.includes('الشحن'))) {
        shippingRow.textContent = lang === 'ar' ? `الشحن (${config.ar_delivery})` : `Shipping (${config.delivery})`;
    }
    document.querySelectorAll('.summary-row span:first-child').forEach(s => {
        if (s.textContent.includes('Subtotal')) s.textContent = lang === 'ar' ? 'المجموع الفرعي' : 'Subtotal';
        if (s.textContent.includes('Total') && !s.textContent.includes('Subtotal')) s.textContent = lang === 'ar' ? 'الإجمالي' : 'Total';
    });

    addRegionSwitcher(regionData.name, lang);
}

function addRegionSwitcher(currentName, currentLang) {
    if (document.getElementById('region-switcher-wrap')) return;
    const navIcons = document.querySelector('.nav-icons');
    if (!navIcons) return;

    const isMobile = window.innerWidth <= 768;

    const wrap = document.createElement('div');
    wrap.id = 'region-switcher-wrap';
    wrap.style.cssText = `display:flex; align-items:center; gap:${isMobile ? '5px' : '10px'}; margin-left:${isMobile ? '5px' : '15px'};`;

    const langToggle = document.createElement('button');
    langToggle.style.cssText = `font-size:${isMobile ? '0.65rem' : '0.75rem'}; border:1px solid var(--border); padding:${isMobile ? '3px 5px' : '4px 8px'}; border-radius:4px; background:transparent; cursor:pointer; color:var(--primary); white-space:nowrap;`;
    // On mobile show short label (ع / EN), on desktop show full label
    langToggle.textContent = currentLang === 'en'
        ? (isMobile ? 'ع' : 'العربية')
        : (isMobile ? 'EN' : 'English');
    langToggle.onclick = () => {
        localStorage.setItem('yasmeen_lang', currentLang === 'en' ? 'ar' : 'en');
        sessionStorage.setItem('yasmeen_preloader_played', 'true');
        window.location.reload();
    };

    // Hide Arabic option for India as requested
    if (currentName === 'India') {
        langToggle.style.display = 'none';
        // Force English if somehow it was set to Arabic before switching to India
        if (currentLang === 'ar') {
            localStorage.setItem('yasmeen_lang', 'en');
            sessionStorage.setItem('yasmeen_preloader_played', 'true');
            window.location.reload();
        }
    }

    const switcher = document.createElement('button');
    // On mobile show only globe icon, on desktop show globe + region name
    const regionLabel = isMobile ? '' : ` ${currentName}`;
    switcher.style.cssText = `font-size:${isMobile ? '0.65rem' : '0.75rem'}; border:1px solid var(--secondary); padding:${isMobile ? '3px 6px' : '4px 10px'}; border-radius:20px; color:var(--secondary); background:transparent; cursor:pointer; white-space:nowrap;`;
    switcher.innerHTML = `<i class="fa-solid fa-globe"></i>${regionLabel}`;
    switcher.onclick = showCountrySelector;

    wrap.appendChild(langToggle);
    wrap.appendChild(switcher);
    navIcons.appendChild(wrap);
}

function showCountrySelector() {
    let overlay = document.getElementById('country-selector-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'country-selector-overlay';
        overlay.style.cssText = `
            position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 10000;
            display: flex; align-items: center; justify-content: center; opacity: 0;
            transition: opacity 0.4s ease; backdrop-filter: blur(8px);
        `;
        
        const container = document.createElement('div');
        container.style.cssText = `
            background: #111; width: 95%; max-width: 450px; padding: 40px 25px;
            border-radius: 8px; border: 1px solid rgba(212, 175, 55, 0.2);
            text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.5); position: relative;
        `;

        const title = document.createElement('h2');
        title.textContent = 'Select Your Region';
        title.style.cssText = `font-family: 'Playfair Display', serif; color: #fff; margin-bottom: 30px; letter-spacing: 2px; text-transform: uppercase; font-size: 1.4rem;`;
        
        const grid = document.createElement('div');
        grid.style.cssText = `display: flex; flex-direction: column; gap: 12px; max-height: 60vh; overflow-y: auto; padding-right: 5px;`;

        const countries = [
            { name: 'UAE', currency: 'AED', code: 'uae', flag: 'ae' },
            { name: 'Kuwait', currency: 'KWD', code: 'kw', flag: 'kw' },
            { name: 'Saudi Arabia', currency: 'SAR', code: 'sa', flag: 'sa' },
            { name: 'Bahrain', currency: 'BHD', code: 'bh', flag: 'bh' },
            { name: 'India', currency: 'INR', code: 'in', flag: 'in' }
        ];

        countries.forEach(c => {
            const btn = document.createElement('button');
            btn.style.cssText = `
                display: flex; align-items: center; justify-content: space-between;
                background: rgba(212, 175, 55, 0.05); border: 1px solid rgba(212, 175, 55, 0.2);
                padding: 15px 20px; color: #fff; border-radius: 4px; cursor: pointer;
                transition: all 0.3s ease; width: 100%; font-family: 'Poppins', sans-serif;
            `;
            btn.innerHTML = `
                <div style="display:flex; align-items:center; gap:15px;">
                    <img src="https://flagcdn.com/w40/${c.flag}.png" style="width:25px; border-radius:2px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                    <span style="font-size: 1rem; letter-spacing: 1px;">${c.name}</span>
                </div>
                <i class="fa-solid fa-chevron-right" style="font-size:0.8rem; opacity:0.5;"></i>
            `;
            btn.onmouseenter = () => {
                btn.style.background = 'var(--secondary)';
                btn.style.color = '#111';
                btn.style.borderColor = 'var(--secondary)';
            };
            btn.onmouseleave = () => {
                btn.style.background = 'rgba(212, 175, 55, 0.05)';
                btn.style.color = '#fff';
                btn.style.borderColor = 'rgba(212, 175, 55, 0.2)';
            };
            btn.onclick = () => {
                localStorage.setItem('yasmeen_selected_country', JSON.stringify({
                    name: c.name, currency: c.currency, code: c.code, selectedAt: new Date().getTime()
                }));
                sessionStorage.setItem('yasmeen_preloader_played', 'true');
                window.location.href = 'index.html';
            };
            grid.appendChild(btn);
        });

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        closeBtn.style.cssText = `
            position: absolute; top: 15px; right: 15px; background: transparent;
            border: none; color: #fff; font-size: 1.5rem; cursor: pointer; opacity: 0.5;
            transition: opacity 0.3s;
        `;
        closeBtn.onmouseenter = () => closeBtn.style.opacity = '1';
        closeBtn.onmouseleave = () => closeBtn.style.opacity = '0.5';
        closeBtn.onclick = () => {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 400);
        };

        container.appendChild(closeBtn);
        container.appendChild(title);
        container.appendChild(grid);
        overlay.appendChild(container);
        document.body.appendChild(overlay);
        
        // Trigger reflow
        overlay.offsetHeight;
    }
    overlay.style.opacity = '1';
}

document.addEventListener('DOMContentLoaded', updateRegionUI);






