const API = "http://localhost:8888/api";

// ================= LOGIN =================
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

        const rawUser = await res.json();

        // ❗ храним роль КАК СТРОКУ
        const user = {
            id: rawUser.id,
            fullName: rawUser.fullName,
            email: rawUser.email,
            role: rawUser.role.name // "ADMIN" | "USER"
        };

        localStorage.setItem("user", JSON.stringify(user));

        // ✅ правильный редирект
        if (user.role === "ADMIN") {
            window.location.href = "/admin/index.html";
        } else {
            window.location.href = "/user/index.html";
        }

    } catch (e) {
        document.getElementById("error").innerText = e.message;
    }
}

// ================= REGISTER =================
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

        window.location.href = "/user/index.html";
    } catch (e) {
        document.getElementById("error").innerText = e.message;
    }
}
