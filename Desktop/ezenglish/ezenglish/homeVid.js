function searchKey(){
  var input = document.getElementById("keyword").value;
  if(input == ""){
    window.alert("please enter a search value!");
    return false;
  }
}

function showGrid(vid){
  var grid = document.getElementsByName("vidGrid");
  var thumbArr = [];
  var titleArr = [];
  $.each(grid,function(){
    thumbArr.push(this.getElementsByTagName("img")[0]);
    titleArr.push(this.getElementsByTagName("b")[0]);
  });

  //show video in the grid, hide the grid cells without a video inside
  if(grid.length <= vid.length){
    for(var i = 0; i < grid.length; i++){
      grid[i].href = "watch.php?v=" + vid[i].id;
      thumbArr[i].src = "https://img.youtube.com/vi/" + vid[i].id + "/hqdefault.jpg";
      titleArr[i].innerHTML = vid[i].title;
      grid[i].style.display = 'block';
    }
  }
  else{
    for(var i = 0; i < vid.length; i++){
      grid[i].href = "watch.php?v=" + vid[i].id;
      thumbArr[i].src = "https://img.youtube.com/vi/" + vid[i].id + "/hqdefault.jpg";
      titleArr[i].innerHTML = vid[i].title;
    }
    for(var i = vid.length; i < grid.length; i++){
      grid[i].style.display = 'none';
    }
  }
}

function load(){
  $.ajax({
    url: 'latestVid.php',
    dataType: 'json',
    success: function(vid){
      showGrid(vid);
    },
    error: function(jqXHR, textStatus, errorThrown){
      console.log( errorThrown);
    }
  });

}

window.addEventListener("load", load, false);
