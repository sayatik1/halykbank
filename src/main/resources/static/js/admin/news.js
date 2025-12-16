const API = "http://localhost:8888/api/news";
const list = document.getElementById("newsList");

async function loadNews() {
    const res = await fetch(API);
    const news = await res.json();

    list.innerHTML = news.map(n => `
        <div class="news-card">
            <h3>${n.title}</h3>
            <p>${n.content}</p>
            <small>${n.createdAt.replace("T"," ")}</small>
        </div>
    `).join("");
}

async function createNews() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (!title || !content) {
        alert("Заполните все поля");
        return;
    }

    await fetch(API, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ title, content })
    });

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    loadNews();
}

loadNews();
