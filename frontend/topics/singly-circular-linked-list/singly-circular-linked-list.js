/* ─── Auth & user hydration ───────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) { window.location.href = "../../auth/login.html"; return; }

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user && user.name) {
    const el = document.getElementById("sidebarUserName");
    if (el) el.textContent = user.name;
    const av = document.getElementById("userAvatar");
    if (av) av.textContent = user.name.charAt(0).toUpperCase();
  }

  // Mark-complete state
  const topicKey = "scll_complete";
  if (localStorage.getItem(topicKey) === "true") {
    const btn = document.getElementById("markCompleteBtn");
    if (btn) { btn.classList.add("completed"); btn.querySelector(".btn-label").textContent = "Completed ✓"; }
  }
});

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/index.html";
}

/* ─── Mark complete ───────────────────────────────────────────── */
document.getElementById("markCompleteBtn")?.addEventListener("click", function () {
  localStorage.setItem("scll_complete", "true");
  this.classList.add("completed");
  this.querySelector(".btn-label").textContent = "Completed ✓";
  showXpPopup();
});

function showXpPopup() {
  const popup = document.getElementById("xpPopup");
  if (!popup) return;
  popup.classList.add("show");
  setTimeout(() => popup.classList.remove("show"), 3200);
}

/* ─── Code tabs ───────────────────────────────────────────────── */
function switchTab(tabId) {
  document.querySelectorAll(".impl-panel").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".impl-tab").forEach(t => t.classList.remove("active"));
  const panel = document.getElementById("tab-" + tabId);
  if (panel) panel.classList.add("active");
  document.querySelectorAll(".impl-tab").forEach(t => {
    if (t.getAttribute("onclick") && t.getAttribute("onclick").includes(tabId)) t.classList.add("active");
  });
}

/* ─── Copy code ───────────────────────────────────────────────── */
function copyCode(btn) {
  const pre = btn.closest(".code-block").querySelector(".code-content");
  if (!pre) return;
  navigator.clipboard.writeText(pre.innerText || pre.textContent).then(() => {
    const orig = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => { btn.textContent = orig; }, 1800);
  }).catch(() => {
    btn.textContent = "Failed";
    setTimeout(() => { btn.textContent = "Copy"; }, 1800);
  });
}
