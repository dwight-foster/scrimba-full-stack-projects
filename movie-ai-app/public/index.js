const preferenceForm = document.getElementById('preference-form');
const submitBtn = document.getElementById('submit-btn');
const inputSection = document.getElementById('input-section');


preferenceForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (submitBtn.textContent === `Let's Go`) {
        const data = new FormData(preferenceForm);
        let output = {};
        for (const entry of data) {
            output[entry[0]] = entry[1]; 
        }
        inputSection.innerHTML = `<img src='./images/loading.gif'>`
        const res = await fetch('/api/query', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(output)
        });
        const chatResponse = await res.json();
        const { message } = chatResponse;
        console.log(message);
        inputSection.innerHTML = `<div class='output-text'>${message}</div>`;
        submitBtn.textContent = "Go Again";
    }  else {
        inputSection.innerHTML = `
                    <label class="input-label" for="favorite-movie">What's your favorite movie and why?</label>
                    <textarea id="favorite-movie" name="favoritemovie" class="input-area"></textarea>
                    <label class="input-label" for="movie-age">Are you in the mood for something new or a classic?</label>
                    <textarea id="movie-age" name="movieage" class="input-area dark-text"></textarea>
                    <label class="input-label" for="movie-type">Do you wanna have fun or do you want something serious?</label>
                    <textarea id="movie-type" name="movietype" class="input-area dark-text"></textarea>
                    `;
        submitBtn.textContent = "Let's Go";

    }

})