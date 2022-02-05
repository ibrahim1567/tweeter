const tweetCount = 140;
    function newTweet() {
      const count = $("#tweet-text").val().length;
      $('.counter').text(tweetCount - count);
      if ($('.counter').text() < 0) {
        $('.counter').addClass('exceeded');
      } else {
        return $('.counter').removeClass('exceeded');
      }


    }
    $(document).ready(function () {
      $("#tweet-text").on('input', newTweet);
    }); 