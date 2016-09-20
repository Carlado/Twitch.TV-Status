var apiLink = "https://api.twitch.tv/kraken/streams/"; // Default Twitch API Link
var imageLink = "https://api.twitch.tv/kraken/users/" //Twitch Logo Link

// Streamers to be added in list
var streamers = ["Swebliss","Sodapoppin", "MedryBW", "FreeCodeCamp", "Syndicate", "Riotgames", "Nightblue3", "LIRIK", "Brunofin"];

$(document).ready(function() {

  // Get full API of each stream
  for (var i = 0; i < streamers.length; i++) {

    streamData(apiLink + streamers[i], i); // Pass full API link and current streamer to streamData function
    buildList(i); // Start to build streamer list with current streamer in loop
  }

  //JSON request for stream info
  function streamData(link, user) {
    var current = "." + streamers[user];

    $.ajax({
      type: 'GET',
      url: link,
      headers: {
        'Client-ID': CLIENT_ID
      },
      success: function(json) {
        if (json.stream) { // Check if streamer is online
          console.log("Online" + current);
          var streamStatus = json.stream.channel.status;
          if (streamStatus.length > 70) { // Slice too long status
            streamStatus = streamStatus.substring(0, 67) + "...";
          }
          $(current).find('.stream-content').append('<p class="streaminfo">' + streamStatus + '</p>');
          $(current).addClass("online"); // Set class to online

        } else {

          $(current).addClass("offline"); // Set class to offline
        }

      },
    }).fail(function() {
      //Not available message of JSON request failed
      $(current).find('.stream-content').append('<p class="streaminfo">Twitch account currently unavailable</p>');
      $(current).addClass("offline"); //Set class to offline
    });



  }

  //Append stream info to list
  function buildList(i) {
    var streamerInfo = '<li class="listitem ' + streamers[i] + '"><img id="logo' + streamers[i] + '" class="userlogo"></img><div class="stream-content"><a class="stream-link" target="_blank" href="http://twitch.tv/' + streamers[i] + '">' + streamers[i] + '</a></div></li>';
    $('.userlist').append(streamerInfo);

    //JSON request for img info
    $.ajax({
      url: imageLink + streamers[i],
      headers: {
        'Client-ID': CLIENT_ID
      },
      success: function(data) {
        //Add logo to existing img tag
        $("#logo" + streamers[i]).attr("src", data.logo);
        //If no logo, use twitch logo.
        if (data.logo === null) {
          $("#logo" + streamers[i]).attr("src", "http://orig05.deviantart.net/377c/f/2013/134/b/2/twitch_tv_logo_by_pixpox-d65akmn.png");
        }
      }
    });

  }

  // Hide and show selection menu choices on click
  $(".onlinebtn").on("click", function() {
    $(".offline").hide();
    $(".online").show();
  });

  $(".offlinebtn").on("click", function() {
    $(".online").hide();
    $(".offline").show();
  });

  $(".allbtn").on("click", function() {
    $(".online").show();
    $(".offline").show();
  });

});
