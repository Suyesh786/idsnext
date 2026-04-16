/* ─── stack.js ───────────────────────────────────────────────────
   Handles:
   1. Auth check & user info population (same pattern as dashboard)
   2. Mark Complete button state change
   3. XP popup slide-in / fade-out
   4. Stack Simulator (push, pop, display, clear + animations)
──────────────────────────────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("markCompleteBtn");
  if (btn) {
    btn.addEventListener("click", markComplete);
  }

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

});

async function checkIfCompleted() {

  const token = localStorage.getItem("token");

  try {

    const response = await fetch("https://idsnext-backend.onrender.com/api/users/me", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const user = await response.json();

    if (user.completedTopics && user.completedTopics.includes("stack_unit1")) {
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
        topicId: "stack_unit1"
      })
    });

    const data = await response.json();
    console.log("Complete topic response:", data);

    if (response.ok) {
      setCompletedState();
      showXpPopup();
    } else {
      console.error("Server rejected completion:");
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

/* ─── Implementation Tab Switcher ────────────────────────────── */
function switchTab(tab) {
  document.querySelectorAll(".impl-tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".impl-panel").forEach(p => p.classList.remove("active"));

  const activeTab = document.querySelector(`.impl-tab[onclick="switchTab('${tab}')"]`);
  const activePanel = document.getElementById(`tab-${tab}`);

  if (activeTab)  activeTab.classList.add("active");
  if (activePanel) activePanel.classList.add("active");
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

/* ══════════════════════════════════════════════════════════════
   STACK SIMULATOR
══════════════════════════════════════════════════════════════ */

const MAX_STACK_SIZE = 8;   // Improvement 1: max 8 elements
const VALUE_MIN = -999;
const VALUE_MAX = 999;

let stack = [];          // The actual stack data structure
let opCount = 0;         // Operation counter
let animating = false;   // Lock during animations

/* ─── Helpers ────────────────────────────────────────────────── */
function setStatus(msg, type = "") {
  const bar = document.getElementById("simStatus");
  const txt = document.getElementById("simStatusText");
  if (!bar || !txt) return;

  bar.className = "sim-status";
  if (type) bar.classList.add(`status-${type}`);
  txt.textContent = msg;
}

function updateStats() {
  const sizeEl = document.getElementById("statSize");
  const topEl  = document.getElementById("statTop");
  const opsEl  = document.getElementById("statOps");

  if (sizeEl) sizeEl.textContent = stack.length;
  if (topEl)  topEl.textContent  = stack.length > 0 ? stack[stack.length - 1] : "—";
  if (opsEl)  opsEl.textContent  = opCount;
}

function updateEmptyState() {
  const empty = document.getElementById("simEmptyState");
  if (!empty) return;
  empty.style.display = stack.length === 0 ? "flex" : "none";
}

// Improvement 3 & 4: refresh top highlight AND update the TOP pointer indicator
function refreshTopHighlight() {
  const container = document.getElementById("simStackContainer");
  if (!container) return;  // DOM safety check

  const elements = container.querySelectorAll(".sim-element");
  elements.forEach((el, i) => {
    const label = el.querySelector(".elem-label");
    if (i === elements.length - 1) {
      // Visual top — highlight + label
      el.classList.add("is-top");
      if (label) label.textContent = "TOP";
    } else {
      el.classList.remove("is-top");
      if (label) label.textContent = "";
    }
  });

  // Update the external TOP pointer indicator
  updateTopPointer();
}

// Improvement 4: show/hide the TOP → pointer next to the top element
function updateTopPointer() {
  const container = document.getElementById("simStackContainer");
  const pointer   = document.getElementById("simTopPointer");
  if (!container || !pointer) return;

  const elements = container.querySelectorAll(".sim-element");

  if (elements.length === 0) {
    pointer.style.opacity = "0";
    return;
  }

  // Position the pointer beside the topmost element
  const topEl     = elements[elements.length - 1];
  const contRect  = container.getBoundingClientRect();
  const topRect   = topEl.getBoundingClientRect();

  // Offset relative to the sim-stack-wrap parent (position: relative)
  const wrap = document.querySelector(".sim-stack-wrap");
  const wrapRect = wrap ? wrap.getBoundingClientRect() : contRect;

  const pointerTop = topRect.top - wrapRect.top + topRect.height / 2 - pointer.offsetHeight / 2;

  pointer.style.top     = pointerTop + "px";
  pointer.style.opacity = "1";
}

/* ─── Push ───────────────────────────────────────────────────── */
function pushElement() {
  if (animating) return;   // Improvement 3: consistent animation lock

  const input = document.getElementById("simInput");
  if (!input) return;

  const raw = input.value.trim();
  if (raw === "" || isNaN(Number(raw))) {
    setStatus("⚠ Please enter a valid number.", "error");
    input.focus();
    return;
  }

  const value = parseInt(raw, 10);

  // Improvement 2: prevent extremely large/small inputs
  if (value < VALUE_MIN || value > VALUE_MAX) {
    setStatus(`⚠ Value too large for visualization. Use ${VALUE_MIN} to ${VALUE_MAX}.`, "error");
    input.focus();
    return;
  }

  // Improvement 1: Stack Overflow check
  if (stack.length >= MAX_STACK_SIZE) {
    setStatus(`⚠ Stack Overflow! Maximum size is ${MAX_STACK_SIZE}.`, "error");
    return;
  }

  animating = true;
  stack.push(value);
  opCount++;
  input.value = "";
  input.focus();

  // DOM safety check before manipulation
  const container = document.getElementById("simStackContainer");
  if (!container) { animating = false; return; }

  updateEmptyState();

  const el = document.createElement("div");
  el.className = "sim-element is-top";
  el.innerHTML = `
    <span class="elem-value">${value}</span>
    <span class="elem-label">TOP</span>
  `;

  // Remove "is-top" from previous top
  const prevTop = container.querySelector(".sim-element.is-top");
  if (prevTop) {
    prevTop.classList.remove("is-top");
    const prevLabel = prevTop.querySelector(".elem-label");
    if (prevLabel) prevLabel.textContent = "";
  }

  container.appendChild(el);

  setStatus(`✓ Pushed ${value} onto the stack.`, "success");
  updateStats();

  // Update TOP pointer after element is in DOM
  setTimeout(() => {
    updateTopPointer();
    animating = false;
  }, 480);
}

/* ─── Pop ────────────────────────────────────────────────────── */
function popElement() {
  if (animating) return;   // Improvement 3: consistent animation lock

  // Improvement 1: Stack Underflow check
  if (stack.length === 0) {
    setStatus("⚠ Stack Underflow! The stack is empty.", "error");
    return;
  }

  animating = true;
  const value = stack.pop();
  opCount++;

  const container = document.getElementById("simStackContainer");
  if (!container) { animating = false; return; }  // DOM safety check

  const elements = container.querySelectorAll(".sim-element");
  const topEl = elements[elements.length - 1];

  if (!topEl) {
    animating = false;
    return;
  }

  // Grab position for flying box animation
  const rect = topEl.getBoundingClientRect();
  const simCard = document.getElementById("simulatorCard");
  const cardRect = simCard ? simCard.getBoundingClientRect() : null;

  // Apply pop animation to the element
  topEl.classList.add("pop-anim");

  // Show flying box → dustbin animation
  if (cardRect) {
    setTimeout(() => {
      launchDustbinAnimation(value, rect, cardRect);
    }, 180);
  }

  // Remove DOM element after animation
  setTimeout(() => {
    topEl.remove();
    updateEmptyState();
    refreshTopHighlight();
    updateStats();
    setStatus(`✓ Popped ${value} from the stack.`, "success");
    animating = false;
  }, 460);
}

/* ─── Dustbin / Flying Box Animation ────────────────────────── */
function launchDustbinAnimation(value, fromRect, cardRect) {
  const dustbin = document.getElementById("dustbin");
  const dustbinLid = document.getElementById("dustbinLid");
  if (!dustbin) return;

  // Create flying box
  const flyBox = document.createElement("div");
  flyBox.className = "flying-box";
  flyBox.textContent = value;
  flyBox.style.left  = fromRect.left + "px";
  flyBox.style.top   = fromRect.top  + "px";
  flyBox.style.width = fromRect.width + "px";
  document.body.appendChild(flyBox);

  // Show dustbin
  dustbin.style.opacity = "1";
  dustbin.style.bottom  = "28px";
  dustbin.classList.remove("hide-dustbin");

  // Compute dustbin target position
  const dustRect = dustbin.getBoundingClientRect();

  // Open dustbin lid
  setTimeout(() => {
    if (dustbinLid) dustbinLid.classList.add("open");
  }, 80);

  // Fly the box toward dustbin
  setTimeout(() => {
    const targetLeft = dustRect.left + dustRect.width / 2 - fromRect.width / 2;
    const targetTop  = dustRect.top  + 10;
    flyBox.style.transition = "left 0.38s ease, top 0.38s ease, opacity 0.38s ease, transform 0.38s ease";
    flyBox.style.left  = targetLeft + "px";
    flyBox.style.top   = targetTop  + "px";
    flyBox.style.opacity = "0";
    flyBox.style.transform = "scale(0.5)";
  }, 160);

  // Remove flying box, close lid, hide dustbin
  setTimeout(() => {
    flyBox.remove();
    if (dustbinLid) dustbinLid.classList.remove("open");
  }, 560);

  setTimeout(() => {
    dustbin.style.opacity = "0";
    dustbin.style.bottom  = "-80px";
    dustbin.style.transition = "bottom 0.35s ease, opacity 0.35s ease";
  }, 700);

  // Reset transition on dustbin for next use
  setTimeout(() => {
    dustbin.style.transition = "";
  }, 1100);
}

/* ─── Display ────────────────────────────────────────────────── */
function displayStack() {
  if (stack.length === 0) {
    setStatus("Stack is empty — nothing to display.", "error");
    return;
  }

  const container = document.getElementById("simStackContainer");
  if (!container) return;  // DOM safety check

  const elements = Array.from(container.querySelectorAll(".sim-element"));

  // Glow from top to bottom with staggered delay
  elements.reverse().forEach((el, i) => {
    setTimeout(() => {
      el.classList.remove("glow-anim");
      void el.offsetWidth; // reflow to restart animation
      el.classList.add("glow-anim");

      setTimeout(() => {
        el.classList.remove("glow-anim");
      }, 650);
    }, i * 140);
  });

  const topVal = stack[stack.length - 1];
  setStatus(
    `Stack (top→bottom): [ ${[...stack].reverse().join(", ")} ]  |  Top = ${topVal}`,
    "info"
  );
}

/* ─── Clear ──────────────────────────────────────────────────── */
function clearStack() {
  if (animating) return;
  if (stack.length === 0) {
    setStatus("Stack is already empty.", "");
    return;
  }

  // Improvement 4: fully reset simulator state
  stack = [];
  opCount = 0;   // reset operation counter

  const container = document.getElementById("simStackContainer");
  if (container) {
    container.querySelectorAll(".sim-element").forEach(el => el.remove());
  }

  // Hide TOP pointer
  const pointer = document.getElementById("simTopPointer");
  if (pointer) pointer.style.opacity = "0";

  updateEmptyState();
  updateStats();
  setStatus("Stack cleared.", "info");
}