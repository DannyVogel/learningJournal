import { posts } from "./data.js";

let postsRendered = 0

renderPosts(getMorePosts())

function getMorePosts(){
    const morePosts = []
    
    for(let i = postsRendered; i < (postsRendered + 3); i++){
        posts[i] && morePosts.push(posts[i])
    }

    postsRendered += morePosts.length
    
    console.log("postsRendered:", postsRendered, "length:", posts.length, "morePosts:", morePosts)

    return morePosts
}

function renderPosts(newPosts) {
    const recentPostsEl = document.querySelector(".three-posts")

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