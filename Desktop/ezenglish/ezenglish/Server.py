#!/usr/bin/python3
import os
import socket
import difflib
import pymysql

def searchData(vid):
	db = pymysql.connect(host='localhost', port=3306, user='root', passwd='', db='wtlab109', charset='utf8')
	cursor = db.cursor()
	sql = "SELECT caption FROM sentence WHERE videoId='" + vid + "'"
	cursor.execute(sql)
	data = cursor.fetchone()
	db.close()
	return data[0]
	
def hitScore(ans,result):
	score = ""
	temp = difflib.SequenceMatcher(None,ans,result).ratio()
	temp = (str)(round(temp*100, 2))
	if len(temp) > 5:
		for k in range(0,4):
			score += temp[k]
	else:
		for l in range(0,len(temp)):
			score += temp[l]
	print("分數 : %s" % (score))
	return score

def getResult():
	if os.path.isfile('temp.txt'):
		f = open('temp.txt', 'r')
		result = f.read()
	return result

def main():
	s = socket.socket()  
	host = "127.0.0.1"  
	port = 12345  
	s.bind((host, port))  

	s.listen(5)  
	while True:
		c, addr = s.accept()  
		print("連接：", addr)
	
		task = str(c.recv(1024))
		filename = ""
		videoId = ""
	
		for i in range(2,29): 
			filename += task[i]
		for j in range(29,len(task)-1):
			videoId += task[j]

		ans = searchData(videoId)
		print("音檔路徑 : /opt/lampp/htdocs/wtlab109/" + filename)    
		print("例句 : " + ans)
		os.system("deepspeech --model models/output_graph.pbmm --alphabet models/alphabet.txt --lm models/lm.binary --trie models/trie --audio /opt/lampp/htdocs/wtlab109/" + filename )

		result = getResult()
		score = hitScore(ans,result)
		msg = str.encode(score)
		c.send(msg)
		c.close()
		os.remove('temp.txt')
		print("--------------------------------------------------------------")

if __name__ =='__main__':
    main()
