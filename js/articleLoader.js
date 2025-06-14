document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("card-container");
  const pagination = document.getElementById("pagination");
  const articlesPerPage = 20;
  let currentPage = parseInt(location.hash.replace("#page=", "")) || 1;

  fetch("data/articles.json")
    .then(response => response.json())
    .then(data => {
      const totalPages = Math.ceil(data.length / articlesPerPage);
      renderArticles(data, currentPage);
      renderPagination(totalPages);
    });

  function renderArticles(data, page) {
    container.innerHTML = "";
    const start = (page - 1) * articlesPerPage;
    const end = start + articlesPerPage;
    const pageArticles = data.slice(start, end);

    pageArticles.forEach(article => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <a href="${article.url}">
          <img src="${article.image}" alt="${article.title}">
          <div class="card-content">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
          </div>
        </a>`;
      container.appendChild(card);
    });
  }

  function renderPagination(totalPages) {
    pagination.innerHTML = "";
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "前へ";
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => changePage(currentPage - 1);
    pagination.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.disabled = i === currentPage;
      btn.onclick = () => changePage(i);
      pagination.appendChild(btn);
    }

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "次へ";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => changePage(currentPage + 1);
    pagination.appendChild(nextBtn);
  }

  function changePage(page) {
    location.hash = `#page=${page}`;
    location.reload();
  }
});
