const user = getUser();
if (!user) location.href = "/index.html";

const fromSelect = document.getElementById("fromAccount");
const toSelect = document.getElementById("toAccount");
const msg = document.getElementById("message");

async function loadAccounts() {
    const accounts = await getUserAccounts(user.id);

    fromSelect.innerHTML = "";
    toSelect.innerHTML = "";

    accounts.forEach(acc => {
        const opt1 = document.createElement("option");
        opt1.value = acc.id;
        opt1.innerText = `${acc.accountNumber} (${acc.balance} ₸)`;

        const opt2 = opt1.cloneNode(true);

        fromSelect.appendChild(opt1);
        toSelect.appendChild(opt2);
    });
}

async function makeTransfer() {
    const fromId = Number(fromSelect.value);
    const toId = Number(toSelect.value);
    const amount = Number(document.getElementById("amount").value);

    msg.style.color = "red";

    if (!amount || amount <= 0) {
        msg.innerText = "Enter valid amount";
        return;
    }

    if (fromId === toId) {
        msg.innerText = "Choose different accounts";
        return;
    }

    try {
        await transferMoney({
            fromAccountId: fromId,
            toAccountId: toId,
            amount: amount
        });

        msg.style.color = "green";
        msg.innerText = "Transfer successful";

        document.getElementById("amount").value = "";
        loadAccounts();

    } catch (e) {
        msg.innerText = e.message;
    }
}

loadAccounts();
