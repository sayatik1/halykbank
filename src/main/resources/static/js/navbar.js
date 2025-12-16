function logout() {
    localStorage.removeItem("user");
    window.location.replace("/login.html");
}

function renderNavbar() {
    const links = document.getElementById("nav-links");
    const userBox = document.getElementById("nav-user");

    if (!links || !userBox) return;

    const user = JSON.parse(localStorage.getItem("user"));

    // ===== ГОСТЬ =====
    if (!user) {
        links.innerHTML = `
            <a href="/index.html">Главная</a>
        `;
        userBox.innerHTML = `
            <a href="/login.html">Войти</a>
            <a href="/register.html">Регистрация</a>
        `;
        return;
    }

    // ===== ADMIN =====
    if (user.role === "ADMIN") {
        links.innerHTML = `
            <a href="/admin/index.html">Админ</a>
            <a href="/admin/accounts.html">Счета</a>
            <a href="/admin/users.html">Пользователи</a>
            <a href="/admin/transactions.html">Транзакции</a>
            <a href="/admin/news.html">Новости</a>
        `;

        userBox.innerHTML = `
            <span class="nav-username">Админ ${user.fullName}</span>
            <button class="logout-btn" onclick="logout()">Выход</button>
        `;
        return;
    }

    // ===== USER =====
    links.innerHTML = `
        <a href="/user/index.html">Главная</a>
        <a href="/user/accounts.html">Счета</a>
        <a href="/user/transactions.html">Операции</a>
        <a href="/user/transfers.html">Переводы</a>
        <a href="/user/services.html">Услуги</a>
        <a href="/user/news.html">Новости</a>
    `;

    userBox.innerHTML = `
        <span class="nav-username">${user.fullName}</span>
        <button class="logout-btn" onclick="logout()">Выход</button>
    `;
}

document.addEventListener("DOMContentLoaded", renderNavbar);




