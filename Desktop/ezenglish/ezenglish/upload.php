<?php 
	$tempfile = $_FILES['audio_data']['tmp_name'];
	$tempID = $_FILES["audio_data"]["name"];
	$filename = substr($tempID, 0, 21);
	$filename = "voice/".$filename;
	$ID = substr($tempID, 21, strlen($tempID));
	move_uploaded_file($tempfile, $filename);

	$host = "tcp://127.0.0.1:12345";
	$fp = stream_socket_client($host, $errno, $error, 20); 
	if (!$fp)
		echo "$error ($errno)"; 
	else{
		fwrite ($fp, $filename.$ID);
		while (!feof($fp)){
			$result = fgets ($fp);	
			setcookie("score", $result, time() + 1*24*60*60*1000,"/wtlab109");
	  	}
	  	fclose ($fp);
	}
?>

