const API = "http://localhost:8888/api/transactions";
const body = document.getElementById("transactionsBody");

async function loadTransactions() {
    body.innerHTML = "<tr><td colspan='5'>Загрузка...</td></tr>";

    try {
        const res = await fetch(API);
        const data = await res.json();

        if (data.length === 0) {
            body.innerHTML = "<tr><td colspan='5'>Нет транзакций</td></tr>";
            return;
        }

        body.innerHTML = data.map(t => `
            <tr>
                <td>${t.id}</td>
                <td>${t.accountId}</td>
                <td>${translate(t.type)}</td>
                <td>${t.amount}</td>
                <td>${new Date(t.createdAt).toLocaleString()}</td>
            </tr>
        `).join("");

    } catch (e) {
        body.innerHTML = `<tr><td colspan='5'>Ошибка</td></tr>`;
    }
}

function translate(type) {
    switch (type) {
        case "DEPOSIT": return "Пополнение";
        case "WITHDRAW": return "Списание";
        case "TRANSFER_IN": return "Перевод входящий";
        case "TRANSFER_OUT": return "Перевод исходящий";
        default: return type;
    }
}

loadTransactions();
