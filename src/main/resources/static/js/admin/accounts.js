const API = "http://localhost:8888/api/accounts";
const body = document.getElementById("accountsBody");

// ===== ЗАГРУЗИТЬ ВСЕ =====
async function loadAll() {
    const res = await fetch(API);
    const data = await res.json();
    render(data);
}

// ===== ПОИСК ПО USER ID =====
async function searchByUser() {
    const userId = document.getElementById("searchUserId").value;
    if (!userId) return;

    const res = await fetch(`${API}/user/${userId}`);
    const data = await res.json();
    render(data);
}

// ===== СОЗДАНИЕ =====
async function createAccount() {
    const userId = document.getElementById("createUserId").value;
    if (!userId) return alert("Введите ID пользователя");

    await fetch(`${API}/create/${userId}`, {
        method: "POST"
    });

    loadAll();
}

// ===== УДАЛЕНИЕ =====
async function removeAccount(id, transactionsCount) {
    if (transactionsCount > 0) {
        alert("Нельзя удалить счёт с транзакциями");
        return;
    }

    if (!confirm("Удалить счёт?")) return;

    const res = await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    if (!res.ok) {
        alert("Ошибка при удалении");
        return;
    }

    loadAll();
}

// ===== ОТРИСОВКА =====
function render(data) {
    body.innerHTML = data.map(a => `
        <tr>
            <td>${a.id}</td>
            <td>${a.accountNumber}</td>
            <td>${a.balance}</td>
            <td>${a.userId}</td>
            <td>
                ${a.transactionsCount > 0
                    ? `<span class="badge danger">Есть (${a.transactionsCount})</span>`
                    : `<span class="badge success">Нет</span>`
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
    `).join("");
}

// ===== INIT =====
loadAll();


