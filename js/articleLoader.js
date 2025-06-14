document.addEventListener("DOMContentLoaded", function () {
  fetch("data/articles.json")
    .then(res => res.json())
    .then(articles => {
      const container = document.getElementById("card-container");
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
          <div class="comment">
            1: 名無しさんのギガリすと<br>${article.comment}
          </div>
        `;
        container.appendChild(card);
      });

      const pagination = document.getElementById("pagination");
      if (pagination) {
        pagination.innerHTML = "";
        const totalPages = Math.ceil(articles.length / pageSize);
        if (page > 1) {
          const prev = document.createElement("a");
          prev.href = `#${page - 1}`;
          prev.textContent = "前へ";
          pagination.appendChild(prev);
        }
        for (let i = 1; i <= totalPages; i++) {
          const a = document.createElement("a");
          a.href = `#${i}`;
          a.textContent = i;
          if (i === page) a.style.fontWeight = "bold";
          pagination.appendChild(a);
        }
        if (page < totalPages) {
          const next = document.createElement("a");
          next.href = `#${page + 1}`;
          next.textContent = "次へ";
          pagination.appendChild(next);
        }
      }
    })
    .catch(err => console.error("記事読み込みエラー", err));
});

window.addEventListener("hashchange", () => location.reload());
