import {blogData} from './data.js';

const mediaQuery = window.matchMedia('(min-width: 1085px)');
const blog = document.getElementById('blogs');
const showMore = document.getElementById('show-more');

document.addEventListener('click', (e) => {
    
});

function renderBlog (blogData, e) {
    if (e.matches && window.location.pathname === "/learning-journal/index.html") {
      blogData = blogData.slice(0, 6);
    } else {
      blogData = blogData.slice(0, 3);

    }
    
    const htmlText = blogData.map(function (post) {
        const {title, date, text, img, id, _} = post;
        return `
                <div class="post">
                    <a href="#" data-post="${id}">
                      <img class="post-img" src="${img}">
                    </a>
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

function renderPost (blogPost) {
    

}

renderBlog(blogData, mediaQuery);

mediaQuery.addEventListener('change', (e) => {
  renderBlog(blogData, e);
});