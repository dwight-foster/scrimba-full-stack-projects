const translateForm = document.getElementById('translate-form');
const formLower = document.getElementById('form-lower');
const results = document.getElementById('results');
const inputText = document.getElementById('input-text');
const inputLabel = document.getElementById('input-label');
const outputText = document.getElementById("output-text");
const formBtn = document.getElementById('form-btn');


translateForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (formBtn.textContent === 'Translate') {
        const data = new FormData(translateForm);
        let output = {};
        for (const entry of data) {
            output[entry[0]] = entry[1]; 
        }
        const res = await fetch('/api/translate', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(output)
        });
        const chatResponse = await res.json();
        const { message } = chatResponse; 
        results.style.display = 'block';
        formLower.style.display = 'none';
        inputLabel.textContent = 'Original text 👇';
        outputText.textContent = message;
        formBtn.textContent = 'Start Over';
    } else {
        results.style.display = 'none';
        formLower.style.display = 'block';
        inputLabel.textContent = 'Text to translate 👇';
        outputText.textContent = '';
        formBtn.textContent = 'Translate';
        inputText.value = '';
    }


})
