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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(45) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(45) NOT NULL,
  `name` varchar(45) DEFAULT 'Unknown',
  `category` varchar(45) DEFAULT 'Student',
  `profilePic` varchar(45) DEFAULT 'https://i.stack.imgur.com/34AD2.jpg',
  `_token` varchar(256) DEFAULT NULL,
  `deactivated` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `userName_UNIQUE` (`userName`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (3,'root','root@admin.com','admin','Unknown','admin','https://i.stack.imgur.com/34AD2.jpg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJyb290IiwiaWF0IjoxNTc4MjUxMDk5LCJleHAiOjE1NzgyNTE2OTl9._Sr_-uMnKxLMkoXpaI03SBGFhEx6TMWPvSCeN-PWyVI',0),(4,'tester1','tester1@testservice.com','123456','Tester John','Student','https://i.stack.imgur.com/34AD2.jpg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJ0ZXN0ZXIxIiwiaWF0IjoxNTc4MjQyOTA5LCJleHAiOjE1NzgyNDM1MDl9.KFs5gdR6FR7ZhwgRqz3uVPtMh7LOo7OY3Pm0XmdAPlQ',0),(7,'tester2','tester2@testservice.com','password','Tester Bob','Supervisor','https://i.stack.imgur.com/34AD2.jpg','null',0),(13,'testSupervisor','superTester@testservice.com','superVisor','Supervisor Frank','Supervisor','https://i.stack.imgur.com/34AD2.jpg',NULL,0),(14,'tester4','test4@test.com','000000','Tester Created on Client','Student','https://i.stack.imgur.com/34AD2.jpg','null',0),(19,'SuccessTester','test@test234.com','success','hello','Supervisor','https://i.stack.imgur.com/34AD2.jpg',NULL,1),(20,'student1','student1@school.lu','student1','Test Student','Student','https://i.stack.imgur.com/34AD2.jpg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJzdHVkZW50MSIsImlhdCI6MTU3ODI1MTc4MCwiZXhwIjoxNTc4MjUyMzgwfQ.LPK8p7Et77L94PJ5pD_UR2LOc-pcIZ47pZqsYApLGpM',0),(21,'vm','vm@school.lu','password','Test Supervisor','Supervisor','https://i.stack.imgur.com/34AD2.jpg',NULL,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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
