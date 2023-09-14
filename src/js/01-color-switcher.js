'use strict';
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;

stopBtn.disabled = true;

const colorChange = () => {
  body.style.backgroundColor = getRandomHexColor();
};

const startColor = () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  timerId = setInterval(() => {
    colorChange();
  }, 1000);
};

startBtn.addEventListener('click', startColor);

const stopColor = () => {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
};

stopBtn.addEventListener('click', stopColor);
