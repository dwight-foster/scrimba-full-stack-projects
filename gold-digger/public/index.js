
const eventSource = new EventSource('/api/price');

const priceDisplay = document.getElementById('price-display');
const investForm = document.getElementById('invest-form');
const investmentSummary = document.getElementById('investment-summary');
const closeDialog = document.getElementById('close-dialog');
const investmentAmount = document.getElementById('investment-amount')
const connectionStatus = document.getElementById('connection-status');
const generatePDF = document.getElementById('generate-pdf');
const numTransactions = document.getElementById('num-transactions');


eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const price = data.price;
    priceDisplay.innerText = price;
    if (connectionStatus.innerText !== 'Live Price 🟢') {
        connectionStatus.innerText = 'Live Price 🟢';
    }
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
    numTransactions.innerText = 1 + Number(numTransactions.innerText);
    
})

closeDialog.addEventListener('click', () => investmentSummary.parentElement.close());

generatePDF.addEventListener('click', () => {
    if (numTransactions.innerText !== "0") {
        fetch('./api/generate', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({type: 'pdf'})
        });
    }
})