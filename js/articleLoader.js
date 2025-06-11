document.addEventListener("DOMContentLoaded", function () {
  fetch("data/articles.json")
    .then((res) => res.json())
    .then((articles) => {
      const container = document.querySelector("#card-container");
      const pagination = document.querySelector("#pagination");
      const page = Number(location.hash.replace("#", "")) || 1;
      const pageSize = 20;
      const totalPages = Math.ceil(articles.length / pageSize);
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const sliced = articles.slice(startIndex, endIndex);

      container.innerHTML = "";
      sliced.forEach((article) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <a href="${article.link}">
            ${article.image.endsWith(".mp4")
              ? `<video src="${article.image}" autoplay loop muted></video>`
              : `<img src="${article.image}" alt="${article.title}">`}
          </a>
          <div class="title"><a href="${article.link}">${article.title}</a></div>
          <div class="comment">1: 名無しさんのギガリすと<br>${article.comment}</div>
        `;
        container.appendChild(card);
      });

      // ページネーション描画
      pagination.innerHTML = "";
      for (let i = 1; i <= totalPages; i++) {
        const a = document.createElement("a");
        a.href = `#${i}`;
        a.textContent = i;
        if (i === page) a.style.fontWeight = "bold";
        pagination.appendChild(a);
      }
    });
});

window.addEventListener("hashchange", () => {
  location.reload();
});
