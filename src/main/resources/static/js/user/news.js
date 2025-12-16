const user = getUser();
if (!user) {
    window.location.href = "/login.html";
}

const container = document.getElementById("newsList");
const API = "http://localhost:8888/api/news";

// ================= LOAD =================
async function loadNews() {
    container.innerHTML = "Загрузка...";

    try {
        const res = await fetch(API);
        const news = await res.json();

        if (!news || news.length === 0) {
            container.innerHTML = "<p>Новостей пока нет</p>";
            return;
        }

        container.innerHTML = "";

        news.forEach(n => {
            const div = document.createElement("div");
            div.className = "news-card";

            div.innerHTML = `
                <h3>${n.title}</h3>
                <p>${n.content}</p>
                <small>${new Date(n.createdAt).toLocaleString()}</small>
            `;

            container.appendChild(div);
        });

    } catch (e) {
        container.innerHTML = `<p style="color:red">${e.message}</p>`;
    }
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", loadNews);

