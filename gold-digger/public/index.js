
const eventSource = new EventSource('/api/price');

const priceDisplay = document.getElementById('price-display');
const investForm = document.getElementById('invest-form');
const investmentSummary = document.getElementById('investment-summary');
const closeDialog = document.getElementById('close-dialog');
const investmentAmount = document.getElementById('investment-amount')


eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const price = data.price;
    priceDisplay.innerText = price;
}

eventSource.onerror = () => {
    console.log("connection error");
}

investForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const investAMNT = investmentAmount.value;
    const price = priceDisplay.innerText;
    const goldAmount = investAMNT / price;
    const date = new Date();
    const content = {
        date: date.toISOString(),
        investmentAmount: investAMNT,
        price: price,
        goldAmount: goldAmount
    };

    fetch('./api', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(content)
    });
    investmentAmount.value = '';
    investmentSummary.innerText= `You just bought ${goldAmount} ounces (ozt) for £${investAMNT}. \n You will receive documentation shortly.`;
    investmentSummary.parentElement.showModal();
    console.log(investmentSummary.childNodes);
})

closeDialog.addEventListener('click', () => investmentSummary.parentElement.close());