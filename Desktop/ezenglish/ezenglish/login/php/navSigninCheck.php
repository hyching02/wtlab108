<?php
  //包含解token的部分及資料庫的部分
  include "DB_information.php";
  include "verifyToken.php";

  $DBname = "wtlab109";
	$conn = mysqli_connect($DBhost, $DBuser, $DBpass) ;//連接資料庫
	mysqli_query($conn,"SET NAMES utf8");
	mysqli_select_db($conn,$DBname);
	header('Content-Type: application/json;charset=utf-8');

	$token = $_COOKIE['token'];

  //這邊傳入verifyToken的方法verifyToken 和getToken 去尋找token內部的值username 和time

	if(verifyToken($token)){
	  $data = getToken($token);

    $acc = $data->UserName; //將data內的username取出放入acc

    echo $acc;
	}else{
    echo "Guest";   //<-這個不用想太多  只是我懶得去寫如果沒登入會跳首頁的狀況
	}
?>
