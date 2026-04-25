/* ─── linked-list-intro.js ────────────────────────────────────
   Handles:
   1. Auth check & user info population (same pattern as stack.js)
   2. Mark Complete button state change
   3. XP popup slide-in / fade-out
   4. Copy code button
   5. Sidebar toggle (desktop collapse + mobile drawer)
──────────────────────────────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("markCompleteBtn");
  if (btn) {
    btn.addEventListener("click", markComplete);
  }

  // ── Auth guard ─────────────────────────────────────────────────
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "../../auth/login.html";
    return;
  }

  // ── Populate user info ──────────────────────────────────────────
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user && user.name) {
    const sidebarName = document.getElementById("sidebarUserName");
    if (sidebarName) sidebarName.textContent = user.name;

    const avatar = document.getElementById("userAvatar");
    if (avatar) avatar.textContent = user.name.charAt(0).toUpperCase();
  }

  checkIfCompleted();
});

/* ─── Check Completion State ──────────────────────────────────── */
async function checkIfCompleted() {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("https://idsnext-backend.onrender.com/api/users/me", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const user = await response.json();

    if (user.completedTopics && user.completedTopics.includes("linked_list_intro_unit2")) {
      setCompletedState();
    }

  } catch (err) {
    console.error("Completion check failed:", err);
  }
}

/* ─── Mark Complete ──────────────────────────────────────────── */
async function markComplete() {
  const btn = document.getElementById("markCompleteBtn");
  if (!btn || btn.disabled) return;

  const token = localStorage.getItem("token");

  try {
    const response = await fetch("https://idsnext-backend.onrender.com/api/users/complete-topic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        topicId: "linked_list_intro_unit2"
      })
    });

    const data = await response.json();
    console.log("Complete topic response:", data);

    if (response.ok) {
      setCompletedState();
      showXpPopup();

      // Update XP in localStorage
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (data.xp !== undefined) {
        user.xp = data.xp;
        localStorage.setItem("user", JSON.stringify(user));
      }
    } else {
      console.error("Server rejected completion:", data);
    }

  } catch (err) {
    console.error("Completion error:", err);
  }
}

/* ─── Set Completed State ────────────────────────────────────── */
function setCompletedState() {
  const btn = document.getElementById("markCompleteBtn");
  if (!btn) return;

  btn.classList.add("completed");
  btn.disabled = true;

  btn.innerHTML = `
    <svg class="btn-icon" width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9
           10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clip-rule="evenodd"/>
    </svg>
    <span class="btn-label">Completed ✓</span>
  `;
}

/* ─── XP Popup ───────────────────────────────────────────────── */
function showXpPopup() {
  const popup = document.getElementById("xpPopup");
  if (!popup) return;

  popup.classList.remove("hide");
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
    popup.classList.add("hide");
  }, 2600);
}

/* ─── Logout ─────────────────────────────────────────────────── */
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/index.html";
}

/* ─── Copy Code Button ───────────────────────────────────────── */
function copyCode(btn) {
  const pre = btn.closest(".code-block").querySelector(".code-content");
  if (!pre) return;

  const text = pre.innerText;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = "Copied!";
    btn.classList.add("copied");
    setTimeout(() => {
      btn.textContent = "Copy";
      btn.classList.remove("copied");
    }, 1800);
  }).catch(() => {
    btn.textContent = "Error";
    setTimeout(() => { btn.textContent = "Copy"; }, 1800);
  });
}

/* ─── Sidebar Toggle (Desktop collapse + Mobile drawer) ──────── */
(function () {
  const sidebar     = document.getElementById("mainSidebar");
  const overlay     = document.getElementById("sidebarOverlay");
  const mainContent = document.querySelector(".ll-main");

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function collapseDesktop() {
    if (sidebar) sidebar.classList.add("sidebar-collapsed");
    if (mainContent) mainContent.classList.add("main-expanded");
  }

  function expandDesktop() {
    if (sidebar) sidebar.classList.remove("sidebar-collapsed");
    if (mainContent) mainContent.classList.remove("main-expanded");
  }

  function isDesktopCollapsed() {
    return sidebar ? sidebar.classList.contains("sidebar-collapsed") : false;
  }

  function openMobile() {
    if (sidebar) sidebar.classList.add("sidebar-mobile-open");
    if (overlay) overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMobileDrawer() {
    if (sidebar) sidebar.classList.remove("sidebar-mobile-open");
    if (overlay) overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  window.toggleSidebar = function () {
    if (isMobile()) {
      if (sidebar && sidebar.classList.contains("sidebar-mobile-open")) {
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

  window.closeSidebar = function () {
    closeMobileDrawer();
  };

  window.addEventListener("resize", function () {
    if (!isMobile()) {
      closeMobileDrawer();
    }
  });
})();