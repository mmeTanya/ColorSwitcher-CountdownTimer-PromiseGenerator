const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  backgroundPlace: document.querySelector('body'),
};
let timerId = null;

refs.btnStart.addEventListener('click', onChangeBackgroundColor);
refs.btnStop.addEventListener('click', onStopChangeBackgroundColor);

function onChangeBackgroundColor() {
  timerId = setInterval(() => {
    refs.backgroundPlace.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.btnStart.disabled = true;
}

function onStopChangeBackgroundColor() {
  clearInterval(timerId);
  refs.btnStart.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
