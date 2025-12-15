document.addEventListener("DOMContentLoaded", async () => {
    const user = getUser();
    if (!user) return;

    const select = document.getElementById("accountSelect");
    const table = document.getElementById("transactionsTable");

    // Загружаем счета пользователя
    const accounts = await getUserAccounts(user.id);

    select.innerHTML = accounts.map(a =>
    `<option value="${a.id}">
        ${a.accountNumber} (${a.balance} ₸)
    </option>`
    ).join("");

    if (accounts.length > 0) {
        loadTransactions(accounts[0].id);
    }

    select.addEventListener("change", () => {
        loadTransactions(select.value);
    });

    async function loadTransactions(accountId) {
        table.innerHTML = "";

        const transactions = await getTransactions(accountId);

        if (transactions.length === 0) {
            table.innerHTML = `<tr><td colspan="3">Нет операций</td></tr>`;
            return;
        }

        table.innerHTML = transactions.map(t => `
            <tr>
                <td>${new Date(t.createdAt).toLocaleString()}</td>
                <td>${translateType(t.type)}</td>
                <td>${t.amount} ₸</td>
            </tr>
        `).join("");
    }

    function translateType(type) {
        switch (type) {
            case "DEPOSIT": return "Пополнение";
            case "WITHDRAW": return "Списание";
            case "TRANSFER_OUT": return "Перевод (исходящий)";
            case "TRANSFER_IN": return "Перевод (входящий)";
            default: return type;
        }
    }
});

