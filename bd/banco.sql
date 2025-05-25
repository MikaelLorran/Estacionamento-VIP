-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: estacionamento_vip
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `faturas`
--

DROP TABLE IF EXISTS `faturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faturas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reserva_id` int NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `status` enum('pendente','pago') COLLATE utf8mb4_unicode_ci DEFAULT 'pendente',
  `data_geracao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `reserva_id` (`reserva_id`),
  CONSTRAINT `faturas_ibfk_1` FOREIGN KEY (`reserva_id`) REFERENCES `reservas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faturas`
--

LOCK TABLES `faturas` WRITE;
/*!40000 ALTER TABLE `faturas` DISABLE KEYS */;
INSERT INTO `faturas` VALUES (1,55,100.00,'pago','2025-05-16 21:49:47');
/*!40000 ALTER TABLE `faturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `vaga_id` int NOT NULL,
  `data` date NOT NULL,
  `horario_inicio` time NOT NULL,
  `horario_fim` time DEFAULT NULL,
  `status` enum('pendente','confirmada','cancelada','encerrada') COLLATE utf8mb4_unicode_ci NOT NULL,
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `data_confirmacao` date DEFAULT NULL,
  `hora_confirmacao` time DEFAULT NULL,
  `data_saida` date DEFAULT NULL,
  `hora_saida` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `vaga_id` (`vaga_id`),
  CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`vaga_id`) REFERENCES `vagas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
INSERT INTO `reservas` VALUES (41,1,1,'2025-05-15','23:00:00',NULL,'cancelada','2025-05-16 02:09:16',NULL,NULL,NULL,NULL),(42,1,1,'2025-05-15','10:00:00',NULL,'encerrada','2025-05-16 03:10:05','2025-05-16','00:10:13','2025-05-16','00:10:21'),(43,1,1,'2025-02-15','23:00:00',NULL,'cancelada','2025-05-16 03:20:41',NULL,NULL,NULL,NULL),(44,1,1,'2025-05-15','23:00:00',NULL,'cancelada','2025-05-16 03:21:31',NULL,NULL,NULL,NULL),(45,1,1,'2025-05-15','23:00:00',NULL,'encerrada','2025-05-16 03:21:56','2025-05-16','00:22:01','2025-05-16','00:22:08'),(46,1,1,'2025-05-16','00:40:00',NULL,'cancelada','2025-05-16 03:30:57',NULL,NULL,NULL,NULL),(47,1,1,'2025-05-16','01:00:00',NULL,'cancelada','2025-05-16 03:39:58',NULL,NULL,NULL,NULL),(48,1,1,'2025-05-16','19:00:00',NULL,'cancelada','2025-05-16 21:45:04',NULL,NULL,NULL,NULL),(49,1,1,'2025-05-16','19:00:00',NULL,'encerrada','2025-05-16 21:45:29','2025-05-16','18:45:33','2025-05-16','18:45:40'),(50,1,1,'2025-05-16','19:00:00',NULL,'encerrada','2025-05-16 21:46:10','2025-05-16','18:46:19','2025-05-16','18:46:30'),(51,1,1,'2025-05-17','20:28:00',NULL,'encerrada','2025-05-16 23:28:19','2025-05-16','20:28:33','2025-05-16','20:28:38'),(52,1,1,'2025-05-17','10:30:00',NULL,'encerrada','2025-05-17 00:20:25','2025-05-16','21:20:34','2025-05-16','21:21:26'),(53,1,1,'2025-05-17','10:00:00',NULL,'encerrada','2025-05-17 00:27:35','2025-05-16','21:27:43','2025-05-16','21:27:50'),(54,1,1,'2025-05-17','10:00:00',NULL,'encerrada','2025-05-17 00:29:44','2025-05-16','21:29:54','2025-05-16','21:30:02'),(55,1,1,'2025-05-17','20:00:00',NULL,'encerrada','2025-05-17 00:49:28','2025-05-16','21:49:39','2025-05-16','21:49:45');
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `senha` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Mikael','kaellorran@gmail.com','$2y$10$xGDWNxH7KT1yyfYLyg55kuQIEQKLxajKyATJADQP46ZnYwqLFpS.S','2025-05-12 03:26:43',1),(2,'Teste','kaellorran@outro.com','$2y$10$vrqpwV925fSzl67qT2UJ7eSaRwdaHqKySHF8j6cxomJnZr3SCCYfu','2025-05-12 04:54:54',0);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vagas`
--

DROP TABLE IF EXISTS `vagas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vagas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `identificador` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descricao` text COLLATE utf8mb4_unicode_ci,
  `status` enum('livre','ocupada','reservada') COLLATE utf8mb4_unicode_ci DEFAULT 'livre',
  PRIMARY KEY (`id`),
  UNIQUE KEY `identificador` (`identificador`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vagas`
--

LOCK TABLES `vagas` WRITE;
/*!40000 ALTER TABLE `vagas` DISABLE KEYS */;
INSERT INTO `vagas` VALUES (1,'A1','Vaga descoberta','livre');
/*!40000 ALTER TABLE `vagas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'estacionamento_vip'
--

--
-- Dumping routines for database 'estacionamento_vip'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-24 21:47:11
