function logout() {
    localStorage.removeItem("user");
    window.location.href = "/";
}

function renderNavbar() {
    const nav = document.getElementById("nav-links");
    if (!nav) return;

    const user = JSON.parse(localStorage.getItem("user"));

    // ===== ГОСТЬ =====
    if (!user) {
        nav.innerHTML = `
            <a href="/">Главная</a>
            <a href="/login.html">Войти</a>
            <a href="/register.html">Регистрация</a>
        `;
        return;
    }

    // ===== АДМИН =====
    if (user.role && user.role.name === "ADMIN") {
        nav.innerHTML = `
            <a href="/">Главная</a>
            <a href="/admin/admin.html">Админ-панель</a>
            <span>${user.fullName || user.email}</span>
            <button onclick="logout()">Выход</button>
        `;
        return;
    }

    // ===== ПОЛЬЗОВАТЕЛЬ =====
    nav.innerHTML = `
        <a href="/">Главная</a>
        <a href="/accounts.html">Счета</a>
        <a href="/transactions.html">Операции</a>
        <a href="/transfers.html">Переводы</a>
        <a href="/services.html">Услуги</a>
        <a href="/news.html">Новости</a>
        <span>${user.fullName || user.email}</span>
        <button onclick="logout()">Выход</button>
    `;
}

document.addEventListener("DOMContentLoaded", renderNavbar);


