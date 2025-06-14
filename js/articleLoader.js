document.addEventListener("DOMContentLoaded", function () {
  fetch("data/articles.json")
    .then((res) => res.json())
    .then((articles) => {
      const container = document.getElementById("card-container");
      if (!container) return;

      const page = Number(location.hash.replace("#", "")) || 1;
      const pageSize = 20;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const pageArticles = articles.slice(start, end);

      container.innerHTML = "";

      pageArticles.forEach((article) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <a href="${article.link}">
            <img src="${article.image}" alt="${article.title}">
          </a>
          <div class="title">
            <a href="${article.link}">${article.title}</a>
          </div>
          <div class="comment">
            1: 名無しさんのギガリすと<br>${article.comment}
          </div>
        `;
        container.appendChild(card);
      });
    });
});

window.addEventListener("hashchange", () => location.reload());
