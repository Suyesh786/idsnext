document.addEventListener("DOMContentLoaded", () => {

  // 1. Path Resolver Helper
  function getRootPath() {
    const scripts = document.getElementsByTagName('script');
    for (let s of scripts) {
      const src = s.getAttribute('src');
      if (src && src.includes('sidebar.js')) {
        return src.replace('sidebar/sidebar.js', '').replace('sidebar.js', '');
      }
    }
    return '../'; // Default fallback
  }

  const rootPath = getRootPath();
  const logoPath = rootPath + 'image/ilogo.png';

  // 2. Inject Topbar
  const topbarHTML = `
  <div class="topbar" id="topbar">
    <button class="hamburger-btn" id="hamburgerBtn" onclick="toggleSidebar()" aria-label="Toggle sidebar">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div class="topbar-logo">
      <img src="${logoPath}" class="logo-img" alt="IDS Logo" style="width:26px;height:26px;object-fit:contain;">
      <span class="topbar-site-name">iDS Studio <span class="topbar-next">Next</span></span>
    </div>
  </div>`;

  // 3. Inject Overlay
  const overlayHTML = `<div class="sidebar-overlay" id="sidebarOverlay" onclick="closeSidebar()"></div>`;

  // 4. Inject Sidebar
  const sidebarHTML = `
  <aside class="sidebar" id="mainSidebar">
    
    <!-- Desktop-only: hamburger toggle at top of sidebar -->
    <div class="sidebar-desktop-toggle">
      <button class="hamburger-btn" id="desktopHamburgerBtn" onclick="toggleSidebar()" aria-label="Toggle sidebar">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div class="logo">
      <div class="logo-icon">
        <img src="${logoPath}" alt="IDS Logo" class="logo-img">
      </div>
      <div class="logo-text">
        <span class="logo-title">iDS Studio</span>
        <span class="logo-sub">Next</span>
      </div>
    </div>

    <nav class="menu">
      <a href="/dashboard/dashboard.html" class="menu-item" data-nav="dashboard">
        <svg class="menu-icon" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
        </svg>
        <span class="menu-label">Dashboard</span>
      </a>
      <a href="/learn/learn.html" class="menu-item" data-nav="learn">
        <svg class="menu-icon" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
        </svg>
        <span class="menu-label">Learn</span>
      </a>
      <a href="/practice/practice.html" class="menu-item" data-nav="practice">
        <svg class="menu-icon" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
        <span class="menu-label">Practice</span>
      </a>
      <a href="/leaderboard/leaderboard.html" class="menu-item" data-nav="leaderboard">
        <svg class="menu-icon" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
        </svg>
        <span class="menu-label">Leaderboard</span>
      </a>

      <!-- Visualizations Accordion -->
      <div class="menu-accordion" id="vizAccordion">
        <button class="menu-item menu-accordion-trigger" id="vizToggle" onclick="toggleVizMenu()" aria-expanded="false" aria-controls="vizSubmenu">
          <svg class="menu-icon" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
          </svg>
          <span class="menu-label">Visualizations</span>
          <svg class="viz-chevron" width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>

        <div class="viz-submenu" id="vizSubmenu" role="region" aria-labelledby="vizToggle" style="max-height: 0; opacity: 0; overflow: hidden; transition: max-height 0.32s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.22s ease;">
          <div class="viz-submenu-inner">
            <a href="/topics/singly-linked-list/singly-linked-list.html" class="viz-item">Singly Linked List</a>
            <a href="/topics/doubly-linked-list/doubly-linked-list.html" class="viz-item">Doubly Linked List</a>
            <a href="/topics/singly-circular-linked-list/singly-circular-linked-list.html" class="viz-item">Singly-Circular Linked List</a>
            <a href="/topics/unit-3/binary-trees/binary-trees.html" class="viz-item">Binary Tree Creation</a>
            <a href="/topics/unit-3/tree-representation/tree-representation.html" class="viz-item">Array Representation of Binary Tree</a>
            <a href="/topics/unit-3/tree-traversals/tree-traversals.html" class="viz-item">Tree Traversals</a>
          </div>
        </div>
      </div>
    </nav>

    <div class="spacer"></div>

    <div class="sidebar-footer">
      <div class="user-chip">
        <div class="user-avatar" id="userAvatar">U</div>
        <div class="user-info">
          <span class="user-name" id="sidebarUserName">User</span>
          <span class="user-role" id="sidebarUserRole">Student</span>
        </div>
      </div>
      <div class="logout">
        <button onclick="logout()">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"/></svg>
          <span class="menu-label">Logout</span>
        </button>
      </div>
    </div>
  </aside>`;

  // Inject elements at the start of the body
  document.body.insertAdjacentHTML('afterbegin', topbarHTML + overlayHTML + sidebarHTML);

  // 5. Active Page Detection
  const currentPage = document.body.dataset.page;
  if (currentPage) {
    const activeLink = document.querySelector(`.menu-item[data-nav="${currentPage}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  // 6. User Hydration
  const userString = localStorage.getItem("user");
  if (userString) {
    try {
      const user = JSON.parse(userString);
      if (user && user.name) {
        document.getElementById("sidebarUserName").textContent = user.name;
        document.getElementById("userAvatar").textContent = user.name.charAt(0).toUpperCase();
      }
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
    }
  }

  // 7. Auto-scroll flag: set on viz-item click before navigation
  document.querySelectorAll(".viz-item").forEach(link => {
    link.addEventListener("click", () => {
      sessionStorage.setItem("ids_scroll_to_visualize", "1");
    });
  });
});

// 8. Global Functions
window.toggleSidebar = function() {
  const sidebar = document.getElementById("mainSidebar");
  const overlay = document.getElementById("sidebarOverlay");
  const mainContent = document.getElementById("mainContent");

  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    if (sidebar.classList.contains("sidebar-mobile-open")) {
      window.closeSidebar();
    } else {
      sidebar.classList.add("sidebar-mobile-open");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  } else {
    if (sidebar.classList.contains("sidebar-collapsed")) {
      sidebar.classList.remove("sidebar-collapsed");
      if (mainContent) mainContent.classList.remove("main-expanded");
    } else {
      sidebar.classList.add("sidebar-collapsed");
      if (mainContent) mainContent.classList.add("main-expanded");
    }
  }
};

window.closeSidebar = function() {
  const sidebar = document.getElementById("mainSidebar");
  const overlay = document.getElementById("sidebarOverlay");
  
  if (sidebar) sidebar.classList.remove("sidebar-mobile-open");
  if (overlay) overlay.classList.remove("active");
  document.body.style.overflow = "";
};

window.toggleVizMenu = function() {
  const trigger = document.getElementById("vizToggle");
  const submenu = document.getElementById("vizSubmenu");
  const expanded = trigger.getAttribute("aria-expanded") === "true";

  if (expanded) {
    // Collapse
    submenu.style.maxHeight = submenu.scrollHeight + "px"; // pin before transition
    requestAnimationFrame(function () {
      submenu.style.maxHeight = "0";
      submenu.style.opacity = "0";
    });
    trigger.setAttribute("aria-expanded", "false");
    trigger.classList.remove("viz-open");
  } else {
    // Expand
    submenu.style.maxHeight = submenu.scrollHeight + "px";
    submenu.style.opacity = "1";
    trigger.setAttribute("aria-expanded", "true");
    trigger.classList.add("viz-open");
    
    submenu.addEventListener("transitionend", function onEnd() {
      if (trigger.getAttribute("aria-expanded") === "true") {
        submenu.style.maxHeight = "none";
      }
      submenu.removeEventListener("transitionend", onEnd);
    });
  }
};

window.logout = function() {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user && user._id) {
        localStorage.removeItem("spark_history_" + user._id);
      }
    } catch (e) {}
  }
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/index.html"; // Absolute redirect
};

// Handle resize events to cleanup mobile drawer state
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    window.closeSidebar();
  }
});