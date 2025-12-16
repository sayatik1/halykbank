function logout() {
    localStorage.removeItem("user");
    window.location.replace("/login.html");
}

function renderNavbar() {
    const nav = document.getElementById("nav-links");
    if (!nav) return;

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        nav.innerHTML = `
            <a href="/index.html">Главная</a>
            <a href="/login.html">Войти</a>
            <a href="/register.html">Регистрация</a>
        `;
        return;
    }

    if (user.role === "ADMIN") {
        nav.innerHTML = `
            <a href="/admin/index.html">Админ</a>
            <a href="/admin/accounts.html">Счета</a>
            <a href="/admin/users.html">Пользователи</a>
            <a href="/admin/transactions.html">Транзакции</a>
            <span>Админ ${user.fullName}</span>
            <button onclick="logout()">Выход</button>
        `;
        return;
    }

    nav.innerHTML = `
        <a href="/user/index.html">Главная</a>
        <a href="/user/accounts.html">Счета</a>
        <a href="/user/transactions.html">Операции</a>
        <a href="/user/transfers.html">Переводы</a>
        <a href="/user/services.html">Услуги</a>
        <a href="/user/news.html">Новости</a>
        <span>${user.fullName}</span>
        <button onclick="logout()">Выход</button>
    `;
}

document.addEventListener("DOMContentLoaded", renderNavbar);




