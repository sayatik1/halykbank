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

        if (!res.ok) throw new Error("Login failed");

        const user = await res.json();
        saveUser(user);

        if (user.role.name === "ADMIN") {
            window.location.href = "/admin/admin.html";
        } else {
            window.location.href = "/dashboard/dashboard.html";
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

        if (!res.ok) throw new Error("Registration failed");

        window.location.href = "/index.html";
    } catch (e) {
        document.getElementById("error").innerText = e.message;
    }
}
