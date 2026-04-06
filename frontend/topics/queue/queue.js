/* ─── queue.js ───────────────────────────────────────────────────
   Handles:
   1. Auth check & user info population (same pattern as dashboard)
   2. Mark Complete button state change
   3. XP popup slide-in / fade-out
──────────────────────────────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("markCompleteBtn");
  if (btn) {
    btn.addEventListener("click", markComplete);
  }

  // ── Auth guard ─────────────────────────────────────────────────
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
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

  checkIfCompleted()

});

async function checkIfCompleted() {

  const token = localStorage.getItem("token");

  try {

    const response = await fetch("http://idsnext-backend.onrender.com/api/users/me", {
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

    const response = await fetch("http://idsnext-backend.onrender.com1/api/users/complete-topic", {
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

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Replace icon with a solid checkmark and update label
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

  // Slide in
  popup.classList.remove("hide");
  popup.classList.add("show");

  // After 2.6 s, fade out
  setTimeout(() => {
    popup.classList.remove("show");
    popup.classList.add("hide");
  }, 2600);
}

/* ─── Logout (shared with dashboard) ────────────────────────── */
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/index.html";
}