CREATE TABLE `rorrusers` (
  `rorrId` int(11) NOT NULL AUTO_INCREMENT,
  `rorrEmail` varchar(40) NOT NULL,
  `rorrPassword` varchar(40) NOT NULL,
  `rorrFullName` varchar(40) NOT NULL,
  PRIMARY KEY (`rorrId`),
  UNIQUE KEY `rorrEmail` (`rorrEmail`),
  UNIQUE KEY `rorrPassword` (`rorrPassword`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4
