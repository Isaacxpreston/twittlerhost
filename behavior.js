$(document).ready(function () {

    var issaKnife = document.createElement('audio');
    issaKnife.setAttribute('src', 'issaknife.mp3');

    function makeNewPosition(){

        var nh = Math.floor(Math.random() * $(window).height());
        var nw = Math.floor(Math.random() * $(window).width());

        return [nh,nw];

    }

    function makeNewPosition2(){

        var nh = Math.floor(Math.random() * $(window).height()) - 100;
        var nw = Math.floor(Math.random() * $(window).width()) - 100;

        return [nh,nw];

    }


    function animateDiv(){
        var newq = makeNewPosition2();
        $('.savage').animate({ top: newq[0], left: newq[1]}, 3000, function(){
            animateDiv();
        });
    };

    animateDiv();

    $(".savage").click(function () {
        document.body.style.background = "black";

        setTimeout(function(){
            document.body.style.background = "grey";
        }, 750);

        $('.savage').attr('src','21savage.png');

        setTimeout(function(){
                $('.savage').attr('src','bird.png');
        }, 750);

        issaKnife.play();
    });

    var printTweets = function (context) {
        var source;

        if (context === 'all') {
            source = streams.home;
        } else if (context) {
            source = streams.users[context];
        };

        for (var i = source.length - 1; i >= 0; i--) {

            var tweet = source[i];
            var $tweet = $('<div class = "tweet"></div>');
            $tweet.css({top: makeNewPosition()[0], left: makeNewPosition()[1]});

            var $user = $('<a></a>');
            $user.attr({'href': '#', 'data-user': tweet.user, 'class': 'username'});
            $user.text('@' + tweet.user);
            $user.appendTo($tweet);

            $tweet.append(tweet.message + "<br>");

            var $tweetTime = $('<div class = "timestamp"></div>');
            var readableTime = moment(tweet.created_at).fromNow();
            $tweetTime.text(readableTime);
            $tweetTime.appendTo($tweet);

            $tweet.appendTo(".divbody");
        };

        $('.username').on('click', function() {
            $(".tweet").remove()
            printTweets($(this).data('user'));
        });
    };

    $('.savage').on('click', function() {
        printTweets('all');
    });

});

