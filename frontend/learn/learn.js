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

})();