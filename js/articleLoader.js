console.log("JS読み込み成功！");

document.addEventListener("DOMContentLoaded", function () {
  fetch("data/articles.json")
    .then((res) => res.json())
    .then((articles) => {
      const container = document.querySelector(".container");
      if (!container) return;

      const page = Number(location.hash.replace("#", "")) || 1;
      const pageSize = 20;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      const sliced = articles.slice(startIndex, endIndex);
      sliced.forEach((article) => {
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
    })
    .catch((err) => {
      console.error("記事の読み込みに失敗しました。", err);
    });
});

window.addEventListener("hashchange", () => {
  location.reload(); // ハッシュ変更でリロードして再描画
