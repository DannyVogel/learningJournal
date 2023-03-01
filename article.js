import { posts } from "./data.js";

const id = localStorage.getItem('artId');

const selectedPost = posts.filter(item => item.id == id)
console.log(posts, id, selectedPost)

const postEl = `
    <div class="selected-post ">
        <div class="post-text-container">
            <p class="selected-post-date">${selectedPost[0].date}</p>
            <h1 class="selected-post-title">${selectedPost[0].title}</h1>
            <p class="selected-post-summary">${selectedPost[0].summary}</p>
        </div>
        <div class="img-container">
            <img src="${selectedPost[0].image}" alt="${selectedPost[0].imageDesc}" class="selected-post-image">
        </div>
        <div class="post-text-container">
            <p class="selected-post-text">${selectedPost[0].text}</p>
        </div>
    </div>`

document.getElementById("main").innerHTML = postEl

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
