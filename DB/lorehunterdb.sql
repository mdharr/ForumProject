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
  `email` VARCHAR(254) NOT NULL,
  `created_at` TIMESTAMP NULL,
  `image_url` TEXT NULL,
  `last_activity` TIMESTAMP NULL,
  `status` VARCHAR(100) NULL,
  `comment_count` INT NULL,
  `banner_message` VARCHAR(100) NULL,
  `post_count` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `category` ;

CREATE TABLE IF NOT EXISTS `category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(1000) NOT NULL,
  `description` VARCHAR(1000) NULL,
  `created_at` TIMESTAMP NULL,
  `status` VARCHAR(100) NULL,
  `view_count` INT NULL,
  `post_count` INT NULL,
  `comment_count` INT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_category_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_category_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `post`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `post` ;

CREATE TABLE IF NOT EXISTS `post` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `subject` VARCHAR(1000) NOT NULL,
  `created_at` TIMESTAMP NULL,
  `status` VARCHAR(100) NULL,
  `last_edited` TIMESTAMP NULL,
  `comment_count` INT NULL,
  `category_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `content` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_post_category1_idx` (`category_id` ASC),
  INDEX `fk_post_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_post_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_post_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `comment` ;

CREATE TABLE IF NOT EXISTS `comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NOT NULL,
  `created_at` TIMESTAMP NULL,
  `status` VARCHAR(100) NULL,
  `last_edited` TIMESTAMP NULL,
  `parent_id` INT NULL,
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_comment_comment1_idx` (`parent_id` ASC),
  INDEX `fk_comment_user1_idx` (`user_id` ASC),
  INDEX `fk_comment_post1_idx` (`post_id` ASC),
  CONSTRAINT `fk_comment_comment1`
    FOREIGN KEY (`parent_id`)
    REFERENCES `comment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_post1`
    FOREIGN KEY (`post_id`)
    REFERENCES `post` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `email`, `created_at`, `image_url`, `last_activity`, `status`, `comment_count`, `banner_message`, `post_count`) VALUES (1, 'admin', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', 1, 'ADMIN', NULL, NULL, 'admin@admin.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `category`
-- -----------------------------------------------------
START TRANSACTION;
USE `lorehunterdb`;
INSERT INTO `category` (`id`, `name`, `description`, `created_at`, `status`, `view_count`, `post_count`, `comment_count`, `user_id`) VALUES (1, 'Gaming Forum', 'The latest video game news, discussions, announcements, industry gossip, sales figures, bargains and reviews. The pulse of the gaming industry.', NULL, NULL, NULL, 1, 1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `post`
-- -----------------------------------------------------
START TRANSACTION;
USE `lorehunterdb`;
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`) VALUES (1, '[Reddit Rumor] Embargo preview FFXVI lifted next week', NULL, NULL, NULL, 1, 1, 1, 'Two Italian reviewers have stated that an important game\'s embargo will expire at the end of the month, and have hinted that it is FFXVI (preview). Obviously do not take this information as 100% certain, we will find out in the coming days. To avoid NDA problems I will avoid specifying who they are.');

COMMIT;


-- -----------------------------------------------------
-- Data for table `comment`
-- -----------------------------------------------------
START TRANSACTION;
USE `lorehunterdb`;
INSERT INTO `comment` (`id`, `content`, `created_at`, `status`, `last_edited`, `parent_id`, `user_id`, `post_id`) VALUES (1, 'Glad we are finally getting some solid gameplay footage.', NULL, NULL, NULL, NULL, 1, 1);

COMMIT;

