// #region Imports

// flatpickr
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// iziToast
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
// #endregion Imports

// Variables
let userSelectedDate;
const dataInput = document.querySelector('#datetime-picker');
const dataStartBtn = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

// Button Default Condition
dataStartBtn.disabled = true;


// Flatpickr options
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      userSelectedDate = selectedDates[0];

      if (new Date().getTime() - userSelectedDate.getTime() >= 0) {
          
        //   Warning
          iziToast.show({
          title: 'Error',
          position: 'topRight',
          backgroundColor: 'red',
          messageColor: 'white',
          message: 'Please choose a date in the future'
          
          });
          
          dataStartBtn.disabled = true;
      } else {
          dataStartBtn.disabled = false;
      }
  },
};


// Flatpickr
const fp = flatpickr(dataInput, options);


// Add Timer
function addLeadingZero(value) {
    return String(value).padStart(2, "0");
};

const onDateStartBtnClick = (event) => {
    dataStartBtn.disabled = true;
    dataInput.disabled = true;

    // Interval
    const intervalId = setInterval(() => {
        const currentDate = new Date();
        const remainingTime = userSelectedDate.getTime() - currentDate.getTime();
        const convertedTime = convertMs(userSelectedDate.getTime() - currentDate.getTime());
    
        dataDays.textContent = addLeadingZero(convertedTime.days);
        dataHours.textContent = addLeadingZero(convertedTime.hours);
        dataMinutes.textContent = addLeadingZero(convertedTime.minutes);
        dataSeconds.textContent = addLeadingZero(convertedTime.seconds);

    if (remainingTime < 1000) { 
        clearInterval(intervalId);
        dataDays.textContent = "00";
        dataHours.textContent = "00";
        dataMinutes.textContent = "00";
        dataSeconds.textContent = "00";

        dataInput.disabled = false;
    };
}, 1000)
};

dataStartBtn.addEventListener("click", onDateStartBtnClick);


//  Convert Function
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
}