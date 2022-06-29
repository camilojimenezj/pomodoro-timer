import { progressBar, clearBar, pauseBar } from "./js/bar.js";
import { countdown, clearCount } from "./js/countdown.js";

const d = document;
const w = window;
const $html = d.documentElement;
const ls = localStorage;

// Define time variables

let pomodoroMinutes = 15;
let shortBreak = 5;
let longBreak = 10;
let currentMode = 15;
let barPorcentage = 100;

// Get mode

d.addEventListener("click", (e) => {
  setTimeout(() => {
    if (e.target.matches(".mode-bar") || e.target.matches(".apply")) {
      barPorcentage = 100;
      $startButton.classList.add("active");
      clearBar();
      clearCount();
      $pauseButton.classList.remove("active");
      const $mode = d.getElementsByName("pomodoro-type");
      const $countdown = d.getElementById("countdown");

      $mode.forEach((elem) => {
        if (elem.checked) {
          currentMode = elem.value;
        }
      });

      switch (currentMode) {
        case "1":
          $countdown.textContent = pomodoroMinutes + ":00";
          currentMode = pomodoroMinutes;
          break;
        case "2":
          $countdown.textContent = shortBreak + ":00";
          currentMode = shortBreak;
          break;
        case "3":
          $countdown.textContent = longBreak + ":00";
          currentMode = longBreak;
        default:
          break;
      }
    }
  }, 10);
});

// Start countdown

const $startButton = d.querySelector(".start-button");
const $pauseButton = d.querySelector(".pause-button");

$startButton.addEventListener("click", (e) => {
  $pauseButton.classList.add("active");
  $startButton.classList.remove("active");
  progressBar(currentMode, barPorcentage);
  countdown("countdown", currentMode);
});

$pauseButton.addEventListener("click", (e) => {
  $pauseButton.classList.remove("active");
  $startButton.classList.add("active");
  barPorcentage = pauseBar();
  currentMode = clearCount() / 60;
});

// Settings

const $applyButton = d.querySelector(".apply");

$applyButton.addEventListener("click", (e) => {
  // Time settings

  const $timeSettings = d.querySelectorAll(".set-time");

  if (!isNaN($timeSettings[0].valueAsNumber))
    pomodoroMinutes = $timeSettings[0].valueAsNumber;
  if (!isNaN($timeSettings[1].valueAsNumber))
    shortBreak = $timeSettings[1].valueAsNumber;
  if (!isNaN($timeSettings[2].valueAsNumber))
    longBreak = $timeSettings[2].valueAsNumber;

  // Font settings

  const $fontSettings = d.getElementsByName("font");

  $fontSettings.forEach((elem) => {
    if (elem.checked) {
      $html.style.setProperty("--main-font", elem.value);
      ls.setItem("font", elem.value);
    }
  });

  // color settings

  const $colorSettings = d.getElementsByName("color");

  $colorSettings.forEach((elem) => {
    if (elem.checked) {
      $html.style.setProperty("--main-color", elem.value);
      ls.setItem("color", elem.value);
    }
  });
});

d.addEventListener("DOMContentLoaded", (e) => {
  // Color local storage

  if (ls.getItem("color") === "#70f3f8")
    $html.style.setProperty("--main-color", "#70f3f8");
  if (ls.getItem("color") === "#d881f8")
    $html.style.setProperty("--main-color", "#d881f8");

  // Font local storage
  if (ls.getItem("font") === "'Roboto Slab', serif")
    $html.style.setProperty("--main-font", "'Roboto Slab', serif");
  if (ls.getItem("font") === "'Space Mono', monospace")
    $html.style.setProperty("--main-font", "'Space Mono', monospace");
});
