var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubePlayerAPIReady() {
  player = new YT.Player('player', {
    playerVars: { 'rel': 0, 'autoplay': 1, 'controls': 0,'autohide':1,'showinfo': 0, 'wmode':'opaque' },
    videoId: 'ZCuvdJNiKco',
    //suggestedQuality: 'hd720',
    events: {
      'onReady': onPlayerReady}
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.setPlaybackQuality('1080p');
  //$(".video").fitVids();
  
  $('.video i').on('click',function() {
    if ($('.video').hasClass('on')) {

      $('.video').removeClass('on');
    } else {

      $('.video').addClass('on');
    }
  });
  
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.BUFFERING) {
        event.target.setPlaybackQuality('1080p');
    }
}

$(document).ready(function() {
  
  var time = 1; // time in seconds

  var $progressBar,
      $bar, 
      $elem, 
      isPause, 
      tick,
      percentTime;

  //Init the carousel
  $("#owl-example").owlCarousel({
    items: 1,
    slideSpeed : 500,
    paginationSpeed : 500,
    singleItem : true,
    afterInit: progressBar,
    afterMove : moved,
    startDragging : pauseOnDragging
  });

  //Init progressBar where elem is $("#owl-demo")
  function progressBar(elem){

    $elem = elem;
    // building playing slideshow
    buildButtons();
    
    $('.columns:last-child').on('click',function() {
      if ($('#owl-example .slide-' + $(this).data('slide')).hasClass('open')) {
        //isPause = false;
        $('#owl-example .slide-' + $(this).data('slide')).removeClass('open');
      } else {
        //isPause = true;
        $('#owl-example .slide-' + $(this).data('slide')).addClass('open');
      }
    });
      
    $('.fa-pause').on('click',function() {
      isPause = false;
      $(this).fadeOut(0);
      $('.fa-play').fadeIn();
    });
    
    $('.fa-play').on('click',function() {
      isPause = true;
      $(this).fadeOut(0);
      $('.fa-pause').fadeIn();
    });
    
    setTimeout(function(){
      $('.slide-1 .columns:last-child').trigger('click');
    }, 1000); 
    
    //build progress bar elements
    buildProgressBar();
    //start counting
    start();
  }

  //create div#progressBar and div#bar then prepend to $("#owl-demo")
  function buildProgressBar(){
    $progressBar = $("<div>",{
      id:"progressBar"
    });
    $bar = $("<div>",{
      id:"bar"
    });
    $progressBar.append($bar).prependTo($elem);
  }
  
  function buildButtons() {
  }

  function start() {  
    //reset timer
    percentTime = 0;
    isPause = false;
    //run interval every 0.01 second
    tick = setInterval(interval, 10);
  };

  function interval() {
    if(isPause === false){
      percentTime += 1 / time;
      $bar.css({
        width: percentTime+"%"
      });
      //if percentTime is equal or greater than 100
      if(percentTime >= 100){
        //slide to next item 
        $elem.trigger('owl.next')
      }
    }
  }

  //pause while dragging 
  function pauseOnDragging(){
    isPause = true;
  }

  //moved callback
  function moved(){
    
    if (isPause == false) {
      //clear interval
      clearTimeout(tick);
      //start again
      start();
      //player.pauseVideo();
    }
    
  }

  //uncomment this to make pause on mouseover 
  // $elem.on('mouseover',function(){
  //   isPause = true;
  // })
  // $elem.on('mouseout',function(){
  //   isPause = false;
  // })
     
});