'use strict'

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const spanDays = document.querySelector('[data-days]');
const spanHours = document.querySelector('[data-hours]');
const spanMinutes = document.querySelector('[data-minutes]');
const spanSeconds = document.querySelector('[data-seconds]');

let userSelectedDate = 0;
let timeDiff = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onChange(selectedDates) {
        if ((selectedDates[0] - Date.now()) <= 0) {
            iziToast.destroy();
            iziToast.show({
                title: 'Please choose a date in the future',
                backgroundColor: '#EF4040',
                timeout: 5000,
                titleColor: '#fff',
                titleSize: '16px',
                iconUrl: '/cross-icon.svg',
                buttons: [
                    ['<button style="background: transparent; padding: 0; margin-left: 30px" width="20" height="20"><img src="/cross.svg"></button>', function (instance, toast) {
                        instance.hide({
                            transitionOut: 'fadeOutUp',
                        }, toast, 'buttonName');
                    }]
                ],
                close: false,
            });
            btnStart.classList.add('disable');
        } else {
            btnStart.classList.remove('disable');
            iziToast.destroy();
            userSelectedDate = selectedDates[0].getTime();
        }
    },
  };

const fp = flatpickr('#datetime-picker', options);

let id;

btnStart.addEventListener('click', onbtnStartClick);

function onbtnStartClick(e) {
    if (btnStart.classList.contains('disable')) return;
    timeDiff = userSelectedDate - Date.now();
    id = setInterval(timerStart, 1000);
};

function timerStart() {
    if (timeDiff <= 0) {
        timerStop();
        return;
    }
    btnStart.classList.add('disable');
    input.setAttribute('disabled', '');
    btnStop.classList.remove('disable');

    const { days, hours, minutes, seconds } = convertMs(timeDiff);
    spanDays.textContent = addLeadingZero(days);
    spanHours.textContent = addLeadingZero(hours);
    spanMinutes.textContent = addLeadingZero(minutes);
    spanSeconds.textContent = addLeadingZero(seconds);
    timeDiff -= 1000;
};

btnStop.addEventListener('click', timerStop);

function timerStop() {
    clearInterval(id);
    btnStart.classList.remove('disable');
    input.removeAttribute('disabled');
    btnStop.classList.add('disable');
    
    spanDays.textContent = 
    spanHours.textContent = 
    spanMinutes.textContent = 
    spanSeconds.textContent = '00';

    timeDiff = 0;
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  };

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
};

