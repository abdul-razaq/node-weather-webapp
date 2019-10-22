// Grab the submit button
const weatherForm = document.querySelector('form');

const searchTerm = document.querySelector('input');

const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherForm.addEventListener('submit', event => {
  
  event.preventDefault();
  
  const location = searchTerm.value;

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  
  // fetch weather data from the weather endpoint
  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = `${data.address}, ${data.country}, ${data.state}, ${data.continent}`;
        messageTwo.textContent = data.forecast.toString();
      }
    });
  });

});