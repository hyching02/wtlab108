function getCookie(name) {
  var arg = escape(name) + "=";
  var nameLen = arg.length;
  var cookieLen = document.cookie.length;
  //console.log(cookieLen);
  var i = 0;
  while (i < cookieLen) {
    var j = i + nameLen;
    if (document.cookie.substring(i, j) == arg) return getCookieValueByIndex(j);
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break;
  }
  return null;
}

function getCookieValueByIndex(startIndex) {
  var endIndex = document.cookie.indexOf(";", startIndex);
  if (endIndex == -1) endIndex = document.cookie.length;
  return unescape(document.cookie.substring(startIndex, endIndex));
}

$(document).ready(function () {
  $token = getCookie("token");
  // console.log($token);
  $.ajax({
    url: "login/php/navSigninCheck.php",
    type: "GET",
    
    success: function (account) {
      // console.log("Account Show Data");
      console.log(account);
      $("#memberName").html("Hi !  " + account);
      $("#acc").html(account);
      getInfo(account);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // console.log(errorThrown);
    }
  });
  console.log($('#acc').html())
  
});

function logout() {
  var now = new Date();
  now.setTime(now.getTime() - 1000 * 600);
  document.cookie = "token=null;expires=" + now.toGMTString() + ";path=/wtlab109;domain=localhost";
  //document.cookie = "token=null;expires="+now.toGMTString()+";path=/wtlab108;domain=140.127.74.168";
  window.location = window.location.toString();
}

function check() {
  var loginText = "<div class='w3-container'>"+
      "<a onclick='w3_close()' class='w3-hide-large w3-right w3-jumbo w3-padding w3-hover-grey' title='close menu'>"+
          "<i class='fa fa-remove'></i>"+
      "</a>"+
      "<img src='image/user.jpg' style='width:45%;' class='w3-round'><br><br>"+
      "<h4><b id='memberName'>user</b></h4>"+
  "</div>"+
  "<div class='w3-bar-block'>"+
      "<a href='home.html' class='w3-bar-item w3-button w3-padding w3-text-teal'><i"+
              "class='fa fa-th-large fa-fw w3-margin-right'></i>首頁</a>"+
      "<a href='personalinfo.html' class='w3-bar-item w3-button w3-padding'><i class='fa fa-user fa-fw w3-margin-right'></i>帳號管理</a>"+
      "<a class='w3-bar-item w3-button w3-padding'><i class='fa fa-play-circle w3-margin-right'></i>音檔管理</a>"+
      "<a onclick='logout()' class='w3-bar-item w3-button w3-padding'><i"+
              "class='fa fa-sign-out w3-margin-right'></i>登出</a>"+
  "</div>";

  if (getCookie("token") != "" && getCookie("token") != null) {
    if (!getCookie("authOver")) {
      var sideBar = document.getElementById("mySidebar");
      sideBar.innerHTML = loginText;
    }
  }
}

function getInfo(account){
  $.ajax({
    url: "personalinfo.php",
    type: "GET",
    data: {"acc": account},
    dataType: 'json',
    success: function (a) {
      console.log("Account Show Data");
      console.log(a);
      $("#phone").val(a[0].phone);
      $("#email").html(a[0].email);


    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });
}
