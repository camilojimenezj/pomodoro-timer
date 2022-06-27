let barInterval;
const $html = document.documentElement;

export function progressBar(minutes) {
  let porcentage = 100;

  barInterval = setInterval(() => {
    porcentage -= 10 / (minutes * 60);
    $html.style.setProperty("--porcentage", porcentage);

    if (porcentage <= 0) {
      clearInterval(barInterval);
    }
  }, 100);
}

export function clearBar() {
  clearInterval(barInterval);
  $html.style.setProperty("--porcentage", 100);
}
