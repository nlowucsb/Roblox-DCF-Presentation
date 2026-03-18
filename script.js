const fcf = [
  { y: "2025A", v: 1.353 },
  { y: "2026E", v: 1.71 },
  { y: "2027E", v: 2.086 },
  { y: "2028E", v: 2.503 },
  { y: "2029E", v: 3.004 },
  { y: "2030E", v: 3.545 },
];

function renderChart() {
  const el = document.querySelector("#fcf-chart");
  if (!el) return;

  const max = Math.max(...fcf.map((r) => r.v));
  el.innerHTML = fcf
    .map((r) => {
      const w = (r.v / max) * 100;
      return `
        <div class="bar-row">
          <strong>${r.y}</strong>
          <div class="bar-track"><div class="bar-fill" style="width:${w.toFixed(2)}%"></div></div>
          <span class="bar-val">$${r.v.toFixed(2)}B</span>
        </div>
      `;
    })
    .join("");
}

function animateCounters() {
  document.querySelectorAll("[data-count]").forEach((node) => {
    const target = Number(node.dataset.count);
    if (!Number.isFinite(target)) return;

    const start = performance.now();
    const dur = 900;

    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - (1 - p) ** 3;
      node.textContent = `$${(target * eased).toFixed(2)}`;
      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  });
}

function revealOnScroll() {
  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("show");
      });
    },
    { threshold: 0.15 },
  );

  items.forEach((i) => observer.observe(i));
}

renderChart();
animateCounters();
revealOnScroll();
