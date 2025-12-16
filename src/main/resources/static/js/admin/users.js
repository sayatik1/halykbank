const API = "http://localhost:8888/api";
const user = JSON.parse(localStorage.getItem("user"));

// 🔐 ЗАЩИТА
if (!user || user.role !== "ADMIN") {
    window.location.href = "/";
}

async function loadUsers() {
    const tbody = document.getElementById("users-table");
    tbody.innerHTML = "<tr><td colspan='4'>Загрузка...</td></tr>";

    try {
        const res = await fetch(`${API}/users`);
        const users = await res.json();

        tbody.innerHTML = "";

        users.forEach(u => {
            tbody.innerHTML += `
                <tr>
                    <td>${u.id}</td>
                    <td>${u.fullName}</td>
                    <td>${u.email}</td>
                    <td>${u.role.name}</td>
                </tr>
            `;
        });

    } catch (e) {
        tbody.innerHTML = `<tr><td colspan="4">${e.message}</td></tr>`;
    }
}

loadUsers();
