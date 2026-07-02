const searchInput = document.querySelector("#searchInput");
const buttons = document.querySelectorAll("[data-filter]");
const articles = document.querySelectorAll("#articleList article");

let activeFilter = "all";

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();

  articles.forEach((article) => {
    const categoryMatch = activeFilter === "all" || article.dataset.category === activeFilter;
    const text = `${article.textContent} ${article.dataset.search}`.toLowerCase();
    const searchMatch = query.length === 0 || text.includes(query);
    article.hidden = !(categoryMatch && searchMatch);
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    if (activeFilter === "all") {
      searchInput.value = "";
    }
    applyFilters();
  });
});

searchInput.addEventListener("input", applyFilters);
