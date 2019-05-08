<?php

$servername = "localhost";
$username = "root";
$password = "root";
$DBname = "wtlab109";

// Create connection
$conn = new mysqli($servername, $username, $password);
mysqli_select_db($conn, $DBname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//perform sql search
$account = $_GET['acc'];
$sql = "SELECT * FROM account WHERE account = '$account' ";
$result = mysqli_query($conn, $sql);

// $row = mysqli_fetch_array($result);

// $row = array(
//     $result_array['phone'],
//     $result_array['email']
// );
// echo $row;



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


// $return_arr = array();
// if(mysqli_num_rows($result) > 0){
//   while ($row = mysqli_fetch_assoc($result)) {
//     $row_array = $row;
//     array_push($return_arr,$row_array);
//   }
// }

// //回傳json形式
// echo json_encode($return_arr);
// mysqli_free_result($result);

// mysqli_close($conn);
