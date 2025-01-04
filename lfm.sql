CREATE DATABASE  IF NOT EXISTS `lfm` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `lfm`;
-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: localhost    Database: lfm
-- ------------------------------------------------------
-- Server version	5.7.39

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
-- Table structure for table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cat_label` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorie`
--

LOCK TABLES `categorie` WRITE;
/*!40000 ALTER TABLE `categorie` DISABLE KEYS */;
INSERT INTO `categorie` VALUES (1,'Entrées'),(2,'Plats'),(3,'Desserts'),(4,'Boissons');
/*!40000 ALTER TABLE `categorie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `flag` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (0,' ','Aucun'),(1,'??','Laos'),(2,'??','Chine'),(3,'??','Vietnam');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id_menu` int(11) NOT NULL AUTO_INCREMENT,
  `category` int(11) DEFAULT NULL,
  `country` int(11) DEFAULT NULL,
  `subcategorie` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id_menu`),
  KEY `fk_subcat_idx` (`subcategorie`),
  KEY `fk_cat_idx` (`category`),
  KEY `fk_country_idx` (`country`),
  CONSTRAINT `fk_cat` FOREIGN KEY (`category`) REFERENCES `categorie` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_country` FOREIGN KEY (`country`) REFERENCES `country` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sub` FOREIGN KEY (`subcategorie`) REFERENCES `subcategorie` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (48,1,1,NULL,'Salade de papaye verte',10,'Papaye verte, tomate, herbes, citron vert.'),(49,1,3,0,'Nems par 3',7,'Porc ou végan.'),(50,1,2,0,'Wonton par 5',8,'Porc ou végan. Sauce cacahuète ou sauce piment.'),(51,1,1,0,'Salade de riz croustillant',10,'Hachis de porc ou protéines de soja, riz gluant, riz légumes.'),(52,1,1,0,'Rouleau de printemps Lao par 2',9,'Hachis de porc, crevettes, nouilles de riz, légumes.'),(53,1,1,0,'Rouleau de printemps Lao végan par 2',9,'Protéines de soja, nouilles de riz, légumes.'),(54,2,1,0,'Tartare de boeuf Lao (LAAP de boeuf)',15,'Hachis de boeuf aux épices, riz gluant, concombre, salade.'),(55,2,1,NULL,'Saucisse de Luang Pabang',15,'Saucisse de porc aux épices, riz gluant, concombre, salade.'),(56,2,1,0,'Emincé de boeuf grillé',15,'Boeuf mariné et grillé, riz, concombre, salade.'),(57,2,1,0,'LAP de porc',14,'Hachis de porc sauté aux légumes, riz, concombre.'),(58,2,1,0,'LAP végan',14,'Protéines de soja sauté aux légumes, riz, concombre.'),(59,2,1,0,'Porc croustillant',15,'Poitrine de porc croustilant, riz, concombre, salade.'),(60,2,2,0,'Porc caramel',14,'Poitrine de porc mijoté, riz, légumes du jour.'),(61,2,2,0,'Porc Kung Pao',13,'Poulet sauté aux légumes et cacahuètes, riz.'),(62,2,2,0,'Tofu Kung Pao',13,'Tofu sauté aux légumes et cacahuètes, riz.'),(63,2,1,1,'Soupe Khao Soi',13,'Soupe coco, curry rouge, légumes, herbes, citron vert.'),(64,2,2,1,'Soupe de nouilles',11,'Boeuf, poulet ou végan.'),(65,2,2,1,'Soupe de nouilles',12,'Crevettes.'),(66,2,2,1,'Nouilles sautées',12,'Porc croustillant, poulet ou crevettes.'),(67,2,2,1,'Mian Biang Biang porc caramel',13,''),(68,2,2,1,'Mian Biang Biang végan',12,''),(69,2,1,2,'Soupe Khao Poon',13,'Soupe coco, curry rouge, légumes, herbes, citron vert.'),(70,2,1,2,'Khao Sen',12,'Porc, poulet crevettes ou boeuf. Soupe de nouilles de riz, légumes, herbes, citron.'),(71,2,1,2,'Khao Sen',11,'Végan. Soupe de nouilles de riz, légumes, herbes, citron.'),(72,2,1,2,'Salade de nouilles et papaye verte',12,'Nouilles de riz, papaye verte, tomate, herbes, citron vert.'),(73,2,1,2,'Salade de nouilles, papaye verte et porc',14,'Porc croustillant, nouilles de riz, papaye verte, tomate, herbes, citron vert.'),(74,2,2,3,'Riz sauté porc caramel',13,'Riz, légumes, sauces, porc.'),(75,2,2,3,'Riz sauté porc poulet',12,'Riz, légumes, sauces, poulet.'),(76,2,2,3,'Riz sauté porc végan',12,'Riz, légumes, sauces, protéines de soja.'),(77,2,2,4,'Dorade vapeur en sauce chinoise',18,'Dorade entière, sauce poivre de Sichuan, riz et légumes du jour.'),(78,2,1,4,'Dorade frite façon laotienne',18,'Dorade entière, sauce tamarin, julienne de légumes, riz gluant.'),(79,2,1,4,'Emincé de pavé de boeuf mi-cuit à la laotienne',17,'Julienne de légumes, riz gluant.'),(80,2,1,4,'Pavé de saumon cuit à la laotienne',17,'Riz, légumes, sauces, protéines de soja.'),(81,3,1,0,'Gaufre Lao au lait de coco',6,''),(82,3,2,0,'Crème thé matcha et spéculos',6,''),(83,3,1,0,'Mangue riz gluant et lait de coco',7,''),(84,3,1,0,'Banane au lait de coco',6,''),(85,3,1,0,'Flan laotien',6,''),(86,3,1,0,'Boule de riz gluant au sésame',6,''),(87,3,0,0,'Fondant au chocolat',6,''),(88,4,0,0,'Sodas',3,'Coca, Coca sans sucre, Oasis tropical, Lipton pêche'),(89,4,0,0,'Boissons exotiques',4,'Lait de coco, Just de litchi ou mangue'),(90,4,0,0,'Eaux',3,'Eau minérale 50cl, Perrier 50cl'),(91,4,0,0,'Maytea',4,'Menthe ou Pêche 50cl'),(92,4,0,0,'Bières',5,'Thai Singha ??, Tsingtao ??'),(93,4,0,0,'Verre de vin',5,'rouge, blanc, rosé. (Saint Nicolas de Bourgueil, Chardonnay, Sauvignon blanc)'),(94,4,0,NULL,'Pichet de vin (50cl)',14,'rouge, blanc, rosé. (Saint Nicolas de Bourgueil, Chardonnay, Sauvignon blanc)'),(98,1,1,NULL,'Salade de papaye verte',10,'Papaye verte, tomate, herbes, citron vert.'),(99,2,1,0,'Saucisse de Luang Pabang',15,'Saucisse de porc aux épices, riz gluant, concombre, salade'),(100,1,1,0,'Salade de papaye verte',10,'Papaye verte, tomate, herbes, citron vert.');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategorie`
--

DROP TABLE IF EXISTS `subcategorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategorie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sub_label` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategorie`
--

LOCK TABLES `subcategorie` WRITE;
/*!40000 ALTER TABLE `subcategorie` DISABLE KEYS */;
INSERT INTO `subcategorie` VALUES (0,NULL),(1,'Nouilles farine de blé'),(2,'Nouilles farine de riz'),(3,'Riz sauté'),(4,'A la carte, le soir...');
/*!40000 ALTER TABLE `subcategorie` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-04 11:07:48
