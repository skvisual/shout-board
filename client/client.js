const form = document.querySelector('form'); // GRABS THE FORM ELEMENT FROM THE HTML FILE
const API_URL = "http://localhost:8080/tweets"
const postsElement = document.querySelector('.posts');

allPosts();

form.addEventListener('submit', (event) => { // ADDS AN EVENT LISTENER TO TO THE FORM ELEMENT

    event.preventDefault(); // PREVENTS THE PAGE FROM REFRESHING UPON CLICKING SUBMIT

    console.log('form submitted');
    
    const formData = new FormData(form); // USES THE FORMDATA OBJECT TO COLLECT THE DATA FROM THE FORM

    const name = formData.get('name');
    const content = formData.get('content');

    const tweet = { // CREATS A TWEET OBJECT WITH THE FORM DATA

        name,
        content
    }

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(tweet),
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json())
    .then(createdTweet => {
        console.log(createdTweet);
        form.reset()
        allPosts();
    })
    
    console.log(tweet);  
    

})

function allPosts() {
    postsElement.innerHTML = ''
    fetch(API_URL)
        .then(res => res.json())
        .then(posts => {
            posts.reverse()
            // console.log(posts);
            posts.forEach(tweet => {
                const div = document.createElement('div')

                const header = document.createElement('h3')
                header.textContent = tweet.name;

                const contents = document.createElement('p');
                contents.textContent = tweet.content;

                const date = document.createElement('small');
                date.textContent = new Date(tweet.created)

                div.appendChild(header);
                div.appendChild(contents);
                div.appendChild(date);

                postsElement.appendChild(div);
                
            })
            
        })
}
