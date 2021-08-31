//variables
const tweetList = document.getElementById('tweet-list');





//Event Listeners
eventListeners();

function eventListeners(){
    //Form submission
    document.querySelector('#form').addEventListener('submit',newTweet);

    tweetList.addEventListener('click', removeTweet);

    //Document
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}





//Functions
function newTweet(e){
    e.preventDefault();

    //Read the textarea value

    const tweet = document.getElementById('tweet').value;
    console.log(tweet);

    // create remove button
    const remove = document.createElement('a');
    remove.classList = 'remove-tweet';
    remove.textContent = 'X';

    //create an element
     const li = document.createElement('li');
     li.textContent = tweet;
    tweetList.appendChild(li);

    //Add X to each tweet
    li.appendChild(remove);

    //add to the list
    tweetList.appendChild(li)
    //add to local storage
    addTweetLocalStorage(tweet);

    //print alert
    alert('Tweet Added');

    this.reset();
}

// Remove the tweet
function removeTweet(e){
    if(e.target.classList.contains('remove-tweet')) {
        e.target.parentElement.remove();
    }
    

    //remove from local storage
    removeTweetLocalStorage(e.target.parentElement.textContent);
}

function addTweetLocalStorage(tweet) {

    let tweets = getTweetsFromStorage();

    //add to array
    tweets.push(tweet);

    //convert to string
    localStorage.setItem('tweets',JSON.stringify(tweets));
}

function getTweetsFromStorage() {
    let tweets;
    const tweetsLS = localStorage.getItem('tweets'); 
    //Get values, if null -> create empty array
    if( tweetsLS=== null) {
        tweets = [];
    }else{
        tweets = JSON.parse(tweetsLS);
    }
    return tweets;
}

function localStorageOnLoad(){
    let tweets = getTweetsFromStorage();
    
    //Loop through storage and print values
    tweets.forEach( function(tweet) {
        // create remove button
        const remove = document.createElement('a');
        remove.classList = 'remove-tweet';
        remove.textContent = 'X';

        //create an element
        const li = document.createElement('li');
        li.textContent = tweet;
        tweetList.appendChild(li);

        //Add X to each tweet
        li.appendChild(remove);

        //add to the list
        tweetList.appendChild(li)
    })
}

function removeTweetLocalStorage(tweet) {
    //get tweets from storage
    let tweets = getTweetsFromStorage();


    //remove x from tweet
    const tweetDelete = tweet.substring(0,tweet.length -1);

    //loop through the tweet and remove the tweet that matches
    tweets.forEach(function(tweetsLS,index) {
        if(tweetDelete === tweetsLS){
            tweets.splice(index, 1);
        }
    });
    //save the data
    localStorage.setItem('tweets', JSON.stringify(tweets));
} 
