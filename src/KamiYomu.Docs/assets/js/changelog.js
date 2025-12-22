async function loadChangelog() {
  const owner = "KamiYomu";
  const repo = "KamiYomu";

  const url = `https://api.github.com/repos/${owner}/${repo}/releases`;

  const container = document.getElementById("changelog");

  try {
    const response = await fetch(url);
    const releases = await response.json();

    if (!Array.isArray(releases)) {
      container.innerHTML = "<p>Unable to load changelog.</p>";
      return;
    }

    container.innerHTML = releases.map(rel => {
      // Build asset list
      const assetsHTML = rel.assets && rel.assets.length > 0
        ? `
          <div class="card-section">
            <h3>Assets</h3>
            <ul class="assets">
              ${rel.assets.map(asset => `
                <li>
                  <a href="${asset.browser_download_url}" target="_blank">
                    ${asset.name}
                  </a>
                  <span>(${(asset.size / 1024 / 1024).toFixed(2)} MB)</span>
                </li>
              `).join("")}
            </ul>
          </div>
        `
        : `
          <div class="card-section">
            <p>No assets available for this release.</p>
          </div>
        `;

      return `
        <div class="release-card">
          <div class="card-header">
            <h2>${rel.name || rel.tag_name}</h2>
            <p class="date">Published: ${new Date(rel.published_at).toLocaleDateString()}</p>
          </div>

          <div class="card-body">
            ${marked.parse(rel.body || "")}
          </div>

          ${assetsHTML}
        </div>
      `;
    }).join("");

  } catch (err) {
    container.innerHTML = "<p>Error loading changelog.</p>";
    console.error(err);
  }
}


loadChangelog();