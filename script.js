/* =========================================================
   BIRTHDAY WEBSITE CONFIG
   Change only this section for most personalization.
========================================================= */
const CONFIG = {
  password: "10102006",
  name: "Nama Dia",
  heroSubtitle:
    "Another beautiful chapter begins today. May your days be filled with little reasons to smile.",
  birthdayMessage:
`Happy Birthday, Nama Dia ❤️

Hari ini adalah hari spesial karena seseorang yang begitu berarti sedang bertambah satu tahun lagi.

Semoga setiap langkahmu dipenuhi kebahagiaan, kesehatan, ketenangan, dan hal-hal baik yang kamu impikan.

Teruslah menjadi dirimu sendiri, tersenyum, dan jangan pernah berhenti mengejar hal-hal yang membuatmu bahagia.

Semoga tahun ini menjadi salah satu chapter paling indah dalam hidupmu. ✨`,
  music: "assets/music/tulus - monokrom (official music video) - tulus.mp3",

  gallery: [
    { src: "assets/images/photo1.jpg", caption: "A beautiful little moment" },
    { src: "assets/images/photo2.jpg", caption: "A memory worth keeping" },
    { src: "assets/images/photo3.jpg", caption: "One of many smiles" },
    { src: "assets/images/photo4.jpg", caption: "Another chapter, another memory" },
    { src: "assets/images/photo5.jpg", caption: "Soft moments, happy hearts" },
    { src: "assets/images/photo6.jpg", caption: "A day to remember" }
  ],

  timeline: [
    {
      year: "2023",
      title: "First Memory",
      description: "The beginning of a little story and a lot of beautiful moments.",
      image: "assets/images/photo2.jpg"
    },
    {
      year: "2024",
      title: "Another Beautiful Moment",
      description: "More laughs, more stories, and memories that stayed.",
      image: "assets/images/photo3.jpg"
    },
    {
      year: "2025",
      title: "More Memories",
      description: "A new year, more reasons to be grateful, and more moments to remember.",
      image: "assets/images/photo5.jpg"
    },
    {
      year: "2026",
      title: "Another Chapter Begins",
      description: "A brand new chapter. May this year be kind, bright, and full of good surprises.",
      image: "assets/images/photo6.jpg"
    }
  ],

  wishes: [
    "Semoga semua impianmu tercapai, satu per satu. ✨",
    "Semoga selalu dikelilingi orang-orang yang menyayangimu. ❤️",
    "Semoga tahun ini membawa lebih banyak alasan untuk tersenyum.",
    "Semoga hatimu selalu menemukan alasan untuk tetap tenang.",
    "Semoga setiap langkahmu bertemu dengan hal-hal baik.",
    "Semoga kamu selalu ingat betapa berharganya dirimu. ♡"
  ]
};

/* =========================================================
   DOM
========================================================= */
const loadingScreen = document.getElementById("loadingScreen");
const passwordScreen = document.getElementById("passwordScreen");
const mainSite = document.getElementById("mainSite");
const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const passwordMessage = document.getElementById("passwordMessage");
const togglePassword = document.getElementById("togglePassword");

const heroName = document.getElementById("heroName");
const finalName = document.getElementById("finalName");
const heroSubtitle = document.getElementById("heroSubtitle");
const birthdayMessage = document.getElementById("birthdayMessage");

const galleryGrid = document.getElementById("galleryGrid");
const timeline = document.getElementById("timeline");
const wishGrid = document.getElementById("wishGrid");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const birthdayAudio = document.getElementById("birthdayAudio");
const audioSource = document.getElementById("audioSource");
const musicButton = document.getElementById("musicButton");
const musicIcon = document.getElementById("musicIcon");
const musicStatus = document.getElementById("musicStatus");
const musicHintButton = document.getElementById("musicHintButton");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

const wishButton = document.getElementById("wishButton");
const wishResult = document.getElementById("wishResult");
const heartLayer = document.getElementById("heartLayer");

/* =========================================================
   INITIALIZE CONTENT
========================================================= */
function initContent() {
  document.title = `Happy Birthday, ${CONFIG.name} ❤️`;
  heroName.textContent = CONFIG.name;
  finalName.textContent = CONFIG.name;
  heroSubtitle.textContent = CONFIG.heroSubtitle;
  birthdayMessage.textContent = CONFIG.birthdayMessage;

  audioSource.src = CONFIG.music;
  birthdayAudio.load();

  renderGallery();
  renderTimeline();
  renderWishes();
}

/* =========================================================
   GALLERY
========================================================= */
let activeGalleryIndex = 0;

function createImageFallback(img) {
  img.classList.add("fallback-image");
  img.removeAttribute("src");
  img.alt = "Photo placeholder";
  img.style.background =
    "linear-gradient(135deg, #f6dbe0 0%, #fff8f7 48%, #ead8ca 100%)";
}

function bindImageFallback(img) {
  img.addEventListener("error", () => createImageFallback(img), { once: true });
}

function renderGallery() {
  galleryGrid.innerHTML = "";

  CONFIG.gallery.forEach((item, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "gallery-item reveal";
    card.innerHTML = `
      <img src="${item.src}" alt="${item.caption}" loading="lazy">
      <div class="gallery-meta">
        <span>memory ${String(index + 1).padStart(2, "0")}</span>
        <span>view ♡</span>
      </div>
    `;

    const image = card.querySelector("img");
    bindImageFallback(image);

    card.addEventListener("click", () => openLightbox(index));
    galleryGrid.appendChild(card);
  });

  setupRevealObserver();
}

/* =========================================================
   TIMELINE
========================================================= */
function renderTimeline() {
  timeline.innerHTML = "";

  CONFIG.timeline.forEach((item) => {
    const wrapper = document.createElement("article");
    wrapper.className = "timeline-item reveal";
    wrapper.innerHTML = `
      <span class="timeline-node" aria-hidden="true"></span>

      <div class="timeline-card">
        <span class="timeline-year">${item.year}</span>
        <h4>${item.title}</h4>
        <p>${item.description}</p>
      </div>

      <div class="timeline-photo">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
      </div>
    `;

    bindImageFallback(wrapper.querySelector("img"));
    timeline.appendChild(wrapper);
  });

  setupRevealObserver();
}

/* =========================================================
   WISH CARDS
========================================================= */
function renderWishes() {
  wishGrid.innerHTML = "";

  CONFIG.wishes.forEach((wish) => {
    const card = document.createElement("article");
    card.className = "wish-card reveal";
    card.innerHTML = `<strong>${wish}</strong>`;
    wishGrid.appendChild(card);
  });

  setupRevealObserver();
}

/* =========================================================
   PASSWORD
========================================================= */
passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const entered = passwordInput.value.trim();

  if (entered === CONFIG.password) {
    passwordMessage.textContent = "";
    unlockExperience();
  } else {
    passwordMessage.textContent = "Oops, passwordnya salah ❤️";
    passwordInput.classList.add("shake");
    setTimeout(() => passwordInput.classList.remove("shake"), 500);
    passwordInput.select();
  }
});

togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePassword.textContent = isPassword ? "○" : "◉";
  togglePassword.setAttribute(
    "aria-label",
    isPassword ? "Hide password" : "Show password"
  );
});

function unlockExperience() {
  passwordScreen.classList.add("hidden");
  mainSite.classList.add("visible");
  mainSite.setAttribute("aria-hidden", "false");
  document.body.classList.remove("no-scroll");

  createFloatingHearts(18);

  // Browsers may block autoplay. We try once, then leave the music button visible.
  birthdayAudio.volume = 0.42;
  birthdayAudio.play().then(updateMusicUI).catch(() => updateMusicUI(false));

  window.setTimeout(() => {
    passwordScreen.style.display = "none";
  }, 900);
}

/* =========================================================
   MUSIC PLAYER
========================================================= */
async function toggleMusic() {
  try {
    if (birthdayAudio.paused) {
      birthdayAudio.volume = 0.42;
      await birthdayAudio.play();
      updateMusicUI(true);
    } else {
      birthdayAudio.pause();
      updateMusicUI(false);
    }
  } catch (error) {
    musicStatus.textContent = "Add your MP3";
    musicIcon.textContent = "!";
  }
}

function updateMusicUI(playing = !birthdayAudio.paused) {
  musicButton.classList.toggle("is-playing", playing);
  musicButton.setAttribute("aria-pressed", String(playing));
  musicButton.setAttribute("aria-label", playing ? "Pause music" : "Play music");
  musicIcon.textContent = playing ? "❚❚" : "♫";
  musicStatus.textContent = playing ? "Music On" : "Music Off";
}

birthdayAudio.addEventListener("play", () => updateMusicUI(true));
birthdayAudio.addEventListener("pause", () => updateMusicUI(false));
birthdayAudio.addEventListener("error", () => {
  musicStatus.textContent = "Add your MP3";
});

musicButton.addEventListener("click", toggleMusic);
musicHintButton.addEventListener("click", toggleMusic);

/* =========================================================
   MOBILE NAV
========================================================= */
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

/* =========================================================
   LIGHTBOX
========================================================= */
function openLightbox(index) {
  activeGalleryIndex = index;
  updateLightbox();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

function updateLightbox() {
  const item = CONFIG.gallery[activeGalleryIndex];
  lightboxImage.src = item.src;
  lightboxImage.alt = item.caption;
  lightboxCaption.textContent = item.caption;
  lightboxImage.addEventListener("error", () => {
    lightboxImage.style.background =
      "linear-gradient(135deg, #f6dbe0, #fff8f7, #ead8ca)";
  }, { once: true });
}

function moveLightbox(direction) {
  activeGalleryIndex =
    (activeGalleryIndex + direction + CONFIG.gallery.length) % CONFIG.gallery.length;
  updateLightbox();
}

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => moveLightbox(-1));
lightboxNext.addEventListener("click", () => moveLightbox(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("open")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") moveLightbox(-1);
  if (event.key === "ArrowRight") moveLightbox(1);
});

/* =========================================================
   FINAL SURPRISE / CONFETTI
========================================================= */
wishButton.addEventListener("click", () => {
  wishResult.textContent = "Your wish has been sent to the universe ✨";
  createConfetti(90);
  createFloatingHearts(24);
  wishButton.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.05)" },
      { transform: "scale(1)" }
    ],
    { duration: 450, easing: "ease-out" }
  );
});

function createConfetti(count = 70) {
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.setProperty("--duration", `${2.8 + Math.random() * 2.3}s`);
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    piece.style.opacity = String(0.7 + Math.random() * 0.3);

    const shapes = [
      "linear-gradient(135deg, #d88999, #efbdc6)",
      "linear-gradient(135deg, #c8a773, #ead7af)",
      "linear-gradient(135deg, #fff, #f2dce0)",
      "linear-gradient(135deg, #d7b9be, #f5e6e8)"
    ];
    piece.style.background = shapes[i % shapes.length];

    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 5500);
  }
}

function createFloatingHearts(count = 12) {
  const symbols = ["♡", "♥", "✧", "✦"];

  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");
    heart.className = "heart-particle";
    heart.textContent = symbols[i % symbols.length];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${0.8 + Math.random() * 1.2}rem`;
    heart.style.animationDuration = `${5 + Math.random() * 5}s`;
    heart.style.animationDelay = `${Math.random() * 0.8}s`;
    heartLayer.appendChild(heart);

    setTimeout(() => heart.remove(), 11000);
  }
}

/* =========================================================
   SCROLL REVEAL
========================================================= */
let revealObserver;

function setupRevealObserver() {
  const elements = document.querySelectorAll(".reveal:not([data-observed])");

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );
  }

  elements.forEach((element) => {
    element.dataset.observed = "true";
    revealObserver.observe(element);
  });
}

/* =========================================================
   SMALL PARALLAX
========================================================= */
window.addEventListener("scroll", () => {
  if (window.innerWidth <= 900) return;

  const visual = document.querySelector(".hero-visual");
  if (!visual) return;

  const offset = Math.min(window.scrollY * 0.055, 28);
  visual.style.transform = `translateY(${offset}px)`;
});

/* =========================================================
   STARTUP
========================================================= */
window.addEventListener("load", () => {
  initContent();

  window.setTimeout(() => {
    loadingScreen.classList.add("hide");
  }, 900);

  document.body.classList.add("no-scroll");
  passwordInput.focus();

  setupRevealObserver();
});

/* Small mobile password input shake helper */
const style = document.createElement("style");
style.textContent = `
  @keyframes shakeInput {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
  }
  #passwordInput.shake {
    animation: shakeInput .25s ease-in-out 2;
  }
`;
document.head.appendChild(style);
