// Lumos AI — website interactions
(() => {
  // Sticky nav background on scroll
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("open");
    links.classList.toggle("open");
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      toggle.classList.remove("open");
      links.classList.remove("open");
    })
  );

  // Reveal-on-scroll with a small stagger for siblings
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
        el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 5) * 80}ms`;
        el.classList.add("visible");
        revealObserver.unobserve(el);
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  // Animated agent demo in the hero window (loops)
  const steps = [...document.querySelectorAll("#chat .msg.agent")];
  const playDemo = () => {
    steps.forEach((s) => s.classList.remove("show"));
    steps.forEach((s, i) => setTimeout(() => s.classList.add("show"), 700 + i * 850));
  };
  playDemo();
  setInterval(playDemo, 700 + steps.length * 850 + 4500);

  // Spotlight effect that follows the cursor on feature cards
  document.querySelectorAll(".feature").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });

  // Copy SHA-256 checksum
  const hashBtn = document.getElementById("hashBtn");
  const copyLabel = document.getElementById("copyLabel");
  hashBtn.addEventListener("click", async () => {
    const text = hashBtn.querySelector("code").textContent.trim();
    try {
      await navigator.clipboard.writeText(text);
      copyLabel.textContent = "Copied!";
    } catch {
      copyLabel.textContent = "Select & copy";
    }
    setTimeout(() => (copyLabel.textContent = "Copy"), 1800);
  });

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();
})();
