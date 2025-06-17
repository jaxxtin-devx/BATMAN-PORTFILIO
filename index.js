document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll(".card");
  const sections = document.querySelectorAll(".section-content");
  const cardContainer = document.getElementById("card-container");
  const backButtons = document.querySelectorAll(".back-btn");

  // Initialize - hide all sections and show card container
  sections.forEach(section => {
    section.style.display = "none";
  });
  cardContainer.style.display = "block";

  // Helper function for fade transitions
  function fadeTransition(hideEl, showEl) {
    if (!hideEl || !showEl) return;

    hideEl.classList.add("fade-out");
    hideEl.addEventListener("animationend", () => {
      hideEl.style.display = "none";
      hideEl.classList.remove("fade-out");

      showEl.style.display = "block";
      showEl.classList.add("fade-in");

      showEl.addEventListener("animationend", () => {
        showEl.classList.remove("fade-in");
      }, { once: true });
    }, { once: true });
  }

  // Handle card clicks to show sections
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const targetId = card.getAttribute("data-section");
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        fadeTransition(cardContainer, targetSection);
      }
    });
  });

  // Handle back button clicks
  backButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const currentSection = button.closest(".section-content");
      if (currentSection) {
        fadeTransition(currentSection, cardContainer);
      }
    });
  });

  // Optional: URL hash handling for deep linking
  window.addEventListener('hashchange', handleHash);
  handleHash(); // Handle initial hash

  function handleHash() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
      const targetSection = document.getElementById(hash);
      fadeTransition(cardContainer, targetSection);
    }
  }
});


// for toggle --------------
