const user = getUser();
if (!user) {
    window.location.href = "/index.html";
}

async function loadAccounts() {
    const container = document.getElementById("accounts");
    container.innerHTML = "Загрузка...";

    try {
        const accounts = await getUserAccounts(user.id);
        container.innerHTML = "";

        if (accounts.length === 0) {
            container.innerHTML = "<p>У вас пока нет счетов</p>";
            return;
        }

        accounts.forEach((acc, index) => {
            const card = document.createElement("div");
            card.className = "account-card";

            card.innerHTML = `
                <div class="account-title">
                    Счёт №${index + 1}
                </div>

                <div class="account-number">
                    ${acc.accountNumber}
                </div>

                <div class="account-balance">
                    ${acc.balance} ₸
                </div>

                <div class="account-actions">
                    <button onclick="depositMoney(${acc.id})">
                        Пополнить
                    </button>
                </div>
            `;

            container.appendChild(card);
        });

    } catch (e) {
        container.innerText = e.message;
    }
}

async function openAccount() {
    await createAccount(user.id);
    loadAccounts(); // новый счёт сразу появляется карточкой
}

async function depositMoney(accountId) {
    const amount = prompt("Введите сумму пополнения:");
    if (!amount) return;

    await deposit(accountId, amount);
    loadAccounts();
}

loadAccounts();

