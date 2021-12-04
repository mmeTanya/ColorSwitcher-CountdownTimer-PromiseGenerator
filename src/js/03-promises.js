import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
let position = 0;
let delay = 0;

form.addEventListener('submit', onMakeResult);

function onMakeResult(event) {
  event.preventDefault();

  const amount = form.amount.value;
  for (let i = 0; i < amount; i += 1) {
    position += 1;
    delay = Number(form.delay.value);
    delay = delay + Number(form.step.value) * (position - 1);
    console.log(position);
    console.log(delay);

    onCreatePromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function onCreatePromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
