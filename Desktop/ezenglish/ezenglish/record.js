function load(){
	var audio = document.querySelector('audio');
	function captureMicrophone(callback) {
		navigator.mediaDevices.getUserMedia({audio: true}).then(callback).catch(function(error) {
			alert('Unable to access your microphone.');
			console.error(error);
		});
	}

	function stopRecordingCallback() {
		audio.srcObject = null;
		var blob = recorder.getBlob();
		audio.src = URL.createObjectURL(blob);
				
		recorder.microphone.stop();
	}

	var recorder; // globally accessible

	document.getElementById('btn-start-recording').onclick = function() {
		document.getElementById("answerArea").innerHTML =  "";
		this.disabled = true;
		captureMicrophone(function(microphone) {
			audio.srcObject = microphone;

			recorder = RecordRTC(microphone, {
				type: 'audio',
				recorderType: StereoAudioRecorder,
				desiredSampRate: 16000
			});
				
			recorder.startRecording();
				
			// release microphone on stopRecording
			recorder.microphone = microphone;
				
			document.getElementById('btn-stop-recording').disabled = false;
		});
	};
				
	document.getElementById('btn-stop-recording').onclick = function() {
		this.disabled = true;
		document.cookie="score=-1; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/wtlab109";
		recorder.stopRecording(function() {   
			var blob = recorder.getBlob();
			var videoID = getID();
			var filename =  createFilename(videoID);
			var xhr=new XMLHttpRequest();
			var fd=new FormData();
			fd.append("audio_data",blob, filename);
			xhr.open("POST","upload.php",true);
		  	xhr.send(fd);
		  	while (true){
		  		if (getCookie("score") != "-1"){
					document.getElementById("answerArea").innerHTML = "分數: " + getCookie("score");
					break;
				}
			}
		});
		document.getElementById('btn-start-recording').disabled = false;
	};
}

function createFilename(ID){
	var today = new Date();
	var year = format(today.getFullYear());
	var month = format(today.getMonth() + 1);
	var day = format(today.getDate());
	var hour = format(today.getHours());
	var minute = format(today.getMinutes());
	var second = format(today.getSeconds());
	var millisecond = millisecondFormat(today.getMilliseconds());
	var filename =  year + month + day + hour + minute + second + millisecond + ".wav" + ID;
	return filename;
}
				
function format(num){
	if(num < 10)
		num = "0" + num.toString();
	return num;
}
				
function millisecondFormat(num){
	if(num < 10)
		num = "00" + num.toString();
	else
		if(num < 100)
			num = "0" + num.toString();
	return num;
}
				
function getCookie(cname){
	var name = cname + "=";
 	var ca = document.cookie.split(';');
 	for(var i=0; i<ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name)==0) 
			return c.substring(name.length,c.length);
	}
	return "";
}
				
function getID(){
	var strUrl = location.search;
	var getPara, ParaVal;

	if (strUrl.indexOf("?") != -1) {
		getPara = strUrl.split("?");
   		ParaVal = getPara[1].split("=");
   	}
   	return ParaVal[1];
}

window.addEventListener("load", load, false);	
