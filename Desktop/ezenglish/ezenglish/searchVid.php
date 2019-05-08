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

//perform sql search
$keyword = $_GET['keyword'];
$sql = "SELECT id, title FROM video WHERE tag like '%".$keyword."%' ";
$result = mysqli_query($conn, $sql);

//procces result
$return_arr = array();
if(mysqli_num_rows($result) > 0){
  while ($row = mysqli_fetch_assoc($result)) {
    $row_array = $row;
    array_push($return_arr,$row_array);
  }
}

//回傳json形式
echo json_encode($return_arr);
mysqli_free_result($result);

mysqli_close($conn);
?>
