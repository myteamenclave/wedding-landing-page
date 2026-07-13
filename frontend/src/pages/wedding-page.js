const page = document.getElementById('wedding-page');

function startCountdown(dateValue, timeValue) {
  const countdown = document.getElementById('countdown');
  if (!countdown) {
    return;
  }

  const targetDate = new Date(`${dateValue}T${timeValue}`);
  if (Number.isNaN(targetDate.getTime())) {
    countdown.textContent = 'Soon';
    return;
  }

  const update = () => {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      countdown.innerHTML = '<div class="countdown-block"><span class="countdown-value">00</span><span class="countdown-label">D</span></div>';
      return;
    }

    const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
    const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

    countdown.innerHTML = `
      <div class="countdown-block">
        <span class="countdown-value">${days}</span>
        <span class="countdown-label">D</span>
      </div>
      <div class="countdown-block">
        <span class="countdown-value">${hours}</span>
        <span class="countdown-label">H</span>
      </div>
      <div class="countdown-block">
        <span class="countdown-value">${minutes}</span>
        <span class="countdown-label">M</span>
      </div>
      <div class="countdown-block">
        <span class="countdown-value">${seconds}</span>
        <span class="countdown-label">S</span>
      </div>
    `;
  };

  update();
  setInterval(update, 1000);
}

if (page) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || page.dataset.id;
  page.dataset.id = id;

  fetch(`/wedding-pages/${id}`)
    .then((response) => response.json())
    .then((result) => {
      const content = result.page;
      page.innerHTML = `
        <section class="hero-card">
          <img class="hero-image" src="${content.featuredImageUrl}" alt="Featured wedding" />
          <div class="hero-overlay">
            <div id="countdown" class="countdown">--</div>
            <p class="eyebrow">Wedding celebration</p>
            <h1>${content.title}</h1>
            <h2>${content.coupleName}</h2>
            <p>${content.weddingDate} at ${content.weddingTime}</p>
          </div>
        </section>
      `;
      startCountdown(content.weddingDate, content.weddingTime);
    })
    .catch(() => {
      page.innerHTML = '<p>Unable to load this wedding page.</p>';
    });
}
