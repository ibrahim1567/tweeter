$(document).ready(function () {
  
  const loadTweets = function() {
    $.ajax({ 
      method: 'GET',
      url: '/tweets',
      
    }).then((response) => {
      renderTweets(response);
      // $('#tweet-text').val("");
      $(".counter").text(140);
    });
  };
  loadTweets();
  $('#errorMessage').hide();
  

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $("#tweets-container").empty();
    for (let tweet of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  };

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  const createTweetElement = function(tweet) {
    let date = timeago.format(tweet.created_at)

    return `
    <article class="tweet">
    <header>
      <div class="info">
        <img src=${tweet.user.avatars} class="avatar"/>
        <span class="name">${tweet.user.name}</span>
        <span class="handle">${tweet.user.handle}</span>
      </div>
    </header>
    <p class="tweetData">${escape(tweet.content.text)}</p>
    <footer>
      <span class="date">${date}</span>
      <span class ="icons">
      <span id="heart" class="fas fa-heart"></span>
      <span id="retweet" class="fas fa-retweet"></span>
      <span id="flag" class="fas fa-flag"></span>
    </footer>
    </article>
    `
  };
  
  const $newTweet = $('#submit-tweet');
  // loadTweets();
  $newTweet.on('submit', function(event) {
    event.preventDefault();
    const tweet = $("#tweet-text").val().trim().length;
  if (!tweet) {
    $('#errorMessage').text("Tweet cannot be empty!")
    $('#errorMessage').slideDown("slow");
    $('#errorMessage').delay(5000).slideUp("slow");
   return;
    }

    if (tweet > 140) {
      $('#errorMessage').text("Tweet can't be longer than 140 characters!");
      $('#errorMessage').slideDown("slow");
      $('#errorMessage').delay(5000).slideUp("slow");
      return;
     } else {
      const val = $(this).serialize();
      $.ajax("/tweets", {
        method: "POST",
        data: val,
      })
      .then(() => {
        $('#errorMessage').hide();
       loadTweets();
        $("#tweet-text").val("");
        
      });


     }   
  });

});