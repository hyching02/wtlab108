<?php

include "login/php/DB_information.php";
$DBname = "wtlab109";

// Create connection
$conn = new mysqli($DBhost, $DBuser, $DBpass);
mysqli_select_db($conn, $DBname);

$id = $_GET['v'];

$sql = "SELECT title FROM video where id = '$id'";
$result = mysqli_query($conn, $sql);

$row = mysqli_fetch_array($result);

echo $row['title'];

mysqli_free_result($result);
mysqli_close($conn);
?>
