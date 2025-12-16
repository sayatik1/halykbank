const API = "http://localhost:8888/api/accounts";
const body = document.getElementById("accounts-body");

async function loadAll() {
    const res = await fetch(API);
    const data = await res.json();
    render(data);
}

async function loadByUser() {
    const id = document.getElementById("searchUserId").value;
    const res = await fetch(`${API}/user/${id}`);
    const data = await res.json();
    render(data);
}

async function createAccount() {
    const userId = document.getElementById("createUserId").value;
    await fetch(`${API}/create/${userId}`, { method: "POST" });
    loadAll();
}

async function removeAccount(id) {
    if (!confirm("Удалить счёт?")) return;
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadAll();
}

function render(accounts) {
    body.innerHTML = "";

    accounts.forEach(a => {
        const canDelete = a.transactionsCount === 0;

        body.innerHTML += `
        <tr>
            <td>${a.id}</td>
            <td>${a.accountNumber}</td>
            <td>${a.balance}</td>
            <td>${a.userId}</td>
            <td>${a.transactionsCount}</td>
            <td>
                <button
                    ${canDelete ? "" : "disabled"}
                    onclick="removeAccount(${a.id})">
                    Удалить
                </button>
            </td>
        </tr>
        `;
    });
}

loadAll();


