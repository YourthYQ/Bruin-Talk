-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2024-02-05 12:38:20
-- 服务器版本： 5.7.44-log
-- PHP 版本： 7.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `chatroom`
--

-- --------------------------------------------------------

--
-- 表的结构 `Friendships`
--

CREATE TABLE `Friendships` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `friendId` int(11) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `status_is` varchar(255) NOT NULL DEFAULT '1',
  `notes` varchar(255) NOT NULL,
  `marks` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `Friendships`
--

INSERT INTO `Friendships` (`id`, `userId`, `friendId`, `status`, `status_is`, `notes`, `marks`, `createdAt`, `updatedAt`) VALUES
(60, 12, 20, 'accepted', '1', '1', 'admin12', '2024-02-06 17:27:00', '2024-02-06 17:27:00'),
(67, 20, 12, 'accepted', '1', '1', 'admin12', '2024-02-06 17:52:37', '2024-02-06 17:52:37'),
(69, 12, 3, 'accepted', '1', '1', 'admin2', '2024-02-06 21:21:17', '2024-02-06 21:21:17'),
(70, 3, 12, 'accepted', '1', '1', 'admin2', '2024-02-06 21:21:45', '2024-02-06 21:21:45'),
(71, 22, 21, 'pending', '1', '1', 'admin44', '2024-02-06 21:23:52', '2024-02-06 21:23:52'),
(73, 23, 22, 'accepted', '1', '1', 'admin44', '2024-02-06 21:24:00', '2024-02-06 21:24:00'),
(76, 22, 23, 'accepted', '1', '1', 'admin44', '2024-02-06 21:26:11', '2024-02-06 21:26:11'),
(79, 23, 6, 'pending', '1', '1', 'admin55', '2024-02-06 21:39:03', '2024-02-06 21:39:03'),
(80, 3, 14, 'pending', '1', '1', 'admin2', '2024-02-06 21:39:11', '2024-02-06 21:39:11'),
(85, 3, 20, 'accepted', '1', '1', 'admin2', '2024-02-06 21:47:56', '2024-02-06 21:56:01'),
(87, 23, 3, 'accepted', '1', '1', 'admin2', '2024-02-06 21:48:24', '2024-02-06 21:48:24'),
(89, 3, 22, 'accepted', '1', '1', 'admin44', '2024-02-06 21:49:00', '2024-02-06 21:49:00'),
(90, 22, 3, 'accepted', '1', '1', 'admin44', '2024-02-06 21:49:19', '2024-02-06 21:49:19'),
(93, 20, 3, 'accepted', '1', '1', 'admin2', '2024-02-06 21:56:01', '2024-02-06 21:56:01');

-- --------------------------------------------------------

--
-- 表的结构 `Msgs`
--

CREATE TABLE `Msgs` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `friendId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `sortId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `Msgs`
--

INSERT INTO `Msgs` (`id`, `content`, `friendId`, `userId`, `sortId`, `createdAt`, `updatedAt`) VALUES
(7, '111', 3, 12, 1, '2024-02-05 23:32:12', '2024-02-05 23:32:12'),
(8, 'sdf ', 12, 3, 1, '2024-02-05 23:32:17', '2024-02-05 23:32:17'),
(9, '事实上', 12, 3, 1, '2024-02-05 23:35:34', '2024-02-05 23:35:34'),
(10, '上午好', 12, 3, 1, '2024-02-06 11:28:37', '2024-02-06 11:28:37'),
(11, '123', 3, 12, 1, '2024-02-06 11:28:44', '2024-02-06 11:28:44'),
(12, '3', 3, 12, 1, '2024-02-06 11:28:57', '2024-02-06 11:28:57'),
(13, '22', 12, 3, 1, '2024-02-06 11:29:32', '2024-02-06 11:29:32'),
(14, 'sdf', 3, 12, 1, '2024-02-06 11:30:02', '2024-02-06 11:30:02'),
(15, '-', 12, 3, 1, '2024-02-06 16:01:41', '2024-02-06 16:01:41'),
(16, '00', 12, 20, 1, '2024-02-06 17:27:06', '2024-02-06 17:27:06'),
(17, 'iio', 20, 12, 1, '2024-02-06 17:27:11', '2024-02-06 17:27:11'),
(18, '‘', 12, 20, 1, '2024-02-06 17:28:43', '2024-02-06 17:28:43'),
(19, '品牌', 20, 12, 1, '2024-02-06 17:29:10', '2024-02-06 17:29:10'),
(20, '123', 20, 12, 1, '2024-02-06 17:32:36', '2024-02-06 17:32:36'),
(21, '12331', 20, 12, 1, '2024-02-06 17:32:53', '2024-02-06 17:32:53'),
(22, 'pp', 20, 12, 1, '2024-02-06 17:37:32', '2024-02-06 17:37:32'),
(23, 'f ', 20, 12, 1, '2024-02-06 17:38:00', '2024-02-06 17:38:00'),
(24, '234', 12, 20, 1, '2024-02-06 17:38:13', '2024-02-06 17:38:13'),
(25, 'pp', 20, 12, 1, '2024-02-06 17:39:16', '2024-02-06 17:39:16'),
(26, 'pp', 12, 20, 1, '2024-02-06 17:39:23', '2024-02-06 17:39:23'),
(27, 'pp', 12, 20, 1, '2024-02-06 17:39:53', '2024-02-06 17:39:53'),
(28, '00', 12, 20, 1, '2024-02-06 17:41:27', '2024-02-06 17:41:27'),
(29, 'pdf', 12, 20, 1, '2024-02-06 17:41:50', '2024-02-06 17:41:50'),
(30, '[[[', 12, 20, 1, '2024-02-06 17:42:31', '2024-02-06 17:42:31'),
(31, 'kk', 12, 20, 1, '2024-02-06 17:43:54', '2024-02-06 17:43:54'),
(32, 'ds', 20, 12, 1, '2024-02-06 17:44:09', '2024-02-06 17:44:09'),
(33, 'halo', 12, 3, 1, '2024-02-06 21:21:27', '2024-02-06 21:21:27'),
(34, '412421', 3, 12, 1, '2024-02-06 21:21:32', '2024-02-06 21:21:32'),
(35, '我发现我不删除你了', 12, 3, 1, '2024-02-06 21:21:58', '2024-02-06 21:21:58'),
(36, '你还好吗', 3, 12, 1, '2024-02-06 21:22:03', '2024-02-06 21:22:03'),
(37, '初次见面', 23, 22, 1, '2024-02-06 21:24:12', '2024-02-06 21:24:12'),
(38, '你好，晚上好', 22, 23, 1, '2024-02-06 21:24:19', '2024-02-06 21:24:19'),
(39, '123', 22, 23, 1, '2024-02-06 21:24:59', '2024-02-06 21:24:59'),
(40, '加过的就会自动加上', 23, 22, 1, '2024-02-06 21:25:19', '2024-02-06 21:25:19'),
(41, '好的', 22, 23, 1, '2024-02-06 21:25:23', '2024-02-06 21:25:23'),
(42, '', 22, 23, 1, '2024-02-06 21:25:30', '2024-02-06 21:25:30'),
(43, '水电费', 22, 23, 1, '2024-02-06 21:25:33', '2024-02-06 21:25:33'),
(44, '123', 22, 23, 1, '2024-02-06 21:25:55', '2024-02-06 21:25:55'),
(45, '4444', 23, 22, 1, '2024-02-06 21:26:16', '2024-02-06 21:26:16'),
(46, 'ffff', 22, 23, 1, '2024-02-06 21:26:18', '2024-02-06 21:26:18'),
(47, '12123', 22, 23, 1, '2024-02-06 21:26:25', '2024-02-06 21:26:25'),
(48, '44', 22, 23, 1, '2024-02-06 21:27:16', '2024-02-06 21:27:16'),
(49, '123', 23, 22, 1, '2024-02-06 21:28:54', '2024-02-06 21:28:54'),
(50, '123', 22, 23, 1, '2024-02-06 21:28:57', '2024-02-06 21:28:57'),
(51, '444', 22, 23, 1, '2024-02-06 21:29:12', '2024-02-06 21:29:12'),
(52, '13123', 23, 22, 1, '2024-02-06 21:29:47', '2024-02-06 21:29:47'),
(53, 'sdf', 22, 23, 1, '2024-02-06 21:29:59', '2024-02-06 21:29:59'),
(54, 'dsf', 22, 23, 1, '2024-02-06 21:32:05', '2024-02-06 21:32:05'),
(55, '111', 22, 23, 1, '2024-02-06 21:34:47', '2024-02-06 21:34:47'),
(56, '1', 22, 23, 1, '2024-02-06 21:35:51', '2024-02-06 21:35:51'),
(57, 'sdf', 22, 23, 1, '2024-02-06 21:36:38', '2024-02-06 21:36:38'),
(58, 'sdf', 22, 23, 1, '2024-02-06 21:37:18', '2024-02-06 21:37:18'),
(59, 'sdf', 22, 23, 1, '2024-02-06 21:38:31', '2024-02-06 21:38:31'),
(60, 'sdf', 22, 23, 1, '2024-02-06 21:40:09', '2024-02-06 21:40:09'),
(61, '123', 22, 23, 1, '2024-02-06 21:41:47', '2024-02-06 21:41:47'),
(62, '1123', 22, 23, 1, '2024-02-06 21:41:50', '2024-02-06 21:41:50'),
(63, 'sdf', 22, 23, 1, '2024-02-06 21:42:19', '2024-02-06 21:42:19'),
(64, '22', 22, 23, 1, '2024-02-06 21:43:10', '2024-02-06 21:43:10'),
(65, '123', 22, 23, 1, '2024-02-06 21:44:03', '2024-02-06 21:44:03'),
(66, '123', 23, 3, 1, '2024-02-06 21:44:21', '2024-02-06 21:44:21'),
(67, '123', 3, 23, 1, '2024-02-06 21:44:47', '2024-02-06 21:44:47'),
(68, '44', 3, 23, 1, '2024-02-06 21:45:07', '2024-02-06 21:45:07'),
(69, '14', 23, 3, 1, '2024-02-06 21:46:00', '2024-02-06 21:46:00'),
(70, '123', 22, 23, 1, '2024-02-06 21:46:30', '2024-02-06 21:46:30'),
(71, '123', 3, 23, 1, '2024-02-06 21:47:10', '2024-02-06 21:47:10'),
(72, 'fff', 23, 3, 1, '2024-02-06 21:47:14', '2024-02-06 21:47:14'),
(73, 'ff', 3, 23, 1, '2024-02-06 21:47:32', '2024-02-06 21:47:32'),
(74, 'gang', 23, 3, 1, '2024-02-06 21:47:35', '2024-02-06 21:47:35'),
(75, 'fadf', 22, 3, 1, '2024-02-06 21:49:04', '2024-02-06 21:49:04'),
(76, 'gggg', 3, 22, 1, '2024-02-06 21:49:24', '2024-02-06 21:49:24'),
(77, 'ggg', 22, 3, 1, '2024-02-06 21:49:29', '2024-02-06 21:49:29');

-- --------------------------------------------------------

--
-- 表的结构 `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT '1',
  `types` varchar(255) NOT NULL DEFAULT 'offline',
  `socketId` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `friendId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `Users`
--

INSERT INTO `Users` (`id`, `username`, `password`, `status`, `types`, `socketId`, `createdAt`, `updatedAt`, `userId`, `friendId`) VALUES
(3, 'admin2', '$2a$10$TXUGludQRGB2rYLLpBJUHOI1wli.BFi8TDOF6qvEdgS0j/97i7Db.', '1', 'offline', '', '2024-02-05 23:05:51', '2024-02-06 22:38:47', NULL, NULL),
(6, 'admin5', '$2a$10$6UfWKhhZ4KdYy9k4T.Ksl.tuqyuzKj/ImL/Y3q1sP95yTOBsdvJc2', '1', 'offline', '', '2024-02-05 23:05:58', '2024-02-05 23:06:14', NULL, NULL),
(7, 'admin6', '$2a$10$nKw5x5RUduN/O8GyqxrWoePVC/JBY9raxfa/ibKzCPWtqhpTwLjFy', '1', 'offline', '1', '2024-02-05 23:06:00', '2024-02-05 23:06:00', NULL, NULL),
(12, 'admin1', '$2a$10$zZXKh2QjUNzfYwiA5ODaQ.TafznBc.r0DX.z1zbHsh/V6vxBa33k2', '1', 'offline', '', '2024-02-05 23:31:28', '2024-02-06 21:22:49', NULL, NULL),
(13, 'admin3', '$2a$10$HIwwPeK6I6Lwqy8zGbnkm.bLWbgr03wU3iUJiL2UvrOJMbPW7CvYK', '1', 'offline', '', '2024-02-05 23:31:31', '2024-02-06 16:00:55', NULL, NULL),
(14, 'admin4', '$2a$10$0ExGPQFRlTn7laYBMyeMJuCScMK3tScwsnaWY60owk5iSXmHfBi0S', '1', 'offline', '1', '2024-02-05 23:31:33', '2024-02-05 23:31:33', NULL, NULL),
(15, 'admin7', '$2a$10$z4Lfci15TQQ0zO0hAkPNoeWdcb9/816n98D1/C1wnL4CLNt.N8r5.', '1', 'offline', '1', '2024-02-05 23:31:36', '2024-02-05 23:31:36', NULL, NULL),
(16, 'admin8', '$2a$10$o8OlQ2zkknV3GuWaveoyS.OjvNPhH43/qQ0C4W1pn8pgEpNColT1u', '1', 'offline', '1', '2024-02-05 23:31:38', '2024-02-05 23:31:38', NULL, NULL),
(17, 'admin9', '$2a$10$irMUhTcrIlhNrKZJfYWOX.BYcS94qx8So5CKCRD.CTo50jYGAbXE.', '1', 'offline', '', '2024-02-05 23:31:40', '2024-02-06 16:11:49', NULL, NULL),
(18, 'admin10', '$2a$10$c9Jqi7sO1cBTAZNxA.ht0uGrRYie96cfJkRoDJ/jEyVFQuXmd8U/e', '1', 'offline', '', '2024-02-05 23:31:43', '2024-02-06 17:19:22', NULL, NULL),
(19, 'admin11', '$2a$10$.MDO6txVo3pdI2X/sS9tluBV4.iVc05kpDw6sqxJ1lPtopbfGUeRu', '1', 'offline', '1', '2024-02-05 23:31:44', '2024-02-05 23:31:44', NULL, NULL),
(20, 'admin12', '$2a$10$Ejs0icDQ3iCwUIAjzpMUhuBIeYg.uNtUZUtoXR8h0UaTcGZzkRhdu', '1', 'offline', '', '2024-02-05 23:31:46', '2024-02-06 22:38:47', NULL, NULL),
(21, 'admin13', '$2a$10$WKBYcAAySdqjHn1zjiiv/uJyIFjx/7pR3Wh3W7gH2tYpheXQEWKCq', '1', 'offline', '1', '2024-02-05 23:31:48', '2024-02-05 23:31:48', NULL, NULL),
(22, 'admin44', '$2a$10$wpXX.sKuqRKEF86yuugth.mrNzBE5NLwK/vxyIa6zdfMmb7KZLITW', '1', 'offline', '', '2024-02-06 21:23:05', '2024-02-06 21:49:33', NULL, NULL),
(23, 'admin55', '$2a$10$HT12nZjJ70t.ldqoOz3Ht.TUinQLEQnGiZZVsCyjj6YCI1r3HlUTS', '1', 'offline', '', '2024-02-06 21:23:18', '2024-02-06 21:48:34', NULL, NULL);

--
-- 转储表的索引
--

--
-- 表的索引 `Friendships`
--
ALTER TABLE `Friendships`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Friendships_userId_friendId_unique` (`userId`,`friendId`),
  ADD KEY `friendId` (`friendId`);

--
-- 表的索引 `Msgs`
--
ALTER TABLE `Msgs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- 表的索引 `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `username_2` (`username`),
  ADD UNIQUE KEY `password` (`password`),
  ADD UNIQUE KEY `password_2` (`password`),
  ADD KEY `Users_userId_foreign_idx` (`userId`),
  ADD KEY `Users_friendId_foreign_idx` (`friendId`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `Friendships`
--
ALTER TABLE `Friendships`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- 使用表AUTO_INCREMENT `Msgs`
--
ALTER TABLE `Msgs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- 使用表AUTO_INCREMENT `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- 限制导出的表
--

--
-- 限制表 `Friendships`
--
ALTER TABLE `Friendships`
  ADD CONSTRAINT `Friendships_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Friendships_ibfk_2` FOREIGN KEY (`friendId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `Msgs`
--
ALTER TABLE `Msgs`
  ADD CONSTRAINT `Msgs_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- 限制表 `Users`
--
ALTER TABLE `Users`
  ADD CONSTRAINT `Users_friendId_foreign_idx` FOREIGN KEY (`friendId`) REFERENCES `Friendships` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Users_userId_foreign_idx` FOREIGN KEY (`userId`) REFERENCES `Friendships` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
