// ==UserScript==
// @name         BGA Sidebar
// @namespace    http://tampermonkey.net/
// @version      2024-12-28
// @description  try to take over the world!
// @author       You
// @match        https://boardgamearena.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=boardgamearena.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

/* 1) toggleSidebar global definieren */
function toggleSidebar() {
  var sidebar = document.getElementById('right-side');
  var leftSide = document.getElementById('left-side'); // <-- wir holen uns zusätzlich #left-side

  if (!sidebar) {
    console.warn('#right-side nicht gefunden!');
    return;
  }

  // Prüfen, ob Sidebar ausgeblendet ist
  if (sidebar.style.display === 'none') {
    // SIDEBAR WIEDER EINBLENDEN
    sidebar.style.display = '';
    // Inline-Style für #left-side zurücksetzen,
    // damit das ursprüngliche CSS wieder greift
    if (leftSide) {
      leftSide.style.marginRight = '';
    }
  } else {
    // SIDEBAR AUSBLENDEN
    sidebar.style.display = 'none';
    // #left-side anpassen
    if (leftSide) {
      leftSide.style.marginRight = '0';
    }
  }
}


/* 2) Warten bis DOM geladen ist, dann Button einfügen */
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM geladen');
  var upperMenu = document.getElementById('upperrightmenu');
  console.log('upperMenu gefunden:', upperMenu);

  if (!upperMenu) {
    console.warn('#upperrightmenu nicht gefunden!');
    return;
  }

  var newMenuItem = document.createElement('div');
  newMenuItem.className = 'upperrightmenu_item';

  var button = document.createElement('a');
  button.id = 'toggleSidebarBtn';
  button.href = '#';
  button.style.display = 'inline-block';
  button.style.width = '15px';
  button.style.height = '25px';
  button.style.background = '#ccc';
  button.style.border = '1px solid #999';
  button.style.cursor = 'pointer';
  button.style.marginTop = '16px';

  button.addEventListener('click', function(e) {
    e.preventDefault();
    toggleSidebar();
  });

  newMenuItem.appendChild(button);

  var firstMenuItem = upperMenu.firstElementChild;
  console.log('Erstes Kind im #upperrightmenu:', firstMenuItem);

  if (firstMenuItem) {
    upperMenu.insertBefore(newMenuItem, firstMenuItem);
    console.log('Button vor das erste Kind eingefügt');
  } else {
    upperMenu.appendChild(newMenuItem);
    console.log('Es gab kein Kind, Button ans Ende gehängt');
  }
});


})();