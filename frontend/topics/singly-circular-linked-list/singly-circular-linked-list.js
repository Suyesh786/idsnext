/* ─── singly-circular-linked-list.js ──────────────────────────────
   Handles:
   1. Auth check & user info population
   2. Mark Complete button state (matches SLL pattern)
   3. XP popup slide-in / fade-out
   4. Accordion toggle for operations sections
   5. Traversal animation on the step-by-step diagram
   6. SVG node hover highlights
──────────────────────────────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("markCompleteBtn");
  if (btn) btn.addEventListener("click", markComplete);

  // ── Auth guard ─────────────────────────────────────────────────
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "../../login.html";
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
  initSvgNodeHovers();
});

/* ─── Auth & Completion ──────────────────────────────────────── */
async function checkIfCompleted() {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch("https://idsnext-backend.onrender.com/api/users/me", {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const user = await response.json();
    if (user.completedTopics && user.completedTopics.includes("singly_circular_linked_list_unit2")) {
      setCompletedState();
    }
  } catch (err) {
    console.error("Completion check failed:", err);
  }
}

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
      body: JSON.stringify({ topicId: "singly_circular_linked_list_unit2" })
    });
    const data = await response.json();
    if (response.ok) {
      setCompletedState();
      showXpPopup();
    } else {
      console.error("Server rejected completion:", data);
    }
  } catch (err) {
    console.error("Completion error:", err);
  }
}

function setCompletedState() {
  const btn = document.getElementById("markCompleteBtn");
  if (!btn) return;
  btn.classList.add("completed");
  btn.disabled = true;
  btn.querySelector(".btn-label").textContent = "Completed ✓";
}

/* ─── XP Popup ───────────────────────────────────────────────── */
function showXpPopup() {
  const popup = document.getElementById("xpPopup");
  if (!popup) return;
  popup.classList.add("show");
  setTimeout(() => popup.classList.remove("show"), 3200);
}

/* ─── Logout ─────────────────────────────────────────────────── */
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "../../login.html";
}

/* ─── Accordion Toggle ───────────────────────────────────────── */
function toggleAccordion(id) {
  const item = document.getElementById(id);
  if (!item) return;
  item.classList.toggle("open");
}

/* ─── Traversal Animation ────────────────────────────────────── */
let travAnimRunning = false;

function animateTraversal() {
  if (travAnimRunning) return;
  travAnimRunning = true;

  const btn = document.getElementById("animTravBtn");
  if (btn) btn.disabled = true;

  const nodeIds = ["ts1", "ts2", "ts3", "ts4"];
  const nodes = nodeIds.map(id => document.getElementById(id));
  const nodeEls = nodes.map(n => n ? n.querySelector(".ts-node") : null);

  // reset all
  nodeEls.forEach(n => {
    if (n) {
      n.classList.remove("ts-active", "ts-visited");
    }
  });

  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  async function run() {
    for (let i = 0; i < nodeEls.length; i++) {
      const el = nodeEls[i];
      if (!el) continue;

      // activate current
      el.classList.add("ts-active");
      await delay(600);

      // mark visited (except last which stays red/different)
      el.classList.remove("ts-active");
      if (i < nodeEls.length - 1) {
        el.classList.add("ts-visited");
      }
      // brief pause between
      await delay(150);
    }

    // animate the circular arrow element
    const circArrow = document.querySelector(".ts-circ");
    if (circArrow) {
      circArrow.style.transition = "all 0.3s ease";
      circArrow.style.background = "#fef3c7";
      circArrow.style.borderColor = "#f59e0b";
      circArrow.style.color = "#b45309";
      await delay(600);
      circArrow.style.background = "";
      circArrow.style.borderColor = "";
      circArrow.style.color = "";
    }

    // reset after a pause
    await delay(800);
    nodeEls.forEach(n => {
      if (n) n.classList.remove("ts-active", "ts-visited");
    });

    travAnimRunning = false;
    if (btn) btn.disabled = false;
  }

  run();
}

/* ─── SVG Node Hover Highlights ─────────────────────────────── */
function initSvgNodeHovers() {
  const svgNodes = document.querySelectorAll(".svg-node");
  svgNodes.forEach(node => {
    node.addEventListener("mouseenter", () => {
      node.classList.add("node-active");
    });
    node.addEventListener("mouseleave", () => {
      node.classList.remove("node-active");
    });
  });
}

/* ─── Circular Arc Animation (optional subtle pulse) ─────────── */
(function startArcPulse() {
  const arc = document.getElementById("circularArc");
  if (!arc) return;

  let opacity = 1;
  let dir = -1;

  setInterval(() => {
    opacity += dir * 0.015;
    if (opacity <= 0.45) dir = 1;
    if (opacity >= 1.0) dir = -1;
    arc.style.opacity = opacity;
  }, 50);
})();