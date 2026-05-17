/**
 * visualize-button.js
 * 
 * Centralized script to dynamically inject the "Visualize Code" button.
 * Looks for <div class="visualize-button-mount" data-visualize-link="..."></div>
 *
 * Auto-scroll behavior:
 * If sessionStorage flag "ids_scroll_to_visualize" is set (placed by sidebar.js
 * when user clicks a viz-item), the page smoothly scrolls to the visualize
 * button mount after layout stabilizes, then applies a brief highlight pulse.
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

      // Fade out page body, then redirect.
      // rAF ensures the transition is committed to a paint frame before
      // opacity drops, keeping the fade isolated from scroll/render timing.
      requestAnimationFrame(() => {
        document.body.style.transition = "opacity 0.2s ease";
        requestAnimationFrame(() => {
          document.body.style.opacity = "0";
        });
      });

      setTimeout(() => {
        window.location.href = targetLink;
      }, 220);
    };

    card.addEventListener("click", triggerVisualizer);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        triggerVisualizer();
      }
    });
  });

  // ── Auto-scroll logic ──────────────────────────────────────────────────────
  // Only fires when sidebar set the flag (viz-item click navigation).
  // Clears flag immediately so direct visits are unaffected.

  if (sessionStorage.getItem("ids_scroll_to_visualize") === "1") {
    sessionStorage.removeItem("ids_scroll_to_visualize");

    // Delay lets sidebar inject + layout stabilize before measuring position.
    setTimeout(() => {
      const mount = document.querySelector(".visualize-button-mount");
      if (!mount) return;

      mount.scrollIntoView({ behavior: "smooth", block: "center" });

      // Subtle highlight pulse after scroll lands (~700ms after scroll start).
      setTimeout(() => {
        const card = mount.querySelector(".visualize-card");
        if (!card) return;

        // Inject keyframe + rule once if not already present.
        if (!document.getElementById("ids-pulse-style")) {
          const style = document.createElement("style");
          style.id = "ids-pulse-style";
          style.textContent = `
            @keyframes ids-viz-pulse {
              0%   { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.0); }
              30%  { box-shadow: 0 0 0 8px rgba(139, 92, 246, 0.18); }
              70%  { box-shadow: 0 0 0 12px rgba(139, 92, 246, 0.08); }
              100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.0); }
            }
            .ids-viz-pulse-active {
              animation: ids-viz-pulse 1s ease-out forwards;
            }
          `;
          document.head.appendChild(style);
        }

        card.classList.add("ids-viz-pulse-active");
        card.addEventListener("animationend", () => {
          card.classList.remove("ids-viz-pulse-active");
        }, { once: true });

      }, 700);

    }, 320);
  }
  // ── End auto-scroll logic ──────────────────────────────────────────────────
});