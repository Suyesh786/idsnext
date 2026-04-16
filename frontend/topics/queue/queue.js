/* ─── queue.js ───────────────────────────────────────────────────
   Handles:
   1. Auth check & user info population (same pattern as stack.js)
   2. Mark Complete button state change
   3. XP popup slide-in / fade-out
   4. Queue Simulator (enqueue, dequeue, display, clear + animations)
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

/* ─── Check Completion ───────────────────────────────────────── */
async function checkIfCompleted() {

  const token = localStorage.getItem("token");

  try {

    const response = await fetch("https://idsnext-backend.onrender.com/api/users/me", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const user = await response.json();

    if (user.completedTopics && user.completedTopics.includes("queue_unit1")) {
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
        topicId: "queue_unit1"
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
function switchQueueTab(tab) {
  document.querySelectorAll(".impl-tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".impl-panel").forEach(p => p.classList.remove("active"));

  const activeTab   = document.querySelector(`.impl-tab[onclick="switchQueueTab('${tab}')"]`);
  const activePanel = document.getElementById(`qtab-${tab}`);

  if (activeTab)   activeTab.classList.add("active");
  if (activePanel) activePanel.classList.add("active");
}

/* ─── Copy Code Button ───────────────────────────────────────── */
function copyQueueCode(btn) {
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
   QUEUE SIMULATOR
══════════════════════════════════════════════════════════════ */

const MAX_QUEUE_SIZE = 8;
const VALUE_MIN = -999;
const VALUE_MAX = 999;

let queue     = [];   // The actual queue data structure (front = index 0)
let opCount   = 0;    // Operation counter
let animating = false;// Animation lock — prevents concurrent ops

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
  const sizeEl  = document.getElementById("statSize");
  const frontEl = document.getElementById("statFront");
  const opsEl   = document.getElementById("statOps");

  if (sizeEl)  sizeEl.textContent  = queue.length;
  if (frontEl) frontEl.textContent = queue.length > 0 ? queue[0] : "—";
  if (opsEl)   opsEl.textContent   = opCount;
}

function updateEmptyState() {
  const empty = document.getElementById("simEmptyState");
  if (!empty) return;
  empty.style.display = queue.length === 0 ? "flex" : "none";
}

/* Refresh FRONT / REAR highlights and pointer labels */
function refreshFrontRearHighlight() {
  const container = document.getElementById("simQueueContainer");
  if (!container) return;

  const elements = container.querySelectorAll(".sim-element");

  elements.forEach((el, i) => {
    el.classList.remove("is-front", "is-rear");
    const label = el.querySelector(".elem-label");
    if (label) label.textContent = "";

    if (elements.length === 1) {
      // Single element is both front and rear
      el.classList.add("is-front", "is-rear");
      if (label) label.textContent = "F·R";
    } else if (i === 0) {
      el.classList.add("is-front");
      if (label) label.textContent = "FRONT";
    } else if (i === elements.length - 1) {
      el.classList.add("is-rear");
      if (label) label.textContent = "REAR";
    }
  });

  updatePointerPositions();
}

/* Move the FRONT / REAR pointer badges to align over correct elements */
function updatePointerPositions() {
  const container    = document.getElementById("simQueueContainer");
  const frontPtrRow  = document.getElementById("queueFrontPtrRow");
  const rearPtrRow   = document.getElementById("queueRearPtrRow");
  const ptrWrap      = document.getElementById("queuePtrWrap");

  if (!container || !frontPtrRow || !rearPtrRow || !ptrWrap) return;

  const elements = container.querySelectorAll(".sim-element");

  if (elements.length === 0) {
    frontPtrRow.style.opacity = "0";
    rearPtrRow.style.opacity  = "0";
    return;
  }

  frontPtrRow.style.opacity = "1";
  rearPtrRow.style.opacity  = "1";

  const wrapRect  = ptrWrap.getBoundingClientRect();
  const frontEl   = elements[0];
  const rearEl    = elements[elements.length - 1];

  const frontRect = frontEl.getBoundingClientRect();
  const rearRect  = rearEl.getBoundingClientRect();

  // Position FRONT ptr centred over first element
  const frontLeft = frontRect.left - wrapRect.left + frontRect.width / 2 - frontPtrRow.offsetWidth / 2;
  frontPtrRow.style.position  = "absolute";
  frontPtrRow.style.left      = Math.max(0, frontLeft) + "px";
  frontPtrRow.style.transition = "left 0.3s cubic-bezier(0.34, 1.2, 0.64, 1)";

  // Position REAR ptr centred over last element
  const rearLeft  = rearRect.left  - wrapRect.left  + rearRect.width  / 2 - rearPtrRow.offsetWidth  / 2;
  rearPtrRow.style.position  = "absolute";
  rearPtrRow.style.left      = Math.max(0, rearLeft) + "px";
  rearPtrRow.style.transition = "left 0.3s cubic-bezier(0.34, 1.2, 0.64, 1)";
}

/* ─── Enqueue ────────────────────────────────────────────────── */
function enqueueElement() {
  if (animating) return;

  const input = document.getElementById("simInput");
  if (!input) return;

  const raw = input.value.trim();
  if (raw === "" || isNaN(Number(raw))) {
    setStatus("⚠ Please enter a valid number.", "error");
    input.focus();
    return;
  }

  const value = parseInt(raw, 10);

  if (value < VALUE_MIN || value > VALUE_MAX) {
    setStatus(`⚠ Value out of range. Use ${VALUE_MIN} to ${VALUE_MAX}.`, "error");
    input.focus();
    return;
  }

  if (queue.length >= MAX_QUEUE_SIZE) {
    setStatus(`⚠ Queue Overflow! Maximum size is ${MAX_QUEUE_SIZE}.`, "error");
    return;
  }

  animating = true;
  queue.push(value);   // push to rear (end of array)
  opCount++;
  input.value = "";
  input.focus();

  const container = document.getElementById("simQueueContainer");
  if (!container) { animating = false; return; }

  updateEmptyState();

  // Create element and append at end (rear)
  const el = document.createElement("div");
  el.className = "sim-element enqueue-anim";
  el.innerHTML = `
    <span class="elem-value">${value}</span>
    <span class="elem-label"></span>
  `;
  container.appendChild(el);

  setStatus(`✓ Enqueued ${value} at the Rear.`, "success");

  setTimeout(() => {
    el.classList.remove("enqueue-anim");
    refreshFrontRearHighlight();
    updateStats();
    animating = false;
  }, 460);
}

/* ─── Dequeue ────────────────────────────────────────────────── */
function dequeueElement() {
  if (animating) return;

  if (queue.length === 0) {
    setStatus("⚠ Queue Underflow! The queue is empty.", "error");
    return;
  }

  animating = true;
  const value = queue.shift();   // remove from front (index 0)
  opCount++;

  const container = document.getElementById("simQueueContainer");
  if (!container) { animating = false; return; }

  const elements = container.querySelectorAll(".sim-element");
  const frontEl  = elements[0];   // visually leftmost = FRONT

  if (!frontEl) {
    animating = false;
    return;
  }

  // Capture position for flying-box animation
  const rect    = frontEl.getBoundingClientRect();
  const simCard = document.getElementById("simulatorCard");
  const cardRect = simCard ? simCard.getBoundingClientRect() : null;

  // Apply dequeue slide-out animation
  frontEl.classList.add("dequeue-anim");

  // Launch dustbin at bottom-left
  if (cardRect) {
    setTimeout(() => {
      launchDustbinAnimation(value, rect, cardRect);
    }, 150);
  }

  // Remove DOM element after animation completes
  setTimeout(() => {
    frontEl.remove();
    updateEmptyState();
    refreshFrontRearHighlight();
    updateStats();
    setStatus(`✓ Dequeued ${value} from the Front.`, "success");
    animating = false;
  }, 460);
}

/* ─── Dustbin / Flying-Box Animation ────────────────────────── */
function launchDustbinAnimation(value, fromRect, cardRect) {
  const dustbin    = document.getElementById("dustbin");
  const dustbinLid = document.getElementById("dustbinLid");
  if (!dustbin) return;

  // Create flying box at the element's current position
  const flyBox = document.createElement("div");
  flyBox.className   = "flying-box";
  flyBox.textContent = value;
  flyBox.style.left  = fromRect.left + "px";
  flyBox.style.top   = fromRect.top  + "px";
  flyBox.style.width = fromRect.width + "px";
  document.body.appendChild(flyBox);

  // Show dustbin
  dustbin.style.opacity    = "1";
  dustbin.style.bottom     = "28px";
  dustbin.classList.remove("hide-dustbin");

  const dustRect = dustbin.getBoundingClientRect();

  // Open lid
  setTimeout(() => {
    if (dustbinLid) dustbinLid.classList.add("open");
  }, 80);

  // Fly box toward dustbin
  setTimeout(() => {
    const targetLeft = dustRect.left + dustRect.width / 2 - fromRect.width / 2;
    const targetTop  = dustRect.top  + 10;
    flyBox.style.transition = "left 0.38s ease, top 0.38s ease, opacity 0.38s ease, transform 0.38s ease";
    flyBox.style.left       = targetLeft + "px";
    flyBox.style.top        = targetTop  + "px";
    flyBox.style.opacity    = "0";
    flyBox.style.transform  = "scale(0.5)";
  }, 160);

  // Remove flying box + close lid
  setTimeout(() => {
    flyBox.remove();
    if (dustbinLid) dustbinLid.classList.remove("open");
  }, 560);

  // Sink dustbin back down
  setTimeout(() => {
    dustbin.style.opacity    = "0";
    dustbin.style.bottom     = "-80px";
    dustbin.style.transition = "bottom 0.35s ease, opacity 0.35s ease";
  }, 700);

  // Reset transition for next use
  setTimeout(() => {
    dustbin.style.transition = "";
  }, 1100);
}

/* ─── Display ────────────────────────────────────────────────── */
function displayQueue() {
  if (queue.length === 0) {
    setStatus("Queue is empty — nothing to display.", "error");
    return;
  }

  const container = document.getElementById("simQueueContainer");
  if (!container) return;

  const elements = Array.from(container.querySelectorAll(".sim-element"));

  // Glow sequentially from FRONT (left) → REAR (right)
  elements.forEach((el, i) => {
    setTimeout(() => {
      el.classList.remove("glow-anim");
      void el.offsetWidth;   // force reflow to restart animation
      el.classList.add("glow-anim");

      setTimeout(() => {
        el.classList.remove("glow-anim");
      }, 650);
    }, i * 140);
  });

  setStatus(
    `Queue (front→rear): [ ${queue.join(", ")} ]  |  Front = ${queue[0]}  |  Rear = ${queue[queue.length - 1]}`,
    "info"
  );
}

/* ─── Clear ──────────────────────────────────────────────────── */
function clearQueue() {
  if (animating) return;

  if (queue.length === 0) {
    setStatus("Queue is already empty.", "");
    return;
  }

  queue    = [];
  opCount  = 0;

  const container = document.getElementById("simQueueContainer");
  if (container) {
    container.querySelectorAll(".sim-element").forEach(el => el.remove());
  }

  // Hide pointer labels
  const frontRow = document.getElementById("queueFrontPtrRow");
  const rearRow  = document.getElementById("queueRearPtrRow");
  if (frontRow) frontRow.style.opacity = "0";
  if (rearRow)  rearRow.style.opacity  = "0";

  updateEmptyState();
  updateStats();
  setStatus("Queue cleared.", "info");
}