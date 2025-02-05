document.addEventListener("DOMContentLoaded", () => {
    fetch("data.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to load JSON data.");
            }
            return response.json();
        })
        .then((data) => {
            loadFridgeData(data.Fridge);
            loadRecommendations(data.Recommendations);
            loadMarketplace(data.Marketplace);
            loadNotifications(data.Notifications);
            loadInstructions(data.Instructions);
            loadScannerData(data.Scanner);
        })
        .catch((error) => console.error("Error loading data:", error));
});

function showPage(pageId) {
    const pages = ["login", "menu", "fridge", "recommendation", "marketplace", "notifications", "instructions", "scanner", "trade", "request"];
    pages.forEach(page => {
        const pageElement = document.getElementById(page);
        if (page === pageId) {
            pageElement.classList.remove("hidden");
        } else {
            pageElement.classList.add("hidden");
        }
    });
}


function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "loveDT") {
        alert("Login successful!");
        showPage("menu");
    } else {
        alert("Invalid username or password.");
    }
}

function loadFridgeData(fridge) {
    const tableBody = document.getElementById("fridgeTable");
    tableBody.innerHTML = ""; // Clear existing data
    fridge.forEach(item => {
        const tr = document.createElement("tr");
        const statusColor = getStatusColor(item.Status);
        tr.innerHTML = `
            <td class="border px-4 py-2">${item.Product}</td>
            <td class="border px-4 py-2">${item.StartDate}</td>
            <td class="border px-4 py-2">${item.ExpireDate}</td>
            <td class="border px-4 py-2">
                <span class="flex items-center">
                    <span class="w-3 h-3 rounded-full mr-2" style="background-color: ${statusColor}"></span>
                    ${item.Status}
                </span>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function getStatusColor(status) {
    switch (status) {
        case "Expired":
            return "red";
        case "Fresh":
            return "green";
        case "Expired Soon":
            return "orange";
        default:
            return "gray";
    }
}

function loadRecommendations(recommendations) {
    const list = document.getElementById("recommendationList");
    list.innerHTML = ""; // Clear existing data
    recommendations.forEach(recipe => {
        const li = document.createElement("li");
        li.textContent = `${recipe.Recipe}: ${recipe.Ingredients} (${recipe.Instructions})`;
        list.appendChild(li);
    });
}

function loadMarketplace(marketplace) {
    const list = document.getElementById("marketplaceList");
    list.innerHTML = ""; // Clear existing data
    marketplace.forEach(item => {
        const marketplaceItem = document.createElement("div");
        marketplaceItem.className = "marketplace-item";
        marketplaceItem.innerHTML = `
            <div class="item-details">
            <img src="assets/${item.Icon}" alt="${item.Item}" class="item-icon" style="width: 25px; height: 25px;">
                <div>${item.Item}</div>
            </div>
            <div class="item-actions">
                <button class="bg-green-500 text-white px-4 py-2 rounded" onclick="showPage('trade')">Trade</button>
                <button class="bg-blue-500 text-white px-4 py-2 rounded" onclick="showPage('request')">Request</button>
            </div>
        `;
        list.appendChild(marketplaceItem);
    });
}

function loadNotifications(notifications) {
    const list = document.getElementById("notificationsList");
    list.innerHTML = ""; // Clear existing data
    notifications.forEach(notification => {
        const li = document.createElement("li");
        li.textContent = notification.Notification;
        list.appendChild(li);
    });
}

function loadInstructions(instructions) {
    const list = document.getElementById("instructionsList");
    list.innerHTML = ""; // Clear existing data
    instructions.forEach(step => {
        const li = document.createElement("li");
        li.textContent = `${step.Step}: ${step.Description}`;
        list.appendChild(li);
    });
}

function loadScannerData(scanner) {
    const list = document.getElementById("scannerList");
    list.innerHTML = ""; // Clear existing data
    scanner.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `Barcode: ${entry.Barcode}, Product: ${entry.Product}, Status: ${entry.Status}`;
        list.appendChild(li);
    });
}
