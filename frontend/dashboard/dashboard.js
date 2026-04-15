/* ═══════════════════════════════════════════════════
   dashboard.js — Spark AI Chat Assistant
   All chatbot behavior lives here.
   DO NOT modify existing dashboard functionality.
═══════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── State ─────────────────────────────────────── */
  const state = {
    isOpen: false,
    welcomeDone: false,
  };

  /* ── DOM refs (populated after DOMContentLoaded) ── */
  let orb, panel, messagesContainer, input, sendBtn, closeBtn;

  function init() {
    injectHTML();
    cacheRefs();
    bindEvents();
    loadUserXP();

    // ── Mobile sidebar toggle handled by inline script in dashboard.html ──
  }

  /* ── Inject Spark HTML into body ────────────────── */
  function injectHTML() {
    const markup = `
      <!-- Spark Floating Orb -->
      <button class="spark-orb" id="sparkOrb" aria-label="Open Spark AI Assistant">
        <img src="spark/spark-orb.png" alt="Spark" class="spark-orb-img" />
        <span class="spark-orb-pulse"></span>
      </button>

      <!-- Spark Chat Panel -->
      <div class="spark-panel" id="sparkPanel" aria-hidden="true">

        <!-- Header -->
        <div class="spark-header">
          <div class="spark-header-left">
            <img src="/spark/spark-logo.png" alt="Spark Logo" class="spark-logo-img" />
            <div class="spark-header-info">
              <span class="spark-name">Spark</span>
              <span class="spark-tagline">Your AI Study Companion</span>
            </div>
          </div>
          <div class="spark-header-right">
            <div class="spark-status">
              <span class="spark-status-dot"></span>
              <span class="spark-status-text">Always here to help</span>
            </div>
            <button class="spark-close-btn" id="sparkClose" aria-label="Close Spark">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Messages -->
        <div class="spark-messages" id="sparkMessages" role="log" aria-live="polite"></div>

        <!-- Input -->
        <div class="spark-input-row">
          <input
            type="text"
            id="sparkInput"
            class="spark-input"
            placeholder="Type a message..."
            autocomplete="off"
            aria-label="Message Spark"
          />
          <button class="spark-send-btn" id="sparkSend" aria-label="Send message">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 
                1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 
                1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
            </svg>
          </button>
        </div>

      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", markup);
  }

  /* ── Cache DOM refs ─────────────────────────────── */
  function cacheRefs() {
    orb               = document.getElementById("sparkOrb");
    panel             = document.getElementById("sparkPanel");
    messagesContainer = document.getElementById("sparkMessages");
    input             = document.getElementById("sparkInput");
    sendBtn           = document.getElementById("sparkSend");
    closeBtn          = document.getElementById("sparkClose");
  }

  /* ── Bind Events ────────────────────────────────── */
  function bindEvents() {
    orb.addEventListener("click", openPanel);
    closeBtn.addEventListener("click", closePanel);

    sendBtn.addEventListener("click", handleSend);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });
  }

  /* ── Open / Close ───────────────────────────────── */
  function openPanel() {
    state.isOpen = true;
    panel.classList.add("spark-panel--open");
    panel.setAttribute("aria-hidden", "false");
    orb.classList.add("spark-orb--hidden");
    input.focus();

    if (!state.welcomeDone) {
      playWelcome();
      state.welcomeDone = true;
    }
  }

  function closePanel() {
    state.isOpen = false;
    panel.classList.remove("spark-panel--open");
    panel.setAttribute("aria-hidden", "true");
    orb.classList.remove("spark-orb--hidden");
  }

  /* ── Welcome Animation ──────────────────────────── */
  function playWelcome() {
    let userName = "there"; // default fallback username
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.name) userName = user.name.split(" ")[0];
    } catch (_) {}

    setTimeout(function () {
      appendMessage("spark", "Hi " + userName + " 👋");
    }, 500);

    setTimeout(function () {
      appendMessage("spark", "I'm Spark. How can I help you today?");
    }, 1200);
  }

  /* ── Message Rendering ──────────────────────────── */
  function appendMessage(sender, text) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("spark-msg", "spark-msg--" + sender);

    if (sender === "spark") {
      const avatar = document.createElement("div");
      avatar.classList.add("spark-msg-avatar");
      avatar.innerHTML = `<img src="../spark/spark-logo.png" alt="Spark" />`;
      wrapper.appendChild(avatar);
    }

    const bubble = document.createElement("div");
    bubble.classList.add("spark-bubble");
    bubble.innerHTML = formatMessage(text);
    wrapper.appendChild(bubble);

    messagesContainer.appendChild(wrapper);
    scrollToBottom();
  }

  /* ── Message appearing, Character by Character ── */
  async function typeMessage(text) {
    let mainText = text;
    let suggestionsHTML = "";

    const suggestionMarker = "You might also ask:";
    if (text.includes(suggestionMarker)) {
      const splitIndex = text.indexOf(suggestionMarker);
      mainText = text.substring(0, splitIndex).trimEnd();
      const suggestionRaw = text.substring(splitIndex + suggestionMarker.length);

      const suggestions = suggestionRaw
        .split("\n")
        .map(s => s.replace(/^[•\-\*]\s*/, "").trim())
        .filter(s => s && s.length > 2);

      const buttons = suggestions
        .map(q => `<button class="spark-suggestion" onclick="window.sparkAsk('${q.replace(/'/g, "")}')">${q}</button>`)
        .join("");

      suggestionsHTML = `<div class="spark-suggestions-container"><div class="spark-suggestions-title">You might also ask:</div><div class="spark-suggestions">${buttons}</div></div>`;
    }

    const wrapper = document.createElement("div");
    wrapper.classList.add("spark-msg", "spark-msg--spark");

    const avatar = document.createElement("div");
    avatar.classList.add("spark-msg-avatar");
    avatar.innerHTML = `<img src="../spark/spark-logo.png" alt="Spark" />`;

    const bubble = document.createElement("div");
    bubble.classList.add("spark-bubble");

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
    messagesContainer.appendChild(wrapper);
    scrollToBottom();

    let i = 0;
    while (i < mainText.length) {
      bubble.innerHTML = formatMainText(mainText.substring(0, i + 1));
      i++;
      await new Promise(r => setTimeout(r, 14));
      scrollToBottom();
    }

    if (suggestionsHTML) {
      bubble.innerHTML += suggestionsHTML;
      scrollToBottom();
    }
  }

  function showTyping() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("spark-msg", "spark-msg--spark", "spark-typing-wrapper");

    const avatar = document.createElement("div");
    avatar.classList.add("spark-msg-avatar");
    avatar.innerHTML = `<img src="../spark/spark-logo.png" alt="Spark" />`;

    const bubble = document.createElement("div");
    bubble.classList.add("spark-bubble");
    bubble.innerHTML = `
      <div class="spark-typing">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
    messagesContainer.appendChild(wrapper);
    scrollToBottom();

    return wrapper;
  }

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  /* ── Format only main text (used during character-by-character typing) ── */
  function formatMainText(text) {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let formatted = text.replace(codeBlockRegex, function(match, lang, code) {
      return `<pre class="spark-code"><code>${escapeHTML(code)}</code></pre>`;
    });
    return formatted.replace(/\n/g, "<br>");
  }

  /* ── Format full message including suggestions (used by appendMessage) ── */
  function formatMessage(text) {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let formatted = text.replace(codeBlockRegex, function(match, lang, code) {
      return `<pre class="spark-code"><code>${escapeHTML(code)}</code></pre>`;
    });

    const suggestionMarker = "You might also ask:";
    if (formatted.includes(suggestionMarker)) {
      const parts = formatted.split(suggestionMarker);
      const mainText = parts[0].trimEnd().replace(/\n/g, "<br>");
      const suggestions = parts[1]
        .split("\n")
        .map(s => s.replace(/^[•\-\*]\s*/, "").trim())
        .filter(s => s && s.length > 2);
      const buttons = suggestions
        .map(q => `<button class="spark-suggestion" onclick="window.sparkAsk('${q.replace(/'/g, "")}')">${q}</button>`)
        .join("");
      return `${mainText}<div class="spark-suggestions-container"><div class="spark-suggestions-title">You might also ask:</div><div class="spark-suggestions">${buttons}</div></div>`;
    }

    return formatted.replace(/\n/g, "<br>");
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* ── Send Handling ──────────────────────────────── */
  async function handleSend() {
    const text = input.value.trim();
    if (!text) return;

    appendMessage("user", text);
    input.value = "";

    const typing = showTyping();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5001/api/spark-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();
      typing.remove();
      typeMessage(data.reply);

    } catch (err) {
      typing.remove();
      typeMessage("Sorry, I couldn't reach the AI server.");
    }
  }

  async function loadUserXP() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5001/api/users/me", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const user = await response.json();
      const xpElement = document.getElementById("totalXp");
      if (xpElement && user.xp !== undefined) {
        xpElement.textContent = user.xp;
      }
    } catch (err) {
      console.error("Failed to load XP:", err);
    }
  }

  /* ── Boot ───────────────────────────────────────── */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.sparkAsk = function(question) {
    const input = document.getElementById("sparkInput");
    if (!input) return;
    input.value = question;
    const event = new KeyboardEvent("keydown", { key: "Enter" });
    input.dispatchEvent(event);
  };

})();