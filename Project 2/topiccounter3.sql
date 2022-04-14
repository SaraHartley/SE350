-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2022 at 09:32 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reactdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `topiccounter3`
--

CREATE TABLE `topiccounter3` (
  `CookieId` int(255) NOT NULL,
  `Animal` int(255) NOT NULL,
  `Funny` int(255) NOT NULL,
  `News` int(255) NOT NULL,
  `Political` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `topiccounter3`
--

INSERT INTO `topiccounter3` (`CookieId`, `Animal`, `Funny`, `News`, `Political`) VALUES
(1, 0, 0, 0, 0),
(46, 7, 5, 6, 5),
(47, 7, 5, 6, 5),
(48, 7, 5, 6, 5),
(49, 7, 5, 6, 5),
(50, 7, 5, 6, 5),
(51, 7, 5, 6, 5),
(52, 7, 5, 6, 5),
(53, 7, 5, 6, 5),
(54, 7, 5, 6, 5),
(55, 7, 5, 6, 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `topiccounter3`
--
ALTER TABLE `topiccounter3`
  ADD PRIMARY KEY (`CookieId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `topiccounter3`
--
ALTER TABLE `topiccounter3`
  MODIFY `CookieId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
