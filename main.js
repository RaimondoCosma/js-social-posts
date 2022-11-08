/* ------------------------
    FUNCTION
------------------------ */
function onlyCapitalLetters (str) {
    return str.replace(/[^A-Z]+/g, "");
}

/* ------------------------
    MAIN
------------------------ */
const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

// Dichiaro variabile relativa al container dei posts
const postsContainer = document.querySelector('.posts-list');

// Ciclo per inserire i poost dinamicamente
for ( let i = 0; i < posts.length; i++ ){
    const post = posts[i];
    const postItem = document.getElementById('template-posts').content.cloneNode(true);
    // Imposto nomi degli autori
    postItem.querySelector('.post-meta__author').innerHTML = post.author.name;
    // Imposto data creazione
    postItem.querySelector('.post-meta__time').innerHTML = new Date(post.created).toLocaleDateString();
    // Variabile sull'avatar con controllo provvisorio
    if ( post.author.image ){
        postItem.querySelector('.profile-pic').setAttribute('src', post.author.image);
    } else {
        postItem.querySelector('.profile-pic').remove();
        postItem.querySelector('.post-meta__icon').innerHTML = onlyCapitalLetters(post.author.name);
    }
    // Imposto id delle foto
    postItem.querySelector('.js-like-button').setAttribute('data-postid', post.id);
    // Imposto le immagini postate
    postItem.querySelector('.post__image img').setAttribute('src', post.media);
    // Imposto i like
    postItem.querySelector('.js-likes-counter').innerHTML = post.likes;
    // Imposto id dei like
    postItem.querySelector('.js-likes-counter').setAttribute('id', `like-counter-${post.id}`)
    
    postsContainer.append(postItem);
}
    
// Creo array nel quale andrò ad inserire i post con il mi piace
const likedPost = [];
console.log(likedPost);
for ( let i = 0; i < posts.length; i++ ){
    const post = posts[i];
    let likeButton = document.querySelector(`[data-postid="${post.id}"]`);
    let likeCounter = document.querySelector(`#like-counter-${post.id}`);
    likeButton.addEventListener('click', function(){
        if ( likeButton.classList.contains('like-button--liked') ){
            likeButton.classList.remove('like-button--liked');
            likeCounter.innerHTML = Number(likeCounter.innerHTML) - 1;
        } else {
            likeButton.classList.add('like-button--liked');
            likeCounter.innerHTML = Number(likeCounter.innerHTML) + 1;
        }
    })
    likedPost.push(post.id);
}
