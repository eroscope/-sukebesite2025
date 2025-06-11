document.addEventListener("DOMContentLoaded", function () {
  fetch("data/articles.json")
    .then(res => res.json())
    .then(articles => {
      const container = document.querySelector(".container");
      const pagination = document.getElementById("pagination");
      if (!container || !pagination) return;

      const pageSize = 20;
      const page = Number(location.hash.replace("#", "")) || 1;
      const startIndex = (page - 1) * pageSize;
      const sliced = articles.slice(startIndex, startIndex + pageSize);
      const totalPages = Math.ceil(articles.length / pageSize);

      container.innerHTML = "";
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
          <div class="comment">
            1: 名無しさんのギガリすと<br>${article.comment}
          </div>`;
        container.appendChild(card);
      });

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
    })
    .catch(err => console.error("記事の読み込み失敗", err));
});

// ページ番号変更で再描画
window.addEventListener("hashchange", () => location.reload());
