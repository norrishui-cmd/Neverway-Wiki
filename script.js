const searchInput = document.querySelector("#searchInput");
const buttons = document.querySelectorAll("[data-filter]");
const articles = document.querySelectorAll("#articleList article");
const countdown = document.querySelector("[data-countdown]");

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

function updateCountdown() {
  if (!countdown) return;

  const target = new Date(countdown.dataset.countdown).getTime();
  const distance = target - Date.now();

  const daysEl = countdown.querySelector("[data-countdown-days]");
  const hoursEl = countdown.querySelector("[data-countdown-hours]");
  const minutesEl = countdown.querySelector("[data-countdown-minutes]");
  const secondsEl = countdown.querySelector("[data-countdown-seconds]");

  if (distance <= 0) {
    daysEl.textContent = "0";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  daysEl.textContent = String(days);
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
