const d = document;
let countdownTempo;
let startTime;
let currentTime;

export function countdown(container, tempo) {
  const $container = d.getElementById(container);
  let limitTime = tempo * (1000 * 60);
  startTime = limitTime + Date.now();
  let minutes = Math.floor(limitTime / (1000 * 60)),
    seconds = ("0" + Math.floor((limitTime % (1000 * 60)) / 1000)).slice(-2);

  $container.innerHTML = `${minutes}:${seconds}`;

  limitTime -= 1000;

  countdownTempo = setInterval(() => {
    let minutes = Math.floor(limitTime / (1000 * 60)),
      seconds = ("0" + Math.floor((limitTime % (1000 * 60)) / 1000)).slice(-2);

    $container.innerHTML = `${minutes}:${seconds}`;

    limitTime -= 1000;
    if (limitTime < 0) {
      clearInterval(countdownTempo);
      $container.innerHTML = `0:00`;
    }
  }, 1000);
}

export function clearCount() {
  clearInterval(countdownTempo);
  currentTime = startTime - Date.now();
  return Math.ceil(currentTime / 1000);
}
