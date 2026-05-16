/**
 * visualize-button.js
 * 
 * Centralized script to dynamically inject the "Visualize Code" button.
 * Looks for <div class="visualize-button-mount" data-visualize-link="..."></div>
 */

document.addEventListener("DOMContentLoaded", () => {
  const mounts = document.querySelectorAll(".visualize-button-mount");

  mounts.forEach(mount => {
    const targetLink = mount.getAttribute("data-visualize-link");
    if (!targetLink) return;

    // Build the inner HTML
    mount.innerHTML = `
      <div class="vc-coachmark" aria-hidden="true">
        <span class="vc-coachmark-label">✨ Try Visualizer</span>
        <span class="vc-coachmark-sub">Watch code execute live</span>
      </div>
      <span class="vc-coachmark-arrow" aria-hidden="true">↓</span>
      <div class="visualize-card" role="button" tabindex="0">
        <div class="vc-icon">✨</div>
        <div class="vc-text">
          <div class="vc-title">Visualize Code</div>
          <div class="vc-sub">Watch step-by-step execution with animations</div>
        </div>
        <div class="vc-arrow">→</div>
        <span class="visualize-btn-ripple"></span>
        <span class="vc-shimmer" aria-hidden="true"></span>
      </div>
    `;

    // Attach event listeners
    const card = mount.querySelector(".visualize-card");
    
    const triggerVisualizer = () => {
      // Ripple effect
      card.classList.add("ripple-active");
      setTimeout(() => card.classList.remove("ripple-active"), 300);

      // Fade out page body, then redirect
      document.body.style.transition = "opacity 0.2s ease";
      document.body.style.opacity = "0";

      setTimeout(() => {
        window.location.href = targetLink;
      }, 180);
    };

    card.addEventListener("click", triggerVisualizer);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        triggerVisualizer();
      }
    });
  });
});