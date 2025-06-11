document.addEventListener("DOMContentLoaded", function () {
  fetch("data/articles.json")
    .then(res => res.json())
    .then(articles => {
      const container = document.getElementById("card-container");
      const pagination = document.getElementById("pagination");
      if (!container) return;

      const page = Number(location.hash.replace("#", "")) || 1;
      const pageSize = 20;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const sliced = articles.slice(startIndex, endIndex);

      sliced.forEach((article, i) => {
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

        // 自動広告挿入（2記事ごと）
        if ((i + 1) % 2 === 0) {
          const ad = document.createElement("div");
          ad.className = "ad-inline";
          ad.innerHTML = "[自動広告]";
          container.appendChild(ad);
        }
      });

      // ページネーション生成
      const totalPages = Math.ceil(articles.length / pageSize);
      pagination.innerHTML = "";

      if (page > 1) {
        const prev = document.createElement("a");
        prev.href = `#${page - 1}`;
        prev.textContent = "« 前へ";
        pagination.appendChild(prev);
      }

      for (let i = 1; i <= totalPages; i++) {
        const link = document.createElement("a");
        link.href = `#${i}`;
        link.textContent = i;
        if (i === page) link.style.fontWeight = "bold";
        pagination.appendChild(link);
      }

      if (page < totalPages) {
        const next = document.createElement("a");
        next.href = `#${page + 1}`;
        next.textContent = "次へ »";
        pagination.appendChild(next);
      }
    })
    .catch(err => console.error("記事の読み込み失敗", err));

  // ランダムタグ表示
  const tagPool = ["#異世界転生", "#猫耳", "#召喚術", "#チャイナ服", "#ギャル", "#変身", "#巨乳", "#GIF"];
  const tagList = document.getElementById("tag-list");
  if (tagList) {
    tagList.innerHTML = "<strong>🔥 トレンドタグ:</strong> " +
      tagPool.sort(() => 0.5 - Math.random()).slice(0, 4).map(tag => `<a href="#">${tag}</a>`).join(" ");
  }

  // SNS共有
  document.getElementById("share-twitter")?.addEventListener("click", e => {
    e.preventDefault();
    window.open(`https://twitter.com/share?url=${location.href}`, "_blank");
  });
  document.getElementById("share-line")?.addEventListener("click", e => {
    e.preventDefault();
    window.open(`https://social-plugins.line.me/lineit/share?url=${location.href}`, "_blank");
  });

  // ダークモード切替
  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.documentElement.dataset.theme =
        document.documentElement.dataset.theme === "dark" ? "" : "dark";
    });
  }
});

// ハッシュ変更でページ切り替え
window.addEventListener("hashchange", () => location.reload());
