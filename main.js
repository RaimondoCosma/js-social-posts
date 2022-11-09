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
        "content": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
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
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..",
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
        "content": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
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
        "content": "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.",
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
    // Modifico alt dell'avatar
    postItem.querySelector('.profile-pic').setAttribute('alt', post.author.name);
    // Variabile sull'avatar con controllo
    if ( post.author.image ){
        postItem.querySelector('.profile-pic').setAttribute('src', post.author.image);
    } else {
        postItem.querySelector('.profile-pic').remove();
        postItem.querySelector('.post-meta__icon').innerHTML = onlyCapitalLetters(post.author.name);
    }
    // Imposto id delle foto
    postItem.querySelector('.js-like-button').setAttribute('data-postid', post.id);
    // Imposto contenuto del testo
    postItem.querySelector('.post__text').innerHTML = post.content;
    // Imposto le immagini postate
    postItem.querySelector('.post__image img').setAttribute('src', post.media);
    // Imposto i like
    postItem.querySelector('.js-likes-counter').innerHTML = post.likes;
    // Imposto id dei like
    postItem.querySelector('.js-likes-counter').setAttribute('id', `like-counter-${post.id}`)
    
    postsContainer.append(postItem);
}
    
// Creo array nel quale andrò ad inserire i post con il mi piace
let likedPost = [];

for ( let i = 0; i < posts.length; i++ ){
    const post = posts[i];
    // Dichiaro variabile bottone tramite attributo data-postid
    let likeButton = document.querySelector(`[data-postid="${post.id}"]`);
    // Dichiaro variabile per il counter dei like
    let likeCounter = document.querySelector(`#like-counter-${post.id}`);
    // Aggiungo evento click al bottone
    likeButton.addEventListener('click', function(e){
        e.preventDefault();
        // Imposto le condizioni per cambiare colore al tasto 'Mi piace', modificare counter dei like, aggiornare array dei post con il like
        if ( likeButton.classList.contains('like-button--liked') ){
            likeButton.classList.remove('like-button--liked');
            likeCounter.innerHTML = Number(likeCounter.innerHTML) - 1;
        // Rimuovo id dall'array se tolgo il mi piace  
        for( let i = 0; i < likedPost.length; i++){         
            if ( likedPost[i] === post.id) {         
                likedPost.splice(i, 1); 
            }        
        }
        } else {
            likeButton.classList.add('like-button--liked');
            likeCounter.innerHTML = Number(likeCounter.innerHTML) + 1;
            likedPost.push(post.id);
        }
    })
}
