const preferenceForm = document.getElementById('preference-form');
const submitBtn = document.getElementById('submit-btn');
const inputSection = document.getElementById('input-section');
const title = document.getElementById('title');
const header = document.getElementById('header');
const individualPrefs = [];
let personNum = 1;
let numPeople;
let hours;
let nextMovie;

preferenceForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (submitBtn.textContent === `Start`) {
        const data = new FormData(preferenceForm);
        let output = {};
        for (const entry of data) {
            output[entry[0]] = entry[1]; 
        }
        numPeople = Number(output.people);
        hours = output.time;
        displayQuestionsPage(personNum, numPeople);
        title.style.fontFamily = "'Roboto Slab', sans-serif";
        personNum += 1;
    } else if (submitBtn.textContent === 'Next Person') {
        const data = new FormData(preferenceForm);
        let output = {};
        for (const entry of data) {
            output[entry[0]] = entry[1]; 
        }
        individualPrefs.push(output);
        displayQuestionsPage(personNum, numPeople);
        personNum += 1;
    } else if (submitBtn.textContent === 'Get Movie') {
        const data = new FormData(preferenceForm);
        let output = {};
        for (const entry of data) {
            output[entry[0]] = entry[1]; 
        }
        individualPrefs.push(output);
        const moviePrefs = {time: hours, prefs: individualPrefs};
        try {
            const res = await fetch('/api/query', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(moviePrefs)
            });
            const chatResponse = await res.json();
            const { message } = chatResponse;
            const { name, year, description } = JSON.parse(message)[0];
            const nameJSON = JSON.stringify({name: name});
            nextMovie = JSON.parse(message)[1];
            const imgRes = await fetch('/api/img', {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: nameJSON
            });
            const imgURL = await imgRes.json();
            const { url } = imgURL;
            inputSection.innerHTML = `
                                    <div class='output-text'>
                                        <h1 class='movie-title'>${name} (${year})</h1>
                                        <img class='movie-poster' src="${url}"/>
                                        <p class='movie-description'>${description}</p>
                                    </div>                        
            `
            header.innerHTML = '';
            submitBtn.textContent = "Next Movie";
        } catch (err) {
            throw new Error(err);
        }
    } else if (submitBtn.textContent === "Next Movie") {
        try {
            const {name, year, description} = nextMovie;
            const nameJSON = JSON.stringify({name: name});
            const imgRes = await fetch('/api/img', {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: nameJSON
            });
            const imgURL = await imgRes.json();
            const { url } = imgURL;
            inputSection.innerHTML = `
                                    <div class='output-text'>
                                        <h1 class='movie-title'>${name} (${year})</h1>
                                        <img class='movie-poster' src="${url}"/>
                                        <p class='movie-description'>${description}</p>
                                    </div>                        
            `
            header.innerHTML = '';
            submitBtn.textContent = 'Go Again';
            
        } catch (err) {
            throw new Error(err);
        }
    } else {
        header.innerHTML = `<img src="images/popcorn.png" class="header-image">
                    <h1 class="header-title" id="title">PopChoice</h1>`;
        inputSection.innerHTML = `
                <textarea class="input-area first-page" name="people" placeholder="How many people?" required></textarea>
                <textarea class="input-area first-page" name="time" placeholder="How much time do you have?" required></textarea> 
                `;
        submitBtn.textContent = "Let's Go";

    }
    

})

function displayQuestionsPage(person, numPeople) {
    title.innerText = person;
    inputSection.innerHTML = `
                            <label class="input-label" for="favorite-movie">What's your favorite movie and why?</label>
                            <textarea id="favorite-movie" name="favoritemovie" class="input-area" required></textarea>
                            <legend class="input-label">Are you in the mood for something new or a classic?</legend>
                            <div class="radio-div">
                                <input class="radio-btn" type="radio" id="new" name="era" value="New" required/>
                                <label class="radio-label" for="new">New</label>
                                <input class="radio-btn" type="radio" id="classic" name="era" value="Classic"/>
                                <label class="radio-label" for="classic">Classic</label>
                            </div>
                            <legend class="input-label">What are you in the mood for?</legend>
                            <div class="radio-div">
                                <input class="radio-btn" type="radio" id="fun" name="mood" value="Fun" required/>
                                <label class="radio-label" for="fun">Fun</label>
                                <input class="radio-btn" type="radio" id="serious" name="mood" value="Serious"/>
                                <label class="radio-label" for="serious">Serious</label>
                                <input class="radio-btn" type="radio" id="inspiring" name="mood" value="Inspiring"/>
                                <label class="radio-label" for="inspiring">Inspiring</label>      
                                <input class="radio-btn" type="radio" id="scary" name="mood" value="Scary"/>
                                <label class="radio-label" for="scary">Scary</label>                          
                            </div>
                            <label class="input-label" for="film-person">Which famous film person would you love to be stranded on an island with and why?</label>
                            <textarea id="film-person" name="filmperson" class="input-area" required></textarea>
                            `;
    if (person < numPeople) {
        submitBtn.textContent = 'Next Person';
    } else {
        submitBtn.textContent = 'Get Movie';
    }

}