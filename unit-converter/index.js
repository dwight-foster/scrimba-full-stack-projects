const inputEl = document.getElementById("input-el");
const btnEl = document.getElementById("convert-btn");
const lengthEl = document.getElementById("length-values");
const volumeEl = document.getElementById("volume-values");
const massEl = document.getElementById("mass-values");

btnEl.addEventListener("click", function() {
    const value = inputEl.value;
    if (value) {
        let meter2feet = (20 * 3.281).toFixed(3);
        let feet2meter = (20/3.281).toFixed(3);
        let liter2gallon = (20 * 0.264).toFixed(3);
        let gallon2liter = (20/0.264).toFixed(3);
        let kilogram2pound = (20 * 2.204).toFixed(3);
        let pound2kilogram = (20/2.204).toFixed(3);
        let lengthString = `${value} meters = ${meter2feet} feet | ${value} feet = ${feet2meter} meters`;
        let volumeString =  `${value} liters = ${liter2gallon} gallons | ${value} gallons = ${gallon2liter} liters`;
        let massString =  `${value} kilos = ${kilogram2pound} pounds | ${value} pounds = ${pound2kilogram} kilos`;
        lengthEl.innerText = lengthString;
        volumeEl.innerText = volumeString;
        massEl.innerText = massString;
    }
});