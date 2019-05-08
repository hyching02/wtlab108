-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2019 年 05 月 07 日 13:46
-- 伺服器版本： 10.1.38-MariaDB
-- PHP 版本： 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `wtlab109`
--

-- --------------------------------------------------------

--
-- 資料表結構 `account`
--

CREATE TABLE `account` (
  `account` char(10) CHARACTER SET utf8 NOT NULL,
  `password` char(10) CHARACTER SET utf8 NOT NULL,
  `email` varchar(35) CHARACTER SET utf8 NOT NULL,
  `phone` char(10) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `account`
--

INSERT INTO `account` (`account`, `password`, `email`, `phone`) VALUES
('1', '1', '1@1', '1'),
('1010', '1010', '999@1010', '1010'),
('123', '123', '123', '123'),
('2', '2', '2@2', '2'),
('2586', '5555', '123@1231', 'dfewfrw'),
('3', '3', '3@3', '3'),
('444', '444', '444@444', '444'),
('4444', '4444', '4444@dfaed', '4444'),
('789789789', '789789789', '123@789', '789789789'),
('88899', '88899', '888@99', '88899'),
('999', '999', '999@999', '999'),
('aaa', 'bbb', 'aaa@aaa', '0980546'),
('qqq', 'qqq', '2131@12', 'qqq'),
('qwer', 'qwer', 'qwer@qwer', '1234567892'),
('rrr', 'rrr', 'rrr@12', 'rrr'),
('vvv', 'vvv', 'vvv@vvv', 'vvv'),
('yue', '123', '123', '123');

-- --------------------------------------------------------

--
-- 資料表結構 `sentence`
--

CREATE TABLE `sentence` (
  `videoId` varchar(13) NOT NULL,
  `timestamp` int(3) NOT NULL,
  `caption` text NOT NULL,
  `capId` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `sentence`
--

INSERT INTO `sentence` (`videoId`, `timestamp`, `caption`, `capId`) VALUES
('pt2atk-5_yQ', 67, 'It began with the forging of the great rings.', '0'),
('Rnwwo9Zol6w', 64, 'Do you have to read at the table?', '1');

-- --------------------------------------------------------

--
-- 資料表結構 `video`
--

CREATE TABLE `video` (
  `id` varchar(13) NOT NULL,
  `title` text NOT NULL,
  `tag` text NOT NULL,
  `uploadDate` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `video`
--

INSERT INTO `video` (`id`, `title`, `tag`, `uploadDate`) VALUES
('4Jxb_Ad0u3E', 'Learn/Practice English with MOVIES (Lesson #48) Title: Shrek 2', 'shrek 2, english, learn, animation', 20190417),
('JZIL0QLBs4M', 'Learn/Practice English with MOVIES (Lesson #3) Title: The Blind Side', 'english, learn, The Blind Side, movie', 20190403),
('pt2atk-5_yQ', 'Learn/Practice English with MOVIES (Lesson #2) Title: The Lord of the Rings', 'english, learn, lord of the rings, movie', 20190402),
('Q7TMqR939c8', 'Learn/Practice English with MOVIES (Lesson #50) Title: Mulan', 'mulan, animation, english, learn', 20190419),
('Rnwwo9Zol6w', 'Learn/Practice English with MOVIES (Lesson #1) Title: The Incredibles', 'english, incredibles, learn, animation', 20190401),
('v04bjEx0lus', 'Learn/Practice English with MOVIES (Lesson #49) Title: Black Panther', 'black panther, english, learn, movie', 20190418);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`account`);

--
-- 資料表索引 `sentence`
--
ALTER TABLE `sentence`
  ADD UNIQUE KEY `capId` (`capId`);

--
-- 資料表索引 `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
