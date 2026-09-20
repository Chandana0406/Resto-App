/* ============================================================
   Akshaya Patri Hotel - Advance Food Pre-Booking System
   script.js - Vanilla JavaScript
   ============================================================ */

/* ========== FOOD MENU DATA ========== */
const menuItems = [
    {
        id: 1,
        name: "Chicken Biriyani",
        description: "Aromatic basmati rice with tender chicken pieces and traditional biriyani spices.",
        price: 220,
        icon: "🍗"
    },
    {
        id: 2,
        name: "Mutton Biriyani",
        description: "Fragrant basmati rice cooked with succulent mutton and rich spices.",
        price: 280,
        icon: "🍖"
    },
    {
        id: 3,
        name: "Chicken Kebab",
        description: "Juicy boneless chicken chunks marinated and grilled to perfection.",
        price: 150,
        icon: "🍢"
    },
    {
        id: 4,
        name: "Mutton Kebab",
        description: "Tender mutton pieces in aromatic spices, charcoal grilled.",
        price: 200,
        icon: "🥩"
    },
    {
        id: 5,
        name: "Botti",
        description: "Spicy mutton intestine fry with traditional South Indian masala.",
        price: 180,
        icon: "🌶️"
    },
    {
        id: 6,
        name: "Kushka",
        description: "Plain aromatic biriyani rice cooked with ghee and whole spices.",
        price: 120,
        icon: "🍚"
    },
    {
        id: 7,
        name: "Chicken 65",
        description: "Crispy fried chicken tossed in spicy South Indian 65 masala.",
        price: 170,
        icon: "🍤"
    },
    {
        id: 8,
        name: "Egg Biriyani",
        description: "Fragrant basmati rice with boiled eggs and flavorful biriyani masala.",
        price: 160,
        icon: "🥚"
    },
    {
        id: 9,
        name: "Chicken Fry",
        description: "Crispy golden chicken fry with spicy coating and curry leaves.",
        price: 160,
        icon: "🍗"
    },
    {
        id: 10,
        name: "Mutton Fry",
        description: "Tender mutton pieces deep fried with South Indian spice blend.",
        price: 240,
        icon: "🍖"
    }
];

/* ========== CART / ORDER STATE ========== */
let cart = [];
let orders = [];
let bookingCounter = 1;

/* ========== SAMPLE ORDERS FOR OWNER DASHBOARD ========== */
const sampleOrders = [
    {
        bookingId: "APH-2026-00101",
        customerName: "Rahul Sharma",
        mobile: "9876543210",
        pickupDate: "2026-09-21",
        pickupTime: "1:00 PM",
        items: [
            { name: "Chicken Biriyani", qty: 2, price: 220, subtotal: 440 },
            { name: "Chicken 65", qty: 1, price: 170, subtotal: 170 }
        ],
        totalAmount: 610,
        paymentStatus: "Paid",
        orderStatus: "Preparing",
        notes: ""
    },
    {
        bookingId: "APH-2026-00102",
        customerName: "Priya Reddy",
        mobile: "9988776655",
        pickupDate: "2026-09-21",
        pickupTime: "7:30 PM",
        items: [
            { name: "Mutton Biriyani", qty: 1, price: 280, subtotal: 280 },
            { name: "Mutton Kebab", qty: 1, price: 200, subtotal: 200 },
            { name: "Kushka", qty: 1, price: 120, subtotal: 120 }
        ],
        totalAmount: 600,
        paymentStatus: "Paid",
        orderStatus: "Pending",
        notes: "Less spicy please"
    },
    {
        bookingId: "APH-2026-00103",
        customerName: "Arun Kumar",
        mobile: "9012345678",
        pickupDate: "2026-09-20",
        pickupTime: "8:00 PM",
        items: [
            { name: "Egg Biriyani", qty: 3, price: 160, subtotal: 480 }
        ],
        totalAmount: 480,
        paymentStatus: "Paid",
        orderStatus: "Ready for Pickup",
        notes: ""
    },
    {
        bookingId: "APH-2026-00104",
        customerName: "Meera Nair",
        mobile: "9345678901",
        pickupDate: "2026-09-20",
        pickupTime: "2:00 PM",
        items: [
            { name: "Chicken Kebab", qty: 2, price: 150, subtotal: 300 },
            { name: "Chicken Fry", qty: 1, price: 160, subtotal: 160 }
        ],
        totalAmount: 460,
        paymentStatus: "Paid",
        orderStatus: "Collected",
        notes: "Extra onion on side"
    },
    {
        bookingId: "APH-2026-00105",
        customerName: "Vikram Singh",
        mobile: "9567890123",
        pickupDate: "2026-09-22",
        pickupTime: "12:30 PM",
        items: [
            { name: "Mutton Biriyani", qty: 2, price: 280, subtotal: 560 },
            { name: "Botti", qty: 1, price: 180, subtotal: 180 },
            { name: "Mutton Fry", qty: 1, price: 240, subtotal: 240 }
        ],
        totalAmount: 980,
        paymentStatus: "Paid",
        orderStatus: "Pending",
        notes: ""
    }
];

/* ========== INITIALIZATION ========== */
document.addEventListener("DOMContentLoaded", function () {
    renderMenu();
    setMinDate();
    orders = [...sampleOrders];
    bookingCounter = 106;
    renderOwnerDashboard();
    initEventListeners();
    updateSummaryCounts();
});

/* ========== RENDER MENU CARDS ========== */
function renderMenu() {
    const menuGrid = document.getElementById("menuGrid");
    menuGrid.innerHTML = "";

    menuItems.forEach(item => {
        const card = document.createElement("div");
        card.className = "food-card";
        card.innerHTML = `
            <div class="food-img">${item.icon}</div>
            <div class="food-body">
                <h3 class="food-name">${item.name}</h3>
                <p class="food-desc">${item.description}</p>
                <div class="food-footer">
                    <span class="food-price">₹${item.price}</span>
                    <div class="quantity-selector" data-id="${item.id}">
                        <button class="qty-btn qty-decrease" data-id="${item.id}">−</button>
                        <span class="qty-value" id="qty-${item.id}">1</span>
                        <button class="qty-btn qty-increase" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="add-to-order-btn" data-id="${item.id}">
                    <span>🛒</span> Add to Order
                </button>
            </div>
        `;
        menuGrid.appendChild(card);
    });

    attachMenuEventListeners();
}

/* ========== MENU EVENT LISTENERS ========== */
function attachMenuEventListeners() {
    document.querySelectorAll(".qty-increase").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.target.dataset.id);
            changeMenuQty(id, 1);
        });
    });

    document.querySelectorAll(".qty-decrease").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.target.dataset.id);
            changeMenuQty(id, -1);
        });
    });

    document.querySelectorAll(".add-to-order-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.currentTarget.dataset.id);
            addToCart(id);
        });
    });
}

/* ========== CHANGE MENU QTY DISPLAY ========== */
function changeMenuQty(itemId, delta) {
    const qtyEl = document.getElementById(`qty-${itemId}`);
    let current = parseInt(qtyEl.textContent);
    current = Math.max(1, Math.min(20, current + delta));
    qtyEl.textContent = current;
}

/* ========== ADD TO CART ========== */
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    const qtyEl = document.getElementById(`qty-${itemId}`);
    const quantity = parseInt(qtyEl.textContent);

    const existing = cart.find(c => c.id === itemId);
    if (existing) {
        existing.qty += quantity;
        existing.subtotal = existing.qty * existing.price;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            qty: quantity,
            subtotal: quantity * item.price
        });
    }

    qtyEl.textContent = 1;
    renderCart();
    showToast(`${item.name} × ${quantity} added to order!`, "success");
}

/* ========== REMOVE FROM CART ========== */
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    renderCart();
    showToast("Item removed from order", "info");
}

/* ========== CHANGE CART QTY ========== */
function changeCartQty(itemId, delta) {
    const item = cart.find(c => c.id === itemId);
    if (!item) return;

    item.qty = Math.max(1, Math.min(20, item.qty + delta));
    item.subtotal = item.qty * item.price;
    renderCart();
}

/* ========== RENDER CART ========== */
function renderCart() {
    const cartItemsEl = document.getElementById("cartItems");
    const subtotalEl = document.getElementById("subtotalAmount");
    const totalEl = document.getElementById("totalAmount");

    if (cart.length === 0) {
        cartItemsEl.innerHTML = `<p class="empty-cart">No items added yet. Please select food from the menu above.</p>`;
        subtotalEl.textContent = "₹0";
        totalEl.textContent = "₹0";
        return;
    }

    cartItemsEl.innerHTML = "";
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.subtotal;
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-meta">₹${item.price} each</div>
            </div>
            <div class="cart-item-qty">
                <button class="qty-btn cart-qty-decrease" data-id="${item.id}">−</button>
                <span class="qty-value">${item.qty}</span>
                <button class="qty-btn cart-qty-increase" data-id="${item.id}">+</button>
            </div>
            <div class="cart-item-subtotal">₹${item.subtotal}</div>
            <button class="remove-item-btn" data-id="${item.id}" title="Remove item">🗑️</button>
        `;
        cartItemsEl.appendChild(cartItem);
    });

    subtotalEl.textContent = `₹${subtotal}`;
    totalEl.textContent = `₹${subtotal}`;

    attachCartEventListeners();
}

/* ========== CART EVENT LISTENERS ========== */
function attachCartEventListeners() {
    document.querySelectorAll(".cart-qty-increase").forEach(btn => {
        btn.addEventListener("click", (e) => {
            changeCartQty(parseInt(e.target.dataset.id), 1);
        });
    });

    document.querySelectorAll(".cart-qty-decrease").forEach(btn => {
        btn.addEventListener("click", (e) => {
            changeCartQty(parseInt(e.target.dataset.id), -1);
        });
    });

    document.querySelectorAll(".remove-item-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            removeFromCart(parseInt(e.target.dataset.id));
        });
    });
}

/* ========== SET MINIMUM DATE FOR PICKUP ========== */
function setMinDate() {
    const dateInput = document.getElementById("bookingDate");
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const minDateStr = `${year}-${month}-${day}`;
    dateInput.min = minDateStr;
    dateInput.value = minDateStr;
}

/* ========== VALIDATE BOOKING FORM ========== */
function validateBookingForm() {
    const errors = [];

    if (cart.length === 0) {
        errors.push("Please select at least one food item from the menu.");
    }

    const bookingDate = document.getElementById("bookingDate").value;
    if (!bookingDate) {
        errors.push("Please select a pickup date.");
    } else {
        const selected = new Date(bookingDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected < today) {
            errors.push("Pickup date cannot be in the past.");
        }
    }

    const pickupTime = document.getElementById("pickupTime").value;
    if (!pickupTime) {
        errors.push("Please select a pickup time.");
    }

    const customerName = document.getElementById("customerName").value.trim();
    if (!customerName) {
        errors.push("Please enter your name.");
    } else if (customerName.length < 3) {
        errors.push("Name must be at least 3 characters.");
    }

    const mobileNumber = document.getElementById("mobileNumber").value.trim();
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileNumber) {
        errors.push("Please enter your mobile number.");
    } else if (!mobileRegex.test(mobileNumber.replace(/\D/g, "").slice(-10))) {
        errors.push("Please enter a valid 10-digit Indian mobile number.");
    }

    if (errors.length > 0) {
        errors.forEach(err => showToast(err, "error"));
        return false;
    }

    return true;
}

/* ========== PROCEED TO PAYMENT ========== */
function proceedToPayment() {
    if (!validateBookingForm()) return;

    const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
    document.getElementById("payAmount").textContent = `₹${subtotal}`;
    document.getElementById("payCustomer").textContent = document.getElementById("customerName").value.trim();

    const dateVal = document.getElementById("bookingDate").value;
    document.getElementById("payDate").textContent = formatDate(dateVal);
    document.getElementById("payTime").textContent = document.getElementById("pickupTime").value;

    openModal("paymentModal");
}

/* ========== OPEN / CLOSE MODAL ========== */
function openModal(modalId) {
    document.getElementById(modalId).classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove("active");
    document.body.style.overflow = "";
    document.getElementById("processingAnimation").classList.add("hidden");
    document.getElementById("payNowBtn").style.display = "";
}

/* ========== FORMAT DATE ========== */
function formatDate(dateStr) {
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const date = new Date(dateStr + "T00:00:00");
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

/* ========== GENERATE BOOKING ID ========== */
function generateBookingId() {
    const year = new Date().getFullYear();
    const seq = String(bookingCounter).padStart(5, "0");
    bookingCounter++;
    return `APH-${year}-${seq}`;
}

/* ========== PROCESS MOCK PAYMENT ========== */
function processPayment() {
    const payBtn = document.getElementById("payNowBtn");
    const processingEl = document.getElementById("processingAnimation");

    payBtn.style.display = "none";
    processingEl.classList.remove("hidden");

    // Mock payment processing - 2.5 seconds delay
    setTimeout(() => {
        processingEl.classList.add("hidden");
        closeModal("paymentModal");
        confirmOrder();
    }, 2500);
}

/* ========== CONFIRM ORDER ========== */
function confirmOrder() {
    const bookingId = generateBookingId();
    const customerName = document.getElementById("customerName").value.trim();
    const mobile = document.getElementById("mobileNumber").value.trim();
    const pickupDate = document.getElementById("bookingDate").value;
    const pickupTime = document.getElementById("pickupTime").value;
    const notes = document.getElementById("specialNotes").value.trim();
    const totalAmount = cart.reduce((sum, item) => sum + item.subtotal, 0);

    const itemsCopy = cart.map(item => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
        subtotal: item.subtotal
    }));

    const newOrder = {
        bookingId,
        customerName,
        mobile,
        pickupDate,
        pickupTime,
        items: itemsCopy,
        totalAmount,
        paymentStatus: "Paid",
        orderStatus: "Pending",
        notes
    };

    orders.unshift(newOrder);
    renderOwnerDashboard();
    updateSummaryCounts();

    showConfirmationPage(newOrder);
    clearBookingForm();
}

/* ========== SHOW CONFIRMATION ========== */
function showConfirmationPage(order) {
    document.getElementById("confirmBookingId").textContent = order.bookingId;
    document.getElementById("confirmCustomer").textContent = order.customerName;
    document.getElementById("confirmDate").textContent = formatDate(order.pickupDate);
    document.getElementById("confirmTime").textContent = order.pickupTime;
    document.getElementById("confirmTotal").textContent = `₹${order.totalAmount}`;

    const itemsList = document.getElementById("confirmItems");
    itemsList.innerHTML = "";
    order.items.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `<span>${item.name} × ${item.qty}</span><span>₹${item.subtotal}</span>`;
        itemsList.appendChild(li);
    });

    openModal("confirmationModal");
    showToast(`Order ${order.bookingId} placed successfully!`, "success");
}

/* ========== CLEAR BOOKING FORM ========== */
function clearBookingForm() {
    cart = [];
    renderCart();
    document.getElementById("customerName").value = "";
    document.getElementById("mobileNumber").value = "";
    document.getElementById("specialNotes").value = "";
    document.getElementById("pickupTime").value = "";

    document.querySelectorAll(".qty-value").forEach(el => {
        if (el.id && el.id.startsWith("qty-")) {
            el.textContent = "1";
        }
    });
}

/* ========== RENDER OWNER DASHBOARD ========== */
function renderOwnerDashboard() {
    const tbody = document.getElementById("ownerTableBody");
    const noOrdersEl = document.getElementById("noOrders");
    const table = document.querySelector(".owner-table");

    if (orders.length === 0) {
        tbody.innerHTML = "";
        table.style.display = "none";
        noOrdersEl.style.display = "block";
        return;
    }

    table.style.display = "";
    noOrdersEl.style.display = "none";
    tbody.innerHTML = "";

    orders.forEach((order, index) => {
        const itemsStr = order.items.map(i => `${i.name} × ${i.qty}`).join("<br>");
        const statusClass = `status-${order.orderStatus.toLowerCase().replace(/ /g, "-")}`;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${order.bookingId}</strong></td>
            <td>
                <div>${order.customerName}</div>
                <small style="color:#888;">${order.mobile}</small>
            </td>
            <td>${formatDate(order.pickupDate)}</td>
            <td>${order.pickupTime}</td>
            <td style="font-size:0.82rem;">${itemsStr}</td>
            <td><strong style="color:#A62C21;">₹${order.totalAmount}</strong></td>
            <td><span class="status-badge status-ready">${order.paymentStatus}</span></td>
            <td><span class="status-badge ${statusClass}">${order.orderStatus}</span></td>
            <td>
                <select class="status-select" data-index="${index}">
                    <option value="Pending" ${order.orderStatus === "Pending" ? "selected" : ""}>Pending</option>
                    <option value="Preparing" ${order.orderStatus === "Preparing" ? "selected" : ""}>Preparing</option>
                    <option value="Ready for Pickup" ${order.orderStatus === "Ready for Pickup" ? "selected" : ""}>Ready for Pickup</option>
                    <option value="Collected" ${order.orderStatus === "Collected" ? "selected" : ""}>Collected</option>
                </select>
            </td>
        `;
        tbody.appendChild(tr);
    });

    attachOwnerStatusListeners();
}

/* ========== OWNER STATUS CHANGE LISTENERS ========== */
function attachOwnerStatusListeners() {
    document.querySelectorAll(".status-select").forEach(select => {
        select.addEventListener("change", (e) => {
            const index = parseInt(e.target.dataset.index);
            const newStatus = e.target.value;
            orders[index].orderStatus = newStatus;
            renderOwnerDashboard();
            updateSummaryCounts();
            showToast(`Order ${orders[index].bookingId} status: ${newStatus}`, "info");
        });
    });
}

/* ========== UPDATE SUMMARY COUNTS ========== */
function updateSummaryCounts() {
    document.getElementById("totalOrdersCount").textContent = orders.length;
    document.getElementById("pendingCount").textContent = orders.filter(o => o.orderStatus === "Pending").length;
    document.getElementById("preparingCount").textContent = orders.filter(o => o.orderStatus === "Preparing").length;
    document.getElementById("readyCount").textContent = orders.filter(o => o.orderStatus === "Ready for Pickup").length;
}

/* ========== TOAST NOTIFICATIONS ========== */
function showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    const iconMap = {
        success: "✅",
        error: "❌",
        info: "ℹ️"
    };

    toast.innerHTML = `<span class="toast-icon">${iconMap[type] || iconMap.info}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("fade-out");
        setTimeout(() => toast.remove(), 400);
    }, 3800);
}

/* ========== MOBILE NAVIGATION ========== */
function toggleMobileNav() {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

function closeMobileNav() {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

/* ========== ACTIVE NAV LINK ON SCROLL ========== */
function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.pageYOffset + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");

        if (scrollY >= top && scrollY < top + height) {
            document.querySelectorAll(".nav-link").forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${id}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}

/* ========== CONTACT FORM ========== */
function handleContactForm(e) {
    e.preventDefault();
    const name = document.getElementById("contactName").value.trim();
    const phone = document.getElementById("contactPhone").value.trim();
    const message = document.getElementById("contactMsg").value.trim();
    const msgEl = document.getElementById("contactFormMsg");

    msgEl.className = "form-msg";

    if (!name || !phone || !message) {
        msgEl.textContent = "Please fill all fields.";
        msgEl.classList.add("error");
        return;
    }

    msgEl.textContent = "✅ Thank you! We will get back to you shortly.";
    msgEl.classList.add("success");

    document.getElementById("contactForm").reset();
    showToast("Message sent successfully!", "success");

    setTimeout(() => {
        msgEl.textContent = "";
    }, 6000);
}

/* ========== INIT EVENT LISTENERS ========== */
function initEventListeners() {
    document.getElementById("hamburger").addEventListener("click", toggleMobileNav);

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", closeMobileNav);
    });

    document.getElementById("proceedToPayment").addEventListener("click", proceedToPayment);

    document.getElementById("closePayment").addEventListener("click", () => closeModal("paymentModal"));
    document.getElementById("closeConfirmation").addEventListener("click", () => closeModal("confirmationModal"));
    document.getElementById("confirmCloseBtn").addEventListener("click", () => closeModal("confirmationModal"));

    document.getElementById("payNowBtn").addEventListener("click", processPayment);

    document.getElementById("paymentModal").addEventListener("click", (e) => {
        if (e.target.id === "paymentModal") closeModal("paymentModal");
    });
    document.getElementById("confirmationModal").addEventListener("click", (e) => {
        if (e.target.id === "confirmationModal") closeModal("confirmationModal");
    });

    document.getElementById("contactForm").addEventListener("submit", handleContactForm);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeModal("paymentModal");
            closeModal("confirmationModal");
        }
    });

    window.addEventListener("scroll", updateActiveNavLink);
}
