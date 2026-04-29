import {blogData} from './data.js';

const mediaQuery = window.matchMedia('(min-width: 1085px)');
const blog = document.getElementById('blogs');
const showMore = document.getElementById('show-more');

mediaQuery.addEventListener('change', (e) => {
  renderBlog(blogData, e);
});

document.addEventListener('click', (e) => {
    if (e.target.dataset.post) {
        localStorage.setItem('selectedPostId', e.target.dataset.post);
        window.location.href = 'post.html';

    }

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
                    <a href="post.html">
                      <img class="post-img" src="${img}" data-post="${id}">
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

export function renderPost (blogPost) {
    const {title, date, text, img, id, sections} = blogPost;
    const htmlSectionText = sections.map(function (section) {
        const {heading, body} = section;
        return `
              <h1 class="section-title">${heading}</h1>
              <p class="section-description">${body}</p>
              `      
    }).join('');
    const htmlText = `
            <div class="title-section">
                <p class="desc-date">${date}</p>
                <h1 class="desc-title">${title}</h1>
                <p class="desc-text">${text}</p>
            </div>
            <img src=${img} class="title-img">
            <div class="post-body">
              ${htmlSectionText}
            </div>`;
    console.log(document.getElementById('post'));
    document.getElementById('post').innerHTML = htmlText;

}

renderBlog(blogData, mediaQuery);

