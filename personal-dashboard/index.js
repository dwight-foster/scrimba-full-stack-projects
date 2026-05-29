
const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature");
const data = await res.json();
const scrollers = document.querySelectorAll('.scroller');
const addTicker = document.getElementById('add-ticker');
const tickerForm = document.getElementById('ticker-form');
const tickerInput = document.getElementById('ticker-input');
const token = "YOUR_API_KEY";

let stocks;
console.log(localStorage.getItem('stocks'));
if (localStorage.getItem('stocks')) {
  stocks = JSON.parse(localStorage.getItem('stocks'));
} else {
  stocks = ['aapl', 'spy', 'msft', 'tsla','qqq', 'nvda', 'govt', 'amzn', 'goog', 'brk.b', 'meta', 'iyy', 'wmt', 'ba'];
  localStorage.setItem('mySavedList', JSON.stringify(stocks));
}



document.body.style.backgroundImage = `url(${data.urls.raw})`;
document.getElementById('author').innerText = data.user.name;

function getTime () {
    const date = new Date();
    document.getElementById('time').innerText = date.toLocaleTimeString("en-US", {'timeStyle': 'short'})
}
getTime();
setInterval(getTime, 1000);

navigator.geolocation.getCurrentPosition(async position => {
    try {
        const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        const data = await res.json();
        const url = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.getElementById('city').innerText = data.name;
        document.getElementById('weather').innerHTML = ` <img src="${url}"/>
                                                        <p>${data.main.temp} F</p>`;
    } catch(err) {console.log(err);}

});

async function getStockData(tickers) {
  const results = await Promise.all(
    tickers.map(ticker =>
      fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker.toUpperCase()}&token=${token}`)
        .then(res => res.json())
        .then(data => ({ ticker, data }))
        .catch(err => ({ ticker, error: true }))
    )
  );

  let htmlString = '<div class="scroller"><ul class="scroller__inner">';
  results.forEach(r => {
    if (!r.error) {
      const data = r.data;
      const color = data.c < data.pc ? 'red' : 'green';
      htmlString += `<li class="ticker ${color}">${r.ticker.toUpperCase()} $${data.c} ${data.d}</li>`;
    }
  });
  htmlString += '</ul></div>';
  document.getElementById('ticker-display').innerHTML = htmlString;
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (document.fonts) {
      await document.fonts.ready;
    }
    requestAnimationFrame(addAnimation);
  }
}

function addAnimation() {
  const scrollers = document.querySelectorAll('.scroller'); // query now, after HTML inserted
  scrollers.forEach(scroller => {
    const scrollerInner = scroller.querySelector('.scroller__inner');
    const scrollerContent = Array.from(scrollerInner.children);
    const styles = getComputedStyle(scrollerInner);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const originalWidth = scrollerInner.scrollWidth;

    scrollerContent.forEach(item => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute('aria-hidden', true);
      scrollerInner.appendChild(duplicatedItem);
    });

    scrollerInner.style.setProperty('--scroll-distance', `${originalWidth + gap}px`);
    scroller.setAttribute('data-animated', true);
  });
}

getStockData(stocks);
setInterval(() => getStockData(stocks), 60000);

async function getNewsData() {
  try {
    const res = await fetch(`https://finnhub.io/api/v1/news?category=general&token=${token}`);
    const data = await res.json();
    let htmlText = '';
    data.slice(0,10).forEach(news => {
        htmlText += `<a href='${news.url}'>${news.headline}</a>`
    });
    document.getElementById('headlines').innerHTML = htmlText;
  } catch (err) {
    console.log(err);
  }

}

getNewsData();
setInterval(getNewsData, 300000);

addTicker.addEventListener('click', () => {
  console.log(tickerForm.style.display);
  if (tickerForm.style.display !== 'flex') {
      tickerForm.style.display = 'flex';
  } else {
    tickerForm.style.display = 'none';
  }
  
});

tickerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const ticker = tickerInput.value.toUpperCase();
  tickerInput.value = '';
  stocks.push(ticker);
  localStorage.setItem('stocks', JSON.stringify(stocks));

})
