function searchKey(){
  var input = document.getElementById("keyword").value;
  if(input != ""){
    $.ajax({
      url: "searchVid.php",
      type: "GET",
      data: {"keyword": input},
      dataType:'json',
      success: function(vidLi){
        showList(vidLi);
      },
      error: function(jqXHR, textStatus, errorThrown){
        console.log( errorThrown);
      }
    });
  }
  else{
    window.alert("please enter a search value!");
  }
}

function showList(vidLi){
  var vidList = document.getElementById("search_result");
  $.each(vidLi, function(){
    var li = document.createElement("li");
    li.style = "padding: 3px";
    var a = document.createElement("a");
    var liDiv = document.createElement("div");
    var thumb = document.createElement("div");
    var img = document.createElement("img");
    var content = document.createElement("div");

    a.href = "watch.php?v=" + this.id;
    liDiv.setAttribute('class', "w3-row-padding");
    thumb.setAttribute('class', "w3-col");
    thumb.style = "width: 300px";
    img.src = "https://img.youtube.com/vi/" + this.id + "/hqdefault.jpg";
    img.style = "width: 100%";
    content.setAttribute('class', "w3-rest");
    content.innerHTML = this.title;

    li.appendChild(a);
    a.appendChild(liDiv);
    liDiv.appendChild(thumb);
    liDiv.appendChild(content);
    thumb.appendChild(img);
    vidList.appendChild(li);
  })
}

function load(){
  searchKey();
}

window.addEventListener("load", load, false);
