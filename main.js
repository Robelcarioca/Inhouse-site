/* ============================================================
   IN-HOUSE MAINTENANCE — MAIN.JS
   Modern & Techy Animation Engine
============================================================ */

// ── 1. PAGE LOADER with percentage counter
(function initLoader() {
  const loader = document.getElementById('page-loader');
  const pct    = document.getElementById('loader-pct');
  const fill   = document.getElementById('loader-fill');
  if (!loader) return;
  let count = 0;
  const iv = setInterval(function() {
    count = Math.min(count + Math.floor(Math.random() * 18 + 6), 100);
    if (pct)  pct.textContent  = count + '%';
    if (fill) fill.style.width = count + '%';
    if (count >= 100) {
      clearInterval(iv);
      setTimeout(function() {
        loader.style.opacity = '0';
        setTimeout(function() { loader.remove(); }, 500);
      }, 280);
    }
  }, 75);
})();

// ── 2. SCROLL PROGRESS BAR
var progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', function() {
  if (!progressBar) return;
  var scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = scrolled + '%';
}, { passive: true });

// ── 3. MOBILE NAV
var hamburger  = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', function() {
    mobileMenu.classList.toggle('open');
    var spans  = hamburger.querySelectorAll('span');
    var isOpen = mobileMenu.classList.contains('open');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px,5px)' : '';
    spans[1].style.opacity   = isOpen ? '0' : '1';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px,-5px)' : '';
  }, { passive: true });
  mobileMenu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('open');
      var spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '1';
      spans[2].style.transform = '';
    });
  });
}

// ── 4. NAV SHADOW ON SCROLL
window.addEventListener('scroll', function() {
  var nav = document.querySelector('nav');
  if (nav) nav.style.boxShadow = window.scrollY > 20 ? '0 4px 30px rgba(0,0,0,0.25)' : 'none';
}, { passive: true });

// ── 5. INTERSECTION OBSERVER — fade-up
var fadeObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      fadeObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(function(el) { fadeObserver.observe(el); });

// ── 6. ANIMATED COUNTER utility
function animateCount(el, target, suffix, duration) {
  var start = performance.now();
  function update(now) {
    var p    = Math.min((now - start) / duration, 1);
    var ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(ease * target) + suffix;
    if (p < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Hero stat counters
var heroCountObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(function(el) {
        var txt = el.textContent.trim();
        var num = parseFloat(txt);
        var suf = txt.replace(String(num), '');
        animateCount(el, num, suf, 2000);
      });
      heroCountObs.disconnect();
    }
  });
}, { threshold: 0.6 });
var statsEl = document.querySelector('.hero-stats');
if (statsEl) heroCountObs.observe(statsEl);

// About data-cell counters
var aboutCountObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.adc-num').forEach(function(el) {
        var target = parseInt(el.dataset.count);
        var suffix = el.dataset.suffix || '';
        animateCount(el, target, suffix, 1600);
      });
      aboutCountObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.about-data-bar').forEach(function(el) { aboutCountObs.observe(el); });

// ── 7. TYPING EFFECT — hero tagline
(function initTyping() {
  var el     = document.getElementById('typed-line');
  if (!el) return;
  var phrases = ['Every Time.', 'Done Right.', 'On Schedule.', 'By Experts.', 'Every Time.'];
  var pi = 0, ci = 0, deleting = false;
  el.textContent = '';

  function type() {
    var phrase = phrases[pi];
    if (!deleting) {
      ci++;
      el.textContent = phrase.slice(0, ci);
      if (ci === phrase.length) {
        deleting = true;
        setTimeout(type, 2200);
        return;
      }
      setTimeout(type, 88);
    } else {
      ci--;
      el.textContent = phrase.slice(0, ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
        setTimeout(type, 380);
        return;
      }
      setTimeout(type, 44);
    }
  }
  setTimeout(type, 1800);
})();

// ── 8. TERMINAL REVEAL
(function initTerminal() {
  var termBlock = document.querySelector('.terminal-block');
  if (!termBlock) return;
  var lineIds = ['tl1','tl2','tl3','tl4','tl5','tl6','tl7','tl8','tl9'];

  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        lineIds.forEach(function(id, i) {
          var el = document.getElementById(id);
          if (!el) return;
          setTimeout(function() { el.classList.add('show'); }, i * 260 + 200);
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  obs.observe(termBlock);
})();

// ── 9. SERVICE CARD — metric bars on scroll
var metricObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.classList.add('metric-on');
      metricObs.unobserve(e.target);
    }
  });
}, { threshold: 0.35 });
document.querySelectorAll('.service-card').forEach(function(el) { metricObs.observe(el); });

// ── 10. SERVICE CARD — 3D tilt
document.querySelectorAll('.service-card').forEach(function(card) {
  card.addEventListener('mousemove', function(e) {
    var rect = this.getBoundingClientRect();
    var xP   = (e.clientX - rect.left) / rect.width  - 0.5;
    var yP   = (e.clientY - rect.top)  / rect.height - 0.5;
    this.style.transform = 'translateY(-8px) rotateX(' + (-yP * 7) + 'deg) rotateY(' + (xP * 7) + 'deg)';
  }, { passive: true });
  card.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// ── 11. BUTTON RIPPLE
document.querySelectorAll('.btn-primary, .btn-white, .btn-ghost, .btn-outline').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    var rect = this.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height) * 2;
    var x    = e.clientX - rect.left - size / 2;
    var y    = e.clientY - rect.top  - size / 2;
    var rip  = document.createElement('span');
    rip.className = 'ripple';
    rip.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + x + 'px;top:' + y + 'px';
    this.appendChild(rip);
    setTimeout(function() { rip.remove(); }, 700);
  });
});

// ── 12. ASSURANCE ITEMS — stagger reveal
var assuranceObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.assurance-item').forEach(function(item, i) {
        setTimeout(function() { item.classList.add('show'); }, i * 140);
      });
      assuranceObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.assurance-bar').forEach(function(el) { assuranceObs.observe(el); });

// ── 13. PARTICLE CANVAS
(function initParticles() {
  var canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, particles = [], mouseX = 0, mouseY = 0;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  for (var i = 0; i < 55; i++) {
    particles.push({
      x: Math.random() * 600, y: Math.random() * 800,
      r: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.45 + 0.1
    });
  }

  canvas.addEventListener('mousemove', function(e) {
    var rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  }, { passive: true });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(function(p) {
      var dx = mouseX - p.x, dy = mouseY - p.y;
      var d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 100) { p.vx -= (dx / d) * 0.05; p.vy -= (dy / d) * 0.05; }
      p.x += p.vx; p.y += p.vy;
      p.vx *= 0.99; p.vy *= 0.99;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(59,130,246,' + p.alpha + ')';
      ctx.fill();
    });
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 85) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(59,130,246,' + (0.14 * (1 - d / 85)) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// ── 14. SMOOTH SCROLL with nav offset
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
  });
});
