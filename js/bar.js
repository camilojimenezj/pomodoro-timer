let barInterval;
const $html = document.documentElement;
let porcentage;

export function progressBar(minutes, status) {
  porcentage = status;
  barInterval = setInterval(() => {
    porcentage -= status / (minutes * 60);
    $html.style.setProperty("--porcentage", porcentage);

    if (porcentage <= 0) {
      clearInterval(barInterval);
    }
  }, 1000);
}

export function clearBar() {
  clearInterval(barInterval);
  $html.style.setProperty("--porcentage", 100);
}

export function pauseBar() {
  clearInterval(barInterval);
  return porcentage;
}
