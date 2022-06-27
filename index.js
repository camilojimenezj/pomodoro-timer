import { progressBar, clearBar } from "./js/bar.js";
import { countdown, clearCount } from "./js/countdown.js";

const d = document;
const $html = d.documentElement;

// Define time variables

let pomodoroMinutes = 15;
let shortBreak = 5;
let longBreak = 10;
let currentMode = 15;

// Get mode

d.addEventListener("click", (e) => {
  setTimeout(() => {
    if (e.target.matches(".mode-bar") || e.target.matches(".apply")) {
      clearBar();
      clearCount();
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

$startButton.addEventListener("click", (e) => {
  clearBar();
  clearCount();
  progressBar(currentMode);
  countdown("countdown", currentMode);
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
    }
  });

  // color settings

  const $colorSettings = d.getElementsByName("color");

  $colorSettings.forEach((elem) => {
    if (elem.checked) {
      $html.style.setProperty("--main-color", elem.value);
    }
  });
});
