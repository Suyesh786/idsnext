// ─────────────────────────────────────────────
// iDS Studio Next — signup.js
// Handles account creation + animated section dropdown
// ─────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {

  /* ── Animated Section Dropdown ── */
  const selectWrapper = document.getElementById("sectionSelect");
  const trigger       = document.getElementById("selectTrigger");
  const valueLabel    = document.getElementById("selectValue");
  const hiddenInput   = document.getElementById("section");
  const options       = selectWrapper ? selectWrapper.querySelectorAll(".select-option") : [];

  function openDropdown() {
    selectWrapper.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
  }

  function closeDropdown() {
    selectWrapper.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
  }

  function toggleDropdown() {
    if (selectWrapper.classList.contains("is-open")) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  if (trigger) {
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown();
    });
  }

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.getAttribute("data-value");
      hiddenInput.value = value;
      valueLabel.textContent = value;
      trigger.classList.add("has-value");
      options.forEach((o) => o.classList.remove("is-selected"));
      option.classList.add("is-selected");
      closeDropdown();
    });
  });

  document.addEventListener("click", (e) => {
    if (selectWrapper && !selectWrapper.contains(e.target)) {
      closeDropdown();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDropdown();
  });


  /* ── Form Submission ── */
  const form       = document.getElementById("signupForm");
  const errorBox   = document.getElementById("errorBox");
  const submitBtn  = document.getElementById("submitBtn");
  const btnText    = document.getElementById("btnText");
  const btnSpinner = document.getElementById("btnSpinner");
  const wakeNotice = document.getElementById("wakeNotice");

  if (!form) {
    console.error("Signup form not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // ── Reset errors ──
    hideError();

    const name     = document.querySelector("#name").value.trim();
    const email    = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();
    const section  = document.querySelector("#section")?.value || null;

    // ── Validation ──
    if (!name || !email || !password) {
      showError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      showError("Password must be at least 6 characters.");
      return;
    }

    // ── Loading state ──
    setLoading(true);

    // ── Wake-up notice after 4 seconds ──
    const wakeTimer = setTimeout(() => {
      if (wakeNotice) wakeNotice.style.display = "block";
    }, 4000);

    try {

      const response = await fetch("http://idsnext-backend.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, section })
      });

      const data = await response.json();

      clearTimeout(wakeTimer);

      if (data.success) {

        // Keep button loading during redirect
        if (btnText) btnText.textContent = "Account created! Redirecting...";
        window.location.href = "login.html";

      } else {

        setLoading(false);
        if (wakeNotice) wakeNotice.style.display = "none";
        showError(data.message || "Registration failed. Please try again.");

      }

    } catch (error) {

      clearTimeout(wakeTimer);
      setLoading(false);
      if (wakeNotice) wakeNotice.style.display = "none";
      console.error("Signup request error:", error);
      showError("Could not reach the server. Please try again.");

    }

  });

  /* ── Helpers ── */

  function setLoading(isLoading) {
    if (!submitBtn) return;
    submitBtn.disabled = isLoading;
    if (btnText)    btnText.textContent      = isLoading ? "Creating account..." : "Create Account";
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