import re

with open("/Users/suyesh/Desktop/Family Doc's/idsnext/frontend/topics/doubly-linked-list/doubly-visualize.js", "r") as f:
    content = f.read()

pattern = re.compile(r"function animMid_traverse\(\) \{.*$", re.DOTALL)

new_code = """function animMid_initTemp() {
  buildList(VIZ.initialList, false, 0);
  hideCurve();
  hideLoopBox();
  
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
      tempNode.style.transition = 'box-shadow 0.3s ease';
      tempNode.style.boxShadow = '0 0 0 3px #f59e0b';
      setTimeout(function () { tempNode.style.boxShadow = ''; }, 600);
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
      tempNode.style.transition = 'box-shadow 0.3s ease';
      tempNode.style.boxShadow = '0 0 0 3px #f59e0b';
      setTimeout(function () { tempNode.style.boxShadow = ''; }, 600);
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
      tempNode.style.transition = 'box-shadow 0.3s ease';
      tempNode.style.boxShadow = '0 0 0 3px #f59e0b';
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
"""

new_content = pattern.sub(new_code, content)

with open("/Users/suyesh/Desktop/Family Doc's/idsnext/frontend/topics/doubly-linked-list/doubly-visualize.js", "w") as f:
    f.write(new_content)
