var streamersArr = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];
var defLogo = "https://maxcdn.icons8.com/Share/icon/Users//user1600.png";

$(document).ready(function(){

  GetStreams();

  $(".custom-tab").click(function(){
    $(".custom-tab").removeClass("active-tab");
    $(this).addClass("active-tab");
    var tab = $(this).text();
    switchTabs(tab);
  });

  $(".search-input").keyup(function(){
   var text =  $(".search-input").val();
   console.log("search Text: " + text)
   search(text);
  });

});

function switchTabs(tab){
  console.log(tab);
  switch(tab){
    case "Online":
    $(".fa-check").parents(".user-tab").fadeIn("slow");
    $(".fa-exclamation").parents(".user-tab").fadeOut("fast");
    break;
    case "Offline":
    $(".fa-exclamation").parents(".user-tab").fadeIn("slow");
    $(".fa-check").parents(".user-tab").fadeOut("fast");
    break;
    default:
    $(".fa-exclamation").parents(".user-tab").fadeIn("slow");
    $(".fa-check").parents(".user-tab").fadeIn("slow");
    break;
  }
}

function GetStreams(){
  streamersArr.forEach(function(streamer){
    var link = 'https://www.twitch.tv/'+streamer;
    $.getJSON("https://wind-bow.gomix.me/twitch-api/users/" + streamer + "?callback=?",function(json){
      var logo = json['logo'] + "?callback=?";
      console.log(logo);
      $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/"+streamer+"?callback=?",function(data){
        var stream = data.stream;
        if(stream != null){
          var status = stream.channel.status;
          var streamID = stream.id;
          link+= '/'+streamID;
          $(".user-container").append("<a href="+link+" class='user-tab' target='_blank'><img class='user-img' src="+logo+"/><div class='user-info'><h5 id='userName'>"+streamer+"</h5><p>"+status+"</p><i class='fa fa-check icon-check'></i></div></a>");
          $(".fa-check").css("color","green");
        }
        else {
          $(".user-container").append("<a href="+link+" class='user-tab' target='_blank'><img class='user-img' src="+logo+" alt='profile_image'/><div class='user-info'><h5 id='userName'>"+streamer+"</h5><p>Offline</p><i class='fa fa-exclamation icon-check'></i></div></a>");
          $(".fa-exclamation").css("color","red");
        }
      });
    });
  });
}

function search(text) {
  if(text != "" && text != " "){
  var users = $(".user-info").children("h5");
  for(var i = 0; i  < users.length; i++){
    var user = users[i];
    if(user.value.match(text)){
      console.log("matched: " + user + " Text: " + text);
      users[i].innerHTML = user.replace(text,function(x){return x.innerHTML = '<mark>' + x + '</mark>'});
    }
    else {
      console.log("Not matched: " + user);
    }
  }
}
}
