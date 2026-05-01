import re

with open("/Users/suyesh/Desktop/Family Doc's/idsnext/frontend/topics/doubly-linked-list/doubly-visualize.js", "r") as f:
    content = f.read()

pattern = re.compile(r"function animMid_initTemp\(\) \{.*$", re.DOTALL)

new_code = """function animMid_initTemp() {
  buildList(VIZ.initialList, false, 0);
  hideCurve();
  hideLoopBox();
  hideTempPointer();
  
  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;
  VIZ.el.newNodeData.textContent = String(VIZ.newValue);
  VIZ.el.newNodeEl.className = 'viz-node viz-dll-node viz-node-new viz-node-linked';
  if (VIZ.el.newNodePrevField) VIZ.el.newNodePrevField.textContent = '?';
  if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent = '?';
  
  var isMobile = window.innerWidth <= 768; wrap.style.bottom = isMobile ? '14px' : '68px';
  wrap.style.left      = '50%';
  wrap.style.transform = 'translateX(-50%)';
  wrap.classList.add('visible');

  var listRow = VIZ.el.listRow;
  var wraps = listRow ? listRow.querySelectorAll('.viz-node-wrap') : [];
  if (wraps.length > 0) {
    var tempNode = wraps[0].querySelector('.viz-node');
    if (tempNode) {
      showTempPointerOnNode(0);
      tempNode.classList.add('viz-node-temp-highlight');
      setTimeout(function () { tempNode.classList.remove('viz-node-temp-highlight'); }, 600);
    }
  }
}

function animMid_loopCheckTrue() {
  animMid_initTemp();
  updateLoopBox(1, 3);
}

function animMid_tempMove() {
  animMid_initTemp();
  updateLoopBox(1, 3);
  
  var listRow = VIZ.el.listRow;
  var wraps = listRow ? listRow.querySelectorAll('.viz-node-wrap') : [];
  if (wraps.length > 1) {
    var tempNode = wraps[1].querySelector('.viz-node');
    if (tempNode) {
      showTempPointerOnNode(1);
      tempNode.classList.add('viz-node-temp-highlight');
      setTimeout(function () { tempNode.classList.remove('viz-node-temp-highlight'); }, 600);
    }
  }
}

function animMid_loopCheckFalse() {
  animMid_initTemp();
  var listRow = VIZ.el.listRow;
  var wraps = listRow ? listRow.querySelectorAll('.viz-node-wrap') : [];
  if (wraps.length > 1) {
    var tempNode = wraps[1].querySelector('.viz-node');
    if (tempNode) {
      showTempPointerOnNode(1);
      tempNode.classList.add('viz-node-temp-highlight');
    }
  }
  updateLoopBox(2, 3);
}

function animMid_link1() {
  animMid_loopCheckFalse();
  setTimeout(hideLoopBox, 400);

  var svg = VIZ.el.curveSvg;
  if (!svg) return;
  
  var listRow = VIZ.el.listRow;
  var wraps = listRow ? listRow.querySelectorAll('.viz-node-wrap') : [];
  var tempWrap = wraps[1];
  var newNodeWrap = VIZ.el.newNodeWrap;
  var nextNodeWrap = wraps[2];

  if (tempWrap && newNodeWrap && nextNodeWrap) {
    var startBox = newNodeWrap.getBoundingClientRect();
    var endBox = nextNodeWrap.getBoundingClientRect();
    
    var sx = startBox.left + startBox.width / 2;
    var sy = startBox.top;
    var ex = endBox.left + endBox.width / 2 - 10;
    var ey = endBox.top + endBox.height / 2;

    var d = "M " + sx + " " + sy + " C " + sx + " " + (sy - 50) + ", " + (ex - 40) + " " + ey + ", " + ex + " " + ey;
    
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('class', 'viz-mid-link');
    path.setAttribute('d', d);
    path.setAttribute('stroke', '#3b6cff');
    path.setAttribute('stroke-width', '2.5');
    path.setAttribute('fill', 'none');
    path.setAttribute('marker-end', 'url(#arrowHead)');
    path.setAttribute('stroke-dasharray', '1000');
    path.setAttribute('stroke-dashoffset', '1000');
    svg.appendChild(path);
    svg.classList.add('visible');

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        path.style.transition = 'stroke-dashoffset 0.6s ease-out';
        path.setAttribute('stroke-dashoffset', '0');
        if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent = '0x103'; // Assumed
      });
    });
  }
}

function animMid_link2() {
  animMid_link1();
  var svg = VIZ.el.curveSvg;
  if (!svg) return;
  
  var listRow = VIZ.el.listRow;
  var wraps = listRow ? listRow.querySelectorAll('.viz-node-wrap') : [];
  var tempWrap = wraps[1];
  var newNodeWrap = VIZ.el.newNodeWrap;

  if (tempWrap && newNodeWrap) {
    var startBox = newNodeWrap.getBoundingClientRect();
    var endBox = tempWrap.getBoundingClientRect();
    
    var sx = startBox.left + startBox.width / 2;
    var sy = startBox.top;
    var ex = endBox.left + endBox.width / 2 + 10;
    var ey = endBox.top + endBox.height / 2;

    var d = "M " + sx + " " + sy + " C " + sx + " " + (sy - 50) + ", " + (ex + 40) + " " + ey + ", " + ex + " " + ey;
    
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('class', 'viz-mid-link');
    path.setAttribute('d', d);
    path.setAttribute('stroke', '#f59e0b');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('fill', 'none');
    path.setAttribute('marker-end', 'url(#arrowHeadPrev)');
    path.setAttribute('stroke-dasharray', '1000');
    path.setAttribute('stroke-dashoffset', '1000');
    svg.appendChild(path);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        path.style.transition = 'stroke-dashoffset 0.6s ease-out';
        path.setAttribute('stroke-dashoffset', '0');
        if (VIZ.el.newNodePrevField) VIZ.el.newNodePrevField.textContent = '0x102'; // Assumed
      });
    });
  }
}

function animMid_link3() {
  animMid_link2();
  var svg = VIZ.el.curveSvg;
  if (!svg) return;
  
  var listRow = VIZ.el.listRow;
  var wraps = listRow ? listRow.querySelectorAll('.viz-node-wrap') : [];
  var newNodeWrap = VIZ.el.newNodeWrap;
  var nextNodeWrap = wraps[2];

  if (newNodeWrap && nextNodeWrap) {
    var startBox = nextNodeWrap.getBoundingClientRect();
    var endBox = newNodeWrap.getBoundingClientRect();
    
    var sx = startBox.left + startBox.width / 2;
    var sy = startBox.top + startBox.height;
    var ex = endBox.left + endBox.width / 2 + 10;
    var ey = endBox.top + endBox.height / 2;

    var d = "M " + sx + " " + sy + " C " + sx + " " + (sy + 50) + ", " + (ex + 40) + " " + ey + ", " + ex + " " + ey;
    
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('class', 'viz-mid-link');
    path.setAttribute('d', d);
    path.setAttribute('stroke', '#f59e0b');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('fill', 'none');
    path.setAttribute('marker-end', 'url(#arrowHeadPrev)');
    path.setAttribute('stroke-dasharray', '1000');
    path.setAttribute('stroke-dashoffset', '1000');
    svg.appendChild(path);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        path.style.transition = 'stroke-dashoffset 0.6s ease-out';
        path.setAttribute('stroke-dashoffset', '0');
        var nextNodeEl = nextNodeWrap.querySelector('.viz-node');
        if (nextNodeEl) {
           var prevField = nextNodeEl.querySelector('.viz-node-prev');
           if (prevField) prevField.textContent = '0x104'; // Assumed new node address
        }
      });
    });
  }
}

function animMid_link4() {
  animMid_link3();
  var svg = VIZ.el.curveSvg;
  if (!svg) return;
  
  var listRow = VIZ.el.listRow;
  var wraps = listRow ? listRow.querySelectorAll('.viz-node-wrap') : [];
  var tempWrap = wraps[1];
  var newNodeWrap = VIZ.el.newNodeWrap;

  if (tempWrap && newNodeWrap) {
    var startBox = tempWrap.getBoundingClientRect();
    var endBox = newNodeWrap.getBoundingClientRect();
    
    var sx = startBox.left + startBox.width / 2;
    var sy = startBox.top + startBox.height;
    var ex = endBox.left + endBox.width / 2 - 10;
    var ey = endBox.top + endBox.height / 2;

    var d = "M " + sx + " " + sy + " C " + sx + " " + (sy + 50) + ", " + (ex - 40) + " " + ey + ", " + ex + " " + ey;
    
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('class', 'viz-mid-link');
    path.setAttribute('d', d);
    path.setAttribute('stroke', '#3b6cff');
    path.setAttribute('stroke-width', '2.5');
    path.setAttribute('fill', 'none');
    path.setAttribute('marker-end', 'url(#arrowHead)');
    path.setAttribute('stroke-dasharray', '1000');
    path.setAttribute('stroke-dashoffset', '1000');
    svg.appendChild(path);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        path.style.transition = 'stroke-dashoffset 0.6s ease-out';
        path.setAttribute('stroke-dashoffset', '0');
        var tempNodeEl = tempWrap.querySelector('.viz-node');
        if (tempNodeEl) {
           var nextField = tempNodeEl.querySelector('.viz-node-next');
           if (nextField) nextField.textContent = '0x104';
        }
      });
    });
  }
}

// ── Temp pointer helpers ─────────────────────────────────────────
function showTempPointerOnNode(nodeIndex) {
  var tp = VIZ.el.tempPointer;
  if (!tp) return;
  tp.style.display = 'flex';
  tp.style.opacity = '0';
  tp.style.transition = 'left 0.32s cubic-bezier(0.4,0,0.2,1), top 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease';

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var canvas  = document.getElementById('animCanvas');
      var row     = VIZ.el.listRow;
      if (!canvas || !row) return;
      var wraps   = row.querySelectorAll('.viz-node-wrap');
      var wrap    = wraps[nodeIndex];
      if (!wrap) return;
      var node    = wrap.querySelector('.viz-node');
      if (!node) return;
      var cr = canvas.getBoundingClientRect();
      var nr = node.getBoundingClientRect();
      var cx = nr.left + nr.width / 2 - cr.left;
      
      var tpH = tp.getBoundingClientRect().height || 48;
      var topY = nr.top - cr.top - tpH - 4;
      var offsetX = 22;
      tp.style.left      = (cx + offsetX) + 'px';
      tp.style.top       = topY + 'px';
      tp.style.bottom    = 'auto';
      tp.style.transform = 'translateX(-50%)';
      tp.style.opacity   = '1';
      if (VIZ.el.tempAddr && PTR.nodeList[nodeIndex]) {
        VIZ.el.tempAddr.textContent = PTR.nodeList[nodeIndex].address;
      }
    });
  });
}

function hideTempPointer() {
  var tp = VIZ.el.tempPointer;
  if (!tp) return;
  tp.style.transition = 'opacity 0.25s ease';
  tp.style.opacity    = '0';
  setTimeout(function () { tp.style.display = 'none'; }, 260);
}
"""

# The script to replace the pattern with new code
import sys
content_before = content[:content.find('function animMid_initTemp() {')]
# The previous script might have appended temp pointer helpers to the end. Let's make sure we don't have duplicates.
# We will just replace from animMid_initTemp to the end of the file.
new_content = content_before + new_code

with open("/Users/suyesh/Desktop/Family Doc's/idsnext/frontend/topics/doubly-linked-list/doubly-visualize.js", "w") as f:
    f.write(new_content)
