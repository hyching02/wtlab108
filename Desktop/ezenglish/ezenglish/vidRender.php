<?php
include "login/php/DB_information.php";
$DBname = "wtlab109";

// Create connection
$conn = new mysqli($DBhost, $DBuser, $DBpass);
mysqli_select_db($conn, $DBname);

  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  $id = $_GET['v'];
  $sql = "SELECT `timestamp`, caption FROM video, sentence where video.id = '$id' AND sentence.videoId = '$id' ";
  $result = mysqli_query($conn, $sql);

  $return_arr = array();
  while ($row = mysqli_fetch_array($result)) {
    array_push($return_arr,$row);
  }

  echo json_encode($return_arr);

  mysqli_free_result($result);
  mysqli_close($conn);
?>
