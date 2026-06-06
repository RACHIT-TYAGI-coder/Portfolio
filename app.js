    // Dark mode toggle
    const toggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const saved = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', saved);
    toggle.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });

    // Typing effect
    const lines = [
      '> Full-Stack Developer',
      '> AI / ML Engineer',
      '> DSA Problem Solver',
      '> Open to Internships',
    ];
    let li = 0, ci = 0, deleting = false;
    const el = document.getElementById('typed-text');
    function type() {
      const cur = lines[li];
      if (!deleting) {
        el.textContent = cur.slice(0, ++ci);
        if (ci === cur.length) { deleting = true; setTimeout(type, 1800); return; }
      } else {
        el.textContent = cur.slice(0, --ci);
        if (ci === 0) { deleting = false; li = (li + 1) % lines.length; }
      }
      setTimeout(type, deleting ? 40 : 70);
    }
    type();

    // Intersection observer: fade-in + skill bars
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          // animate skill bars inside this element
          e.target.querySelectorAll('.skill-bar').forEach(bar => {
            const w = bar.dataset.width || 1;
            bar.style.width = (parseFloat(w) * 100) + '%';
            bar.classList.add('animated');
          });
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Also trigger skill bars when about section scrolls in
    const aboutObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.skill-bar').forEach(bar => {
            bar.style.width = (parseFloat(bar.dataset.width || 1) * 100) + '%';
            bar.classList.add('animated');
          });
        }
      });
    }, { threshold: 0.2 });
    document.querySelectorAll('#about').forEach(el => aboutObs.observe(el));

    // Project card keyboard support
    document.querySelectorAll('.project-card[role="link"]').forEach(card => {
      card.addEventListener('keydown', e => { if (e.key === 'Enter') card.click(); });
    });