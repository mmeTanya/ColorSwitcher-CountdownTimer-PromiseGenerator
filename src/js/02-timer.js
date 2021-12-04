import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  timerDays: document.querySelector('span[data-days]'),
  timerHours: document.querySelector('span[data-hours]'),
  timerMin: document.querySelector('span[data-minutes]'),
  timerSec: document.querySelector('span[data-seconds]'),
};
let selectedDate = null;
refs.startBtn.disabled = true;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    const currentTime = Date.now();
    if (selectedDate > currentTime) {
      console.log(selectedDate);
      refs.startBtn.disabled = false;
    } else {
      refs.startBtn.disabled = true;
      Notify.failure('Please choose a date in the future', {
        timeout: 3000,
      });
    }
  },
});

function startTimer() {
  refs.startBtn.disabled = true;
  selectedDate;
  setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedDate - currentTime;
    const timeComponents = convertMs(deltaTime);
    console.log(timeComponents);
    refs.timerDays.textContent = timeComponents.days;
    refs.timerHours.textContent = timeComponents.hours;
    refs.timerMin.textContent = timeComponents.minutes;
    refs.timerSec.textContent = timeComponents.seconds;
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

refs.startBtn.addEventListener('click', startTimer);
