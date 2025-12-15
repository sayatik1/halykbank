const user = getUser();
if (!user) location.href = "/index.html";

const container = document.getElementById("news");

async function loadNews() {
    container.innerHTML = "Loading...";

    try {
        const news = await getAllNews();
        container.innerHTML = "";

        if (news.length === 0) {
            container.innerHTML = "<p>No news yet</p>";
            return;
        }

        news.forEach(n => {
            const div = document.createElement("div");
            div.className = "news-card";

            div.innerHTML = `
                <h3>${n.title}</h3>
                <p>${n.content}</p>
                <div class="news-meta">
                    ${n.createdAt.replace("T", " ")}
                </div>
            `;

            container.appendChild(div);
        });
    } catch (e) {
        container.innerText = e.message;
    }
}

loadNews();
