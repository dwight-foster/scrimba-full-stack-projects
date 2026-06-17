const preferenceForm = document.getElementById('preference-form');
const submitBtn = document.getElementById('submit-btn');
const inputSection = document.getElementById('input-section');
const title = document.getElementById('title');
const header = document.getElementById('header');
const individualPrefs = [];
let personNum = 1;
let numPeople;
let hours;

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
        const res = await fetch('/api/query', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(moviePrefs)
        });
        const chatResponse = await res.json();
        const { message } = chatResponse;
        console.log(JSON.parse(message));
        const { name, description } = JSON.parse(message)[0];
        console.log(message[0]);
        inputSection.innerHTML = `
                                <div class='output-text'>
                                    <h1 class='movie-title'>${name}</h1>
                                    <p class='movie-description'>${description}</p>
                                </div>                        
        `
        header.innerHTML = '';
        submitBtn.textContent = "Go Again";
    }  else {
        header.innerHTML = `<img src="images/popcorn.png" class="header-image">
                    <h1 class="header-title" id="title">PopChoice</h1>`;
        inputSection.innerHTML = `
                    <textarea class="input-area first-page" name="people" placeholder="How many people?"></textarea>
                    <textarea class="input-area first-page" name="time" placeholder="How much time do you have?"></textarea> 
                    `;
        submitBtn.textContent = "Let's Go";

    }
    
    // if (submitBtn.textContent === `Let's Go`) {
    //     const data = new FormData(preferenceForm);
    //     let output = {};
    //     for (const entry of data) {
    //         output[entry[0]] = entry[1]; 
    //     }
    //     inputSection.innerHTML = `<img src='./images/loading.gif'>`
    //     const res = await fetch('/api/query', {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(output)
    //     });
    //     const chatResponse = await res.json();
    //     const { message } = chatResponse;
    //     console.log(message);
    //     inputSection.innerHTML = `<div class='output-text'>${message}</div>`;
    //     submitBtn.textContent = "Go Again";
    // }  else {
    //     inputSection.innerHTML = `
    //                 <label class="input-label" for="favorite-movie">What's your favorite movie and why?</label>
    //                 <textarea id="favorite-movie" name="favoritemovie" class="input-area"></textarea>
    //                 <label class="input-label" for="movie-age">Are you in the mood for something new or a classic?</label>
    //                 <textarea id="movie-age" name="movieage" class="input-area dark-text"></textarea>
    //                 <label class="input-label" for="movie-type">Do you wanna have fun or do you want something serious?</label>
    //                 <textarea id="movie-type" name="movietype" class="input-area dark-text"></textarea>
    //                 `;
    //     submitBtn.textContent = "Let's Go";

    // }

})

function displayQuestionsPage(person, numPeople) {
    title.innerText = person;
    inputSection.innerHTML = `
                            <label class="input-label" for="favorite-movie">What's your favorite movie and why?</label>
                            <textarea id="favorite-movie" name="favoritemovie" class="input-area"></textarea>
                            <legend class="input-label">Are you in the mood for something new or a classic?</legend>
                            <div class="radio-div">
                                <input class="radio-btn" type="radio" id="new" name="era" value="New"/>
                                <label class="radio-label" for="new">New</label>
                                <input class="radio-btn" type="radio" id="classic" name="era" value="Classic"/>
                                <label class="radio-label" for="classic">Classic</label>
                            </div>
                            <legend class="input-label">What are you in the mood for?</legend>
                            <div class="radio-div">
                                <input class="radio-btn" type="radio" id="fun" name="mood" value="Fun"/>
                                <label class="radio-label" for="fun">Fun</label>
                                <input class="radio-btn" type="radio" id="serious" name="mood" value="Serious"/>
                                <label class="radio-label" for="serious">Serious</label>
                                <input class="radio-btn" type="radio" id="inspiring" name="mood" value="Inspiring"/>
                                <label class="radio-label" for="inspiring">Inspiring</label>      
                                <input class="radio-btn" type="radio" id="scary" name="mood" value="Scary"/>
                                <label class="radio-label" for="scary">Scary</label>                          
                            </div>
                            <label class="input-label" for="film-person">Which famous film person would you love to be stranded on an island with and why?</label>
                            <textarea id="film-person" name="filmperson" class="input-area"></textarea>
                            `;
    if (person < numPeople) {
        submitBtn.textContent = 'Next Person';
    } else {
        submitBtn.textContent = 'Get Movie';
    }

}