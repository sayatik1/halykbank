const user = getUser();
if (!user) {
    window.location.href = "/index.html";
}

async function loadAccounts() {
    const container = document.getElementById("accounts");
    container.innerHTML = "Loading...";

    try {
        const accounts = await getUserAccounts(user.id);
        container.innerHTML = "";

        if (accounts.length === 0) {
            container.innerHTML = "<p>No accounts yet</p>";
            return;
        }

        accounts.forEach(acc => {
            const div = document.createElement("div");
            div.className = "account-card";

            div.innerHTML = `
                <h3>${acc.accountNumber}</h3>
                <div class="balance">${acc.balance} ₸</div>
                <button onclick="depositMoney(${acc.id})">Deposit</button>
            `;

            container.appendChild(div);
        });
    } catch (e) {
        container.innerText = e.message;
    }
}

async function openAccount() {
    await createAccount(user.id);
    loadAccounts();
}

async function depositMoney(accountId) {
    const amount = prompt("Enter amount");
    if (!amount) return;

    await deposit(accountId, amount);
    loadAccounts();
}

loadAccounts();
