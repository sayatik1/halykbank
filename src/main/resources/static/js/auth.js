const API = "http://localhost:8888/api";

async function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch(`${API}/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) throw new Error("Неверный email или пароль");

        const user = await res.json();
        localStorage.setItem("user", JSON.stringify(user));

        if (user.role.name === "ADMIN") {
            window.location.href = "/admin/admin.html";
        } else {
            window.location.href = "/accounts.html";
        }
    } catch (e) {
        document.getElementById("error").innerText = e.message;
    }
}

async function registerUser() {
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch(`${API}/users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, email, password })
        });

        if (!res.ok) throw new Error("Ошибка регистрации");

        window.location.href = "/login.html";
    } catch (e) {
        document.getElementById("error").innerText = e.message;
    }
}


