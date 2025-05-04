document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("repo-container");

  fetch(
    "https://api.github.com/search/repositories?q=topic:software&sort=stars"
  )
    .then((res) => res.json())
    .then((data) => {
      data.items.forEach((repo) => {
        const card = document.createElement("div");
        card.classList.add("repo-card");

        card.innerHTML = `
          <img src="${repo.owner.avatar_url}" alt="${
          repo.owner.login
        }" class="avatar">
          <div class="repo-details">
            <h2>${repo.name}</h2>
            <p><strong>Owner:</strong> ${repo.owner.login}</p>
            <p>${repo.description || "No description provided."}</p>
            <p><strong>Language:</strong> ${repo.language || "Unknown"}</p>
            <p><strong>⭐ Stars:</strong> ${repo.stargazers_count.toLocaleString()}</p>
            <a href="${
              repo.html_url
            }" target="_blank" class="visit-btn">Visit Repo</a>
          </div>
        `;

        container.appendChild(card);
      });
    })
    .catch((err) => {
      container.innerHTML = `<p style="color: red;">Failed to load repositories: ${err.message}</p>`;
    });
});
document.getElementById("searchInput").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const cards = document.querySelectorAll(".repo-card");

  cards.forEach((card) => {
    const repoName = card.querySelector("h2").textContent.toLowerCase();
    card.style.display = repoName.includes(searchTerm) ? "block" : "none";
  });
});
