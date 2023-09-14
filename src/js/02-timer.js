'use strict';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const datePickerTime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataminutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

let selectDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const chosenDate = selectedDates[0];
    if (chosenDate > new Date()) {
      selectDate = chosenDate;
      startBtn.disabled = false;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    }
  },
};
flatpickr(datePicker, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => value.toString().padStart(2, '0');

const startCounting = () => {
  if (countInterval) {
    clearInterval(countInterval);
  }
  countInterval = setInterval(() => {
    const actualTime = new Date();
    const difference = selectDate - actualTime;
    if (difference < 0) {
      clearInterval(countInterval);
      return;
    }
    const objectTime = convertMs(difference);

    daysData.textContent = addLeadingZero(objectTime.days);
    hoursData.textContent = addLeadingZero(objectTime.hours);
    minutesData.textContent = addLeadingZero(objectTime.minutes);
    secondsData.textContent = addLeadingZero(objectTime.seconds);
  }, 1000);
};

bthStart.addEventListener('click', startCounting);
