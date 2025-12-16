const API = "http://localhost:8888/api/requests";
const body = document.getElementById("requestsBody");

async function loadRequests() {
    const res = await fetch(API);
    const data = await res.json();

    body.innerHTML = data.map(r => `
        <tr>
            <td>${r.id}</td>
            <td>${r.user.fullName}</td>
            <td>${r.service.name}</td>
            <td>${r.status}</td>
            <td>${r.createdAt.replace("T"," ")}</td>
        </tr>
    `).join("");
}

loadRequests();
