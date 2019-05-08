var url = window.location.toString();
var id = url.split("=")[1];

//sets the sentences in the list
function setSentence(vid){
  var sentence = document.getElementById("sentence");
  var list = document.getElementById("sentenceList");

  $.each(vid, function(){
    var s = document.createElement('li');
    s.setAttribute('class', "list-group-item");

    var button = document.createElement('button');
    button.setAttribute("style", "margin: 5px;");
    button.setAttribute('class', "w3-button w3-round-large w3-black");
    button.setAttribute('onclick', "playSentence(" + this.timestamp + ")");
    button.innerHTML = "play";

    var record = document.createElement('button');
    record.setAttribute("style", "margin: 5px;");
    record.setAttribute('class', "w3-button w3-round-xxlarge w3-grey");
    record.setAttribute('onclick', "showRecordArea()" );
    record.innerHTML = "<i class='fa fa-microphone'></i>";

    s.appendChild(button);
    s.appendChild(document.createTextNode(this.caption));
    s.appendChild(record);

    list.appendChild(s);
  });
}

//jump to a certain time in the video
function playSentence(timestamp){
  var playVid = document.getElementById("thumbnail");
  playVid.setAttribute("src", "http://www.youtube.com/embed/" + id + "?start=" + timestamp + "&autoplay=1");
}

function searchKey(){
  var input = document.getElementById("keyword").value;
  if(input == ""){
    window.alert("please enter a search value!");
    return false;
  }
}

function showRecordArea(){
	var area = document.getElementById("recordArea");
	area.style = "margin:10px";
}

//set the embedded video and sentences
function load(){
  $.ajax({
    url: 'vidRender.php?v=' + id,
    type: "GET",
    dataType: 'json',
    success: function(vid){
      setSentence(vid);
    },
    error: function(jqXHR, textStatus, errorThrown){
      console.log( errorThrown);
    }
  });

  var playVid = document.getElementById("thumbnail");
  playVid.setAttribute("src", "http://www.youtube.com/embed/" + id);
}

window.addEventListener("load", load, false);
