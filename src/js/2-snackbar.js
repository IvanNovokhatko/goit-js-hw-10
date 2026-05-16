// #region Imports

// iziToast
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
// #endregion Imports

// Variables
const myForm = document.querySelector(".form");
const delayInput = document.querySelector("input[name=delay]");
const fulfilledRadioBtn = document.querySelector("input[value=fulfilled]");
const rejectedRadioBtn = document.querySelector("input[value=rejected]");


// Add EventListener
const onMyFormSubmit = (event) => {
    event.preventDefault();

    const delay = delayInput.value;
    const isSuccess = fulfilledRadioBtn.checked;

    const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
    if (isSuccess) {
      resolve(delay);
    } else {
      reject(delay);
    }
  }, delay);
});

    myPromise
  .then(value => {
    iziToast.show({
          position: 'topRight',
          backgroundColor: 'lightgreen',
          messageColor: 'white',
          message: `✅ Fulfilled promise in ${value}ms`
          
          });
  })
  .catch(error => {
      iziToast.show({
          position: 'topRight',
          backgroundColor: '#FF6B6B',
          messageColor: 'white',
          message: `❌ Rejected promise in ${error}ms`
          
          });
  });

    myForm.reset();
};

myForm.addEventListener("submit", onMyFormSubmit);