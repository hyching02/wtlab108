<?php
include "src/JWToken.php";
// With algo(Algorithm) -	RSA (Public Key/Private Key pair)
include "DB_information.php";
$DBname = "wtlab109";

//connect to database
$connection = mysqli_connect($DBhost, $DBuser, $DBpass);
echo "connect correct";
mysqli_query($connection, "SET NAMES utf8");
mysqli_select_db($connection, $DBname);
header("Content-Type: application/json;charset=utf-8");

$account = $_POST['account'];
$password = $_POST['password'];

//對下面判斷帳號密碼是否正確的函數的回傳值做出不同的動作
if (checkAccount($account, $password, $connection)) {
    packageToken($account);
    //PHP 建立cookie的方法
    //setcookie("名字","值","到期時間","cookie適用的路徑(/代表整個網域都可以用)",網域,secure(Cookie只能透過https的方式傳輸),httpOnly(Cookie只限被伺服端存取，無法在用戶端讀取))
    setcookie("failToLogin", null, time() - 360000, "/wtlab109", "localhost");
    header("Location:http://localhost/wtlab109/home.html");
} else {
    $failToLogin = $_COOKIE["failToLogin"];
    $failToLogin += 1;
    setcookie("failToLogin", $failToLogin, time() + (300), "/wtlab109", "localhost");
    header("Location:http://localhost/wtlab109/login/login.html");
}
/*if account exist , then
     *1. generate authentication and save in cookie
     *2. header("Location: http://example.com/myOtherPage.php"); where to generate json(data from DB)
     *else direct error message*/

//判斷帳號密碼是不是對的
function checkAccount($account, $password, $connection)
{
    $sql = "SELECT * FROM `account` Where account = '$account' AND password = '$password'";
    $result = mysqli_query($connection, $sql);
    $row = mysqli_fetch_array($result);

    if ($row['account'] == $account && $row['password'] == $password) {
        return true;
    } else {
        return false;
    }
}


//這邊去把資料寫成JWT
function packageToken($account)
{
    $time = date('Y-m-d H:i:s', time() + 21600);
    //$UserName = $account;
    $payload = array(
         'UserName' => "$account",
        'Time' => "$time"
     );
    $private_key = file_get_contents('keys/private_key.pem');
    $token = JWToken::encode($payload, $private_key, 'RS256');
    setcookie("token", $token, time() + (3600), "/wtlab109", "localhost", 0, 0);
}
