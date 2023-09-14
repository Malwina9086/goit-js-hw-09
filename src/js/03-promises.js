'use strict';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');

const operateSubmit = evt => {
  evt.preventDefault();

  const delayOne = Number.parseInt(evt.target.elements['delay'].value);
  const stepDelay = Number.parseInt(evt.target.elements['step'].value);
  const amount = Number.parseInt(evt.target.elements['amount'].value);

  for (let i = 0; i < amount; i++) {
    createPromise(i, delayOne + stepDelay * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
};

form.addEventListener('submit', operateSubmit);
