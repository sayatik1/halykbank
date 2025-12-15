const API_BASE = "http://localhost:8888/api";

// универсальный fetch
async function api(url, options = {}) {
    const res = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        ...options
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "API error");
    }

    return res.json();
}

// ===== ACCOUNTS =====
function getUserAccounts(userId) {
    return api(`${API_BASE}/accounts/user/${userId}`);
}

function createAccount(userId) {
    return api(`${API_BASE}/accounts/create/${userId}`, {
        method: "POST"
    });
}

function deposit(accountId, amount) {
    return fetch(
        `${API_BASE}/transactions/deposit/${accountId}?amount=${amount}`,
        { method: "POST" }
    );
}
function getTransactions(accountId) {
    return api(`${API_BASE}/transactions/account/${accountId}`);
}
function transferMoney(data) {
    return api(`${API_BASE}/transactions/transfer`, {
        method: "POST",
        body: JSON.stringify(data)
    });
}
function createServiceRequest(userId, serviceId) {
    return fetch(
        `${API_BASE}/requests/create?userId=${userId}&serviceId=${serviceId}`,
        { method: "POST" }
    );
}

function getUserRequests(userId) {
    return api(`${API_BASE}/requests/user/${userId}`);
}
function getAllNews() {
    return api(`${API_BASE}/news`);
}
