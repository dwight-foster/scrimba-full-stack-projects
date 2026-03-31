const characters =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
let len = 15;
let p1El = document.getElementById("p1");
let p2El = document.getElementById("p2");
let lengthEl = document.getElementById("length");
let lengthValueEl = document.getElementById("length-value");

len = Number(lengthEl.value);
lengthValueEl.textContent = len;

lengthEl.addEventListener("input", function() {
    len = Number(lengthEl.value);
    lengthValueEl.textContent = len;
});

function generatePasswords() {
    p2El.textContent = "";
    p1El.textContent = "";
    for (let i = 0; i < len; i ++) {
        let n1 = Math.floor(Math.random() * characters.length);
        let n2 = Math.floor(Math.random() * characters.length);
        p1El.textContent += characters[n1];
        p2El.textContent += characters[n2];
    }

}
