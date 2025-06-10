console.log("JS読み込み成功！");

document.addEventListener("DOMContentLoaded", function () {
  fetch("data/articles.json")
    .then((res) => res.json())
    .then((articles) => {
      const container = document.querySelector(".container");
      if (!container) return;

      // ★ ページ番号をURLハッシュから取得（例：#2 → ページ2）
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
});
// ★ ページネーション自動生成（記事数に応じて）
fetch("data/articles.json")
  .then((res) => res.json())
  .then((articles) => {
    const totalPages = Math.ceil(articles.length / 20);
    const pagination = document.getElementById("pagination");
    if (!pagination) return;

    const page = Number(location.hash.replace("#", "")) || 1;

    if (totalPages <= 1) return; // 1ページだけなら非表示

    // 前へ
    if (page > 1) {
      const prev = document.createElement("a");
      prev.href = `#${page - 1}`;
      prev.textContent = "« 前へ";
      pagination.appendChild(prev);
    }

    // ページ番号リンク
    for (let i = 1; i <= totalPages; i++) {
      const link = document.createElement("a");
      link.href = `#${i}`;
      link.textContent = `${i}`;
      if (i === page) link.style.fontWeight = "bold";
      pagination.appendChild(link);
    }

    // 次へ
    if (page < totalPages) {
      const next = document.createElement("a");
      next.href = `#${page + 1}`;
      next.textContent = "次へ »";
      pagination.appendChild(next);
    }
  });
