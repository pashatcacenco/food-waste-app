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
    const pages = ["login", "menu", "fridge", "recommendation", "marketplace", "notifications", "instructions", "scanner"];
    pages.forEach(page => document.getElementById(page).classList.add("hidden"));
    document.getElementById(pageId).classList.remove("hidden");
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "password") {
        alert("Login successful!");
        showPage("menu");
    } else {
        alert("Invalid username or password.");
    }
}

function loadFridgeData(fridge) {
    const tableBody = document.getElementById("fridgeTable");
    fridge.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="border px-4 py-2">${item.Product}</td>
            <td class="border px-4 py-2">${item.StartDate}</td>
            <td class="border px-4 py-2">${item.ExpireDate}</td>
            <td class="border px-4 py-2">${item.Status}</td>
        `;
        tableBody.appendChild(tr);
    });
}

function loadRecommendations(recommendations) {
    const list = document.getElementById("recommendationList");
    recommendations.forEach(recipe => {
        const li = document.createElement("li");
        li.textContent = `${recipe.Recipe}: ${recipe.Ingredients} (${recipe.Instructions})`;
        list.appendChild(li);
    });
}

function loadMarketplace(marketplace) {
    const list = document.getElementById("marketplaceList");
    marketplace.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.Item} (${item.Status}) - Quantity: ${item.Quantity} - Owner: ${item.Owner}`;
        list.appendChild(li);
    });
}

function loadNotifications(notifications) {
    const list = document.getElementById("notificationsList");
    notifications.forEach(notification => {
        const li = document.createElement("li");
        li.textContent = notification.Notification;
        list.appendChild(li);
    });
}

function loadInstructions(instructions) {
    const list = document.getElementById("instructionsList");
    instructions.forEach(step => {
        const li = document.createElement("li");
        li.textContent = `${step.Step}: ${step.Description}`;
        list.appendChild(li);
    });
}

function loadScannerData(scanner) {
    const list = document.getElementById("scannerList");
    scanner.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `Barcode: ${entry.Barcode}, Product: ${entry.Product}, Status: ${entry.Status}`;
        list.appendChild(li);
    });
}
