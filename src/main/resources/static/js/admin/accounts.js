const API = "http://localhost:8888/api/accounts";
const body = document.getElementById("accounts-body");

// ===== LOAD ALL =====
async function loadAll() {
    const res = await fetch(API);
    const data = await res.json();
    render(data);
}

// ===== SEARCH BY USER =====
async function searchByUser() {
    const userId = document.getElementById("searchUserId").value;
    if (!userId) return;

    const res = await fetch(`${API}/user/${userId}`);
    const data = await res.json();
    render(data);
}

// ===== CREATE =====
async function createAccount() {
    const userId = document.getElementById("createUserId").value;
    if (!userId) {
        alert("Введите ID пользователя");
        return;
    }

    await fetch(`${API}/create/${userId}`, { method: "POST" });
    loadAll();
}

// ===== DELETE =====
async function removeAccount(accountId, transactionsCount) {
    if (transactionsCount > 0) {
        alert("Нельзя удалить счёт с операциями");
        return;
    }

    if (!confirm("Удалить счёт?")) return;

    await fetch(`${API}/${accountId}`, { method: "DELETE" });
    loadAll();
}

// ===== RENDER =====
function render(accounts) {
    body.innerHTML = "";

    if (!accounts || accounts.length === 0) {
        body.innerHTML = `<tr><td colspan="6">Нет данных</td></tr>`;
        return;
    }

    accounts.forEach(a => {
        body.innerHTML += `
            <tr>
                <td>${a.id}</td>
                <td>${a.accountNumber}</td>
                <td>${a.balance} ₸</td>
                <td>${a.userId}</td>
                <td>
                    ${a.transactionsCount > 0
                        ? `Есть (${a.transactionsCount})`
                        : `Нет`
                    }
                </td>
                <td>
                    <button
                        ${a.transactionsCount > 0 ? "disabled" : ""}
                        onclick="removeAccount(${a.id}, ${a.transactionsCount})">
                        Удалить
                    </button>
                </td>
            </tr>
        `;
    });
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", loadAll);


