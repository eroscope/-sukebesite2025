document.addEventListener("DOMContentLoaded", function () {
  fetch("data/articles.json")
    .then(res => res.json())
    .then(articles => {
      const container = document.querySelector(".container");
      if (!container) return;

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
          <div class="title">
            <a href="${article.link}">${article.title}</a>
          </div>
          <div class="card-meta">
            <span class="date">🕒 ${article.date}</span> |
            <span class="category">#${article.category}</span> |
            <span class="buzz">🔥 ${article.buzz}</span>
          </div>
          <div class="comment">
            1: 名無しさんのギガリすと<br>${article.comment}
          </div>
        `;
        container.appendChild(card);
      });

      // ページネーション
      const pagination = document.getElementById("pagination");
      const totalPages = Math.ceil(articles.length / pageSize);
      if (pagination) {
        pagination.innerHTML = "";

        if (page > 1) {
          const prev = document.createElement("a");
          prev.href = `#${page - 1}`;
          prev.textContent = "« 前へ";
          pagination.appendChild(prev);
        }

        for (let i = 1; i <= totalPages; i++) {
          const pageLink = document.createElement("a");
          pageLink.href = `#${i}`;
          pageLink.textContent = i;
          if (i === page) pageLink.style.fontWeight = "bold";
          pagination.appendChild(pageLink);
        }

        if (page < totalPages) {
          const next = document.createElement("a");
          next.href = `#${page + 1}`;
          next.textContent = "次へ »";
          pagination.appendChild(next);
        }
      }
    })
    .catch(err => console.error("記事の読み込み失敗", err));
});

// ハッシュ変更時に再読み込み
window.addEventListener("hashchange", () => location.reload());
