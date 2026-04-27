document.addEventListener("DOMContentLoaded", function () {

  const navbar = document.querySelector(".custom-navbar");
  const backToTop = document.getElementById("backToTop");
  const circle = document.querySelector(".progress-ring-circle");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  let lastScroll = 0;

  /* ===== PROGRESS RING SETUP ===== */
  let circumference = 0;

  if (circle) {
    const radius = circle.r.baseVal.value;
    circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;
  }

  /* ================= SCROLL HANDLER ================= */
  window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;

    /* ===== NAVBAR BG + HIDE/SHOW ===== */
    if (navbar) {
      navbar.classList.toggle("scrolled", scrollTop > 50);

      if (scrollTop > lastScroll && scrollTop > 100) {
        navbar.style.transform = "translateY(-100%)";
      } else {
        navbar.style.transform = "translateY(0)";
      }
    }

    lastScroll = scrollTop;

    /* ===== BACK TO TOP BUTTON ===== */
    if (backToTop) {
      if (scrollTop > 300) {
        backToTop.classList.add("active"); // ✅ match CSS
      } else {
        backToTop.classList.remove("active");
      }
    }

    /* ===== PROGRESS RING ===== */
    if (circle) {
      const offset = circumference - progress * circumference;
      circle.style.strokeDashoffset = offset;
    }

    // /* ===== ACTIVE NAV LINK ===== */
    // let currentSection = "";

    // sections.forEach(section => {
    //   const sectionTop = section.offsetTop - 120;
    //   const sectionHeight = section.offsetHeight;

    //   if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
    //     currentSection = section.getAttribute("id");
    //   }
    // });

    // navLinks.forEach(link => {
    //   link.classList.remove("active");

    //   if (link.getAttribute("href") === "#" + currentSection) {
    //     link.classList.add("active");
    //   }
    // });

  });

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
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* ================= AOS INIT ================= */
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out"
    });
  }

});



const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(btn => {
  btn.addEventListener("click", () => {

    tabs.forEach(b => b.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");

  });
});


// Get email from URL
const params = new URLSearchParams(window.location.search);
const email = params.get("email");

// Fill input field if exists
if (email) {
  document.getElementById("emailField").value = email;
}


const cards = document.querySelectorAll('.cert-card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));