document.addEventListener("DOMContentLoaded", () => {
    loadAccounts();
    setupTransferType();
});

function setupTransferType() {
    const typeSelect = document.getElementById("transferType");
    typeSelect.addEventListener("change", updateTransferUI);
    updateTransferUI();
}

function updateTransferUI() {
    const type = document.getElementById("transferType").value;

    document.getElementById("toAccountSelectGroup").style.display =
    type === "SELF" ? "block" : "none";

    document.getElementById("toAccountNumberGroup").style.display =
    type === "OTHER" ? "block" : "none";
}

async function loadAccounts() {
    const user = getUser();
    if (!user) return;

    try {
        const accounts = await getUserAccounts(user.id);

        const fromSelect = document.getElementById("fromAccount");
        const toSelect = document.getElementById("toAccount");

        fromSelect.innerHTML = "";
        toSelect.innerHTML = "";

        accounts.forEach(acc => {
            const option = document.createElement("option");
            option.value = acc.id;
            option.textContent = `${acc.accountNumber} (${acc.balance} ₸)`;

            fromSelect.appendChild(option.cloneNode(true));
            toSelect.appendChild(option);
        });

    } catch (e) {
        showMessage(e.message, true);
    }
}

async function makeTransfer() {
    const type = document.getElementById("transferType").value;
    const fromAccountId = document.getElementById("fromAccount").value;
    const amount = document.getElementById("amount").value;

    if (!amount || amount <= 0) {
        showMessage("Введите корректную сумму", true);
        return;
    }

    try {
        let toAccountId;

        if (type === "SELF") {
            toAccountId = document.getElementById("toAccount").value;
        } else {
            const accountNumber =
            document.getElementById("toAccountNumber").value.trim();

            if (!accountNumber) {
                showMessage("Введите номер счёта получателя", true);
                return;
            }

            const account = await api(
                `${API_BASE}/accounts/by-number/${accountNumber}`
            );
            toAccountId = account.id;
        }

        await transferMoney({
            fromAccountId,
            toAccountId,
            amount
        });

        showMessage("Перевод выполнен успешно");
        loadAccounts();

    } catch (e) {
        showMessage(e.message, true);
    }
}

function showMessage(text, error = false) {
    const el = document.getElementById("message");
    el.textContent = text;
    el.style.color = error ? "red" : "green";
}




