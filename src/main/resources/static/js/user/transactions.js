const user = getUser();
if (!user) location.href = "/index.html";

const select = document.getElementById("accountSelect");
const tbody = document.getElementById("transactions");

async function loadAccounts() {
    const accounts = await getUserAccounts(user.id);
    select.innerHTML = "";

    accounts.forEach(acc => {
        const opt = document.createElement("option");
        opt.value = acc.id;
        opt.innerText = acc.accountNumber;
        select.appendChild(opt);
    });

    if (accounts.length > 0) {
        loadTransactions(accounts[0].id);
    }
}

async function loadTransactions(accountId) {
    tbody.innerHTML = "<tr><td colspan='3'>Loading...</td></tr>";

    const txs = await getTransactions(accountId);
    tbody.innerHTML = "";

    if (txs.length === 0) {
        tbody.innerHTML = "<tr><td colspan='3'>No transactions</td></tr>";
        return;
    }

    txs.forEach(tx => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${tx.createdAt.replace("T", " ")}</td>
            <td class="tx-${tx.type}">${tx.type}</td>
            <td>${tx.amount} ₸</td>
        `;
        tbody.appendChild(tr);
    });
}

select.addEventListener("change", () => {
    loadTransactions(select.value);
});

loadAccounts();
