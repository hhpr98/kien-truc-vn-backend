-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: apd56709_db
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `projectId` varchar(50) NOT NULL,
  `projectName` text,
  `productDetail` text,
  `projectDescription` text,
  `projectMainURL` text,
  `projectFolder` text NOT NULL,
  PRIMARY KEY (`projectId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES ('f7674e7d-29f9-4129-99cd-506b217ef8ef','Căn hộ','2 phòng ngủ, 80×80 m²','Căn hộ 2 phòng ngủ, diện tích 80×80 m², được thiết kế tối ưu hóa không gian sống hiện đại và tiện nghi. Với tổng diện tích lên tới 160 m², căn hộ mang lại cảm giác rộng rãi, thoáng đãng, phù hợp cho gia đình trẻ hoặc các cặp đôi đang tìm kiếm không gian sinh hoạt đẳng cấp. Hai phòng ngủ được bố trí thông minh, đảm bảo sự riêng tư và thoải mái, cùng với khu vực phòng khách, bếp và ban công đón nắng tự nhiên. Căn hộ còn được trang bị đầy đủ nội thất hiện đại, giúp tiết kiệm thời gian và công sức cho việc trang trí. Với vị trí đắc địa, gần các tiện ích như siêu thị, trường học và bệnh viện, căn hộ này là lựa chọn lý tưởng cho những ai yêu thích cuộc sống năng động và tiện nghi.','/images/du-an/du-an-1/4069ed6493eb20b579fa10.jpg','');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-12 12:25:39
