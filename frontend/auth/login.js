// ─────────────────────────────────────────────
// iDS Studio Next — login.js
// Handles login form submission with loading states
// ─────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {

  const loginForm  = document.getElementById("loginForm");
  const errorBox   = document.getElementById("errorBox");
  const submitBtn  = document.getElementById("submitBtn");
  const btnText    = document.getElementById("btnText");
  const btnSpinner = document.getElementById("btnSpinner");
  const wakeNotice = document.getElementById("wakeNotice");

  if (!loginForm) return;

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // ── Reset error state ──
    hideError();

    const email    = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      showError("Please enter your email and password.");
      return;
    }

    // ── Show loading state immediately ──
    setLoading(true);

    // ── Show "waking up" notice after 4 seconds ──
    const wakeTimer = setTimeout(() => {
      if (wakeNotice) wakeNotice.style.display = "block";
    }, 4000);

    try {

      const response = await fetch("https://idsnext-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      clearTimeout(wakeTimer);

      if (data.success) {

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Keep spinner visible during redirect
        window.location.href = "/dashboard/dashboard.html";

      } else {

        setLoading(false);
        if (wakeNotice) wakeNotice.style.display = "none";
        showError(data.message || "Invalid email or password.");

      }

    } catch (err) {

      clearTimeout(wakeTimer);
      setLoading(false);
      if (wakeNotice) wakeNotice.style.display = "none";
      showError("Could not reach the server. Please try again.");

    }

  });

  // ─────────────────────────────────────────
  // Helpers
  // ─────────────────────────────────────────

  function setLoading(isLoading) {
    if (!submitBtn) return;
    submitBtn.disabled = isLoading;
    if (btnText)    btnText.textContent      = isLoading ? "Signing in..." : "Continue";
    if (btnSpinner) btnSpinner.style.display = isLoading ? "inline-block" : "none";
  }

  function showError(message) {
    if (!errorBox) return;
    errorBox.textContent = message;
    errorBox.style.display = "block";
  }

  function hideError() {
    if (!errorBox) return;
    errorBox.textContent = "";
    errorBox.style.display = "none";
  }

});