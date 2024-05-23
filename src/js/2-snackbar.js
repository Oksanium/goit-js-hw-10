'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const radioS = document.querySelectorAll('input[type="radio"]');
const form = document.querySelector('.form');
const input = document.querySelector('input[name="delay"]');

form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  let promiseType;
  const delay = +input.value;
  for (const radio of radioS) {
    if (radio.checked) promiseType = radio.value;
  }
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (promiseType === 'fulfilled') {
        resolve(delay);
      } else if (promiseType === 'rejected') {
        reject(delay);
      }
    }, delay);
  });
  promise.then((r) => {
    showGreenToast(r);
  });
  promise.catch((e) => {
    showRedToast(e);
  });
}

function showGreenToast(r) {
  iziToast.show({
    title: `Fulfilled promise in ${r}ms`,
    backgroundColor: '#59A10D',
    timeout: 5000,
    titleColor: '#fff',
    titleSize: '16px',
    iconUrl: './img/ok-icon.svg',
    buttons: [
      [
        '<button style="background: transparent; padding: 0; margin-left: 30px" width="20" height="20"><img src="./img/cross.svg"></button>',
        function (instance, toast) {
          instance.hide(
            {
              transitionOut: 'fadeOutUp',
            },
            toast,
            'buttonName'
          );
        },
      ],
    ],
    close: false,
  });
}

function showRedToast(e) {
  iziToast.show({
    title: `Rejected promise in ${e}ms`,
    backgroundColor: '#EF4040',
    timeout: 5000,
    titleColor: '#fff',
    titleSize: '16px',
    iconUrl: './img/cross-icon.svg',
    buttons: [
      [
        '<button style="background: transparent; padding: 0; margin-left: 30px" width="20" height="20"><img src="./img/cross.svg"></button>',
        function (instance, toast) {
          instance.hide(
            {
              transitionOut: 'fadeOutUp',
            },
            toast,
            'buttonName'
          );
        },
      ],
    ],
    close: false,
  });
}
// ---- TOAST TEST ---- (to test toast uncomment code in HTML file too)
// const btnOk = document.querySelector('#ok');
// const btnNo = document.querySelector('#no');

// btnOk.addEventListener('click', showGreenToast);
// btnNo.addEventListener('click', showRedToast);
