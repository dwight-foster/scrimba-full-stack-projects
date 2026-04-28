import {blogData} from './data.js';

const mediaQuery = window.matchMedia('(min-width: 1085px)');
const blog = document.getElementById('blogs');
const showMore = document.getElementById('show-more');

function render (blogData, e) {
    if (e.matches) {
      blogData = blogData.slice(0, 6);
    } else {
      blogData = blogData.slice(0, 3);

    }
    console.log(mediaQuery.matches);
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
    if (blog) {
      blog.innerHTML = htmlText;
    }
    if (showMore) {
      showMore.innerHTML = '<a href="#">View More<a>'
    }
}

render(blogData, mediaQuery);

mediaQuery.addEventListener('change', (e) => {
  render(blogData, e);
});