document.getElementById('color-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const color = document.getElementById('color-picker').value.slice(1);
    const mode = document.getElementById('modes').value;
    const queryString = `https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}`
    console.log(queryString);
    fetch(queryString) 
        .then(res => res.json())
        .then(data => {
            const colors = data.colors;
            const htmlString = colors.map((c) => {
                return `        
                        <div class="color-container">
                            <div class="color" style="background-color: ${c.hex.value};">

                            </div>
                            <div class="hex">
                                ${c.hex.value}
                            </div>
                        </div>`;

            }).join('');
            document.getElementById('colors').innerHTML = htmlString;
        });

    
});