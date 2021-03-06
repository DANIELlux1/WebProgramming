-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: twitter
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tweet`
--

DROP TABLE IF EXISTS `tweet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tweet` (
  `tweetID` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(256) NOT NULL,
  `imgPath` varchar(256) DEFAULT NULL,
  `owner` varchar(45) NOT NULL,
  `internshipID` varchar(45) NOT NULL,
  `postDate` date NOT NULL,
  PRIMARY KEY (`tweetID`),
  KEY `owner_idx` (`owner`),
  KEY `internshipID` (`internshipID`),
  CONSTRAINT `internshipID` FOREIGN KEY (`internshipID`) REFERENCES `internship` (`title`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `owner` FOREIGN KEY (`owner`) REFERENCES `user` (`userName`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tweet`
--

LOCK TABLES `tweet` WRITE;
/*!40000 ALTER TABLE `tweet` DISABLE KEYS */;
INSERT INTO `tweet` VALUES (2,'I just wanted to test if I could post a random Message into chat.',NULL,'tester1','BINFO','2020-00-03'),(3,'Here is a second Message to my fellow Students in BINFO',NULL,'tester1','BINFO','2020-00-03'),(4,'Here is a second Message to my fellow Students in BINFO',NULL,'tester2','BINFO','2020-01-03'),(5,'Here is a second Message to my fellow Students in BICS',NULL,'tester2','BICS','2020-01-05'),(6,'This is a Test to see if Posting Messages works.',NULL,'tester4','BICS','2020-01-05'),(7,'This is just a random message to fill my profile.',NULL,'student1','Internship1','2020-01-05');
/*!40000 ALTER TABLE `tweet` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-05 20:21:39
