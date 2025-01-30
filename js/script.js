"use strict";

// light and dark mode
const $themebtn = document.querySelector("[data-theme-btn]");
const $Html = document.documentElement;
let isDark = window.matchMedia("(prefers-color-scheme:dark)").matches;

if (sessionStorage.getItem("theme")) {
  $Html.dataset.theme = sessionStorage.getItem("theme");
} else {
  $Html.dataset.theme = isDark ? "dark" : "light;";
  sessionStorage.setItem("theme", $Html.dataset.theme);
}

const changeTheme = () => {
  $Html.dataset.theme =
    sessionStorage.getItem("theme") === "light" ? "dark" : "light";
  sessionStorage.setItem("theme", $Html.dataset.theme);
};

$themebtn.addEventListener("click", changeTheme);

// tab

const $tabBtn = document.querySelectorAll("[data-tab-btn]");
let [lastActiveTab] = document.querySelectorAll("[data-tab-content]");
let [lastActiveTabBtn] = $tabBtn;

$tabBtn.forEach((item) => {
  item.addEventListener("click", function () {
    lastActiveTab.classList.remove("active");
    lastActiveTabBtn.classList.remove("active");

    const $tabContent = document.querySelector(
      `[data-tab-content="${item.dataset.tabBtn}"]`
    );
    $tabContent.classList.add("active");
    this.classList.add("active");

    lastActiveTab = $tabContent;
    lastActiveTabBtn = this;
  });
});

/**
 * Custom cursor
 */
const cursors = document.querySelectorAll("[data-cursor]");

function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

if (isTouchDevice()) {
  cursors.forEach(cursor => cursor.style.display = "none");
} else {
  window.addEventListener("mousemove", function (event) {
    const posX = event.clientX;
    const posY = event.clientY;


    cursors[0].style.left = `${posX}px`;
    cursors[0].style.top = `${posY}px`;
  
    setTimeout(function () {
      cursors[1].style.left = `${posX}px`;
      cursors[1].style.top = `${posY}px`;
    }, 80);
  });

  document.querySelectorAll("button, a").forEach((element) => {
    element.addEventListener("mouseover", function () {
      cursors.forEach(cursor => cursor.classList.add("hovered"));
    });

    element.addEventListener("mouseout", function () {
      cursors.forEach(cursor => cursor.classList.remove("hovered"));
    });
  });
}

