<?php

include 'src/JWToken.php';

//驗證token是否存在
function verifyToken($token){
	$public_key =  file_get_contents('http://localhost/wtlab109/login/php/keys/public_key.pem');
	try {
		$data = JWToken::decode($token,$public_key,'RS256');
	}catch(Exception $e){
		setcookie("AuthOver","true",time()+(60),"/wtlab109","localhost");
		unset($_COOKIE["token"]);
		return false;
	}
	return true;
}

//回傳token的cookie內部的值(user,time)，順便會再延長token這個cookie的存在時間  好像
function getToken($token){
	$public_key =  file_get_contents('http://localhost/wtlab109/login/php/keys/public_key.pem');
	try {
		$data = JWToken::decode($token,$public_key,'RS256');
		//var_dump($data);
	}catch(Exception $e){
		setcookie("AuthOver","true",time()+(60),"/wtlab109","localhost");
		unset($_COOKIE["token"]);
		return "";
	}
	return $data;
}
?>
