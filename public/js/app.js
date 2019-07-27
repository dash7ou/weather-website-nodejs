console.log("Client side javascript file is loaded!");

const weatherSearchForm = document.querySelector("form");
const search = document.querySelector("input");
const errorP = document.getElementById("error");
const locationP = document.getElementById("location");
const weatherP = document.getElementById("weatherNow");
const dataOut = document.getElementById("returnData");

weatherSearchForm.addEventListener("submit", e => {
  "use strick";
  e.preventDefault();

  if (search.value == undefined || search.value == "") {
    dataOut.classList.add("deleteAny");
    errorP.style.color = "red";
    errorP.textContent = "Add any location to search.. ";
  } else {
    const location = search.value;

    dataOut.classList.add("deleteAny");

    const url = `/weather?address=${location}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.forecast) {
          dataOut.classList.remove("deleteAny");
          locationP.textContent = "Loading...";

          dataOut.style.color = "blue";

          errorP.classList.add("deleteAny");

          weatherP.textContent = `${data.address} Weather: ${data.forecast}`;
          locationP.textContent = `location: ${data.location}`;
          dataOut.classList.add("error");
        } else {
          errorP.classList.remove("deleteAny");
          errorP.textContent = "Loading...";
          errorP.textContent = "Enter right location please";
          errorP.style.color = red;
        }
      })
      .catch(err => {
        errorP.textContent = err;
      });
  }
});
