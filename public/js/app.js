console.log("Client side javascript file is loaded!");

// const url = "http://localhost:3000/weather?address=Gaza";

// fetch(url)
//   .then(res => res.json())
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

const weatherSearchForm = document.querySelector("form");
const search = document.querySelector("input");
const errorP = document.getElementById("error");
const locationP = document.getElementById("location");
weatherSearchForm.addEventListener("submit", e => {
  "use strick";
  e.preventDefault();
  if (search.value == "") return console.log("Enter Address in Input ");
  const location = search.value;
  const url = `/weather?address=${location}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        errorP.style.color = "red";
        errorP.style.border = "1px solid #888";
        errorP.style.padding = "10px";
        errorP.textContent = data.error;
      } else {
        errorP.style.color = "blue";
        //errorP.style.border = "1px solid #888";
        errorP.style.padding = "10px 10px 0 10px";
        errorP.textContent = data.error;
        locationP.style.padding = "0px 10px 0 10px";
        locationP.textContent = data.error;
        locationP.style.color = "blue";
        errorP.textContent = `${data.address} Weather: ${data.forecast}`;
        locationP.textContent = `location: ${data.location}`;
      }
    });
});
