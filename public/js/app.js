const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const weatherMessage = document.getElementById("weather-display");
let message = "";

weatherForm.addEventListener("submit", e => {
  weatherMessage.innerHTML = "";
  weatherMessage.classList.add("loader");
  e.preventDefault();
  const location = search.value;
  fetch(`/weather?address=${location}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.error) {
        return { error: data.error };
      } else {
        return {
          forecast: data.forecast,
          location: data.location
        };
      }
    })
    .then(obj => {
      if (obj.error) {
        search.value = "";
        weatherMessage.classList.remove("loader");
        weatherMessage.innerHTML = obj.error;
      } else {
        const { location, forecast } = obj;
        search.value = "";
        weatherMessage.classList.remove("loader");
        weatherMessage.innerHTML = `<h3>${location}:</h3><p>${forecast}</p>`;
      }
    })
    .catch(err => console.error(err));
});
