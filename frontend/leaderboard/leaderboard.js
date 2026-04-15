(function () {
"use strict";

/* ── Fetch Users From Backend ───────────────── */

async function loadUsers() {

  try {

    const res = await fetch("http://idsnext-backend.onrender.com/api/users/leaderboard", {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
    }
    });

    const users = await res.json();

    return users;

  } catch (err) {

    console.error("Leaderboard fetch error:", err);

    return [];

  }

}

/* ── Sort Users By XP ───────────────────────── */

function sortByXP(users) {

  return [...users].sort((a,b) => (b.xp || 0) - (a.xp || 0));

}

/* ── Update Podium ─────────────────────────── */

function updatePodium(sorted) {

  const slots = [
    { id:"1", index:0 },
    { id:"2", index:1 },
    { id:"3", index:2 }
  ];

  slots.forEach(({id,index}) => {

    const user = sorted[index];

    const nameEl = document.getElementById("name-"+id);
    const xpEl   = document.getElementById("xp-"+id);

    if (!user) {

      if (nameEl) nameEl.textContent = "—";
      if (xpEl)   xpEl.textContent = "";

      return;

    }

    if (nameEl) nameEl.textContent = user.name;

    if (xpEl) {
      xpEl.textContent = (user.xp && user.xp > 0)
        ? user.xp + " XP"
        : "-";
    }

  });

}

/* ── Rank Label ───────────────────────────── */

function ordinal(n) { // Returns ordinal suffix for a number

  const s = ["th","st","nd","rd"];
  const v = n % 100;

  return n + (s[(v-20)%10] || s[v] || s[0]);

}

/* ── Rank badge HTML ─────────────────────── */

function rankBadgeHTML(rank) {

  if (rank === 1) return `<span class="rank-badge rank-badge--1st">1st</span>`;
  if (rank === 2) return `<span class="rank-badge rank-badge--2nd">2nd</span>`;
  if (rank === 3) return `<span class="rank-badge rank-badge--3rd">3rd</span>`;

  return `<span class="rank-badge rank-badge--other">${ordinal(rank)}</span>`;

}

/* ── Name class for top 3 ────────────────── */

function nameClass(rank) {

  if (rank === 1) return "name-1st";
  if (rank === 2) return "name-2nd";
  if (rank === 3) return "name-3rd";

  return "";

}

/* ── Update Table ─────────────────────────── */

function updateTable(sorted, currentUserName) {

  const tbody = document.getElementById("leaderboard-body");

  if (!tbody) return;

  tbody.innerHTML = "";

  // Update student count badge
  const countEl = document.getElementById("studentCount");
  if (countEl) {
    countEl.textContent = sorted.length + " student" + (sorted.length !== 1 ? "s" : "");
  }

  sorted.forEach((user, i) => {

    const rank = i + 1;

    const isYou = currentUserName &&
      user.name?.toLowerCase() === currentUserName.toLowerCase();

    const tr = document.createElement("tr");

    if (isYou) tr.style.background = "#eef4ff";

    const xpDisplay = (user.xp && user.xp > 0)
      ? user.xp.toLocaleString()
      : "-";

    const nc = nameClass(rank);
    const nameColored = nc
      ? `<span class="${nc}">${escapeHTML(user.name || "Unknown")}</span>`
      : escapeHTML(user.name || "Unknown");

    const youBadge  = isYou ? `<span class="you-badge">You</span>` : "";
    const levelBadge = `<span class="level-badge">Level 1</span>`;

    tr.innerHTML = `
      <td>${rankBadgeHTML(rank)}</td>
      <td>
        <span class="name-cell">
          ${nameColored}${levelBadge}${youBadge}
        </span>
      </td>
      <td class="td-xp">${xpDisplay}</td>
    `;

    tbody.appendChild(tr);

  });

}

/* ── Escape HTML ───────────────────────────── */

function escapeHTML(str) {

  return String(str)
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;");

}

/* ── Render Leaderboard ───────────────────── */

async function render() {

  const users = await loadUsers();

  const sorted = sortByXP(users);

  let currentUserName = null;

  try {

    const u = JSON.parse(localStorage.getItem("user"));

    if (u && u.name) currentUserName = u.name;

  } catch(_) {}

  updatePodium(sorted);

  updateTable(sorted, currentUserName);

}

/* ── Boot ─────────────────────────────────── */

if (document.readyState === "loading") {

  document.addEventListener("DOMContentLoaded", render);

} else {

  render();

}

})();

/* ── Refresh Button ───────────────────────── */

function refreshLeaderboard() {

  const icon = document.querySelector("#refreshBtn svg");

  if (icon) {
    icon.classList.add("spin");
  }

  setTimeout(() => {
    location.reload();
  }, 900);

}
/* ═══════════════════════════════════════════════════════════════
   Sidebar toggle — desktop collapse + mobile drawer
   (mirrors learn.js exactly)
   ═══════════════════════════════════════════════════════════════ */
(function () {
  const sidebar     = document.getElementById("mainSidebar");
  const overlay     = document.getElementById("sidebarOverlay");
  const mainContent = document.getElementById("mainContent");

  function isMobile() { return window.innerWidth <= 768; }

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

  function openMobile() {
    sidebar.classList.add("sidebar-mobile-open");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  function closeMobileDrawer() {
    sidebar.classList.remove("sidebar-mobile-open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  window.toggleSidebar = function () {
    if (isMobile()) {
      sidebar.classList.contains("sidebar-mobile-open")
        ? closeMobileDrawer()
        : openMobile();
    } else {
      isDesktopCollapsed() ? expandDesktop() : collapseDesktop();
    }
  };

  window.closeSidebar = function () { closeMobileDrawer(); };

  window.addEventListener("resize", function () {
    if (!isMobile()) closeMobileDrawer();
  });
})();