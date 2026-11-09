
/* =========================================
   COMMERCEIQ - E-COMMERCE ANALYTICS
========================================= */


// =========================================
// SAMPLE DATA
// =========================================

const customers = [
    "Rahul Sharma", "Priya Verma", "Aman Gupta",
    "Sneha Kapoor", "Karan Singh", "Neha Jain",
    "Arjun Mehta", "Ananya Roy", "Rohit Malhotra",
    "Meera Sethi", "Vikram Patel", "Isha Malhotra",
    "Aditya Kumar", "Riya Sharma", "Kabir Khan",
    "Simran Kaur", "Dev Malhotra", "Pooja Mehta",
    "Harsh Agarwal", "Nisha Gupta"
];

const products = [
    { name: "iPhone 15", price: 79999 },
    { name: "MacBook Air", price: 89999 },
    { name: "Sony Headphones", price: 12999 },
    { name: "Samsung Watch", price: 15999 },
    { name: "Mechanical Keyboard", price: 4999 },
    { name: "Dell Laptop", price: 65999 },
    { name: "Wireless Mouse", price: 1999 },
    { name: "iPad Air", price: 59999 },
    { name: "Bluetooth Speaker", price: 6999 },
    { name: "Gaming Monitor", price: 24999 },
    { name: "Samsung Galaxy S24", price: 74999 },
    { name: "AirPods Pro", price: 24999 },
    { name: "HP Pavilion", price: 58999 },
    { name: "Smart TV", price: 39999 },
    { name: "Canon Camera", price: 45999 }
];

const statuses = [
    "Delivered", "Delivered", "Pending",
    "Delivered", "Cancelled", "Delivered",
    "Refunded", "Pending", "Delivered",
    "Delivered"
];

const payments = ["Paid", "Paid", "Paid", "Unpaid"];

const orders = Array.from({ length: 122 }, (_, index) => {

    const orderDate = new Date();

    orderDate.setHours(12, 0, 0, 0);
    orderDate.setDate(orderDate.getDate() - (index * 3));

    const product = products[index % products.length];
    const customer = customers[index % customers.length];
    const status = statuses[index % statuses.length];

    const payment = status === "Refunded"
        ? "Paid"
        : payments[index % payments.length];

    const amount = product.price + ((index * 137) % 1500);

    return {
        id: `ORD-${1001 + index}`,
        customer,
        product: product.name,

        date: orderDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }),

        amount,
        payment,
        status
    };
});


// =========================================
// HTML ELEMENTS
// =========================================

const tableBody = document.getElementById("ordersTableBody");
const orderCount = document.getElementById("orderCount");

const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

const dateRange = document.getElementById("dateRange");
const customDateRange = document.getElementById("customDateRange");

const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");

const applyDateBtn = document.getElementById("applyDateBtn");

const allOrdersTableBody =
    document.getElementById("allOrdersTableBody");

const allOrdersSearch =
    document.getElementById("allOrdersSearch");

const allOrdersStatus =
    document.getElementById("allOrdersStatus");


// =========================================
// CHARTS
// =========================================


// REVENUE CHART

const revenueChart = new Chart(
    document.getElementById("revenueChart"),
    {
        type: "line",

        data: {
            labels: [],
            datasets: [{
                label: "Revenue",
                data: [],
                borderColor: "#635bff",
                backgroundColor: "rgba(99, 91, 255, 0.10)",
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 7,
                pointBackgroundColor: "#635bff"
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: { display: false }
            },

            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: "#f0f1f5" },

                    ticks: {
                        callback: value => "₹" + value / 1000 + "k"
                    }
                },

                x: {
                    grid: { display: false }
                }
            }
        }
    }
);


// ORDERS CHART

const ordersChart = new Chart(
    document.getElementById("ordersChart"),
    {
        type: "bar",

        data: {
            labels: [],
            datasets: [{
                label: "Orders",
                data: [],
                backgroundColor: "#16a477",
                borderRadius: 7,
                barThickness: 25
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: { display: false }
            },

            scales: {
                y: {
                    beginAtZero: true,

                    ticks: {
                        precision: 0
                    },

                    grid: {
                        color: "#f0f1f5"
                    }
                },

                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    }
);


// STATUS CHART

const statusChart = new Chart(
    document.getElementById("statusChart"),
    {
        type: "doughnut",

        data: {
            labels: [
                "Delivered",
                "Pending",
                "Cancelled",
                "Refunded"
            ],

            datasets: [{
                data: [0, 0, 0, 0],

                backgroundColor: [
                    "#16a477",
                    "#f5a623",
                    "#e45c75",
                    "#635bff"
                ],

                borderWidth: 0,
                hoverOffset: 8
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "68%",

            plugins: {
                legend: {
                    position: "bottom",

                    labels: {
                        usePointStyle: true,
                        padding: 20,

                        font: {
                            size: 11
                        }
                    }
                }
            }
        }
    }
);


// PRODUCTS CHART

const productsChart = new Chart(
    document.getElementById("productsChart"),
    {
        type: "bar",

        data: {
            labels: [
                "Smartphone",
                "Laptop",
                "Headphones",
                "Smart Watch",
                "Keyboard"
            ],

            datasets: [{
                label: "Revenue",
                data: [85000, 72000, 48000, 35000, 22000],

                backgroundColor: [
                    "#635bff",
                    "#817bff",
                    "#a29eff",
                    "#bdbaff",
                    "#d5d3ff"
                ],

                borderRadius: 7,
                barThickness: 22
            }]
        },

        options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: { display: false }
            },

            scales: {
                x: {
                    beginAtZero: true,
                    grid: { color: "#f0f1f5" },

                    ticks: {
                        callback: value => "₹" + value / 1000 + "k"
                    }
                },

                y: {
                    grid: { display: false }
                }
            }
        }
    }
);


// =========================================
// COMMON TABLE ROW
// =========================================

function createOrderRow(order) {

    const row = document.createElement("tr");

    row.dataset.orderId = order.id;
    row.style.cursor = "pointer";

    const statusClass = {
        Delivered: "status-delivered",
        Pending: "status-pending",
        Cancelled: "status-cancelled",
        Refunded: "status-refunded"
    };

    const paymentClass = order.payment === "Paid"
        ? "payment-paid"
        : "payment-unpaid";

    row.innerHTML = `
        <td>${order.id}</td>
        <td>${order.customer}</td>
        <td>${order.product}</td>
        <td>${order.date}</td>

        <td>
            ₹${order.amount.toLocaleString("en-IN")}
        </td>

        <td>
            <span class="payment-badge ${paymentClass}">
                ${order.payment}
            </span>
        </td>

        <td>
            <span class="status-badge ${statusClass[order.status]}">
                ${order.status}
            </span>
        </td>
    `;

    return row;
}


// =========================================
// DASHBOARD ORDERS TABLE
// =========================================

function displayOrders(data) {

    tableBody.innerHTML = "";

    data.forEach(order => {

        const row = createOrderRow(order);

        tableBody.appendChild(row);

    });

    orderCount.textContent =
        `Showing ${data.length} of ${orders.length} orders`;
}


// =========================================
// ALL ORDERS PAGE
// =========================================

function displayAllOrders(data) {

    allOrdersTableBody.innerHTML = "";

    data.forEach(order => {

        const row = createOrderRow(order);

        allOrdersTableBody.appendChild(row);

    });

    document.getElementById("allOrdersCount").textContent =
        `Showing ${data.length} of ${orders.length} orders`;
}


// =========================================
// ORDERS SUMMARY
// =========================================

function updateOrdersSummary(data) {

    const total = data.length;

    const delivered = data.filter(
        order => order.status === "Delivered"
    ).length;

    const pending = data.filter(
        order => order.status === "Pending"
    ).length;

    const cancelled = data.filter(
        order => order.status === "Cancelled"
    ).length;

    document.getElementById("allTotalOrders").textContent = total;

    document.getElementById("allDeliveredOrders").textContent = delivered;

    document.getElementById("allPendingOrders").textContent = pending;

    document.getElementById("allCancelledOrders").textContent = cancelled;
}


// =========================================
// ORDERS PAGE SEARCH & FILTER
// =========================================

function applyAllOrdersFilters() {

    const searchValue =
        allOrdersSearch.value.toLowerCase().trim();

    const selectedStatus = allOrdersStatus.value;

    const filteredOrders = orders.filter(order => {

        const matchesSearch =
            order.id.toLowerCase().includes(searchValue) ||
            order.customer.toLowerCase().includes(searchValue) ||
            order.product.toLowerCase().includes(searchValue);

        const matchesStatus =
            selectedStatus === "all" ||
            order.status === selectedStatus;

        return matchesSearch && matchesStatus;

    });

    displayAllOrders(filteredOrders);
}


// =========================================
// DATE FILTER
// =========================================

function parseOrderDate(dateString) {

    const [day, month, year] = dateString.split(" ");

    const monthIndex = new Date(
        `${month} 1, 2000`
    ).getMonth();

    return new Date(
        Number(year),
        monthIndex,
        Number(day)
    );
}


function applyDateFilter(showErrors = false) {

    const selectedRange = dateRange.value;

    const searchValue =
        searchInput.value.toLowerCase().trim();

    const selectedStatus = statusFilter.value;

    const today = new Date();

    today.setHours(23, 59, 59, 999);

    let startDate;
    let endDate = today;


    // CUSTOM DATE RANGE

    if (selectedRange === "custom") {

        if (!startDateInput.value || !endDateInput.value) {

            if (showErrors) {
                alert("Please select both dates!");
            }

            return;
        }

        startDate = new Date(
            startDateInput.value + "T00:00:00"
        );

        endDate = new Date(
            endDateInput.value + "T23:59:59.999"
        );

        if (startDate > endDate) {

            if (showErrors) {
                alert("Start date cannot be after end date!");
            }

            return;
        }

        if (endDate > today) {

            if (showErrors) {
                alert("Future dates are not allowed!");
            }

            return;
        }
    }


    // THIS YEAR

    else if (selectedRange === "year") {

        startDate = new Date(
            today.getFullYear(),
            0,
            1
        );
    }


    // LAST 7, 30, 90 OR 365 DAYS

    else {

        startDate = new Date(today);

        startDate.setDate(
            today.getDate() - (Number(selectedRange) - 1)
        );

        startDate.setHours(0, 0, 0, 0);
    }


    // FILTER ORDERS

    const filteredOrders = orders.filter(order => {

        const orderDate = parseOrderDate(order.date);

        orderDate.setHours(0, 0, 0, 0);

        const matchesDate =
            orderDate >= startDate &&
            orderDate <= endDate;

        const matchesSearch =
            order.id.toLowerCase().includes(searchValue) ||
            order.customer.toLowerCase().includes(searchValue) ||
            order.product.toLowerCase().includes(searchValue);

        const matchesStatus =
            selectedStatus === "all" ||
            order.status === selectedStatus;

        return matchesDate && matchesSearch && matchesStatus;

    });


    // UPDATE DASHBOARD TABLE

    displayOrders(filteredOrders);


    // =====================================
    // UPDATE KPI CARDS
    // =====================================

    const totalRevenue = filteredOrders.reduce(
        (sum, order) => sum + order.amount,
        0
    );

    const totalOrders = filteredOrders.length;

    const averageOrderValue = totalOrders > 0
        ? totalRevenue / totalOrders
        : 0;

    const refundedOrders = filteredOrders.filter(
        order => order.status === "Refunded"
    ).length;

    const refundRate = totalOrders > 0
        ? (refundedOrders / totalOrders) * 100
        : 0;


    document.getElementById("totalRevenue").textContent =
        "₹" + totalRevenue.toLocaleString("en-IN");

    document.getElementById("totalOrders").textContent =
        totalOrders.toLocaleString("en-IN");

    document.getElementById("averageOrderValue").textContent =
        "₹" + Math.round(averageOrderValue).toLocaleString("en-IN");

    document.getElementById("refundRate").textContent =
        refundRate.toFixed(1) + "%";


    // =====================================
    // DAILY CHART DATA
    // =====================================

    const dailyData = {};

    filteredOrders.forEach(order => {

        const date = parseOrderDate(order.date);

        const dateLabel = date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short"
        });

        const timestamp = date.getTime();

        if (!dailyData[timestamp]) {

            dailyData[timestamp] = {
                revenue: 0,
                orders: 0,
                timestamp
            };
        }

        dailyData[timestamp].revenue += order.amount;

        dailyData[timestamp].orders += 1;

    });


    const chartData = Object.values(dailyData).sort(
        (a, b) => a.timestamp - b.timestamp
    );

    const chartLabels = chartData.map(item => {

        return new Date(item.timestamp).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short"
            }
        );
    });


    // REVENUE CHART

    revenueChart.data.labels = chartLabels;

    revenueChart.data.datasets[0].data =
        chartData.map(item => item.revenue);

    revenueChart.update();


    // ORDERS CHART

    ordersChart.data.labels = chartLabels;

    ordersChart.data.datasets[0].data =
        chartData.map(item => item.orders);

    ordersChart.update();


    // =====================================
    // STATUS CHART
    // =====================================

    const statusCounts = [
        filteredOrders.filter(
            order => order.status === "Delivered"
        ).length,

        filteredOrders.filter(
            order => order.status === "Pending"
        ).length,

        filteredOrders.filter(
            order => order.status === "Cancelled"
        ).length,

        filteredOrders.filter(
            order => order.status === "Refunded"
        ).length
    ];

    statusChart.data.datasets[0].data = statusCounts;

    statusChart.update();


    // =====================================
    // PRODUCTS CHART
    // =====================================

    const productRevenue = {};

    filteredOrders.forEach(order => {

        if (!productRevenue[order.product]) {
            productRevenue[order.product] = 0;
        }

        productRevenue[order.product] += order.amount;

    });

    const sortedProducts = Object.entries(productRevenue)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    productsChart.data.labels =
        sortedProducts.map(item => item[0]);

    productsChart.data.datasets[0].data =
        sortedProducts.map(item => item[1]);

    productsChart.update();

}


// =========================================
// DATE FILTER EVENTS
// =========================================

dateRange.addEventListener("change", function () {

    if (dateRange.value === "custom") {

        customDateRange.style.display = "flex";

    } else {

        customDateRange.style.display = "none";

        applyDateFilter();

    }

});


// APPLY CUSTOM DATE

applyDateBtn.addEventListener("click", function () {

    applyDateFilter(true);

});


// DASHBOARD SEARCH

searchInput.addEventListener("input", function () {

    applyDateFilter();

});


// DASHBOARD STATUS FILTER

statusFilter.addEventListener("change", function () {

    applyDateFilter();

});


// ALL ORDERS SEARCH

allOrdersSearch.addEventListener(
    "input",
    applyAllOrdersFilters
);


// ALL ORDERS STATUS FILTER

allOrdersStatus.addEventListener(
    "change",
    applyAllOrdersFilters
);


// =========================================
// CSV EXPORT FUNCTION
// =========================================

function exportOrdersCSV(data, filename) {

    const headers = [
        "Order ID",
        "Customer",
        "Product",
        "Date",
        "Amount",
        "Payment",
        "Status"
    ];

    const rows = data.map(order => [
        order.id,
        order.customer,
        order.product,
        order.date,
        order.amount,
        order.payment,
        order.status
    ]);

    const csvContent = [
        headers,
        ...rows
    ].map(row =>
        row.map(value =>
            `"${String(value).replace(/"/g, '""')}"`
        ).join(",")
    ).join("\n");

    const blob = new Blob(
        ["\uFEFF" + csvContent],
        {
            type: "text/csv;charset=utf-8;"
        }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);
}


// DASHBOARD EXPORT

document.getElementById("exportBtn").addEventListener(
    "click",
    function () {

        exportOrdersCSV(
            orders,
            "CommerceIQ_Orders.csv"
        );

    }
);


// ALL ORDERS EXPORT

document.getElementById("allOrdersExportBtn").addEventListener(
    "click",
    function () {

        const searchValue =
            allOrdersSearch.value.toLowerCase().trim();

        const selectedStatus = allOrdersStatus.value;

        const filteredOrders = orders.filter(order => {

            const matchesSearch =
                order.id.toLowerCase().includes(searchValue) ||
                order.customer.toLowerCase().includes(searchValue) ||
                order.product.toLowerCase().includes(searchValue);

            const matchesStatus =
                selectedStatus === "all" ||
                order.status === selectedStatus;

            return matchesSearch && matchesStatus;

        });

        exportOrdersCSV(
            filteredOrders,
            "CommerceIQ_Filtered_Orders.csv"
        );

    }
);


// =========================================
// ORDER DETAILS MODAL
// =========================================

const orderModal = document.getElementById("orderModal");

const modalContent = document.getElementById("modalContent");

const closeModal = document.getElementById("closeModal");


function openOrderModal(orderId) {

    const selectedOrder = orders.find(
        order => order.id === orderId
    );

    if (!selectedOrder) return;

    modalContent.innerHTML = `
        <div class="order-detail-grid">

            <div class="detail-item">
                <span>Order ID</span>
                <strong>${selectedOrder.id}</strong>
            </div>

            <div class="detail-item">
                <span>Order Date</span>
                <strong>${selectedOrder.date}</strong>
            </div>

            <div class="detail-item">
                <span>Customer Name</span>
                <strong>${selectedOrder.customer}</strong>
            </div>

            <div class="detail-item">
                <span>Product</span>
                <strong>${selectedOrder.product}</strong>
            </div>

            <div class="detail-item">
                <span>Amount</span>
                <strong>₹${selectedOrder.amount.toLocaleString("en-IN")}</strong>
            </div>

            <div class="detail-item">
                <span>Payment Status</span>
                <strong>${selectedOrder.payment}</strong>
            </div>

            <div class="detail-item">
                <span>Delivery Status</span>
                <strong>${selectedOrder.status}</strong>
            </div>

        </div>
    `;

    orderModal.style.display = "flex";
}


// DASHBOARD TABLE CLICK

tableBody.addEventListener("click", function (event) {

    const row = event.target.closest("tr");

    if (!row) return;

    openOrderModal(row.dataset.orderId);

});


// ALL ORDERS TABLE CLICK

allOrdersTableBody.addEventListener("click", function (event) {

    const row = event.target.closest("tr");

    if (!row) return;

    openOrderModal(row.dataset.orderId);

});


// CLOSE MODAL

closeModal.addEventListener("click", function () {

    orderModal.style.display = "none";

});


// CLOSE MODAL OUTSIDE CLICK

orderModal.addEventListener("click", function (event) {

    if (event.target === orderModal) {

        orderModal.style.display = "none";

    }

});


// =========================================
// SIDEBAR NAVIGATION
// =========================================

const navLinks = document.querySelectorAll(
    ".nav-link[data-page]"
);

const pageSections = document.querySelectorAll(
    ".page-section"
);

navLinks.forEach(link => {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        const selectedPage = this.dataset.page;

        const targetPage = document.getElementById(
            selectedPage + "Page"
        );

        // Do not activate a page that does not exist yet
        if (!targetPage) return;

        navLinks.forEach(nav => {
            nav.classList.remove("active");
        });

        this.classList.add("active");

        pageSections.forEach(page => {
            page.classList.remove("active");
        });

        targetPage.classList.add("active");

        // Update topbar heading
        const pageTitles = {
            dashboard: "Dashboard Overview",
            orders: "Orders Management",
            products: "Products Management",
            customers: "Customer Management",
            analytics: "Analytics Overview",
            settings: "Settings"
        };

        document.querySelector(".topbar h1").textContent =
            pageTitles[selectedPage] || "CommerceIQ";

        // Resize charts after returning to dashboard
        if (selectedPage === "dashboard") {

            revenueChart.resize();
            ordersChart.resize();
            statusChart.resize();
            productsChart.resize();

        }

    });

});


// =========================================
// INITIAL PAGE LOAD
// =========================================

displayAllOrders(orders);

updateOrdersSummary(orders);

applyDateFilter();


// =========================================
// PRODUCTS MANAGEMENT
// =========================================

// SAMPLE PRODUCTS

let productList = [
    { id: "PRD-101", name: "iPhone 15", category: "Electronics", price: 79999, stock: 25, status: "Active" },
    { id: "PRD-102", name: "MacBook Air", category: "Computers", price: 89999, stock: 12, status: "Active" },
    { id: "PRD-103", name: "Sony Headphones", category: "Accessories", price: 12999, stock: 0, status: "Active" },
    { id: "PRD-104", name: "Samsung Watch", category: "Electronics", price: 15999, stock: 18, status: "Active" },
    { id: "PRD-105", name: "Gaming Monitor", category: "Gaming", price: 24999, stock: 8, status: "Active" },
    { id: "PRD-106", name: "Wireless Mouse", category: "Accessories", price: 1999, stock: 0, status: "Inactive" },
    { id: "PRD-107", name: "Smart TV", category: "Home Appliances", price: 39999, stock: 15, status: "Active" },
    { id: "PRD-108", name: "Dell Laptop", category: "Computers", price: 65999, stock: 20, status: "Active" }
];


// HTML ELEMENTS

const productsTableBody = document.getElementById("productsTableBody");
const productSearch = document.getElementById("productSearch");
const productCategoryFilter = document.getElementById("productCategoryFilter");

const productModal = document.getElementById("productModal");
const productForm = document.getElementById("productForm");

const addProductBtn = document.getElementById("addProductBtn");
const closeProductModal = document.getElementById("closeProductModal");
const cancelProductBtn = document.getElementById("cancelProductBtn");


// UPDATE PRODUCT SUMMARY

function updateProductSummary(data) {

    document.getElementById("totalProducts").textContent =
        data.length;

    document.getElementById("activeProducts").textContent =
        data.filter(product => product.status === "Active").length;

    document.getElementById("outOfStockProducts").textContent =
        data.filter(product => product.stock === 0).length;

    document.getElementById("totalCategories").textContent =
        new Set(data.map(product => product.category)).size;
}


// DISPLAY PRODUCTS

function displayProducts(data) {

    productsTableBody.innerHTML = "";

    data.forEach(product => {

        const row = document.createElement("tr");

        const stockStatus = product.stock === 0
            ? "Out of Stock"
            : product.stock <= 10
                ? "Low Stock"
                : "In Stock";

        const statusClass = product.status === "Active"
            ? "status-delivered"
            : "status-cancelled";

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>₹${product.price.toLocaleString("en-IN")}</td>
            <td>${product.stock}</td>
            <td>
                <span class="status-badge ${statusClass}">
                    ${product.status}
                </span>
                <small>${stockStatus}</small>
            </td>
            <td>
                <button class="edit-product" data-id="${product.id}" title="Edit">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button class="delete-product" data-id="${product.id}" title="Delete">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;

        productsTableBody.appendChild(row);

    });

    document.getElementById("productsCount").textContent =
        `Showing ${data.length} of ${productList.length} products`;

    updateProductSummary(data);
}


// SEARCH AND CATEGORY FILTER

function applyProductFilters() {

    const searchValue =
        productSearch.value.toLowerCase().trim();

    const selectedCategory =
        productCategoryFilter.value;

    const filteredProducts = productList.filter(product => {

        const matchesSearch =
            product.name.toLowerCase().includes(searchValue) ||
            product.id.toLowerCase().includes(searchValue);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    displayProducts(filteredProducts);
}


// OPEN ADD PRODUCT MODAL

addProductBtn.addEventListener("click", function () {

    productForm.reset();

    document.getElementById("productId").value = "";

    document.getElementById("productModalTitle").textContent =
        "Add New Product";

    productModal.style.display = "flex";

});


// CLOSE MODAL

function closeProductForm() {

    productModal.style.display = "none";

    productForm.reset();
}

closeProductModal.addEventListener("click", closeProductForm);

cancelProductBtn.addEventListener("click", closeProductForm);


// ADD OR UPDATE PRODUCT

productForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const id = document.getElementById("productId").value;

    const name = document.getElementById("productName").value.trim();

    const category = document.getElementById("productCategory").value;

    const price = Number(document.getElementById("productPrice").value);

    const stock = Number(document.getElementById("productStock").value);

    const status = document.getElementById("productStatus").value;

    if (!name || !category || price <= 0 || stock < 0) {
        alert("Please enter valid product details.");
        return;
    }

    if (id) {

        const product = productList.find(
            item => item.id === id
        );

        if (product) {
            product.name = name;
            product.category = category;
            product.price = price;
            product.stock = stock;
            product.status = status;
        }

    } else {

        const newProduct = {
            id: "PRD-" + (101 + productList.length),
            name,
            category,
            price,
            stock,
            status
        };

        productList.unshift(newProduct);

    }

    closeProductForm();

    applyProductFilters();

    updateAnalyticsCharts();

});


// EDIT AND DELETE PRODUCTS

productsTableBody.addEventListener("click", function (event) {

    const editButton = event.target.closest(".edit-product");

    const deleteButton = event.target.closest(".delete-product");


    // EDIT PRODUCT

    if (editButton) {

        const id = editButton.dataset.id;

        const product = productList.find(
            item => item.id === id
        );

        if (!product) return;

        document.getElementById("productId").value = product.id;

        document.getElementById("productName").value = product.name;

        document.getElementById("productCategory").value = product.category;

        document.getElementById("productPrice").value = product.price;

        document.getElementById("productStock").value = product.stock;

        document.getElementById("productStatus").value = product.status;

        document.getElementById("productModalTitle").textContent =
            "Edit Product";

        productModal.style.display = "flex";

    }


    // DELETE PRODUCT

    if (deleteButton) {

        const id = deleteButton.dataset.id;

        const confirmDelete = confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        productList = productList.filter(
            product => product.id !== id
        );

        applyProductFilters();

        updateAnalyticsCharts();

    }

});


// SEARCH EVENTS

productSearch.addEventListener(
    "input",
    applyProductFilters
);

productCategoryFilter.addEventListener(
    "change",
    applyProductFilters
);


// INITIAL LOAD

displayProducts(productList);

let customerList = [
    {
        id: "CUS-101",
        name: "Rahul Sharma",
        email: "rahul@gmail.com",
        phone: "9876543210",
        orders: 12,
        spent: 45000,
        status: "Active",
        joined: "2026-10-20"
    },
    {
        id: "CUS-102",
        name: "Priya Verma",
        email: "priya@gmail.com",
        phone: "9876543211",
        orders: 8,
        spent: 32000,
        status: "Active",
        joined: "2026-10-25"
    },
    {
        id: "CUS-103",
        name: "Aman Gupta",
        email: "aman@gmail.com",
        phone: "9876543212",
        orders: 0,
        spent: 0,
        status: "Inactive",
        joined: "2026-09-10"
    },
    {
        id: "CUS-104",
        name: "Sneha Singh",
        email: "sneha@gmail.com",
        phone: "9876543213",
        orders: 15,
        spent: 67000,
        status: "Active",
        joined: "2026-11-02"
    },
    {
        id: "CUS-105",
        name: "Karan Mehta",
        email: "karan@gmail.com",
        phone: "9876543214",
        orders: 4,
        spent: 18000,
        status: "Inactive",
        joined: "2026-08-15"
    },
    {
        id: "CUS-106",
        name: "Neha Kapoor",
        email: "neha@gmail.com",
        phone: "9876543215",
        orders: 10,
        spent: 52000,
        status: "Active",
        joined: "2026-11-05"
    }
];

const customersTableBody = document.getElementById("customersTableBody");

function updateCustomerSummary(data) {

    document.getElementById("totalCustomers").textContent = data.length;

    document.getElementById("activeCustomers").textContent =
        data.filter(customer => customer.status === "Active").length;

    document.getElementById("newCustomers").textContent =
        data.filter(customer => {
            const joinedDate = new Date(customer.joined);
            const today = new Date();
            const days = (today - joinedDate) / (1000 * 60 * 60 * 24);

            return days >= 0 && days <= 30;
        }).length;
}

function displayCustomers(data) {

    customersTableBody.innerHTML = "";

    data.forEach(customer => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.orders}</td>
            <td>₹${customer.spent.toLocaleString("en-IN")}</td>
            <td>
                <span class="${customer.status === "Active" ? "status-delivered" : "status-cancelled"}">
                    ${customer.status}
                </span>
            </td>
            <td>
                <button class="edit-customer-btn" data-id="${customer.id}">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button class="delete-customer-btn" data-id="${customer.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;

        customersTableBody.appendChild(row);
    });

    document.getElementById("customersCount").textContent =
        `Showing ${data.length} customers`;

    updateCustomerSummary(data);
}

function applyCustomerFilters() {

    const searchValue = document
        .getElementById("customerSearch")
        .value.toLowerCase();

    const statusValue = document
        .getElementById("customerStatusFilter")
        .value;

    const filteredCustomers = customerList.filter(customer => {

        const matchesSearch =
            customer.name.toLowerCase().includes(searchValue) ||
            customer.email.toLowerCase().includes(searchValue) ||
            customer.id.toLowerCase().includes(searchValue);

        const matchesStatus =
            statusValue === "all" || customer.status === statusValue;

        return matchesSearch && matchesStatus;
    });

    displayCustomers(filteredCustomers);
}

document.getElementById("customerSearch")
    .addEventListener("input", applyCustomerFilters);

document.getElementById("customerStatusFilter")
    .addEventListener("change", applyCustomerFilters);

customersTableBody.addEventListener("click", function (event) {

    const deleteButton = event.target.closest(".delete-customer-btn");

    if (deleteButton) {

        const customerId = deleteButton.dataset.id;

        if (confirm("Are you sure you want to delete this customer?")) {

            customerList = customerList.filter(
                customer => customer.id !== customerId
            );

            applyCustomerFilters();
        }
    }

});
displayCustomers(customerList);

const customerModal = document.getElementById("customerModal");
const customerForm = document.getElementById("customerForm");

function openCustomerModal() {
    customerForm.reset();

    document.getElementById("customerId").value = "";
    document.getElementById("customerModalTitle").textContent = "Add Customer";

    customerModal.style.display = "flex";
}

function closeCustomerModal() {
    customerModal.style.display = "none";
    customerForm.reset();
}

document.getElementById("addCustomerBtn").addEventListener("click", openCustomerModal);

document.getElementById("closeCustomerModal").addEventListener("click", closeCustomerModal);

document.getElementById("cancelCustomerBtn").addEventListener("click", closeCustomerModal);


customersTableBody.addEventListener("click", function (event) {

    const editButton = event.target.closest(".edit-customer-btn");

    if (!editButton) return;

    const customer = customerList.find(
        item => item.id === editButton.dataset.id
    );

    if (!customer) return;

    document.getElementById("customerId").value = customer.id;
    document.getElementById("customerName").value = customer.name;
    document.getElementById("customerEmail").value = customer.email;
    document.getElementById("customerPhone").value = customer.phone;
    document.getElementById("customerStatus").value = customer.status;

    document.getElementById("customerModalTitle").textContent = "Edit Customer";

    customerModal.style.display = "flex";
});


customerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const customerId = document.getElementById("customerId").value;

    const name = document.getElementById("customerName").value.trim();
    const email = document.getElementById("customerEmail").value.trim().toLowerCase();
    const phone = document.getElementById("customerPhone").value.trim();
    const status = document.getElementById("customerStatus").value;

    const existingCustomer = customerList.find(
        customer => customer.email === email && customer.id !== customerId
    );

    if (existingCustomer) {
        alert("This email address already exists!");
        return;
    }

    if (customerId) {

        const customer = customerList.find(
            item => item.id === customerId
        );

        customer.name = name;
        customer.email = email;
        customer.phone = phone;
        customer.status = status;

        alert("Customer updated successfully!");

    } else {

        const newCustomer = {
            id: "CUS-" + (101 + customerList.length),
            name: name,
            email: email,
            phone: phone,
            orders: 0,
            spent: 0,
            status: status,
            joined: new Date().toISOString().split("T")[0]
        };

        customerList.unshift(newCustomer);

        alert("Customer added successfully!");
    }

    closeCustomerModal();
    applyCustomerFilters();

});

// =========================================
// COMMERCEIQ ANALYTICS
// =========================================

// FILTERED ORDERS
let analyticsOrders = [...orders];


// =========================================
// REVENUE CALCULATION
// =========================================

function getRevenueOrders() {

    return analyticsOrders.filter(order =>
        order.payment === "Paid" &&
        order.status !== "Cancelled" &&
        order.status !== "Refunded"
    );

}


// =========================================
// FORMAT CURRENCY
// =========================================

function formatCurrency(amount) {

    return "₹" + Math.round(amount).toLocaleString("en-IN");

}


// =========================================
// ANALYTICS SUMMARY
// =========================================

function updateAnalyticsSummary() {

    const revenueOrders = getRevenueOrders();

    const totalOrders = analyticsOrders.length;

    const totalRevenue = revenueOrders.reduce(
        (sum, order) => sum + order.amount,
        0
    );

    const averageOrderValue = revenueOrders.length
        ? totalRevenue / revenueOrders.length
        : 0;


    document.getElementById("analyticsRevenue").textContent =
        formatCurrency(totalRevenue);

    document.getElementById("analyticsOrders").textContent =
        totalOrders.toLocaleString("en-IN");

    document.getElementById("analyticsAOV").textContent =
        formatCurrency(averageOrderValue);

    document.getElementById("analyticsCustomers").textContent =
        customerList.length.toLocaleString("en-IN");

}


// =========================================
// 1. REVENUE TRENDS CHART
// =========================================

const analyticsRevenueChart = new Chart(
    document.getElementById("analyticsRevenueChart"),
    {
        type: "line",

        data: {
            labels: [],

            datasets: [{
                label: "Revenue",
                data: [],
                borderColor: "#2457d6",
                backgroundColor: "rgba(36, 87, 214, 0.12)",
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 4
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                }
            },

            scales: {
                y: {
                    beginAtZero: true,

                    ticks: {
                        callback: value => "₹" + value / 1000 + "k"
                    }
                },

                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    }
);


// =========================================
// 2. CATEGORY PERFORMANCE CHART
// =========================================

const categoryChart = new Chart(
    document.getElementById("categoryChart"),
    {
        type: "bar",

        data: {
            labels: [],

            datasets: [{
                label: "Revenue",
                data: [],

                backgroundColor: [
                    "#2457d6",
                    "#16a6a0",
                    "#648bea",
                    "#55c5b5",
                    "#9aaff0",
                    "#8bd8cd"
                ],

                borderRadius: 7
            }]
        },

        options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                }
            },

            scales: {
                x: {
                    beginAtZero: true,

                    ticks: {
                        callback: value => "₹" + value / 1000 + "k"
                    }
                },

                y: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    }
);


// =========================================
// 3. PAYMENT ANALYSIS CHART
// =========================================

const paymentChart = new Chart(
    document.getElementById("paymentChart"),
    {
        type: "doughnut",

        data: {
            labels: ["Paid", "Unpaid"],

            datasets: [{
                data: [0, 0],

                backgroundColor: [
                    "#16a6a0",
                    "#f0a43a"
                ],

                borderWidth: 0,
                hoverOffset: 8
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "68%",

            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    }
);


// =========================================
// 4. MONTHLY ORDERS CHART
// =========================================

const monthlyOrdersChart = new Chart(
    document.getElementById("monthlyOrdersChart"),
    {
        type: "bar",

        data: {
            labels: [],

            datasets: [{
                label: "Orders",
                data: [],
                backgroundColor: "#16a6a0",
                borderRadius: 7
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                }
            },

            scales: {
                y: {
                    beginAtZero: true,

                    ticks: {
                        precision: 0
                    }
                },

                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    }
);


// =========================================
// UPDATE ALL ANALYTICS CHARTS
// =========================================

function updateAnalyticsCharts() {

    const revenueOrders = getRevenueOrders();


    // MONTHLY REVENUE

    const monthlyRevenue = {};

    revenueOrders.forEach(order => {

        const date = parseOrderDate(order.date);

        const key =
            `${date.getFullYear()}-${String(
                date.getMonth() + 1
            ).padStart(2, "0")}`;

        monthlyRevenue[key] =
            (monthlyRevenue[key] || 0) + order.amount;

    });


    const revenueEntries = Object.entries(monthlyRevenue)
        .sort((a, b) => a[0].localeCompare(b[0]));


    analyticsRevenueChart.data.labels = revenueEntries.map(item => {

        return new Date(item[0] + "-01").toLocaleDateString(
            "en-IN",
            {
                month: "short",
                year: "numeric"
            }
        );

    });


    analyticsRevenueChart.data.datasets[0].data =
        revenueEntries.map(item => item[1]);

    analyticsRevenueChart.update();


    // CATEGORY PERFORMANCE

    const categoryRevenue = {};

    revenueOrders.forEach(order => {

        const product = productList.find(
            item => item.name === order.product
        );

        const category = product
            ? product.category
            : "Other";

        categoryRevenue[category] =
            (categoryRevenue[category] || 0) + order.amount;

    });


    const categoryEntries = Object.entries(categoryRevenue)
        .sort((a, b) => b[1] - a[1]);


    categoryChart.data.labels =
        categoryEntries.map(item => item[0]);

    categoryChart.data.datasets[0].data =
        categoryEntries.map(item => item[1]);

    categoryChart.update();


    // PAYMENT ANALYSIS

    const paidOrders = analyticsOrders.filter(
        order => order.payment === "Paid"
    ).length;

    const unpaidOrders = analyticsOrders.filter(
        order => order.payment === "Unpaid"
    ).length;


    paymentChart.data.datasets[0].data = [
        paidOrders,
        unpaidOrders
    ];

    paymentChart.update();


    // MONTHLY ORDERS

    const monthlyOrders = {};

    analyticsOrders.forEach(order => {

        const date = parseOrderDate(order.date);

        const key =
            `${date.getFullYear()}-${String(
                date.getMonth() + 1
            ).padStart(2, "0")}`;

        monthlyOrders[key] =
            (monthlyOrders[key] || 0) + 1;

    });


    const orderEntries = Object.entries(monthlyOrders)
        .sort((a, b) => a[0].localeCompare(b[0]));


    monthlyOrdersChart.data.labels = orderEntries.map(item => {

        return new Date(item[0] + "-01").toLocaleDateString(
            "en-IN",
            {
                month: "short",
                year: "numeric"
            }
        );

    });


    monthlyOrdersChart.data.datasets[0].data =
        orderEntries.map(item => item[1]);

    monthlyOrdersChart.update();

}


// =========================================
// ANALYTICS DATE FILTER
// =========================================

function applyAnalyticsDateFilter() {

    const selectedRange =
        document.getElementById("analyticsDateRange").value;


    if (selectedRange === "all") {

        analyticsOrders = [...orders];

    } else {

        const today = new Date();

        today.setHours(23, 59, 59, 999);


        const startDate = new Date();

        startDate.setDate(
            today.getDate() - (Number(selectedRange) - 1)
        );

        startDate.setHours(0, 0, 0, 0);


        analyticsOrders = orders.filter(order => {

            const orderDate = parseOrderDate(order.date);

            orderDate.setHours(0, 0, 0, 0);

            return (
                orderDate >= startDate &&
                orderDate <= today
            );

        });

    }


    updateAnalyticsSummary();

    updateAnalyticsCharts();

}


// =========================================
// ANALYTICS DATE FILTER EVENT
// =========================================

document.getElementById("analyticsDateRange")
    .addEventListener(
        "change",
        applyAnalyticsDateFilter
    );


// =========================================
// ANALYTICS CSV EXPORT
// =========================================

document.getElementById("exportAnalyticsBtn")
    .addEventListener("click", function () {

        exportOrdersCSV(
            analyticsOrders,
            "CommerceIQ_Analytics_Report.csv"
        );

    });


// =========================================
// ANALYTICS PAGE RESIZE
// =========================================

navLinks.forEach(link => {

    link.addEventListener("click", function () {

        if (this.dataset.page === "analytics") {

            setTimeout(() => {

                analyticsRevenueChart.resize();

                categoryChart.resize();

                paymentChart.resize();

                monthlyOrdersChart.resize();

            }, 100);

        }

    });

});


// =========================================
// INITIALIZE ANALYTICS
// =========================================

applyAnalyticsDateFilter();

// =========================================
// COMMERCEIQ SETTINGS
// =========================================

const settingsName = document.getElementById("settingsName");
const settingsEmail = document.getElementById("settingsEmail");
const darkModeToggle = document.getElementById("darkModeToggle");
const emailNotifications = document.getElementById("emailNotifications");
const saveSettingsBtn = document.getElementById("saveSettingsBtn");

// Load saved settings
function loadSettings() {
    const savedSettings = JSON.parse(
        localStorage.getItem("commerceIQSettings")
    ) || {};

    settingsName.value = savedSettings.name || "";
    settingsEmail.value = savedSettings.email || "";
    darkModeToggle.checked = savedSettings.darkMode || false;
    emailNotifications.checked = savedSettings.emailNotifications ?? true;
}

// Save settings
saveSettingsBtn.addEventListener("click", function () {

    const settings = {
        name: settingsName.value.trim(),
        email: settingsEmail.value.trim(),
        darkMode: darkModeToggle.checked,
        emailNotifications: emailNotifications.checked
    };

    localStorage.setItem(
        "commerceIQSettings",
        JSON.stringify(settings)
    );

    alert("Settings saved successfully!");
});

// Initial load
loadSettings();