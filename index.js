import { posts } from "./data.js";

function getRandomImages() {
    posts.forEach(item => {
        item = {...item, image: "https://source.unsplash.com/random/900x700"}
    })
    console.log(posts)
}
getRandomImages()



const viewMoreBtn = document.getElementById('view-more-btn')
viewMoreBtn.addEventListener('click', () => {
    renderPosts(getMorePosts())
});

let postsRendered = 0

renderPosts(getMorePosts())

function getMorePosts(){
    const morePosts = []
    
    for(let i = postsRendered; i < (postsRendered + 6); i++){
        posts[i] && morePosts.push(posts[i])
    }

    postsRendered += morePosts.length
    
    console.log("postsRendered:", postsRendered, "length:", posts.length, "morePosts:", morePosts)

    viewMoreBtn.style.visibility = postsRendered >= posts.length ? 'hidden' : 'visible'
    
    return morePosts
}

function renderPosts(newPosts) {
    const recentPostsEl = document.querySelector(".recent-posts")

    newPosts.forEach((item) => {
        const postEl = `
        <div class="post">
            <img src="${item.image}" alt="${item.imageDesc}" class="post-image">
            <p class="post-date">${item.date}</p>
            <h1 class="post-title"><a href="./article.html" class="post-title-link" id="${item.id}">${item.title}</a></h1>
            <p class="post-summary">${item.summary}</p>     
        </div>
       `
       recentPostsEl.innerHTML += postEl
    })

    storeArticleIds()

} 


function storeArticleIds() {
    const postEls = Array.from(document.querySelectorAll(".post-title-link"))
    postEls.forEach(item => item.addEventListener('click', (e) => {
        localStorage.setItem('artId', e.target.id)
    }))
}
