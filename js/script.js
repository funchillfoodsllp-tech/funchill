document.addEventListener("DOMContentLoaded", function () {

  /* ================= SELECTORS ================= */
  const navbar = document.querySelector(".custom-navbar");
  const backToTop = document.getElementById("backToTop");
  const circle = document.querySelector(".progress-ring-circle");
  const navLinks = document.querySelectorAll(".nav-link");
  const tabs = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".tab-content");
  const emailInput = document.getElementById("emailField");
  const sourceInput = document.getElementById("sourceField");
  const cards = document.querySelectorAll(".cert-card");

  let lastScroll = 0;
  let ticking = false;

  /* ================= PROGRESS RING ================= */
  let circumference = 0;

  if (circle) {
    const radius = circle.r.baseVal.value;
    circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;
  }

  /* ================= SCROLL (OPTIMIZED) ================= */
  function handleScroll() {

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;

    /* NAVBAR */
    if (navbar) {
      navbar.classList.toggle("scrolled", scrollTop > 50);

      const hideNav = scrollTop > lastScroll && scrollTop > 100;
      navbar.classList.toggle("nav-hidden", hideNav);
    }

    lastScroll = scrollTop;

    /* BACK TO TOP */
    if (backToTop) {
      backToTop.classList.toggle("active", scrollTop > 300);
    }

    /* PROGRESS RING */
    if (circle) {
      const offset = circumference - progress * circumference;
      circle.style.strokeDashoffset = offset;
    }

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });

  /* ================= SMOOTH SCROLL ================= */
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId.startsWith("#")) {
        e.preventDefault();

        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: "smooth"
          });
        }
      }
    });
  });

  /* ================= BACK TO TOP CLICK ================= */
  if (backToTop) {
    backToTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ================= TABS ================= */
  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      tabs.forEach(b => b.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });

  /* ================= URL PARAMS ================= */
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");
  const source = params.get("source");

  if (email && emailInput) emailInput.value = email;
  if (source && sourceInput) sourceInput.value = source;

  /* AUTO SOURCE DETECT */
  if (sourceInput && !source) {
    const path = window.location.pathname;

    if (path.includes("index")) {
      sourceInput.value = "homepage-cta";
    } else if (path.includes("product")) {
      sourceInput.value = "product-page-cta";
    } else if (path.includes("about")) {
      sourceInput.value = "about-page-cta";
    } else if (path.includes("contact")) {
      sourceInput.value = "contact-page-cta";
    } else {
      sourceInput.value = "unknown";
    }
  }

  /* CLEAN URL */
  if (email || source) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  /* ================= CARD ANIMATION ================= */
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
  }

  /* ================= AOS ================= */
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out"
    });
  }

});

const navCollapse = document.getElementById("nav");

if (navCollapse) {
  navCollapse.addEventListener("show.bs.collapse", () => {
    document.body.classList.add("offcanvas-open");
  });

  navCollapse.addEventListener("hide.bs.collapse", () => {
    document.body.classList.remove("offcanvas-open");
  });
}

/* ================= PAGE LOADER ================= */

window.addEventListener("load", () => {
  const loader = document.getElementById("pageLoader");

  setTimeout(() => {
    loader.classList.add("hide");
  }, 500);
});


