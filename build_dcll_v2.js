const fs = require('fs');
const path = require('path');

const destDir = path.join('frontend', 'topics', 'doubly-circular-linked-list');
if (!fs.existsSync(destDir)) { fs.mkdirSync(destDir, { recursive: true }); }

// -----------------------------------------------------------------------------
// 1. HTML GENERATION
// -----------------------------------------------------------------------------
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Doubly Circular Linked List | iDS Studio Next</title>
<link rel="stylesheet" href="../../dashboard/dashboard.css">
<link rel="stylesheet" href="doubly-circular-linked-list.css">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap" rel="stylesheet">
</head>

<body>

<!-- ═══════════ XP POPUP ═══════════ -->
<div class="xp-popup" id="xpPopup">
  <div class="xp-popup-icon">🎉</div>
  <div class="xp-popup-text">
    <span class="xp-popup-amount">+10 XP received</span>
    <span class="xp-popup-sub">Lesson marked complete!</span>
  </div>
</div>

<!-- ═══════════ SIDEBAR ═══════════ -->
<aside class="sidebar">
  <div class="logo">
    <div class="logo-icon">
      <img src="../../image/ilogo.png" alt="iDS Studio" class="logo-img">
    </div>
    <div class="logo-text">
      <span class="logo-title">iDS Studio</span>
      <span class="logo-sub">Next</span>
    </div>
  </div>

  <nav class="menu">
    <a href="../../dashboard/dashboard.html" class="menu-item">Dashboard</a>
    <a href="../../learn/learn.html" class="menu-item active">Learn</a>
    <a href="../../practice/practice.html" class="menu-item">Practice</a>
    <a href="../../leaderboard/leaderboard.html" class="menu-item">Leaderboard</a>
  </nav>

  <div class="spacer"></div>

  <div class="sidebar-footer">
    <div class="user-chip">
      <div class="user-avatar" id="userAvatar">U</div>
      <div class="user-info">
        <span class="user-name" id="sidebarUserName">User</span>
        <span class="user-role">Student</span>
      </div>
    </div>
    <div class="logout">
      <button onclick="logout()">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"/></svg>
        Logout
      </button>
    </div>
  </div>
</aside>

<!-- ═══════════ MAIN CONTENT ═══════════ -->
<main class="main dcll-main">

  <!-- Title Row -->
  <div class="lesson-title-row">
    <div class="lesson-title-left">
      <nav class="breadcrumb">
        <a href="../../learn/learn.html" class="breadcrumb-link">Learn</a>
        <span class="breadcrumb-sep">›</span>
        <span class="breadcrumb-link">Unit 2</span>
        <span class="breadcrumb-sep">›</span>
        <span class="breadcrumb-current">Doubly Circular Linked List</span>
      </nav>
      <h1 class="lesson-heading">
        Doubly Circular Linked List
        <span class="lesson-heading-tag">Circular – Infinite Traversal</span>
      </h1>
    </div>

    <button class="mark-complete-btn" id="markCompleteBtn">
      <svg class="btn-icon" width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
      <span class="btn-label">Mark Complete</span>
    </button>
  </div>

  <!-- Content Box -->
  <div class="lesson-content-box" id="lessonContentBox">

    <!-- ── SECTION 1: Introduction ── -->
    <section class="lesson-section">
      <div class="section-header">
        <span class="section-number">01</span>
        <h2 class="section-title">What is a Doubly Circular Linked List?</h2>
      </div>

      <div class="definition-box">
        <div class="definition-icon">🔄</div>
        <div class="definition-body">
          A <strong>Doubly Circular Linked List</strong> is a linked list where each node has a
          <span class="highlight-text">prev pointer</span>, <span class="highlight-text">data</span>, and a <span class="highlight-text">next pointer</span>.
          Crucially, the <span class="highlight-text">last node's next points to the head</span>, and the
          <span class="highlight-text">head's prev points to the last node</span>. There are no <code class="inline-code">NULL</code> pointers.
        </div>
      </div>

      <p class="lesson-para">
        This structure combines the bidirectional traversal of a doubly linked list with the continuous loop of a circular linked list.
        You can navigate forward or backward infinitely, making it highly effective for complex cyclic systems.
      </p>

      <!-- ASCII-style circular diagram -->
      <div class="circular-ascii-diagram">
        <div class="ascii-label">Circular Structure</div>
        <div class="ascii-body">
          <div class="ascii-row">
            <span class="ascii-node">1</span>
            <span class="ascii-arrow">⇄</span>
            <span class="ascii-node">2</span>
            <span class="ascii-arrow">⇄</span>
            <span class="ascii-node">3</span>
            <span class="ascii-arrow">⇄</span>
            <span class="ascii-node">4</span>
          </div>
          <div class="ascii-loop-row">
            <span class="ascii-up">↑</span>
            <span class="ascii-spacer"></span>
            <span class="ascii-back">← Next → &amp; ← Prev →</span>
            <span class="ascii-down">↓</span>
          </div>
        </div>
        <div class="ascii-caption">Last node connects to head in both directions!</div>
      </div>

      <div class="analogy-grid">
        <div class="analogy-card">
          <div class="analogy-emoji">🎡</div>
          <h4 class="analogy-title">Ferris Wheel</h4>
          <p class="analogy-desc">Cabins keep rotating in a circle. You can go forward or reverse, and you will endlessly loop through the same cabins.</p>
        </div>
        <div class="analogy-card">
          <div class="analogy-emoji">🎵</div>
          <h4 class="analogy-title">Repeat Playlist</h4>
          <p class="analogy-desc">Songs loop indefinitely. You can skip to the next song or go back to the previous one, and the playlist perfectly wraps around.</p>
        </div>
        <div class="analogy-card">
          <div class="analogy-emoji">⏱️</div>
          <h4 class="analogy-title">Advanced Scheduling</h4>
          <p class="analogy-desc">Operating systems use this to cycle through tasks where they might need to peek at the previous task efficiently.</p>
        </div>
      </div>
    </section>

    <!-- ── SECTION 2: Node Structure ── -->
    <section class="lesson-section">
      <div class="section-header">
        <span class="section-number">02</span>
        <h2 class="section-title">Node Structure</h2>
      </div>

      <p class="lesson-para">
        Every node in a doubly circular linked list contains three distinct fields. There are absolutely no NULL pointers anywhere in a populated list.
      </p>

      <div class="sll-node-anatomy">
        <div class="anatomy-label">Node Structure</div>
        <div class="anatomy-body">
          <div class="anatomy-cell anatomy-prev">
            <span class="anatomy-cell-label">prev</span>
            <span class="anatomy-cell-val">← tail</span>
          </div>
          <div class="anatomy-divider"></div>
          <div class="anatomy-cell anatomy-data">
            <span class="anatomy-cell-label">data</span>
            <span class="anatomy-cell-val">42</span>
          </div>
          <div class="anatomy-divider"></div>
          <div class="anatomy-cell anatomy-next">
            <span class="anatomy-cell-label">next</span>
            <span class="anatomy-cell-val">→ head</span>
          </div>
        </div>
        <div class="anatomy-caption">The node contains prev, data, and next fields.</div>
      </div>

      <div class="code-block-wrap">
        <div class="code-block-label">C — Node Definition</div>
        <pre class="code-block"><span class="kw">struct</span> node {
    <span class="kw">int</span> data;          <span class="comment">// stores the value</span>
    <span class="kw">struct</span> node* prev; <span class="comment">// points to previous node (head → tail)</span>
    <span class="kw">struct</span> node* next; <span class="comment">// points to next node (tail → head)</span>
};</pre>
      </div>

      <div class="node-fields-grid">
        <div class="node-field-card">
          <div class="nf-icon">⬅️</div>
          <div class="nf-body">
            <h4 class="nf-title">prev pointer</h4>
            <p class="nf-desc">Holds the address of the previous node. For the head node, this points back to the tail, closing the backward circle.</p>
          </div>
        </div>
        <div class="node-field-card">
          <div class="nf-icon">📦</div>
          <div class="nf-body">
            <h4 class="nf-title">data</h4>
            <p class="nf-desc">Stores the actual value — integer, character, or any payload.</p>
          </div>
        </div>
        <div class="node-field-card">
          <div class="nf-icon">➡️</div>
          <div class="nf-body">
            <h4 class="nf-title">next pointer</h4>
            <p class="nf-desc">Holds the address of the next node. For the tail node, this points back to the head, closing the forward circle.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── SECTION 3: Visual Structure ── -->
    <section class="lesson-section">
      <div class="section-header">
        <span class="section-number">03</span>
        <h2 class="section-title">Visual Structure</h2>
      </div>

      <p class="lesson-para">
        The diagram below demonstrates how the nodes are connected. Notice the two curved arrows: one looping from the last node's next back to the head, and another looping from the head's prev back to the last node.
      </p>

      <!-- SVG Circular Diagram -->
      <div class="dcll-diagram-wrap" style="position: relative; height: 280px; width: 100%; display: flex; justify-content: center; overflow: visible;">
        <svg class="dcll-svg" viewBox="-20 0 720 280" xmlns="http://www.w3.org/2000/svg" id="circularDiagram" style="width: 100%; height: 100%;">
          
          <defs>
            <marker id="arrowheadNext" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#4f8cff"/>
            </marker>
            <marker id="arrowheadPrev" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b"/>
            </marker>
          </defs>

          <!-- Node 1 -->
          <g class="svg-node" id="svgNode1">
            <rect x="30" y="110" width="160" height="60" rx="12" fill="#eef3ff" stroke="#4f8cff" stroke-width="2"/>
            <rect x="80" y="110" width="60" height="60" fill="#dce9ff" stroke="#4f8cff" stroke-width="2"/>
            
            <text x="55" y="136" text-anchor="middle" font-size="10" fill="#4a65c8" font-weight="700">prev</text>
            <text x="55" y="153" text-anchor="middle" font-size="11" fill="#f59e0b" font-weight="600">←</text>
            
            <text x="110" y="136" text-anchor="middle" font-size="10" fill="#4a65c8" font-weight="700">data</text>
            <text x="110" y="153" text-anchor="middle" font-size="16" fill="#1a3bcc" font-weight="700">10</text>
            
            <text x="165" y="136" text-anchor="middle" font-size="10" fill="#4a65c8" font-weight="700">next</text>
            <text x="165" y="153" text-anchor="middle" font-size="11" fill="#3b6cff" font-weight="600">→</text>
            
            <text x="110" y="100" text-anchor="middle" font-size="10" fill="#2e7d32" font-weight="700">HEAD</text>
            <line x1="110" y1="103" x2="110" y2="110" stroke="#2e7d32" stroke-width="1.5" stroke-dasharray="3,2"/>
          </g>

          <!-- Arrows 1 <-> 2 -->
          <line x1="190" y1="130" x2="250" y2="130" stroke="#4f8cff" stroke-width="2" marker-end="url(#arrowheadNext)"/>
          <line x1="250" y1="150" x2="190" y2="150" stroke="#f59e0b" stroke-width="2" marker-end="url(#arrowheadPrev)"/>

          <!-- Node 2 -->
          <g class="svg-node" id="svgNode2">
            <rect x="250" y="110" width="160" height="60" rx="12" fill="#eef3ff" stroke="#4f8cff" stroke-width="2"/>
            <rect x="300" y="110" width="60" height="60" fill="#dce9ff" stroke="#4f8cff" stroke-width="2"/>
            <text x="275" y="136" text-anchor="middle" font-size="10" fill="#4a65c8" font-weight="700">prev</text>
            <text x="275" y="153" text-anchor="middle" font-size="11" fill="#f59e0b" font-weight="600">←</text>
            <text x="330" y="136" text-anchor="middle" font-size="10" fill="#4a65c8" font-weight="700">data</text>
            <text x="330" y="153" text-anchor="middle" font-size="16" fill="#1a3bcc" font-weight="700">20</text>
            <text x="385" y="136" text-anchor="middle" font-size="10" fill="#4a65c8" font-weight="700">next</text>
            <text x="385" y="153" text-anchor="middle" font-size="11" fill="#3b6cff" font-weight="600">→</text>
          </g>

          <!-- Arrows 2 <-> 3 -->
          <line x1="410" y1="130" x2="470" y2="130" stroke="#4f8cff" stroke-width="2" marker-end="url(#arrowheadNext)"/>
          <line x1="470" y1="150" x2="410" y2="150" stroke="#f59e0b" stroke-width="2" marker-end="url(#arrowheadPrev)"/>

          <!-- Node 3 -->
          <g class="svg-node" id="svgNode3">
            <rect x="470" y="110" width="160" height="60" rx="12" fill="#eef3ff" stroke="#4f8cff" stroke-width="2"/>
            <rect x="520" y="110" width="60" height="60" fill="#dce9ff" stroke="#4f8cff" stroke-width="2"/>
            <text x="495" y="136" text-anchor="middle" font-size="10" fill="#4a65c8" font-weight="700">prev</text>
            <text x="495" y="153" text-anchor="middle" font-size="11" fill="#f59e0b" font-weight="600">←</text>
            <text x="550" y="136" text-anchor="middle" font-size="10" fill="#4a65c8" font-weight="700">data</text>
            <text x="550" y="153" text-anchor="middle" font-size="16" fill="#1a3bcc" font-weight="700">30</text>
            <text x="605" y="136" text-anchor="middle" font-size="10" fill="#4a65c8" font-weight="700">next</text>
            <text x="605" y="153" text-anchor="middle" font-size="11" fill="#3b6cff" font-weight="600">→</text>
            
            <text x="550" y="100" text-anchor="middle" font-size="10" fill="#d97706" font-weight="700">TAIL</text>
            <line x1="550" y1="103" x2="550" y2="110" stroke="#d97706" stroke-width="1.5" stroke-dasharray="3,2"/>
          </g>

          <!-- Circular Bottom Arc (Next: Tail -> Head) -->
          <path d="M 605 170 C 605 260, 165 260, 165 175" fill="none" stroke="#4f8cff" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#arrowheadNext)"/>
          
          <!-- Circular Top Arc (Prev: Head -> Tail) -->
          <path d="M 55 110 C 55 20, 495 20, 495 105" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#arrowheadPrev)"/>
        </svg>

      </div>
    </section>

    <!-- ── SECTION 4: Key Characteristics ── -->
    <section class="lesson-section">
      <div class="section-header">
        <span class="section-number">04</span>
        <h2 class="section-title">Key Characteristics</h2>
      </div>

      <p class="lesson-para">
        Doubly circular linked lists have unique properties that set them apart from standard data structures. Understanding these characteristics helps you know when to use them.
      </p>

      <div class="characteristics-grid">
        <div class="char-card char-blue">
          <div class="char-icon">∞</div>
          <h4 class="char-title">No NULL Pointers</h4>
          <p class="char-desc">No node points to NULL. The last node points to the head, and the head points back to the last node.</p>
        </div>
        <div class="char-card char-green">
          <div class="char-icon">🔁</div>
          <h4 class="char-title">Bidirectional Loop</h4>
          <p class="char-desc">You can seamlessly iterate forward through the next pointers, or backward through the prev pointers.</p>
        </div>
        <div class="char-card char-orange">
          <div class="char-icon">⚠️</div>
          <h4 class="char-title">Infinite Traversal Risk</h4>
          <p class="char-desc">A naive loop will run forever in either direction. A do-while loop checking for the head node is required.</p>
        </div>
        <div class="char-card char-purple">
          <div class="char-icon">🎯</div>
          <h4 class="char-title">O(1) Tail Access</h4>
          <p class="char-desc">The head's prev pointer directly accesses the tail, making insertions at the end exceptionally fast.</p>
        </div>
      </div>
    </section>

    <!-- ── SECTION 5: Traversal ── -->
    <section class="lesson-section">
      <div class="section-header">
        <span class="section-number">05</span>
        <h2 class="section-title">Traversal</h2>
      </div>

      <p class="lesson-para">
        You can traverse a doubly circular linked list in both directions. The standard while-loop approach checking for NULL will cause an infinite loop. Use a do-while loop instead.
      </p>

      <div class="traversal-compare">
        <div class="trav-wrong">
          <div class="trav-badge trav-bad">Forward Traversal</div>
          <pre class="code-block code-good"><span class="comment">// Traverses 10 → 20 → 30</span>
<span class="kw">struct</span> node* temp = head;
<span class="kw">do</span> {
    printf(<span class="str">"%d "</span>, temp-&gt;data);
    temp = temp-&gt;next;
} <span class="kw">while</span>(temp != head);</pre>
        </div>
        <div class="trav-correct">
          <div class="trav-badge trav-good">Backward Traversal</div>
          <pre class="code-block code-good"><span class="comment">// Starts at tail, traverses 30 → 20 → 10</span>
<span class="kw">struct</span> node* temp = head-&gt;prev;
<span class="kw">do</span> {
    printf(<span class="str">"%d "</span>, temp-&gt;data);
    temp = temp-&gt;prev;
} <span class="kw">while</span>(temp != head-&gt;prev);</pre>
        </div>
      </div>

    </section>

    <!-- ── SECTION 6: Insertion Operations ── -->
    <section class="lesson-section">
      <div class="section-header">
        <span class="section-number">06</span>
        <h2 class="section-title">Insertion Operations</h2>
      </div>

      <p class="lesson-para">
        Inserting requires updating BOTH prev and next pointers, while keeping the circular connection alive. You must maintain the link between head and tail.
      </p>

      <div class="ops-accordion">

        <!-- Insert at Beginning -->
        <div class="op-accordion-item" id="ins-begin">
          <div class="op-accordion-header" onclick="toggleAccordion('ins-begin')">
            <span class="op-acc-badge op-ins-beg">Insert at Beginning</span>
            <span class="op-acc-arrow">▾</span>
          </div>
          <div class="op-accordion-body">
            <ol class="op-steps">
              <li>Create new node.</li>
              <li>If list is empty, point both prev and next to itself. head = newnode.</li>
              <li>If not empty, identify tail (tail = head-&gt;prev).</li>
              <li>Set newnode-&gt;next = head; newnode-&gt;prev = tail;</li>
              <li>Set head-&gt;prev = newnode; tail-&gt;next = newnode;</li>
              <li>Set head = newnode.</li>
            </ol>
            <pre class="code-block"><span class="kw">void</span> insertBeginning(<span class="kw">struct</span> node** head, <span class="kw">int</span> data) {
    <span class="kw">struct</span> node* newnode = createNode(data);
    <span class="kw">if</span> (*head == NULL) {
        newnode-&gt;next = newnode;
        newnode-&gt;prev = newnode;
        *head = newnode;
        <span class="kw">return</span>;
    }
    <span class="kw">struct</span> node* tail = (*head)-&gt;prev;
    
    newnode-&gt;next = *head;
    newnode-&gt;prev = tail;
    
    (*head)-&gt;prev = newnode;
    tail-&gt;next = newnode;
    
    *head = newnode;
}</pre>
          </div>
        </div>

        <!-- Insert at End -->
        <div class="op-accordion-item" id="ins-end">
          <div class="op-accordion-header" onclick="toggleAccordion('ins-end')">
            <span class="op-acc-badge op-ins-end">Insert at End</span>
            <span class="op-acc-arrow">▾</span>
          </div>
          <div class="op-accordion-body">
            <ol class="op-steps">
              <li>Create new node.</li>
              <li>If empty, point both prev and next to itself. head = newnode.</li>
              <li>If not empty, identify tail (tail = head-&gt;prev).</li>
              <li>Set newnode-&gt;next = head; newnode-&gt;prev = tail;</li>
              <li>Set tail-&gt;next = newnode; head-&gt;prev = newnode;</li>
            </ol>
            <pre class="code-block"><span class="kw">void</span> insertEnd(<span class="kw">struct</span> node** head, <span class="kw">int</span> data) {
    <span class="kw">struct</span> node* newnode = createNode(data);
    <span class="kw">if</span> (*head == NULL) {
        newnode-&gt;next = newnode;
        newnode-&gt;prev = newnode;
        *head = newnode;
        <span class="kw">return</span>;
    }
    <span class="kw">struct</span> node* tail = (*head)-&gt;prev;
    
    newnode-&gt;next = *head;
    newnode-&gt;prev = tail;
    
    tail-&gt;next = newnode;
    (*head)-&gt;prev = newnode;
}</pre>
          </div>
        </div>

      </div>
    </section>

    <!-- ── SECTION 7: Deletion Operations ── -->
    <section class="lesson-section">
      <div class="section-header">
        <span class="section-number">07</span>
        <h2 class="section-title">Deletion Operations</h2>
      </div>

      <p class="lesson-para">
        Deleting requires updating the prev and next pointers of the adjacent nodes. Always ensure the circular connection between the new head and tail remains intact.
      </p>

      <div class="ops-accordion">

        <!-- Delete at Beginning -->
        <div class="op-accordion-item" id="del-begin">
          <div class="op-accordion-header" onclick="toggleAccordion('del-begin')">
            <span class="op-acc-badge op-delete">Delete at Beginning</span>
            <span class="op-acc-arrow">▾</span>
          </div>
          <div class="op-accordion-body">
            <ol class="op-steps">
              <li>If empty, return.</li>
              <li>If only one node, free it and set head = NULL.</li>
              <li>Get tail (tail = head-&gt;prev) and new head (head-&gt;next).</li>
              <li>Set new head's prev = tail.</li>
              <li>Set tail's next = new head.</li>
              <li>Free old head, set head = new head.</li>
            </ol>
            <pre class="code-block"><span class="kw">void</span> deleteBeginning(<span class="kw">struct</span> node** head) {
    <span class="kw">if</span>(*head == NULL) <span class="kw">return</span>;
    <span class="kw">if</span>((*head)-&gt;next == *head) {
        free(*head); *head = NULL; <span class="kw">return</span>;
    }
    <span class="kw">struct</span> node* temp = *head;
    <span class="kw">struct</span> node* tail = (*head)-&gt;prev;
    
    *head = (*head)-&gt;next;
    (*head)-&gt;prev = tail;
    tail-&gt;next = *head;
    
    free(temp);
}</pre>
          </div>
        </div>

        <!-- Delete at End -->
        <div class="op-accordion-item" id="del-end">
          <div class="op-accordion-header" onclick="toggleAccordion('del-end')">
            <span class="op-acc-badge op-delete">Delete at End</span>
            <span class="op-acc-arrow">▾</span>
          </div>
          <div class="op-accordion-body">
            <ol class="op-steps">
              <li>If empty, return.</li>
              <li>If only one node, free it and set head = NULL.</li>
              <li>Get tail (tail = head-&gt;prev).</li>
              <li>Set the second-to-last node's next = head (tail-&gt;prev-&gt;next = head).</li>
              <li>Set head's prev = second-to-last node.</li>
              <li>Free tail.</li>
            </ol>
            <pre class="code-block"><span class="kw">void</span> deleteEnd(<span class="kw">struct</span> node** head) {
    <span class="kw">if</span>(*head == NULL) <span class="kw">return</span>;
    <span class="kw">if</span>((*head)-&gt;next == *head) {
        free(*head); *head = NULL; <span class="kw">return</span>;
    }
    <span class="kw">struct</span> node* tail = (*head)-&gt;prev;
    <span class="kw">struct</span> node* prevNode = tail-&gt;prev;
    
    prevNode-&gt;next = *head;
    (*head)-&gt;prev = prevNode;
    
    free(tail);
}</pre>
          </div>
        </div>

      </div>
    </section>

    <!-- ── SECTION 8: Implementation in C ── -->
    <section class="lesson-section">
      <div class="section-header">
        <span class="section-number">08</span>
        <h2 class="section-title">Implementation in C</h2>
      </div>

      <div class="code-block-wrap" style="margin-bottom: 24px;">
        <div class="code-block-label">C — Complete Implementation</div>
        <pre class="code-block"><span class="kw">#include</span> &lt;stdio.h&gt;
<span class="kw">#include</span> &lt;stdlib.h&gt;

<span class="kw">struct</span> node {
    <span class="kw">int</span> data;
    <span class="kw">struct</span> node* prev;
    <span class="kw">struct</span> node* next;
};

<span class="kw">struct</span> node* head = NULL;

<span class="kw">void</span> insert(<span class="kw">int</span> data) {
    <span class="kw">struct</span> node* newnode = (<span class="kw">struct</span> node*)malloc(<span class="kw">sizeof</span>(<span class="kw">struct</span> node));
    newnode-&gt;data = data;

    <span class="kw">if</span> (head == NULL) {
        newnode-&gt;next = newnode;
        newnode-&gt;prev = newnode;
        head = newnode;
        <span class="kw">return</span>;
    }

    <span class="kw">struct</span> node* tail = head-&gt;prev;
    newnode-&gt;next = head;
    newnode-&gt;prev = tail;
    tail-&gt;next = newnode;
    head-&gt;prev = newnode;
}</pre>
      </div>

    </section>

    <!-- ── SECTION 9: Advantages & Disadvantages ── -->
    <section class="lesson-section">
      <div class="section-header">
        <span class="section-number">09</span>
        <h2 class="section-title">Advantages & Disadvantages</h2>
      </div>

      <div class="analogy-grid">
        <div class="analogy-card analogy-pro">
          <div class="analogy-emoji">⚡</div>
          <h4 class="analogy-title">O(1) Tail Operations</h4>
          <p class="char-desc">Since head-&gt;prev points to the tail, you can insert or delete at the end instantly.</p>
        </div>
        <div class="analogy-card analogy-pro">
          <div class="analogy-emoji">🔁</div>
          <h4 class="analogy-title">Bidirectional Traversal</h4>
          <p class="char-desc">You can effortlessly navigate backward or forward through the circular chain.</p>
        </div>
        <div class="analogy-card analogy-con">
          <div class="analogy-emoji">🧩</div>
          <h4 class="analogy-title">High Complexity</h4>
          <p class="char-desc">Maintaining both prev and next pointers in a circular loop requires meticulous memory management.</p>
        </div>
      </div>
    </section>

    <!-- ── SECTION 10: Real-World Applications ── -->
    <section class="lesson-section">
      <div class="section-header">
        <span class="section-number">10</span>
        <h2 class="section-title">Real-World Applications</h2>
      </div>

      <div class="apps-grid">
        <div class="app-card">
          <div class="app-icon-wrap app-blue">
            <span class="app-icon">🖥️</span>
          </div>
          <div class="app-body">
            <h4 class="app-title">Advanced Thread Scheduling</h4>
            <p class="app-desc">Used in complex OS schedulers where tasks need bidirectional iteration and cyclic execution.</p>
          </div>
        </div>
        <div class="app-card">
          <div class="app-icon-wrap app-green">
            <span class="app-icon">🎶</span>
          </div>
          <div class="app-body">
            <h4 class="app-title">Advanced Media Players</h4>
            <p class="app-desc">Allows endless looping of tracks with the ability to go forward and backward without breaking the cycle.</p>
          </div>
        </div>
      </div>
    </section>

        <!-- ── SECTION 11: Interactive Simulator ── -->
    <section class="lesson-section simulator-section">
      <div class="section-header">
        <span class="section-number">11</span>
        <h2 class="section-title">Interactive Doubly Circular Linked List Simulator</h2>
      </div>
      <p class="lesson-para">Build a doubly circular linked list live. Insert nodes at the beginning, end, or a specific position. Watch BOTH the next and prev pointer chains animate in real time.</p>

      <div class="simulator-card" id="simulatorCard">

        <!-- Controls -->
        <div class="sim-controls">
          <!-- Input row -->
          <div class="sim-inputs-row">
            <div class="sim-input-group">
              <label class="sim-label">Enter Value</label>
              <input type="number" id="simInput" class="sim-input" placeholder="e.g. 42" min="-999" max="999"
                onkeydown="if(event.key==='Enter') dcllInsertEnd()">
            </div>
            <div class="sim-input-group">
              <label class="sim-label">Enter Position <span class="sim-label-hint">(0-based)</span></label>
              <input type="number" id="simPosInput" class="sim-input sim-pos-input" placeholder="e.g. 1" min="0"
                disabled onkeydown="if(event.key==='Enter') dcllInsertAtPosition()">
            </div>
          </div>

          <!-- Button groups -->
          <div class="sim-btn-groups-wrap">
            <!-- INSERT GROUP -->
            <div class="sim-btn-group-labeled">
              <span class="sim-group-label">Insert</span>
              <div class="sim-btn-group">
                <button class="sim-btn sim-push" onclick="dcllInsertBeginning()">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                  </svg>
                  At Begin
                </button>
                <button class="sim-btn sim-ins-end" onclick="dcllInsertEnd()">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                  </svg>
                  At End
                </button>
              </div>
            </div>

            <!-- DELETE GROUP -->
            <div class="sim-btn-group-labeled">
              <span class="sim-group-label">Delete</span>
              <div class="sim-btn-group">
                <button class="sim-btn sim-del-begin" onclick="dcllDeleteBeginning()">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                  At Begin
                </button>
                <button class="sim-btn sim-del-end" onclick="dcllDeleteEnd()">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                  At End
                </button>
              </div>
            </div>

            <!-- UTILITY GROUP -->
            <div class="sim-btn-group-labeled">
              <span class="sim-group-label">Utility</span>
              <div class="sim-btn-group">
                <button class="sim-btn sim-display" onclick="dcllTraverse()">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                  </svg>
                  Traverse
                </button>
                <button class="sim-btn sim-clear" onclick="dcllReset()">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
                  </svg>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Status message -->
        <div class="sim-status" id="simStatus">
          <span id="simStatusText">Ready — insert a value to begin</span>
        </div>

        <!-- Linked List Visualizer -->
        <div class="sll-visualizer">

          
          <!-- SVG for Circular Arcs -->
          <svg id="dcllArcSvg" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 10; overflow: visible;">
             <path id="dcllArcPathNext" fill="none" stroke="#4f8cff" stroke-width="2.5" stroke-dasharray="4,4" marker-end="url(#arrowheadNext)"/>
             <path id="dcllArcPathPrev" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="4,4" marker-end="url(#arrowheadPrev)"/>
             <defs>
               <marker id="arrowheadNext" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                 <polygon points="0 0, 10 3.5, 0 7" fill="#4f8cff"/>
               </marker>
               <marker id="arrowheadPrev" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                 <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b"/>
               </marker>
             </defs>
          </svg>
<!-- Pointer labels row (HEAD / TAIL) -->
          <div class="sll-ptr-indicators" id="dllPtrIndicators">
            <!-- dynamically populated -->
          </div>

          <!-- Node chain area -->
          <div class="sll-sim-container" id="dllSimContainer">
            <div class="sim-empty-state" id="simEmptyState">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="#eef3ff"/>
                <path d="M6 12h8v8H6zM18 12h8v8h-8z" fill="#3b6cff" opacity="0.35"/>
                <path d="M14 16h4" stroke="#3b6cff" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <p>List is empty</p>
            </div>
          </div>

          <!-- Stats -->
          <div class="sim-stats">
            <div class="sim-stat">
              <span class="sim-stat-value" id="statSize">0</span>
              <span class="sim-stat-label">Size</span>
            </div>
            <div class="sim-stat">
              <span class="sim-stat-value" id="statHead">—</span>
              <span class="sim-stat-label">Head</span>
            </div>
            <div class="sim-stat">
              <span class="sim-stat-value" id="statTail">—</span>
              <span class="sim-stat-label">Tail</span>
            </div>
            <div class="sim-stat">
              <span class="sim-stat-value" id="statOps">0</span>
              <span class="sim-stat-label">Ops</span>
            </div>
          </div>
        </div>

      </div><!-- /simulator-card -->
    </section>

    
    <!-- Sparkle decoration -->
    <div class="sparkle-deco" aria-hidden="true">
      <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27 0C27 14.9117 39.0883 27 54 27C39.0883 27 27 39.0883 27 54C27 39.0883 14.9117 27 0 27C14.9117 27 27 14.9117 27 0Z" fill="url(#paint0_linear)"/>
        <defs>
          <linearGradient id="paint0_linear" x1="27" y1="0" x2="27" y2="54" gradientUnits="userSpaceOnUse">
            <stop stop-color="#4F8CFF" stop-opacity="0.15"/>
            <stop offset="1" stop-color="#3B6CFF" stop-opacity="0"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
    
  </div><!-- /content box -->
</main>

<script src="doubly-circular-linked-list.js"></script>
</body>
</html>
`;
fs.writeFileSync(path.join(destDir, 'doubly-circular-linked-list.html'), htmlContent);

// -----------------------------------------------------------------------------
// 2. CSS GENERATION
// -----------------------------------------------------------------------------
let css = fs.readFileSync(path.join('frontend', 'topics', 'singly-circular-linked-list', 'singly-circular-linked-list.css'), 'utf8');
css = css.replace(/scll/g, 'dcll');

css += \`
/* ─── DCLL Simulator Node Layout (Horizontal [prev | data | next]) ─── */
.dcll-node-horizontal {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  background: white;
  border: 2px solid #c2d6ff;
  border-radius: 8px;
  min-width: 150px;
  box-shadow: 0 4px 12px rgba(59, 108, 255, 0.08);
  position: relative;
  transition: all 0.3s ease;
}
.dcll-node-horizontal .dll-ptr-cell {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
  background: #f8faff;
}
.dcll-node-horizontal .dll-prev-cell {
  border-right: 1px solid #c2d6ff;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}
.dcll-node-horizontal .dll-next-cell {
  border-left: 1px solid #c2d6ff;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}
.dcll-node-horizontal .sll-node-val {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
  color: #1a3bcc;
  padding: 8px 12px;
  border: none !important;
}
.dll-sim-arrows {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 0 8px;
}
.dll-fwd-sim-arrow { color: #4f8cff; font-weight: bold; }
.dll-bwd-sim-arrow { color: #f59e0b; font-weight: bold; }
\`;
fs.writeFileSync(path.join(destDir, 'doubly-circular-linked-list.css'), css);

// -----------------------------------------------------------------------------
// 3. JS GENERATION
// -----------------------------------------------------------------------------
let jsContent = \`/* ─── doubly-circular-linked-list.js ────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("markCompleteBtn");
  if (btn) btn.addEventListener("click", markComplete);

  const token = localStorage.getItem("token");
  if (!token) { window.location.href = "../../login.html"; return; }

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
      headers: { "Authorization": \`Bearer \${token}\` }
    });
    const user = await response.json();
    if (user.completedTopics && user.completedTopics.includes("doubly_circular_linked_list_unit2")) {
      setCompletedState();
    }
  } catch (err) {}
}

async function markComplete() {
  const btn = document.getElementById("markCompleteBtn");
  if (!btn || btn.disabled) return;
  const token = localStorage.getItem("token");
  try {
    const response = await fetch("https://idsnext-backend.onrender.com/api/users/complete-topic", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": \`Bearer \${token}\` },
      body: JSON.stringify({ topicId: "doubly_circular_linked_list_unit2" })
    });
    if (response.ok) { setCompletedState(); showXpPopup(); }
  } catch (err) {}
}

function setCompletedState() {
  const btn = document.getElementById("markCompleteBtn");
  if (!btn) return;
  btn.classList.add("completed");
  btn.disabled = true;
  btn.querySelector(".btn-label").textContent = "Completed ✓";
}

function showXpPopup() {
  const popup = document.getElementById("xpPopup");
  if (!popup) return;
  popup.classList.remove("hide");
  popup.classList.add("show");
  setTimeout(() => { popup.classList.remove("show"); popup.classList.add("hide"); }, 2600);
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "../../login.html";
}

function toggleAccordion(id) {
  const item = document.getElementById(id);
  if (item) item.classList.toggle("open");
}

/* ══════════════════════════════════════════════════════════════
   DOUBLY CIRCULAR LINKED LIST SIMULATOR
══════════════════════════════════════════════════════════════ */

const MAX_LIST_SIZE = 8;
const VALUE_MIN     = -999;
const VALUE_MAX     = 999;

let nodes   = {};   
let head    = null; 
let tail    = null; 
let size    = 0;
let opCount = 0;
let animating = false;
let nodeIdSeq = 0;

function newId() { return "n" + (++nodeIdSeq); }

function setStatus(msg, type = "") {
  const bar = document.getElementById("simStatus");
  const txt = document.getElementById("simStatusText");
  if (!bar || !txt) return;
  bar.className = "sim-status";
  if (type) bar.classList.add(\`status-\${type}\`);
  txt.textContent = msg;
}

function updateStats() {
  const sizeEl = document.getElementById("statSize");
  const headEl = document.getElementById("statHead");
  const tailEl = document.getElementById("statTail");
  const opsEl  = document.getElementById("statOps");
  if (sizeEl) sizeEl.textContent = size;
  if (headEl) headEl.textContent = head !== null ? nodes[head].value : "—";
  if (tailEl) tailEl.textContent = tail !== null ? nodes[tail].value : "—";
  if (opsEl)  opsEl.textContent  = opCount;
}

function updateEmptyState() {
  const empty = document.getElementById("simEmptyState");
  if (!empty) return;
  empty.style.display = size === 0 ? "flex" : "none";
}

function getInputValue() {
  const input = document.getElementById("simInput");
  if (!input) return null;
  const raw = input.value.trim();
  if (raw === "" || isNaN(Number(raw))) { setStatus("⚠ Enter a valid number.", "error"); return null; }
  return parseInt(raw, 10);
}

function renderList(newNodeId = null, deleteNodeId = null) {
  const container = document.getElementById("dllSimContainer");
  if (!container) return;

  Array.from(container.children).forEach(child => {
    if (!child.classList.contains("sim-empty-state")) child.remove();
  });

  updateEmptyState();
  if (size === 0) {
    updatePointerLabels([]);
    updatedcllArc();
    return;
  }

  const orderedIds = [];
  let cur = head;
  if (cur !== null) {
    do { orderedIds.push(cur); cur = nodes[cur].next; } while (cur !== head);
  }

  const domNodes = {};

  orderedIds.forEach((id, idx) => {
    const node = nodes[id];
    const isFirst = (id === head);
    const isLast  = (id === tail);

    const el = document.createElement("div");
    el.className = "dcll-node-horizontal sll-node-el"; 
    el.dataset.id = id;

    if (id === newNodeId) { el.classList.add("node-new"); setTimeout(() => el.classList.remove("node-new"), 500); }
    if (id === deleteNodeId) { el.classList.add("node-del"); }

    const prevDisplay = isFirst
      ? \`<span style="color: #d97706; font-weight: bold; font-size:11px;">← TAIL</span>\`
      : \`<span style="color: #666; font-size:11px;">← \${nodes[node.prev] ? nodes[node.prev].value : ""}</span>\`;

    const nextDisplay = isLast
      ? \`<span style="color: #2e7d32; font-weight: bold; font-size:11px;">HEAD →</span>\`
      : \`<span style="color: #666; font-size:11px;">\${nodes[node.next] ? nodes[node.next].value : ""} →</span>\`;

    el.innerHTML = \`
      <div class="dll-ptr-cell dll-prev-cell">
        <span style="font-size:10px; color:#a0aec0; margin-bottom:2px;">prev</span>
        \${prevDisplay}
      </div>
      <div class="sll-node-val">\${node.value}</div>
      <div class="dll-ptr-cell dll-next-cell">
        <span style="font-size:10px; color:#a0aec0; margin-bottom:2px;">next</span>
        \${nextDisplay}
      </div>
    \`;

    container.appendChild(el);
    domNodes[id] = el;

    if (!isLast) {
      const arrows = document.createElement("div");
      arrows.className = "dll-sim-arrows";
      arrows.innerHTML = \`<span class="dll-fwd-sim-arrow">→</span><span class="dll-bwd-sim-arrow">←</span>\`;
      container.appendChild(arrows);
    }
  });

  requestAnimationFrame(() => {
    updatePointerLabels(orderedIds, domNodes);
    updatedcllArc();
  });
}

function updatePointerLabels(orderedIds, domNodes) {
  const ptrContainer = document.getElementById("dllPtrIndicators");
  if (!ptrContainer) return;
  ptrContainer.innerHTML = "";
  if (!orderedIds || orderedIds.length === 0) return;

  const headId = orderedIds[0];
  const tailId = orderedIds[orderedIds.length - 1];
  const ptrRect = ptrContainer.getBoundingClientRect();

  function makeTag(label, cls) {
    const tag = document.createElement("div");
    tag.className = \`sll-ptr-tag \${cls}\`;
    tag.innerHTML = \`<span class="sll-ptr-tag-label">\${label}</span><span class="sll-ptr-tag-arrow">↓</span>\`;
    return tag;
  }

  const headEl = domNodes[headId];
  if (headEl) {
    const headRect = headEl.getBoundingClientRect();
    const headTag  = makeTag("HEAD", "ptr-head");
    const leftOffset = headRect.left - ptrRect.left + (headRect.width / 2);
    headTag.style.position = "absolute";
    headTag.style.left = (leftOffset - 20) + "px";
    headTag.style.bottom = "0";
    ptrContainer.appendChild(headTag);
  }

  const tailEl = domNodes[tailId];
  if (tailEl) {
    const tailRect = tailEl.getBoundingClientRect();
    const tailTag  = makeTag("TAIL", "ptr-tail");
    const leftOffset = tailRect.left - ptrRect.left + (tailRect.width / 2);
    tailTag.style.position = "absolute";
    tailTag.style.left = (headId === tailId ? leftOffset + 30 : leftOffset - 20) + "px";
    tailTag.style.bottom = "0";
    ptrContainer.appendChild(tailTag);
  }
}

function updatedcllArc() {
  const pathNext = document.getElementById("dcllArcPathNext");
  const pathPrev = document.getElementById("dcllArcPathPrev");
  if (!pathNext || !pathPrev) return;
  if (size <= 1) {
    pathNext.setAttribute("d", "");
    pathPrev.setAttribute("d", "");
    return;
  }
  
  setTimeout(() => {
    const headEl = document.querySelector(\`[data-id="\${head}"]\`);
    const tailEl = document.querySelector(\`[data-id="\${tail}"]\`);
    if (!headEl || !tailEl) return;
    
    const svg = document.getElementById("dcllArcSvg");
    const svgRect = svg.getBoundingClientRect();
    const headRect = headEl.getBoundingClientRect();
    const tailRect = tailEl.getBoundingClientRect();
    
    // NEXT ARC (below nodes: Tail -> Head)
    const startXNext = tailRect.left + (tailRect.width * 0.8) - svgRect.left;
    const startYNext = tailRect.bottom - svgRect.top;
    const endXNext = headRect.left + (headRect.width * 0.8) - svgRect.left;
    const endYNext = headRect.bottom - svgRect.top;
    
    const curveDepthNext = 40 + (size * 5);
    const dNext = \`M \${startXNext} \${startYNext} C \${startXNext} \${startYNext + curveDepthNext}, \${endXNext} \${endYNext + curveDepthNext}, \${endXNext} \${endYNext + 10}\`;
    pathNext.setAttribute("d", dNext);

    // PREV ARC (above nodes: Head -> Tail)
    const startXPrev = headRect.left + (headRect.width * 0.2) - svgRect.left;
    const startYPrev = headRect.top - svgRect.top;
    const endXPrev = tailRect.left + (tailRect.width * 0.2) - svgRect.left;
    const endYPrev = tailRect.top - svgRect.top;
    
    const curveDepthPrev = 40 + (size * 5);
    const dPrev = \`M \${startXPrev} \${startYPrev} C \${startXPrev} \${startYPrev - curveDepthPrev}, \${endXPrev} \${endYPrev - curveDepthPrev}, \${endXPrev} \${endYPrev - 10}\`;
    pathPrev.setAttribute("d", dPrev);
  }, 50);
}

window.addEventListener('resize', updatedcllArc);

function dcllInsertBeginning() {
  if (animating) return;
  const val = getInputValue();
  if (val === null) return;
  if (size >= MAX_LIST_SIZE) { setStatus("⚠ List is full!", "error"); return; }

  animating = true;
  const id = newId();
  
  if (size === 0) {
    nodes[id] = { id, value: val, prev: id, next: id };
    head = id;
    tail = id;
  } else {
    nodes[id] = { id, value: val, prev: tail, next: head };
    nodes[head].prev = id;
    nodes[tail].next = id;
    head = id;
  }
  
  size++; opCount++;
  document.getElementById("simInput").value = "";
  
  renderList(id);
  updateStats();
  setStatus(\`✓ Inserted \${val} at beginning.\`, "success");
  setTimeout(() => { animating = false; }, 500);
}

function dcllInsertEnd() {
  if (animating) return;
  const val = getInputValue();
  if (val === null) return;
  if (size >= MAX_LIST_SIZE) { setStatus("⚠ List is full!", "error"); return; }

  animating = true;
  const id = newId();

  if (size === 0) {
    nodes[id] = { id, value: val, prev: id, next: id };
    head = id;
    tail = id;
  } else {
    nodes[id] = { id, value: val, prev: tail, next: head };
    nodes[tail].next = id;
    nodes[head].prev = id;
    tail = id;
  }
  
  size++; opCount++;
  document.getElementById("simInput").value = "";
  
  renderList(id);
  updateStats();
  setStatus(\`✓ Inserted \${val} at end.\`, "success");
  setTimeout(() => { animating = false; }, 500);
}

function dcllDeleteBeginning() {
  if (animating) return;
  if (size === 0) { setStatus("⚠ List is empty.", "error"); return; }
  animating = true;
  
  const targetId = head;
  const headEl = document.querySelector(\`[data-id="\${targetId}"]\`);
  if (headEl) headEl.classList.add("node-highlight");
  
  setTimeout(() => {
    if (headEl) { headEl.classList.remove("node-highlight"); headEl.classList.add("node-del"); }
    setTimeout(() => {
      const deletedVal = nodes[targetId].value;
      if (size === 1) {
        head = null; tail = null;
      } else {
        head = nodes[targetId].next;
        nodes[head].prev = tail;
        nodes[tail].next = head;
      }
      delete nodes[targetId];
      size--; opCount++;
      renderList(); updateStats();
      setStatus(\`✓ Deleted head node (\${deletedVal}).\`, "success");
      animating = false;
    }, 420);
  }, 320);
}

function dcllDeleteEnd() {
  if (animating) return;
  if (size === 0) { setStatus("⚠ List is empty.", "error"); return; }
  animating = true;

  const targetId = tail;
  const tailEl = document.querySelector(\`[data-id="\${targetId}"]\`);
  if (tailEl) tailEl.classList.add("node-highlight");
  
  setTimeout(() => {
    if (tailEl) { tailEl.classList.remove("node-highlight"); tailEl.classList.add("node-del"); }
    setTimeout(() => {
      const deletedVal = nodes[targetId].value;
      if (size === 1) {
         head = null; tail = null;
      } else {
         tail = nodes[targetId].prev;
         nodes[tail].next = head;
         nodes[head].prev = tail;
      }
      delete nodes[targetId];
      size--; opCount++;
      renderList(); updateStats();
      setStatus(\`✓ Deleted tail node (\${deletedVal}).\`, "success");
      animating = false;
    }, 420);
  }, 320);
}

function dcllTraverse() {
  if (animating) return;
  if (size === 0) { setStatus("⚠ List is empty.", "error"); return; }

  animating = true;
  const orderedIds = [];
  let cur = head;
  do { orderedIds.push(cur); cur = nodes[cur].next; } while (cur !== head);

  let step = 0;
  function visitNext() {
    if (step > 0) {
      const prevEl = document.querySelector(\`[data-id="\${orderedIds[step - 1]}"]\`);
      if (prevEl) { prevEl.classList.remove("node-traverse"); prevEl.classList.add("node-visited"); }
    }
    if (step >= orderedIds.length) {
      setTimeout(() => {
        orderedIds.forEach(id => {
          const el = document.querySelector(\`[data-id="\${id}"]\`);
          if (el) el.classList.remove("node-visited");
        });
        setStatus("✓ Traversal complete.", "success");
        opCount++; updateStats();
        animating = false;
      }, 600);
      return;
    }
    const el = document.querySelector(\`[data-id="\${orderedIds[step]}"]\`);
    if (el) el.classList.add("node-traverse");
    setStatus(\`Visiting node \${step}: value \${nodes[orderedIds[step]].value}\`, "info");
    step++;
    setTimeout(visitNext, 500);
  }
  visitNext();
}

function dcllReset() {
  if (animating) return;
  nodes = {}; head = null; tail = null; size = 0; opCount = 0; nodeIdSeq = 0;
  document.getElementById("simInput").value = "";
  renderList(); updateStats();
  setStatus("List reset.", "info");
}
\`;

fs.writeFileSync(path.join(destDir, 'doubly-circular-linked-list.js'), jsContent);

console.log('Successfully completely rebuilt DCLL');
