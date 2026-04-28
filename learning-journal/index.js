import {blogData} from './data.js';

const mediaQuery = window.matchMedia('(min-width: 1085px)');


function render (blogData) {
    const htmlText = blogData.map(function (post) {
        const {title, date, text, img} = post;
        return `
                <div class="post">
                    <img class="post-img" src="${img}">
                    <div class="post-text">
                        <p class="post-date">${date}</p>
                        <h3 class="post-title">${title}</h3>
                        <p class="post-desc">${text}</p>
                    </div>

                </div>
        `;
    }).join('');
    document.getElementById('blogs').innerHTML = htmlText;
    document.getElementById('show-more').innerHTML = '<a href="#">View More<a>'
}

render(blogData);

mediaQuery.addEventListener('change', (e) => {
  if (e.matches) {
    render(blogData.slice(0, 6));
  } else {
    render(blogData.slice(0,3));
  }
});