-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema lorehunterdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `lorehunterdb` ;

-- -----------------------------------------------------
-- Schema lorehunterdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `lorehunterdb` DEFAULT CHARACTER SET utf8 ;
USE `lorehunterdb` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(1000) NOT NULL,
  `enabled` TINYINT NULL,
  `role` VARCHAR(45) NULL,
  `first_name` VARCHAR(100) NULL,
  `last_name` VARCHAR(100) NULL,
  `email` VARCHAR(254) NULL,
  `created_at` TIMESTAMP NULL,
  `image_url` TEXT NULL,
  `last_activity` TIMESTAMP NULL,
  `status` VARCHAR(100) NULL,
  `post_count` INT NULL,
  `banner_message` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `thread`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `thread` ;

CREATE TABLE IF NOT EXISTS `thread` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `subject` VARCHAR(1000) NULL,
  `created_at` TIMESTAMP NULL,
  `user_id` INT NULL,
  `status` VARCHAR(100) NULL,
  `last_edited` TIMESTAMP NULL,
  `post_count` INT NULL,
  `last_post` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `forum`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `forum` ;

CREATE TABLE IF NOT EXISTS `forum` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(1000) NOT NULL,
  `description` VARCHAR(1000) NULL,
  `created_at` TIMESTAMP NULL,
  `user_id` INT NULL,
  `status` VARCHAR(100) NULL,
  `view_count` INT NULL,
  `thread_count` INT NULL,
  `post_count` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `post`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `post` ;

CREATE TABLE IF NOT EXISTS `post` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(1000) NOT NULL,
  `content` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `thread_id` INT NULL,
  `user_id` INT NULL,
  `status` VARCHAR(100) NULL,
  `parent_id` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `votes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `votes` ;

CREATE TABLE IF NOT EXISTS `votes` (
  `id` INT NOT NULL,
  `up_count` INT NULL,
  `down_count` INT NULL,
  `thread_id` INT NULL,
  `post_id` INT NULL,
  `vote_count` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS lorehunter@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'lorehunter'@'localhost' IDENTIFIED BY 'lorehunter';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'lorehunter'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `lorehunterdb`;
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `email`, `created_at`, `image_url`, `last_activity`, `status`, `post_count`, `banner_message`) VALUES (1, 'admin', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', 1, 'ADMIN', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

COMMIT;

