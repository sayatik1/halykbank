const user = getUser();
if (!user) location.href = "/index.html";

const tbody = document.getElementById("requests");

async function loadRequests() {
    tbody.innerHTML = "<tr><td colspan='3'>Loading...</td></tr>";

    const requests = await getUserRequests(user.id);
    tbody.innerHTML = "";

    if (requests.length === 0) {
        tbody.innerHTML = "<tr><td colspan='3'>No requests</td></tr>";
        return;
    }

    requests.forEach(r => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${r.service.name}</td>
            <td class="status-${r.status}">${r.status}</td>
            <td>${r.createdAt.replace("T", " ")}</td>
        `;
        tbody.appendChild(tr);
    });
}

async function createRequest(serviceId) {
    await createServiceRequest(user.id, serviceId);
    loadRequests();
}

loadRequests();
