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

  if (search.value == undefined) {
    dataOut.classList.add("deleteAny");
    //style error :)
    errorP.style.color = "red";
    errorP.style.border = "2px solid #888";

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
          errorP.classList.add("deleteAny");
          locationP.textContent = "Loading...";

          //style  :)
          dataOut.style.color = "blue";
          dataOut.style.border = "2px solid #888";
          dataOut.style.padding = "7px";
          dataOut.style.marginLeft = "10px";
          dataOut.style.backgroundColor = "#eee";
          dataOut.style.fontSize = "25px";
          dataOut.style.marginTop = "10px";
          dataOut.style.borderRadius = "5px";

          weatherP.textContent = `${data.address} Weather: ${data.forecast}`;
          locationP.textContent = `location: ${data.location}`;
        } else {
          errorP.classList.remove("deleteAny");
          dataOut.classList.add("deleteAny");
          errorP.textContent = "Loading...";
          errorP.textContent = "Enter right location please.. :)";

          //style error :)
          errorP.style.color = "#eee";
          errorP.style.border = "2px solid #eee";
          errorP.style.padding = "7px";
          errorP.style.marginLeft = "10px";
          errorP.style.backgroundColor = "red";
        }
      })
      .catch(err => {
        errorP.textContent = err;
      });
  }
});
