// ─────────────────────────────────────────────
// iDS Studio Next — Signup Script
// Handles account creation + animated section dropdown
// ─────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {

  /* ── Animated Section Dropdown ── */
  const selectWrapper = document.getElementById("sectionSelect");
  const trigger       = document.getElementById("selectTrigger");
  const valueLabel    = document.getElementById("selectValue");
  const hiddenInput   = document.getElementById("section");
  const options       = selectWrapper ? selectWrapper.querySelectorAll(".select-option") : [];

  /**
   * Open the dropdown panel
   */
  function openDropdown() {
    selectWrapper.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
  }

  /**
   * Close the dropdown panel
   */
  function closeDropdown() {
    selectWrapper.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
  }

  /**
   * Toggle open / closed
   */
  function toggleDropdown() {
    if (selectWrapper.classList.contains("is-open")) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  // Wire up the trigger button
  if (trigger) {
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown();
    });
  }

  // Handle option selection
  options.forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.getAttribute("data-value");

      // Update hidden input (submitted with the form)
      hiddenInput.value = value;

      // Update visible label
      valueLabel.textContent = value;
      trigger.classList.add("has-value");

      // Mark selected option
      options.forEach((o) => o.classList.remove("is-selected"));
      option.classList.add("is-selected");

      // Close the dropdown
      closeDropdown();
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (selectWrapper && !selectWrapper.contains(e.target)) {
      closeDropdown();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDropdown();
    }
  });

  /* ── Form Submission ── */
  const form = document.querySelector("form");

  if (!form) {
    console.error("Signup form not found");
    return;
  }

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    // Get form values
    const name     = document.querySelector("#name").value.trim();
    const email    = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();
    const section  = document.querySelector("#section")?.value || null;

    // Basic validation
    if (!name || !email || !password) {
      alert("Please fill all required fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {

      const response = await fetch("https://idsnext-backend.onrender.com/api/auth/register", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          name,
          email,
          password,
          section
        })

      });

      const data = await response.json();

      if (data.success) {

        alert("Account created successfully!");

        // redirect to login page
        window.location.href = "login.html";

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error("Signup request error:", error);
      alert("Server error. Please try again later.");

    }

  });

});