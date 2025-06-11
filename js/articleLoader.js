
document.addEventListener("DOMContentLoaded", function () {
  fetch("data/articles.json")
    .then(res => res.json())
    .then(articles => {
      const container = document.getElementById("card-container");
      const page = Number(location.hash.replace("#", "")) || 1;
      const pageSize = 20;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const sliced = articles.slice(startIndex, endIndex);

      sliced.forEach(article => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <a href="${article.link}">
            <img src="${article.image}" alt="${article.title}">
          </a>
          <div class="title"><a href="${article.link}">${article.title}</a></div>
          <div class="comment">1: 名無しさんのギガリすと<br>${article.comment}</div>
        `;
        container.appendChild(card);
      });

      const pagination = document.getElementById("pagination");
      const totalPages = Math.ceil(articles.length / pageSize);
      if (pagination) {
        pagination.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
          const link = document.createElement("a");
          link.href = `#${i}`;
          link.textContent = i;
          if (i === page) link.style.fontWeight = "bold";
          pagination.appendChild(link);
        }
      }
    })
    .catch(err => console.error("記事の読み込み失敗", err));
});

window.addEventListener("hashchange", () => location.reload());
