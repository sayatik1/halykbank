const API = "http://localhost:8888/api";

// ===== LOGIN =====
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

        const raw = await res.json();

        const user = {
            id: raw.id,
            fullName: raw.fullName,
            email: raw.email,
            role: raw.role.name // "ADMIN" | "USER"
        };

        localStorage.setItem("user", JSON.stringify(user));

        if (user.role === "ADMIN") {
            window.location.replace("/admin/index.html");
        } else {
            window.location.replace("/user/index.html");
        }

    } catch (e) {
        document.getElementById("error").innerText = e.message;
    }
}

// ===== REGISTER =====
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

        window.location.replace("/login.html");

    } catch (e) {
        document.getElementById("error").innerText = e.message;
    }
}

