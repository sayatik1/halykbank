const user = getUser();
if (!user) {
    window.location.href = "/login.html";
}

const container = document.getElementById("accountsContainer");

// ================= LOAD =================
async function loadAccounts() {
    container.innerHTML = "Загрузка...";

    try {
        const accounts = await getUserAccounts(user.id);

        if (!accounts || accounts.length === 0) {
            container.innerHTML = "<p>У вас пока нет счетов</p>";
            return;
        }

        container.innerHTML = "";

        accounts.forEach(acc => {
            const card = document.createElement("div");
            card.className = "feature-card";

            card.innerHTML = `
                <h3>Счёт</h3>
                <p>${acc.accountNumber}</p>
                <strong>${acc.balance} ₸</strong>

                <div class="form-group">
                    <input
                        type="number"
                        placeholder="Сумма пополнения"
                        id="amount-${acc.id}"
                    >
                </div>

                <button onclick="depositMoney(${acc.id})">
                    Пополнить
                </button>

                <button
                    style="margin-top:10px;background:#dc2626"
                    onclick="deleteAccount(${acc.id}, ${acc.transactionsCount})"
                    ${acc.transactionsCount > 0 ? "disabled" : ""}
                >
                    Удалить счёт
                </button>
            `;

            container.appendChild(card);
        });

    } catch (e) {
        container.innerHTML = `<p style="color:red">${e.message}</p>`;
    }
}

// ================= CREATE =================
async function createNewAccount() {
    if (!confirm("Создать новый счёт?")) return;

    try {
        await createAccount(user.id);
        loadAccounts();
    } catch (e) {
        alert("Ошибка при создании счёта");
    }
}

// ================= DEPOSIT =================
async function depositMoney(accountId) {
    const input = document.getElementById(`amount-${accountId}`);
    const amount = Number(input.value);

    if (!amount || amount <= 0) {
        alert("Введите корректную сумму");
        return;
    }

    try {
        await deposit(accountId, amount);
        input.value = "";
        loadAccounts();
    } catch (e) {
        alert(e.message);
    }
}

// ================= DELETE =================
async function deleteAccount(accountId, transactionsCount) {
    if (transactionsCount > 0) {
        alert("Нельзя удалить счёт с операциями");
        return;
    }

    if (!confirm("Вы уверены, что хотите удалить счёт?")) return;

    try {
        await fetch(`http://localhost:8888/api/accounts/${accountId}`, {
            method: "DELETE"
        });
        loadAccounts();
    } catch (e) {
        alert("Ошибка при удалении");
    }
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", loadAccounts);
