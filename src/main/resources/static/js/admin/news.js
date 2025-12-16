const API = "http://localhost:8888/api/news";
const list = document.getElementById("newsList");

const user = JSON.parse(localStorage.getItem("user"));

// ================= LOAD =================
async function loadNews() {
    list.innerHTML = "Загрузка...";

    try {
        const res = await fetch(API);
        const news = await res.json();

        if (news.length === 0) {
            list.innerHTML = "<p>Новостей пока нет</p>";
            return;
        }

        list.innerHTML = news.map(n => `
            <div class="news-card">
                <h3>${n.title}</h3>
                <p>${n.content}</p>
                <small>${new Date(n.createdAt).toLocaleString()}</small>

                <button
                    style="margin-top:10px;background:#dc2626"
                    onclick="deleteNews(${n.id})">
                    Удалить
                </button>
            </div>
        `).join("");

    } catch (e) {
        list.innerHTML = `<p style="color:red">${e.message}</p>`;
    }
}

// ================= CREATE =================
async function createNews() {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (!title || !content) {
        alert("Заполните все поля");
        return;
    }

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            authorId: user.id,
            title,
            content
        })
    });

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    loadNews();
}

// ================= DELETE =================
async function deleteNews(id) {
    if (!confirm("Удалить новость?")) return;

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    loadNews();
}

// ================= INIT =================
loadNews();
