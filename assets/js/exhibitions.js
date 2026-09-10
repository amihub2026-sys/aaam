/* Page interactions: exhibitions */
/* Reveal animation */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
      }
    });
  },
  {
    threshold: 0.12
  }
);

document.querySelectorAll('.exhibitions-reveal').forEach((el) => {
  io.observe(el);
});

/* Parallax is reserved for large, fine-pointer screens. */
const parallaxAllowed = window.matchMedia('(min-width: 981px) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
let parallaxFrame = false;
window.addEventListener('scroll', () => {
 if (!parallaxAllowed.matches || parallaxFrame) return;
 parallaxFrame = true;
 requestAnimationFrame(() => {
  document.querySelectorAll('.parallax').forEach(el => {
   el.style.transform = `translateY(${el.getBoundingClientRect().top * -0.035}px)`;
  });
  parallaxFrame = false;
 });
}, {passive:true});

/* Home cinematic background sound */
const storyVideo = document.querySelector('#globalStoryVideo');
const soundToggle = document.querySelector('#soundToggle');

if (storyVideo && soundToggle) {

  soundToggle.addEventListener('click', async () => {

    storyVideo.muted = !storyVideo.muted;

    if (!storyVideo.muted) {
      try {
        await storyVideo.play();
      } catch (e) {
        storyVideo.muted = true;
      }
    }

    soundToggle.classList.toggle(
      'on',
      !storyVideo.muted
    );

    soundToggle.textContent =
      storyVideo.muted
        ? '🔊 Sound On'
        : '🔇 Sound Off';
  });

}

/* Cinematic sliders */
document.querySelectorAll('[data-slider]').forEach((slider) => {

  const slides = [
    ...slider.querySelectorAll('.exhibitions-hero-slide')
  ];

  const dots = [
    ...slider.parentElement.querySelectorAll(
      '.exhibitions-slider-dots button'
    )
  ];

  if (!slides.length) return;

  let current = 0;

  const showSlide = (index) => {

    slides.forEach((slide, i) => {
      slide.classList.toggle(
        'active',
        i === index
      );
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle(
        'active',
        i === index
      );
    });

    current = index;
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
    });
  });

  if (slides.length > 1) {
    setInterval(() => {
      showSlide(
        (current + 1) % slides.length
      );
    }, 5000);
  }

});
/* =========================================
   FAMILY GALLERY FILTER
========================================= */

const familyFilterButtons = document.querySelectorAll(".family-filter-btn");
const familyGalleryItems = document.querySelectorAll(".family-filter-item");

if (familyFilterButtons.length && familyGalleryItems.length) {

  familyFilterButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const filter = button.getAttribute("data-filter");

      // Active button
      familyFilterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      // Filter images
      familyGalleryItems.forEach((item) => {

        const category = item.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }

      });

    });

  });

}
/* =========================================
   WEDDING GALLERY FILTER
========================================= */

const weddingFilterButtons = document.querySelectorAll(".wedding-filter-btn");
const weddingGalleryItems = document.querySelectorAll(".wedding-filter-item");

if (weddingFilterButtons.length && weddingGalleryItems.length) {

  weddingFilterButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const filter = button.getAttribute("data-filter");

      // Remove active from all buttons
      weddingFilterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      // Active clicked button
      button.classList.add("active");

      // Filter gallery images
      weddingGalleryItems.forEach((item) => {

        const category = item.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }

      });

    });

  });

}
/* =========================================
   CORPORATE GALLERY FILTER
========================================= */

const corporateFilterButtons = document.querySelectorAll(".corporate-filter-btn");
const corporateGalleryItems = document.querySelectorAll(".corporate-filter-item");

if (corporateFilterButtons.length && corporateGalleryItems.length) {

  corporateFilterButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const filter = button.getAttribute("data-filter");

      corporateFilterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      corporateGalleryItems.forEach((item) => {

        const category = item.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }

      });

    });

  });

}
/* =========================================
   STALLS GALLERY FILTER
========================================= */

const stallsFilterButtons = document.querySelectorAll(".stalls-filter-btn");
const stallsGalleryItems = document.querySelectorAll(".stalls-filter-item");

if (stallsFilterButtons.length && stallsGalleryItems.length) {

  stallsFilterButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const filter = button.getAttribute("data-filter");

      stallsFilterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      stallsGalleryItems.forEach((item) => {

        const category = item.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }

      });

    });

  });

}
/* =========================================
   ENTERTAINMENT GALLERY FILTER
========================================= */

const entertainmentFilterButtons = document.querySelectorAll(
  ".entertainment-filter-btn"
);

const entertainmentGalleryItems = document.querySelectorAll(
  ".entertainment-filter-item"
);

if (entertainmentFilterButtons.length && entertainmentGalleryItems.length) {

  entertainmentFilterButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const filter = button.getAttribute("data-filter");

      entertainmentFilterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      entertainmentGalleryItems.forEach((item) => {

        const category = item.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }

      });

    });

  });

}
/* =========================================
   DECORATION GALLERY FILTER
========================================= */

const decorationFilterButtons = document.querySelectorAll(
  ".decoration-filter-btn"
);

const decorationGalleryItems = document.querySelectorAll(
  ".decoration-filter-item"
);

if (decorationFilterButtons.length && decorationGalleryItems.length) {

  decorationFilterButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const filter = button.getAttribute("data-filter");

      decorationFilterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      decorationGalleryItems.forEach((item) => {

        const category = item.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }

      });

    });

  });

}
/* =========================================
   EXHIBITIONS GALLERY FILTER
========================================= */

const exhibitionsFilterButtons = document.querySelectorAll(
  ".exhibitions-exhibitions-filter-btn"
);

const exhibitionsGalleryItems = document.querySelectorAll(
  ".exhibitions-exhibitions-filter-item"
);

if (exhibitionsFilterButtons.length && exhibitionsGalleryItems.length) {

  exhibitionsFilterButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const filter = button.getAttribute("data-filter");

      exhibitionsFilterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      exhibitionsGalleryItems.forEach((item) => {

        const category = item.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }

      });

    });

  });

}
/* =========================================
   PHOTOGRAPHY GALLERY FILTER
========================================= */

const photographyFilterButtons = document.querySelectorAll(
  ".photography-filter-btn"
);

const photographyGalleryItems = document.querySelectorAll(
  ".photography-filter-item"
);

if (photographyFilterButtons.length && photographyGalleryItems.length) {

  photographyFilterButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const filter = button.getAttribute("data-filter");

      photographyFilterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      photographyGalleryItems.forEach((item) => {

        const category = item.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }

      });

    });

  });

}
