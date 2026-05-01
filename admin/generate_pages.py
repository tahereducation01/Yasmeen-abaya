import os
import re

base_dir = r"c:\Users\hussa\Desktop\Yasmin-abaya-main\Yasmin-abaya-main\admin"
index_file = os.path.join(base_dir, "index.html")

with open(index_file, "r", encoding="utf-8") as f:
    html = f.read()

# Extract header and everything before main content
main_content_start_match = re.search(r'(<div class="flex-1 overflow-y-auto p-8">)', html)
main_content_end_match = re.search(r'(<footer class="text-center text-xs text-gray-400 py-4 font-heading italic">)', html)

before_content = html[:main_content_start_match.start() + len(main_content_start_match.group(1))]
after_content = html[main_content_end_match.start():]

def generate_page(filename, active_nav_href, page_title, page_subtitle, content_html):
    # Update active nav state
    page_html = before_content
    
    # Remove active class from index.html (Dashboard)
    page_html = page_html.replace('bg-gold/10 text-gold rounded-none border-l-2 border-gold', 'text-gray-400 hover:text-gold hover:bg-white/5')
    
    # Add active class to target nav
    target_nav_regex = r'(<a href="' + active_nav_href + r'".*?)text-gray-400 hover:text-gold hover:bg-white/5'
    page_html = re.sub(target_nav_regex, r'\1bg-gold/10 text-gold rounded-none border-l-2 border-gold', page_html)
    
    # Insert custom content
    full_html = page_html + f'''
            <div class="flex justify-between items-end mb-8">
                <div>
                    <h1 class="font-heading text-3xl text-primary mb-1">{page_title}</h1>
                    <p class="text-sm text-gray-500 tracking-wide">{page_subtitle}</p>
                </div>
            </div>
            {content_html}
            ''' + after_content
            
    with open(os.path.join(base_dir, filename), "w", encoding="utf-8") as f:
        f.write(full_html)

# --- PRODUCTS PAGE ---
products_content = """
            <div class="bg-white border border-border mb-10">
                <div class="px-6 py-5 border-b border-border flex justify-between items-center">
                    <h2 class="font-heading text-xl text-primary">Catalog Details</h2>
                    <button class="bg-primary text-white hover:bg-gold px-4 py-2 text-xs uppercase tracking-widest transition-colors flex items-center gap-2">
                        <i class="fa-solid fa-plus"></i> Add Product
                    </button>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm">
                        <thead class="bg-soft text-gray-500 text-xs uppercase tracking-widest border-b border-border">
                            <tr>
                                <th class="px-6 py-4 font-normal">Design</th>
                                <th class="px-6 py-4 font-normal">Rolls (Stock)</th>
                                <th class="px-6 py-4 font-normal">Warehouse</th>
                                <th class="px-6 py-4 font-normal">Rating</th>
                                <th class="px-6 py-4 font-normal">Discount</th>
                                <th class="px-6 py-4 font-normal text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border">
                            <tr class="hover:bg-soft/50 transition-colors">
                                <td class="px-6 py-4 flex items-center gap-3">
                                    <div class="w-10 h-10 bg-gray-200 border border-border flex items-center justify-center"><i class="fa-solid fa-image text-gray-400"></i></div>
                                    <div>
                                        <p class="font-medium text-primary">Royal Velvet Abaya</p>
                                        <p class="text-xs text-gray-500">Luxury Collection</p>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="inline-block px-2 py-1 bg-primary text-white text-xs mr-2">1 Roll</span>
                                    <span class="font-medium text-primary block mt-1">50 Units</span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="inline-flex items-center gap-1.5"><i class="fa-solid fa-location-dot text-gold text-xs"></i> Al Ahmadi Hub</span>
                                </td>
                                <td class="px-6 py-4 text-gold text-xs">
                                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                    <span class="text-gray-500 ml-1">(4.9)</span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="inline-block px-2 py-1 bg-red-50 text-red-600 border border-red-100 text-xs">20% SALE</span>
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <button class="text-gray-400 hover:text-gold"><i class="fa-solid fa-pen-to-square"></i></button>
                                </td>
                            </tr>
                            <tr class="hover:bg-soft/50 transition-colors">
                                <td class="px-6 py-4 flex items-center gap-3">
                                    <div class="w-10 h-10 bg-gray-200 border border-border flex items-center justify-center"><i class="fa-solid fa-image text-gray-400"></i></div>
                                    <div>
                                        <p class="font-medium text-primary">Desert Rose Silk</p>
                                        <p class="text-xs text-gray-500">Summer Wear</p>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="inline-block px-2 py-1 bg-primary text-white text-xs mr-2">3 Rolls</span>
                                    <span class="font-medium text-primary block mt-1">150 Units</span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="inline-flex items-center gap-1.5"><i class="fa-solid fa-location-dot text-gold text-xs"></i> Hawalli Main</span>
                                </td>
                                <td class="px-6 py-4 text-gold text-xs">
                                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i>
                                    <span class="text-gray-500 ml-1">(4.5)</span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="text-gray-400">-</span>
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <button class="text-gray-400 hover:text-gold"><i class="fa-solid fa-pen-to-square"></i></button>
                                </td>
                            </tr>
                            <tr class="hover:bg-soft/50 transition-colors">
                                <td class="px-6 py-4 flex items-center gap-3">
                                    <div class="w-10 h-10 bg-gray-200 border border-border flex items-center justify-center"><i class="fa-solid fa-image text-gray-400"></i></div>
                                    <div>
                                        <p class="font-medium text-primary">Golden Thread Kaftan</p>
                                        <p class="text-xs text-gray-500">Bridal</p>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="inline-block px-2 py-1 bg-primary text-white text-xs mr-2">0.5 Rolls</span>
                                    <span class="font-medium text-red-600 block mt-1">25 Units</span>
                                    <span class="inline-block mt-1 px-1.5 py-0.5 bg-red-50 text-red-600 text-[10px] border border-red-100 uppercase tracking-tighter font-bold">Low Stock Alert</span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="inline-flex items-center gap-1.5"><i class="fa-solid fa-location-dot text-gold text-xs"></i> Farwaniya Center</span>
                                </td>
                                <td class="px-6 py-4 text-gold text-xs">
                                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i>
                                    <span class="text-gray-500 ml-1">(4.0)</span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="inline-block px-2 py-1 bg-red-50 text-red-600 border border-red-100 text-xs">10% SALE</span>
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <button class="text-gray-400 hover:text-gold"><i class="fa-solid fa-pen-to-square"></i></button>
                                </td>
                            </tr>
                            <tr class="hover:bg-soft/50 transition-colors">
                                <td class="px-6 py-4 flex items-center gap-3">
                                    <div class="w-10 h-10 bg-gray-200 border border-border flex items-center justify-center"><i class="fa-solid fa-image text-gray-400"></i></div>
                                    <div>
                                        <p class="font-medium text-primary">Onyx Embellished</p>
                                        <p class="text-xs text-gray-500">Evening Wear</p>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="inline-block px-2 py-1 bg-primary text-white text-xs mr-2">2 Rolls</span>
                                    <span class="font-medium text-primary block mt-1">100 Units</span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="inline-flex items-center gap-1.5"><i class="fa-solid fa-location-dot text-gold text-xs"></i> Jahra Warehouse</span>
                                </td>
                                <td class="px-6 py-4 text-gold text-xs">
                                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                    <span class="text-gray-500 ml-1">(4.8)</span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="text-gray-400">-</span>
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <button class="text-gray-400 hover:text-gold"><i class="fa-solid fa-pen-to-square"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
"""
generate_page("products.html", "products.html", "Products & Inventory", "Manage your luxury abaya catalog, view rolls, stock, and ratings.", products_content)


# --- WAREHOUSES PAGE ---
warehouses_content = """
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div class="bg-white border border-border p-6 hover:shadow-lg transition-shadow">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h2 class="font-heading text-2xl text-primary">Al Ahmadi Hub</h2>
                            <p class="text-xs text-gray-500"><i class="fa-solid fa-location-dot mr-1"></i> South Kuwait</p>
                        </div>
                        <span class="px-3 py-1 bg-green-50 text-green-600 text-xs border border-green-100">Operational</span>
                    </div>
                    <div class="mt-6 flex gap-8">
                        <div>
                            <p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Stock Rolls</p>
                            <p class="text-xl font-medium text-primary">12 Rolls</p>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Total Yield</p>
                            <p class="text-xl font-medium text-primary">600 Abayas</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white border border-border p-6 hover:shadow-lg transition-shadow">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h2 class="font-heading text-2xl text-primary">Hawalli Main</h2>
                            <p class="text-xs text-gray-500"><i class="fa-solid fa-location-dot mr-1"></i> Central Kuwait</p>
                        </div>
                        <span class="px-3 py-1 bg-green-50 text-green-600 text-xs border border-green-100">Operational</span>
                    </div>
                    <div class="mt-6 flex gap-8">
                        <div>
                            <p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Stock Rolls</p>
                            <p class="text-xl font-medium text-primary">25 Rolls</p>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Total Yield</p>
                            <p class="text-xl font-medium text-primary">1,250 Abayas</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white border border-border p-6 hover:shadow-lg transition-shadow">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h2 class="font-heading text-2xl text-primary">Farwaniya Center</h2>
                            <p class="text-xs text-gray-500"><i class="fa-solid fa-location-dot mr-1"></i> Kuwait City Metro</p>
                        </div>
                        <span class="px-3 py-1 bg-yellow-50 text-yellow-600 text-xs border border-yellow-100">Low Space</span>
                    </div>
                    <div class="mt-6 flex gap-8">
                        <div>
                            <p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Stock Rolls</p>
                            <p class="text-xl font-medium text-primary">45 Rolls</p>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Total Yield</p>
                            <p class="text-xl font-medium text-primary">2,250 Abayas</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white border border-border p-6 hover:shadow-lg transition-shadow">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h2 class="font-heading text-2xl text-primary">Jahra Warehouse</h2>
                            <p class="text-xs text-gray-500"><i class="fa-solid fa-location-dot mr-1"></i> West Kuwait</p>
                        </div>
                        <span class="px-3 py-1 bg-green-50 text-green-600 text-xs border border-green-100">Operational</span>
                    </div>
                    <div class="mt-6 flex gap-8">
                        <div>
                            <p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Stock Rolls</p>
                            <p class="text-xl font-medium text-primary">8 Rolls</p>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Total Yield</p>
                            <p class="text-xl font-medium text-primary">400 Abayas</p>
                        </div>
                    </div>
                </div>
            </div>
"""
generate_page("warehouses.html", "warehouses.html", "Warehouse Locations", "Monitor your inventory distribution across Kuwait's regions.", warehouses_content)


# --- ORDERS PAGE ---
orders_content = """
            <div class="bg-white border border-border mb-10">
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm">
                        <thead class="bg-soft text-gray-500 text-xs uppercase tracking-widest border-b border-border">
                            <tr>
                                <th class="px-6 py-4 font-normal">Order ID</th>
                                <th class="px-6 py-4 font-normal">Customer</th>
                                <th class="px-6 py-4 font-normal">Items</th>
                                <th class="px-6 py-4 font-normal">Total</th>
                                <th class="px-6 py-4 font-normal">Notes</th>
                                <th class="px-6 py-4 font-normal">Status</th>
                                <th class="px-6 py-4 font-normal text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border">
                            <tr class="hover:bg-soft/50 transition-colors">
                                <td class="px-6 py-4 font-medium">#ORD-0928</td>
                                <td class="px-6 py-4">
                                    <p class="font-medium text-primary">Fatima Al-Sabah</p>
                                </td>
                                <td class="px-6 py-4 text-gray-500">2x Royal Velvet, 1x Cashmere</td>
                                <td class="px-6 py-4 font-medium">450 KWD</td>
                                <td class="px-6 py-4 text-xs italic text-gray-400">Please deliver after 5 PM.</td>
                                <td class="px-6 py-4">
                                    <span class="px-2 py-1 bg-yellow-50 text-yellow-600 text-xs border border-yellow-100">Processing</span>
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <button class="text-gray-400 hover:text-gold"><i class="fa-solid fa-eye"></i></button>
                                </td>
                            </tr>
                            <tr class="hover:bg-soft/50 transition-colors">
                                <td class="px-6 py-4 font-medium">#ORD-0927</td>
                                <td class="px-6 py-4">
                                    <p class="font-medium text-primary">Sheikha Noura</p>
                                </td>
                                <td class="px-6 py-4 text-gray-500">1x Gilded Embroidery</td>
                                <td class="px-6 py-4 font-medium">210 KWD</td>
                                <td class="px-6 py-4 text-xs italic text-gray-400">-</td>
                                <td class="px-6 py-4">
                                    <span class="px-2 py-1 bg-green-50 text-green-600 text-xs border border-green-100">Shipped</span>
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <button class="text-gray-400 hover:text-gold"><i class="fa-solid fa-eye"></i></button>
                                </td>
                            </tr>
                            <tr class="hover:bg-soft/50 transition-colors">
                                <td class="px-6 py-4 font-medium">#ORD-0926</td>
                                <td class="px-6 py-4">
                                    <p class="font-medium text-primary">Mariam Abdullah</p>
                                </td>
                                <td class="px-6 py-4 text-gray-500">3x Desert Rose Silk</td>
                                <td class="px-6 py-4 font-medium">360 KWD</td>
                                <td class="px-6 py-4 text-xs italic text-gray-400">Ring the bell twice please.</td>
                                <td class="px-6 py-4">
                                    <span class="px-2 py-1 bg-green-50 text-green-600 text-xs border border-green-100">Delivered</span>
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <button class="text-gray-400 hover:text-gold"><i class="fa-solid fa-eye"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
"""
generate_page("orders.html", "orders.html", "Recent Orders", "Manage and fulfill your luxury orders.", orders_content)


# --- CUSTOMERS PAGE ---
customers_content = """
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div class="bg-white border border-border p-6 text-center">
                    <img src="https://ui-avatars.com/api/?name=Fatima+Al-Sabah&background=111&color=fff" class="w-20 h-20 rounded-full mx-auto mb-4">
                    <h3 class="font-heading text-xl text-primary">Fatima Al-Sabah</h3>
                    <p class="text-xs text-gray-500 mb-4">VIP Client</p>
                    <div class="border-t border-border pt-4 flex justify-around">
                        <div><p class="text-xs text-gray-500">Orders</p><p class="font-medium">12</p></div>
                        <div><p class="text-xs text-gray-500">Spent</p><p class="font-medium text-gold">4,200 KWD</p></div>
                    </div>
                </div>
                <div class="bg-white border border-border p-6 text-center">
                    <img src="https://ui-avatars.com/api/?name=Sheikha+Noura&background=D4AF37&color=111" class="w-20 h-20 rounded-full mx-auto mb-4">
                    <h3 class="font-heading text-xl text-primary">Sheikha Noura</h3>
                    <p class="text-xs text-gray-500 mb-4">Diamond Client</p>
                    <div class="border-t border-border pt-4 flex justify-around">
                        <div><p class="text-xs text-gray-500">Orders</p><p class="font-medium">28</p></div>
                        <div><p class="text-xs text-gray-500">Spent</p><p class="font-medium text-gold">11,500 KWD</p></div>
                    </div>
                </div>
                <div class="bg-white border border-border p-6 text-center">
                    <img src="https://ui-avatars.com/api/?name=Aisha+Mohammed&background=111&color=fff" class="w-20 h-20 rounded-full mx-auto mb-4">
                    <h3 class="font-heading text-xl text-primary">Aisha Mohammed</h3>
                    <p class="text-xs text-gray-500 mb-4">Regular Client</p>
                    <div class="border-t border-border pt-4 flex justify-around">
                        <div><p class="text-xs text-gray-500">Orders</p><p class="font-medium">3</p></div>
                        <div><p class="text-xs text-gray-500">Spent</p><p class="font-medium text-gold">850 KWD</p></div>
                    </div>
                </div>
            </div>
"""
generate_page("customers.html", "customers.html", "Clientele", "View your VIP and regular clients.", customers_content)


# --- CATEGORIES PAGE ---
categories_content = """
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                <div class="bg-white border border-border p-6">
                    <h3 class="font-heading text-xl text-primary mb-2">Luxury Collection</h3>
                    <p class="text-sm text-gray-500 mb-4">High-end, handcrafted abayas with premium silk.</p>
                    <div class="flex justify-between items-center text-xs">
                        <span class="text-primary font-medium">45 Products</span>
                        <a href="#" class="text-gold uppercase tracking-widest hover:underline">Edit</a>
                    </div>
                </div>
                <div class="bg-white border border-border p-6">
                    <h3 class="font-heading text-xl text-primary mb-2">Everyday Essentials</h3>
                    <p class="text-sm text-gray-500 mb-4">Comfortable, minimal designs for daily wear.</p>
                    <div class="flex justify-between items-center text-xs">
                        <span class="text-primary font-medium">120 Products</span>
                        <a href="#" class="text-gold uppercase tracking-widest hover:underline">Edit</a>
                    </div>
                </div>
                <div class="bg-white border border-border p-6">
                    <h3 class="font-heading text-xl text-primary mb-2">Bridal & Evening</h3>
                    <p class="text-sm text-gray-500 mb-4">Intricate embroidery and rare fabrics for special occasions.</p>
                    <div class="flex justify-between items-center text-xs">
                        <span class="text-primary font-medium">25 Products</span>
                        <a href="#" class="text-gold uppercase tracking-widest hover:underline">Edit</a>
                    </div>
                </div>
            </div>
"""
generate_page("categories.html", "categories.html", "Brands & Categories", "Manage your product lines and categories.", categories_content)


# --- REPORTS PAGE ---
reports_content = """
            <div class="bg-white border border-border p-8 mb-10 text-center text-gray-500">
                <i class="fa-solid fa-chart-pie text-4xl mb-4 text-gold opacity-50"></i>
                <h3 class="font-heading text-xl text-primary mb-2">Sales Analytics</h3>
                <p class="text-sm max-w-md mx-auto">Detailed charts and revenue analytics will be displayed here, showing warehouse performance and product demand in Kuwait.</p>
            </div>
"""
generate_page("reports.html", "reports.html", "Performance Reports", "Analyze your boutique's growth and sales trends.", reports_content)


# --- COUPONS PAGE ---
coupons_content = """
            <div class="bg-white border border-border mb-10">
                <div class="px-6 py-5 border-b border-border flex justify-between items-center">
                    <h2 class="font-heading text-xl text-primary">Active Promotions</h2>
                    <button class="bg-primary text-white hover:bg-gold px-4 py-2 text-xs uppercase tracking-widest transition-colors flex items-center gap-2">
                        <i class="fa-solid fa-plus"></i> Create Coupon
                    </button>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm">
                        <thead class="bg-soft text-gray-500 text-xs uppercase tracking-widest border-b border-border">
                            <tr>
                                <th class="px-6 py-4 font-normal">Code</th>
                                <th class="px-6 py-4 font-normal">Discount</th>
                                <th class="px-6 py-4 font-normal">Usage</th>
                                <th class="px-6 py-4 font-normal">Expiry</th>
                                <th class="px-6 py-4 font-normal">Status</th>
                                <th class="px-6 py-4 font-normal text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border">
                            <tr class="hover:bg-soft/50 transition-colors">
                                <td class="px-6 py-4 font-medium text-gold tracking-widest uppercase">YASMIN10</td>
                                <td class="px-6 py-4">10% Off Sitewide</td>
                                <td class="px-6 py-4">156 times</td>
                                <td class="px-6 py-4 text-gray-500">Dec 31, 2026</td>
                                <td class="px-6 py-4">
                                    <span class="px-2 py-1 bg-green-50 text-green-600 text-xs border border-green-100">Active</span>
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <button class="text-gray-400 hover:text-gold"><i class="fa-solid fa-pen-to-square"></i></button>
                                </td>
                            </tr>
                            <tr class="hover:bg-soft/50 transition-colors">
                                <td class="px-6 py-4 font-medium text-gold tracking-widest uppercase">WELCOME20</td>
                                <td class="px-6 py-4">20% First Order</td>
                                <td class="px-6 py-4">842 times</td>
                                <td class="px-6 py-4 text-gray-500">No Expiry</td>
                                <td class="px-6 py-4">
                                    <span class="px-2 py-1 bg-green-50 text-green-600 text-xs border border-green-100">Active</span>
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <button class="text-gray-400 hover:text-gold"><i class="fa-solid fa-pen-to-square"></i></button>
                                </td>
                            </tr>
                            <tr class="hover:bg-soft/50 transition-colors">
                                <td class="px-6 py-4 font-medium text-gold tracking-widest uppercase">VIP50</td>
                                <td class="px-6 py-4">50% Exclusive</td>
                                <td class="px-6 py-4">12 times</td>
                                <td class="px-6 py-4 text-gray-500">Jun 30, 2026</td>
                                <td class="px-6 py-4">
                                    <span class="px-2 py-1 bg-green-50 text-green-600 text-xs border border-green-100">Active</span>
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <button class="text-gray-400 hover:text-gold"><i class="fa-solid fa-pen-to-square"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
"""
generate_page("coupons.html", "coupons.html", "Promo Codes & Coupons", "Manage your luxury boutique's promotional offers and VIP discounts.", coupons_content)


# --- SETTINGS PAGE ---
settings_content = """
            <div class="bg-white border border-border max-w-2xl">
                <div class="p-6 border-b border-border">
                    <h3 class="font-heading text-xl text-primary mb-1">Boutique Profile</h3>
                    <p class="text-sm text-gray-500">Manage Yasmin Abaya brand settings.</p>
                </div>
                <div class="p-6 space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-primary mb-2">Brand Name</label>
                        <input type="text" value="Yasmin Abaya" class="w-full px-4 py-2 border border-border focus:outline-none focus:border-gold text-sm font-body">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-primary mb-2">Headquarters</label>
                        <input type="text" value="Al Hamra Tower, Kuwait City" class="w-full px-4 py-2 border border-border focus:outline-none focus:border-gold text-sm font-body">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-primary mb-2">Currency</label>
                        <select class="w-full px-4 py-2 border border-border focus:outline-none focus:border-gold text-sm font-body bg-white">
                            <option>KWD (Kuwaiti Dinar)</option>
                            <option>USD (US Dollar)</option>
                        </select>
                    </div>
                    <button class="bg-primary text-white hover:bg-gold px-6 py-2 text-sm uppercase tracking-widest transition-colors">
                        Save Settings
                    </button>
                </div>
            </div>
"""
generate_page("settings.html", "settings.html", "System Settings", "Configure your luxury CRM platform.", settings_content)

print("Pages generated successfully.")
