/**
 * learn.js
 * Handles sidebar toggle for both desktop (collapse) and mobile (drawer overlay).
 * Does NOT touch any existing logic — auth, redirects, unit accordion are untouched.
 */

(function () {
  const sidebar       = document.getElementById("mainSidebar");
  const overlay       = document.getElementById("sidebarOverlay");
  const mainContent   = document.getElementById("mainContent");
  const topbar        = document.getElementById("topbar");

  // Detect mobile breakpoint
  function isMobile() {
    return window.innerWidth <= 768;
  }

  // ── Desktop: collapse / expand ──────────────────────────────────
  function collapseDesktop() {
    sidebar.classList.add("sidebar-collapsed");
    mainContent.classList.add("main-expanded");
  }

  function expandDesktop() {
    sidebar.classList.remove("sidebar-collapsed");
    mainContent.classList.remove("main-expanded");
  }

  function isDesktopCollapsed() {
    return sidebar.classList.contains("sidebar-collapsed");
  }

  // ── Mobile: open / close drawer ─────────────────────────────────
  function openMobile() {
    sidebar.classList.add("sidebar-mobile-open");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden"; // prevent scroll behind overlay
  }

  function closeMobileDrawer() {
    sidebar.classList.remove("sidebar-mobile-open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  // ── Main toggle (called by hamburger buttons in HTML) ────────────
  window.toggleSidebar = function () {
    if (isMobile()) {
      if (sidebar.classList.contains("sidebar-mobile-open")) {
        closeMobileDrawer();
      } else {
        openMobile();
      }
    } else {
      if (isDesktopCollapsed()) {
        expandDesktop();
      } else {
        collapseDesktop();
      }
    }
  };

  // Overlay click closes mobile drawer
  window.closeSidebar = function () {
    closeMobileDrawer();
  };

  // Close mobile drawer on window resize to desktop width
  window.addEventListener("resize", function () {
    if (!isMobile()) {
      closeMobileDrawer();
    }
  });

  // Adding global mark complete logic for learning progress fixer
  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("markCompleteBtn");
    if (btn) {
      btn.addEventListener("click", markCompleteLesson);
    }
  });

  async function markCompleteLesson() {
    const btn = document.getElementById("markCompleteBtn");
    if (!btn || btn.disabled) return;
  
    const token = localStorage.getItem("token");
    if (!token) return;
  
    try {
      const response = await fetch("http://localhost:5001/api/users/complete-topic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          topicId: window.location.pathname // fallback or get actual ID
        })
      });
  
      const data = await response.json();
      if (response.ok) {
        // UI updates
        btn.classList.add("completed");
        btn.disabled = true;
        btn.innerHTML = `
          <svg class="btn-icon" width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <span class="btn-label">Completed ✓</span>`;
  
        // Dynamic XP Update
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        user.xp = data.xp;
        localStorage.setItem("user", JSON.stringify(user));
        
        // Show Popup
        const popup = document.getElementById("xpPopup");
        if (popup) {
          popup.classList.remove("hide");
          popup.classList.add("show");
          setTimeout(() => {
            popup.classList.remove("show");
            popup.classList.add("hide");
          }, 2600);
        }
      }
    } catch (err) {
      console.error("Completion error:", err);
    }
  }

})();