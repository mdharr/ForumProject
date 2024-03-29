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
  `banner_message` VARCHAR(1000) NULL,
  `post_count` INT NULL,
  `state` VARCHAR(45) NULL,
  `banner_image` TEXT NULL,
  `is_online` TINYINT NULL DEFAULT 0,
  `verification_code` VARCHAR(255) NOT NULL DEFAULT '1287ce4e-93c9-439c-9673-d166bb948482',
  `verified_status` ENUM('ACTIVE', 'PENDING_VERIFICATION', 'DISABLED') NOT NULL DEFAULT 'PENDING_VERIFICATION',
  `email_verified` TINYINT NULL DEFAULT 0,
  `verification_expiry_time` DATETIME NULL,
  `resend_count` INT NOT NULL DEFAULT 0,
  `last_verification_code_sent_time` DATETIME NULL DEFAULT NULL,
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
  `enabled` TINYINT NULL,
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
  `enabled` TINYINT NULL,
  `view_count` INT NULL DEFAULT 0,
  `is_pinned` TINYINT NULL DEFAULT 0,
  `last_comment` TIMESTAMP NULL,
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
  `enabled` TINYINT NULL,
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


-- -----------------------------------------------------
-- Table `game`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `game` ;

CREATE TABLE IF NOT EXISTS `game` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL,
  `title` VARCHAR(255) NULL,
  `description` TEXT NULL,
  `released` VARCHAR(45) NULL,
  `background_image` VARCHAR(1000) NULL,
  `metacritic_score` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `title_UNIQUE` (`title` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user_has_game`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_has_game` ;

CREATE TABLE IF NOT EXISTS `user_has_game` (
  `user_id` INT NOT NULL,
  `game_id` INT NOT NULL,
  `game_category` ENUM('PLAYED', 'PLAYING') NULL DEFAULT 'PLAYING',
  `rating` ENUM('ZERO', 'HALF', 'ONE', 'ONE_AND_A_HALF', 'TWO', 'TWO_AND_A_HALF', 'THREE', 'THREE_AND_A_HALF', 'FOUR', 'FOUR_AND_A_HALF', 'FIVE') NULL DEFAULT 'ZERO',
  `review` TEXT NULL,
  `is_recommended` TINYINT NULL,
  `playtime` INT NULL,
  `created_at` TIMESTAMP NULL,
  PRIMARY KEY (`user_id`, `game_id`),
  INDEX `fk_user_has_game_game1_idx` (`game_id` ASC),
  INDEX `fk_user_has_game_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_game_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_game_game1`
    FOREIGN KEY (`game_id`)
    REFERENCES `game` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `notification`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `notification` ;

CREATE TABLE IF NOT EXISTS `notification` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `message` TEXT NULL,
  `created_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user_notification`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_notification` ;

CREATE TABLE IF NOT EXISTS `user_notification` (
  `user_id` INT NOT NULL,
  `notification_id` INT NOT NULL,
  `viewed` TINYINT NULL DEFAULT 0,
  `viewed_at` TIMESTAMP NULL,
  `dismissed` TINYINT NULL DEFAULT 0,
  `dismissed_at` TIMESTAMP NULL,
  INDEX `fk_user_notification_user1_idx` (`user_id` ASC),
  INDEX `fk_user_notification_notification1_idx` (`notification_id` ASC),
  CONSTRAINT `fk_user_notification_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_notification_notification1`
    FOREIGN KEY (`notification_id`)
    REFERENCES `notification` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user_likes_comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_likes_comment` ;

CREATE TABLE IF NOT EXISTS `user_likes_comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `comment_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_likes_comment_user1_idx` (`user_id` ASC),
  INDEX `fk_user_likes_comment_comment1_idx` (`comment_id` ASC),
  CONSTRAINT `fk_user_likes_comment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_likes_comment_comment1`
    FOREIGN KEY (`comment_id`)
    REFERENCES `comment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ticket`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ticket` ;

CREATE TABLE IF NOT EXISTS `ticket` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NULL,
  `description` TEXT NULL,
  `status` ENUM('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED') NULL DEFAULT 'OPEN',
  `priority` ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT') NULL DEFAULT 'MEDIUM',
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ticket_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_ticket_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ticket_message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ticket_message` ;

CREATE TABLE IF NOT EXISTS `ticket_message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NULL,
  `created_at` TIMESTAMP NULL,
  `ticket_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ticket_message_ticket1_idx` (`ticket_id` ASC),
  INDEX `fk_ticket_message_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_ticket_message_ticket1`
    FOREIGN KEY (`ticket_id`)
    REFERENCES `ticket` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ticket_message_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user_has_follower`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_has_follower` ;

CREATE TABLE IF NOT EXISTS `user_has_follower` (
  `follower_id` INT NOT NULL,
  `followed_id` INT NOT NULL,
  `created_at` TIMESTAMP NULL,
  INDEX `fk_user_has_user_user2_idx` (`followed_id` ASC),
  INDEX `fk_user_has_user_user1_idx` (`follower_id` ASC),
  CONSTRAINT `fk_user_has_user_user1`
    FOREIGN KEY (`follower_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_user_user2`
    FOREIGN KEY (`followed_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user_conversation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_conversation` ;

CREATE TABLE IF NOT EXISTS `user_conversation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_conversation_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_conversation_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `private_message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `private_message` ;

CREATE TABLE IF NOT EXISTS `private_message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_conversation_id` INT NOT NULL,
  `content` TEXT NULL,
  `created_at` TIMESTAMP NULL,
  `sender_id` INT NOT NULL,
  `recipient_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_private_message_user_conversation1_idx` (`user_conversation_id` ASC),
  INDEX `fk_private_message_user1_idx` (`sender_id` ASC),
  INDEX `fk_private_message_user2_idx` (`recipient_id` ASC),
  CONSTRAINT `fk_private_message_user_conversation1`
    FOREIGN KEY (`user_conversation_id`)
    REFERENCES `user_conversation` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_private_message_user1`
    FOREIGN KEY (`sender_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_private_message_user2`
    FOREIGN KEY (`recipient_id`)
    REFERENCES `user` (`id`)
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
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `email`, `created_at`, `image_url`, `last_activity`, `status`, `comment_count`, `banner_message`, `post_count`, `state`, `banner_image`, `is_online`, `verification_code`, `verified_status`, `email_verified`, `verification_expiry_time`, `resend_count`, `last_verification_code_sent_time`) VALUES (1, 'Jill', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', 1, 'ADMIN', 'Albert', 'Jill', 'jill@valentine.com', '2023-03-03T12:35:22', 'https://64.media.tumblr.com/8611a4dab286090923c8876380df032a/tumblr_nv8mgo9YfZ1u8intho1_500.gif', '2023-03-03T12:35:22', 'active', 1, 'I am the master of this domain.', 5, 'offline', 'https://modernhorrors.com/wp-content/uploads/2018/02/Resident-Evil-Remake.gif', 0, '1287ce4e-93c9-439c-9673-d166bb948482', 'ACTIVE', 1, NULL, 0, NULL);
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `email`, `created_at`, `image_url`, `last_activity`, `status`, `comment_count`, `banner_message`, `post_count`, `state`, `banner_image`, `is_online`, `verification_code`, `verified_status`, `email_verified`, `verification_expiry_time`, `resend_count`, `last_verification_code_sent_time`) VALUES (2, 'Wander', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', 1, 'ADMIN', 'Michael', 'Harrington', 'wander@sotc.com', '2023-03-03T12:35:22', 'https://cdna.artstation.com/p/assets/images/images/016/596/266/original/fernando-henrique-shadowofthecolossus.gif', '2023-03-03T12:35:22', 'active', 5, 'Raise thy sword by the light.', 6, 'offline', 'https://64.media.tumblr.com/852a24f2169fc148a1852068e438a996/tumblr_nl0i4gmWid1r4c2c6o1_1280.jpg', 0, '1287ce4e-93c9-439c-9673-d166bb948482', 'ACTIVE', 1, NULL, 0, NULL);
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `email`, `created_at`, `image_url`, `last_activity`, `status`, `comment_count`, `banner_message`, `post_count`, `state`, `banner_image`, `is_online`, `verification_code`, `verified_status`, `email_verified`, `verification_expiry_time`, `resend_count`, `last_verification_code_sent_time`) VALUES (3, 'Snake', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', 1, 'ADMIN', 'Solid', 'Snake', 'snake@mgs.com', '2023-03-03T12:35:22', 'https://i.gifer.com/origin/ae/ae9c3e23b51b8122e879220927d72dd2_w200.gif', '2023-03-03T12:35:22', 'active', 0, 'A legend is nothing but fiction.', 5, 'offline', 'https://i.pinimg.com/originals/3b/96/34/3b9634ada93c603291ed0250a1b8b892.gif', 0, '1287ce4e-93c9-439c-9673-d166bb948482', 'ACTIVE', 1, NULL, 0, NULL);
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `email`, `created_at`, `image_url`, `last_activity`, `status`, `comment_count`, `banner_message`, `post_count`, `state`, `banner_image`, `is_online`, `verification_code`, `verified_status`, `email_verified`, `verification_expiry_time`, `resend_count`, `last_verification_code_sent_time`) VALUES (4, 'Samus', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', 1, 'STANDARD', 'Samus', 'Aran', 'samus_aran@metroid.com', '2023-03-03T12:35:22', 'https://static.wixstatic.com/media/2d0812_6e0dd32dd9ef4188880cf657f2714a98~mv2.gif', '2023-03-03T12:35:22', 'active', 0, 'The galaxy is at peace…', 2, 'offline', 'https://cdna.artstation.com/p/assets/images/images/038/997/074/original/bryan-heemskerk-metroiddread12animated7.gif', 0, '1287ce4e-93c9-439c-9673-d166bb948482', 'ACTIVE', 1, NULL, 0, NULL);
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `email`, `created_at`, `image_url`, `last_activity`, `status`, `comment_count`, `banner_message`, `post_count`, `state`, `banner_image`, `is_online`, `verification_code`, `verified_status`, `email_verified`, `verification_expiry_time`, `resend_count`, `last_verification_code_sent_time`) VALUES (5, 'Drifter', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', 1, 'STANDARD', 'Hyper', 'Drifter', 'drifter@hyperlight.com', '2023-03-03T12:35:22', 'https://giffiles.alphacoders.com/162/162757.gif', '2023-03-03T12:35:22', 'active', 0, 'A lonely soul, in a desperate search.', 0, 'offline', 'https://bitchingamergrl.files.wordpress.com/2017/11/hld-vid-3-0-0.gif', 0, '1287ce4e-93c9-439c-9673-d166bb948482', 'ACTIVE', 1, NULL, 0, NULL);
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `email`, `created_at`, `image_url`, `last_activity`, `status`, `comment_count`, `banner_message`, `post_count`, `state`, `banner_image`, `is_online`, `verification_code`, `verified_status`, `email_verified`, `verification_expiry_time`, `resend_count`, `last_verification_code_sent_time`) VALUES (6, 'Doom', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', 1, 'STANDARD', 'Doom', 'Guy', 'doomguy@doom.com', '2023-03-03T12:35:22', 'https://media.tenor.com/iHJnk_KERAsAAAAC/doom-trippy.gif', '2023-03-03T12:35:22', 'active', 0, 'The Only Thing They Fear Is You', 1, 'offline', 'https://i.imgur.com/4AMtOUc.gif', 0, '1287ce4e-93c9-439c-9673-d166bb948482', 'ACTIVE', 1, NULL, 0, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `category`
-- -----------------------------------------------------
START TRANSACTION;
USE `lorehunterdb`;
INSERT INTO `category` (`id`, `name`, `description`, `created_at`, `status`, `view_count`, `post_count`, `comment_count`, `user_id`, `enabled`) VALUES (1, 'Gaming Forum', 'The latest video game news, discussions, announcements, industry gossip, sales figures, bargains and reviews. The pulse of the gaming industry.', '2023-03-03T12:35:22', 'active', 0, 1, 1, 1, 1);
INSERT INTO `category` (`id`, `name`, `description`, `created_at`, `status`, `view_count`, `post_count`, `comment_count`, `user_id`, `enabled`) VALUES (2, 'Gaming Hangouts', 'If it\'s a community related to gaming, it has a home here! Official threads >1 month old, buy/sell/trade marketplace, gaming media fandoms, matchmaking, guilds and clans.', '2023-03-03T12:35:22', 'active', 0, 1, 1, 2, 1);
INSERT INTO `category` (`id`, `name`, `description`, `created_at`, `status`, `view_count`, `post_count`, `comment_count`, `user_id`, `enabled`) VALUES (3, 'Lore Forum', 'Everything else. Current events, entertainment, technology, life, food, politics, pets, randomness, and anything in between. Civil discourse triumphs.', '2023-03-03T12:35:22', 'active', 0, 1, 1, 1, 1);
INSERT INTO `category` (`id`, `name`, `description`, `created_at`, `status`, `view_count`, `post_count`, `comment_count`, `user_id`, `enabled`) VALUES (4, 'Lore Hangouts', 'Hobbyist enclaves. Sports followings. Official threads >1 month old. Local, international, and non-English language threads. Whatever your passion, find a community to share it with!', '2023-03-03T12:35:22', 'active', 0, 1, 1, 1, 1);
INSERT INTO `category` (`id`, `name`, `description`, `created_at`, `status`, `view_count`, `post_count`, `comment_count`, `user_id`, `enabled`) VALUES (5, 'Announcements', 'Resources and staff communication.', '2023-03-03T12:35:22', 'active', 0, 1, 1, 1, 1);
INSERT INTO `category` (`id`, `name`, `description`, `created_at`, `status`, `view_count`, `post_count`, `comment_count`, `user_id`, `enabled`) VALUES (6, 'The Vault', 'Treasured memories of threads past.', '2023-03-03T12:35:22', 'active', 0, 1, 1, 1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `post`
-- -----------------------------------------------------
START TRANSACTION;
USE `lorehunterdb`;
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`, `last_comment`) VALUES (1, 'Resident Evil 4 |OT| Back in the Saddler', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 1, 1, '<p><img src=\"https://live.staticflickr.com/65535/52766026091_a996870b7e_o.gif\" alt=\"52766026091_a996870b7e_o.gif\"></p><p><img src=\"https://live.staticflickr.com/65535/52766426214_1c0f96046c_o.png\" alt=\"52766426214_1c0f96046c_o.png\"></p><p><img src=\"https://live.staticflickr.com/65535/52766283449_6b2a2e024e_o.png\" alt=\"52766283449_6b2a2e024e_o.png\"></p><p><img src=\"https://live.staticflickr.com/65535/52766031711_a6366dbb53_o.png\" alt=\"52766031711_a6366dbb53_o.png\"></p><p><img src=\"https://live.staticflickr.com/65535/52766283094_0e1669356f_o.png\" alt=\"52766283094_0e1669356f_o.png\"></p><p><img src=\"https://live.staticflickr.com/65535/52766478995_0d01d22344_o.png\" alt=\"52766478995_0d01d22344_o.png\"></p>', 1, 0, 0, '2023-03-03T12:35:22');
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`, `last_comment`) VALUES (2, '12th Colossus', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 2, 2, 'Paradise floats upon the lake....', 1, 0, 0, '2023-03-03T12:35:22');
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`, `last_comment`) VALUES (3, 'Elden Ring DLC Announced - Shadow of the Erdtree Expansion', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 3, 1, 'Rise, Tarnished, and let us walk a new path together.\nAn upcoming expansion for #ELDENRING Shadow of the Erdtree, is currently in development. We hope you look forward to new adventures in the Lands Between.', 1, 0, 0, '2023-03-03T12:35:22');
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`, `last_comment`) VALUES (4, 'Giving Elden Ring another chance', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 4, 2, 'I\'m thinking about giving ER another chance, but for realsies this time. I got it on launch and liked it well enough to sink 20-30 hours into it before I started low-key hating the game. I gave up somewhere into the second area behind the castle, after being overwhelmed with all the systems, weapons, and things to do. I had a constant feeling of FOMO and anxiety, especially reading the OT here on Era where everybody talked about builds and ever-changing balancing issues from patches. Never once did I just relax and enjoy exploring the world, there was always this sense that I was playing it wrong in some way that I couldn\'t quite place my finger on.', 1, 0, 0, '2023-03-03T12:35:22');
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`, `last_comment`) VALUES (5, 'The Ad Reporting Thread', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 5, 1, 'Please use this thread to report bad ads (e.g. full-screen takeovers, pop-ups, redirects, etc.). We make it a high priority to ensure that intrusive ads don\'t show up on the site and to get them removed as quickly as possible so that you can keep having a great experience.', 1, 0, 0, '2023-03-03T12:35:22');
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`, `last_comment`) VALUES (6, 'Games of the Year Awards 2022', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 6, 2, 'Top 20 Games of 2022', 1, 0, 0, '2023-03-03T12:35:22');
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`, `last_comment`) VALUES (7, 'Returnal |OT| Alien Resorrection', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 1, 3, '<p><img src=\"https://cdn.discordapp.com/attachments/835163472978640926/835191813576327248/header_complete.gif\" alt=\"header_complete.gif\"></p><p><br>&nbsp;</p><p><img src=\"https://cdn.discordapp.com/attachments/835163472978640926/835220690290212915/Release_info_complete.png\" alt=\"Release_info_complete.png\"></p><p><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\">Developer: Housemarque</span><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\">Publisher: Sony Interactive Entertainment</span><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\">Platforms: PS5</span><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\">Release date: April 30 2021</span><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\">Genre: Roguelite shooter</span><br><br><br>&nbsp;</p><p><img src=\"https://cdn.discordapp.com/attachments/835163472978640926/835220695251288104/Story_complete.png\" alt=\"Story_complete.png\"></p><p><br><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\">The story follows Selene, a Greek-American ASTRA deep space scout who, during one of her missions, disobeys orders for the first time in her carreer to follow the mysterious <i>White shadow</i> broadcast. This will lead her to crash on the planet <i>Atropos</i>, a seemingly sentient and full of hostile fauna celestial body. Here she will discover that, upon death, she will re-experience her crash on the planet leading to a series of loops where Selene will discover the secrets of an ancient civilization and those of her own past.</span><br><br>&nbsp;</p><p><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\"><img src=\"https://cdn.discordapp.com/attachments/835163472978640926/835220564649705522/Characters_complete.png\" alt=\"Characters_complete.png\"></span></p><p><br><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\"><strong>Selene:</strong> Main character of the game, Selene is an intelligent and resourceful ASTRA deep space scout, specialized in space and planetary exploration with an expertise in combat and an avid curiosity for the mysteries of space.</span><br><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\"><strong>Atropos</strong>: Even if it is mainly the setting where the story of Returnal will unfold, Atropos is a character in and of itself with its ever-changing nature, its different biomes (from forests to swamps, barren deserts, snow covered mountains, ancient alien citadels and more) and the secrets that it holds about its past inhabitants.</span><br><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\"><strong>The Astronaut</strong>: Selene is constantly stalked in her dreams and in her visits to a mysterious house that keeps showing up during her exploration of <i>Atropos</i> by an Astronaut wearing a much older suit than her own. Who is this enigmatic figure?</span><br><br>&nbsp;</p><p><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\"><img src=\"https://cdn.discordapp.com/attachments/835163472978640926/835220701018456094/Weapons_complete.png\" alt=\"Weapons_complete.png\"></span></p><p><br><br><br><br><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\"><i>The game features a number of base weapons that are augmented as you play. For example, the living Spitmaw Blaster weapon starts as a shotgun archetype you all know and love. As you progress, you’ll unlock and add on various Weapon Traits, each providing a unique gameplay modifier to the base weapon’s behavior. These Weapon Traits are custom tailored for each gun type – so your Spitmaw Blaster might gain exploding shells or generate acid pools upon impact; while the Electropylon Driver might extract extra loot from enemies, or generate shields for the player. These Weapon Traits will also stack, so the combined effects can lead to many surprising results that can have unique advantages and playstyles to explore. Each weapon will also have an alt-fire mode randomly assigned to it from our diverse pool, ranging from the electrical impulses of the Shockstream to the tentacles of the Tendrilpod, and everything in between.</i></span><br><br><i>These can be used without ever taking your finger off the trigger using the default control scheme: with the adaptive trigger on the DualSense controller, just press L2 halfway to aim down the sights and use the main fire of your weapon, and squeeze it all the way down to enter your alt-fire mode.</i><br><br><i>With 10 base weapons, more than 90 Weapon Traits (each with three levels)and 10 alt-fires, there are numerous weapon combinations to test out on your journey.</i><br><br>&nbsp;</p><p><img src=\"https://cdn.discordapp.com/attachments/835163472978640926/835220682936680478/Enemies_complete.png\" alt=\"Enemies_complete.png\"></p><p><br><br><br><br><strong>Mycomorph:</strong><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\"> A large fungus-like entity that can launch its own spores which slows down targets movement.</span><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\"><strong>Titanops:</strong> Moves fast by lunging and jumping to get into range, where it can maim its target with its bladed limb.</span><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\"><strong>Automaton:</strong> In addition to the rapidly firing guns, can use its claws to lash at the target or grab them.</span><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\"><strong>Gorgolith:</strong> An ambush predator that lies under the sand. Can use its tail or tongue to lash at its target</span><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\"><strong>Ixion:</strong> [NOT FOUND]</span><br><strong>Infected scout</strong><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\">: [NOT FOUND]</span><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\"><i>And more</i></span><br><br>&nbsp;</p><p><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\"><img src=\"https://cdn.discordapp.com/attachments/835163472978640926/835220700720529428/Trailers_complete.png\" alt=\"Trailers_complete.png\"></span></p><p><br><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\"><strong>Trailers playlist:</strong></span><br><br><br><strong>Housecast playlist:</strong><br><br><br>&nbsp;</p><p><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\"><img src=\"https://cdn.discordapp.com/attachments/835163472978640926/835220693645262898/Screenshots_complete.png\" alt=\"Screenshots_complete.png\"></span></p><p><br>&nbsp;</p><p><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\"><img src=\"https://live.staticflickr.com/65535/50826660072_63bf845f9f_h.jpg\" alt=\"50826660072_63bf845f9f_h.jpg\"></span></p><p><br>&nbsp;</p><p><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\"><img src=\"https://live.staticflickr.com/65535/50827123478_d03a49152f_h.jpg\" alt=\"50827123478_d03a49152f_h.jpg\"></span></p><p><br>&nbsp;</p><p><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\"><img src=\"https://live.staticflickr.com/65535/50827959302_96da96e5a7_h.jpg\" alt=\"50827959302_96da96e5a7_h.jpg\"></span></p><p><br>&nbsp;</p><p><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\"><img src=\"https://live.staticflickr.com/65535/50980685812_3ea670a391_k.jpg\" alt=\"50980685812_3ea670a391_k.jpg\"></span></p><p><br>&nbsp;</p><p><img src=\"https://static1.srcdn.com/wordpress/wp-content/uploads/2021/04/returnal-astronaut.jpg?q=50&amp;fit=crop&amp;w=960&amp;h=500&amp;dpr=1.5\" alt=\"returnal-astronaut.jpg\"></p><p><br><br>&nbsp;</p><p><img src=\"https://cdn.discordapp.com/attachments/835163472978640926/835220687810986004/FAQ_complete.png\" alt=\"FAQ_complete.png\"></p><p><br><br><strong>1. What is Returnal?</strong><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\">Returnal is a third-person shooter featuring roguelike, Metroidvania and bullet-hell elements. Set in a futuristic science fiction setting, the player controls Selene, a space pilot, equipped with a suit and armed with high-tech weapons, who is stranded on an alien planet and stuck in a time loop.</span><br><br><strong>2. Who are Housemarque?</strong><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\">Headquartered in Helsinki, Finland, Housemarque is a game developer working on console and PC. True to our core gamer audience, we prioritize stratified gameplay mechanics and impeccable audiovisual execution to create euphoric gaming experiences.</span><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\">Housemarque was co-founded in 1995 by Harri Tikkanen and Ilari Kuittinen. Prior to joining forces, Harri and Ilari founded two of Finland’s first game development studios – Bloodhouse and Terramarque.Today, Housemarque is one of the most experienced and well-known developers of downloadable games for console platforms, with a successful track record spanning 20+ years. Housemarque has developed arcade hits such as: </span><i>Super Stardust HD, Resogun, Alienation, Nex Machina, Dead Nation, Matterfall </i><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\">and many others.</span><br><br><strong>3. What is a Roguelike and how does it differ from a Roguelite like Returnal?</strong><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\">Inspired by the game <i>Rogue, </i>Roguelikes are games that have permadeath as a pillar of their game design and make use of procedural generation to ensure that each \"Run\" (each life basically) is different from the other. Roguelikes also feature inventory management and a big focus on improving your character throughout a run. Roguelites are games that retain certain elements of Roguelikes, but change others like the ability for the player to mantain some degree of progress after each death or being able to move freely between different areas after having beaten their corresponding bosses like in Returnal\'s case.</span><br><br><strong>4. How does a run work in Returnal?</strong><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\">This IGN video is really useful for it: </span><a href=\"https://www.youtube.com/watch?v=Zw0uKKSNgn4\">(374) Returnal: Gameplay Time Loop Explained - YouTube</a><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\"><strong>5. Any technical details?</strong></span><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\">Returnal runs at a dynamic 4k/60fps and features Ray-Traced Global Illumination and 3D audio support.</span><br><br><strong>Useful Links:</strong><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\"> </span><a href=\"https://www.playstation.com/en-us/editorial/this-month-on-playstation/everything-you-need-to-know-about-returnal/\"><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\">Discover eight key ways Returnal pushes design, technology and gameplay boundaries on a new generation of hardware.</span></a><br><br><a href=\"https://www.unrealengine.com/en-US/developer-interviews/deciphering-the-narrative-driven-procedural-horror-of-returnal\"><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\">Deciphering the narrative-driven procedural horror of Returnal (Interview from Unreal Engine)</span></a><br><br><a href=\"https://www.resetera.com/threads/returnal-review-thread.417591/\">Review thread</a><br><br><a href=\"https://discord.gg/housemarque\">Housemarque Discord</a><br>&nbsp;</p><p><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\"><img src=\"https://media.discordapp.net/attachments/403373256163196938/835616701013164132/Returnal_OT_test_2.png\" alt=\"Returnal_OT_test_2.png\"></span></p>', 1, 0, 0, '2023-03-03T12:35:22');
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`, `last_comment`) VALUES (8, 'Shadow of the Colossus |OT| On the Shoulders of Giants', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 1, 2, '<p style=\"text-align:center;\"><img src=\"https://abload.de/img/sotc-ot_02p8pj9.png\" alt=\"sotc-ot_02p8pj9.png\"></p><p style=\"text-align:center;\"><br><br>&nbsp;</p><p style=\"text-align:center;\"><img src=\"https://abload.de/img/dividerj4sf7.png\" alt=\"dividerj4sf7.png\"></p><p style=\"text-align:center;\"><br><strong>MEDIA</strong><br><a href=\"https://youtu.be/pdZQ98mWeto\">E3 2017 Reveal Trailer</a><br><a href=\"https://youtu.be/RFgusTYInas\">Story Trailer</a><br><a href=\"https://youtu.be/ActhIPQ_DFQ\">Comparison Trailer</a><br><a href=\"https://youtu.be/txGe0e7Vo-g\">Photo Mode Walkthrough</a><br><a href=\"https://youtu.be/0tg0mlYxReo\">Kow Otani Interview</a><br><br>&nbsp;</p><p style=\"text-align:center;\"><img src=\"https://abload.de/img/dividerj4sf7.png\" alt=\"dividerj4sf7.png\"></p><p style=\"text-align:center;\"><br><strong>LINKS</strong><br><a href=\"https://www.resetera.com/threads/shadow-of-the-colossus-review-thread.19807/\">Review Thread</a><br><a href=\"https://www.resetera.com/threads/shadow-of-the-colossus-photography-thread.20914/\">Photo Mode Thread</a><br><a href=\"https://psnprofiles.com/trophies/7210-shadow-of-the-colossus\">Trophy List</a><br><a href=\"http://www.eurogamer.net/articles/digitalfoundry-2018-shadow-of-the-colossus-tech-analysis\">Digital Foundry tech analysis</a><br><br>&nbsp;</p><p style=\"text-align:center;\"><img src=\"https://abload.de/img/dividerj4sf7.png\" alt=\"dividerj4sf7.png\"></p><p style=\"text-align:center;\"><br><strong>STORE</strong><br><a href=\"https://store.iam8bit.com/collections/vinyl/products/shadow-of-the-colossus-2xlp-vinyl-soundtrack\">Vinyl Soundtrack</a><br><a href=\"http://a.co/5mmgqO6\">Amazon.com</a><br><a href=\"http://amzn.eu/65Oj6iP\">Amazon.co.uk</a><br><a href=\"http://a.co/0nOZEPD\">Special Edition (Currently unavailable)</a><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\">Special edition includes: box, steelbook, artist postcards, printed manual,</span><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\">in-game items, two PS4 themes, world map, colossi stickers</span><br><br>&nbsp;</p><p style=\"text-align:center;\"><img src=\"https://abload.de/img/dividerj4sf7.png\" alt=\"dividerj4sf7.png\"></p><p style=\"text-align:center;\"><br><strong>TIPS</strong><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\">-eating fruit hidden in trees increases your health and eating silver lizard tails increases your stamina</span><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\">-you don\'t need to continually mash the triangle button to make Agro go faster, just holding it will make her reach and maintain max speed.</span><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\">-Agro has AI of her own, when traversing crevices and twisty paths you only need to hold triangle and she will navigate those obstacles on her own. You don\'t need to wrestle with the reins.</span><br><a href=\"http://www.powerpyx.com/shadow-of-the-colossus-ps4-remake-trophy-guide-roadmap/\">Trophy Guide</a><br><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\">-(to be continued, WIP)</span><br><br>&nbsp;</p><p style=\"text-align:center;\"><img src=\"https://abload.de/img/dividerj4sf7.png\" alt=\"dividerj4sf7.png\"></p><p style=\"text-align:center;\"><br><strong>GIFS </strong><span style=\"background-color:rgb(255,255,255);color:rgb(51,51,51);\">by SunhiLegend</span><br>&nbsp;</p><p style=\"text-align:center;\"><img src=\"http://i.imgur.com/dQgTqF7.gif\" alt=\"dQgTqF7.gif\"></p><p style=\"text-align:center;\"><img src=\"http://i.imgur.com/z1pUtOY.gif\" alt=\"z1pUtOY.gif\"></p><p style=\"text-align:center;\"><img src=\"http://i.imgur.com/GTrrKHo.gif\" alt=\"GTrrKHo.gif\"></p><p style=\"text-align:center;\"><img src=\"http://i.imgur.com/noMRiqJ.gif\" alt=\"noMRiqJ.gif\"></p>', 1, 0, 0, '2023-03-03T12:35:22');
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`, `last_comment`) VALUES (9, 'The Legend of Zelda: Breath of the Wild |OT| I Did Not Know You Could Do This', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 1, 3, '<p><img src=\"https://image.ibb.co/fmB6L6/ERA_botwzeldaop_v3_01.gif\" alt=\"ERA_botwzeldaop_v3_01.gif\"></p><p><img src=\"https://abload.de/img/era_botwzeldaop_v3_02plki8.png\" alt=\"era_botwzeldaop_v3_02plki8.png\"></p><p><img src=\"https://image.ibb.co/gwtxTR/ERA_botwzeldaop_v3.png\" alt=\"ERA_botwzeldaop_v3.png\"></p><p><img src=\"https://abload.de/img/untitled-2oxjhx.png\" alt=\"untitled-2oxjhx.png\"></p><p><a href=\"https://www.youtube.com/watch?v=1CfFnLoiLqk\"><img src=\"https://abload.de/img/untitled-3_01akjqy.png\"></a></p><p><br><a href=\"https://www.youtube.com/watch?v=1rPxiXXxftE\"><img src=\"https://abload.de/img/untitled-4_012ujma.png\"> </a><a href=\"https://www.youtube.com/watch?v=zw47_q9wbBE\"><img src=\"https://abload.de/img/untitled-4_01gyjiw.png\"> </a><a href=\"https://www.youtube.com/watch?v=IJnnn0BBj_c\"><img src=\"https://abload.de/img/untitled-4_02zikmq.png\"> </a><a href=\"https://www.youtube.com/playlist?list=PL2JiZAV5BmDXKHMwfdlJbNAtXpUNuCPAd\"><img src=\"https://abload.de/img/untitled-4_03v9j2p.png\"> </a><a href=\"https://www.youtube.com/watch?v=QyMsF31NdNc\"><img src=\"https://abload.de/img/untitled-54hkm7.png\"></a></p>', 1, 0, 0, '2023-03-03T12:35:22');
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`, `last_comment`) VALUES (10, 'Demon\'s Souls |OT| Umbasa', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 1, 3, '<p><img src=\"https://abload.de/img/0ixkvb.png\" alt=\"0ixkvb.png\"><img src=\"https://abload.de/img/1gpkuq.png\" alt=\"1gpkuq.png\"><img src=\"https://abload.de/img/2x1j3e.png\" alt=\"2x1j3e.png\"><img src=\"https://abload.de/img/whats-newlnjb2.png\" alt=\"whats-newlnjb2.png\"><img src=\"https://abload.de/img/3ypjdm.png\" alt=\"3ypjdm.png\"><img src=\"https://abload.de/img/tendencytojek.png\" alt=\"tendencytojek.png\"><img src=\"https://abload.de/img/4cxj6g.png\" alt=\"4cxj6g.png\"><img src=\"https://abload.de/img/stats-and-classes86j6q.png\" alt=\"stats-and-classes86j6q.png\"><img src=\"https://abload.de/img/6bqjqb.png\" alt=\"6bqjqb.png\"><img src=\"https://abload.de/img/5xsk45.png\" alt=\"5xsk45.png\"><img src=\"https://abload.de/img/medialhj8v.png\" alt=\"medialhj8v.png\"><img src=\"https://abload.de/img/50567653452_268f0d4618vkpv.jpg\" alt=\"50567653452_268f0d4618vkpv.jpg\"><img src=\"https://abload.de/img/50566766908_52b82061ft0klw.jpg\" alt=\"50566766908_52b82061ft0klw.jpg\"><img src=\"https://abload.de/img/50566767408_970e4c6ebi0k68.jpg\" alt=\"50566767408_970e4c6ebi0k68.jpg\"><img src=\"https://abload.de/img/x2uvfmnb7kck.jpg\" alt=\"x2uvfmnb7kck.jpg\"><img src=\"https://abload.de/img/5wrdtt8o0k9m.jpg\" alt=\"5wrdtt8o0k9m.jpg\"><img src=\"https://abload.de/img/4975fc6f-01c8-4b77-b82nj2h.jpg\" alt=\"4975fc6f-01c8-4b77-b82nj2h.jpg\"><img src=\"https://abload.de/img/eaq0j_uwkaaj8a0wpkph.jpg\" alt=\"eaq0j_uwkaaj8a0wpkph.jpg\"><img src=\"https://i.imgur.com/ZTXcL15.png\" alt=\"ZTXcL15.png\"></p>', 1, 0, 0, '2023-03-03T12:35:22');
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`, `last_comment`) VALUES (11, 'Metroid Dread |OT| Metroid Thread', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 1, 4, '<p><img class=\"image_resized\" style=\"width:1059.18px;\" src=\"https://i.imgur.com/s3O17zq.jpg\" alt=\"s3O17zq.jpg\"></p><p><br><a href=\"https://metroid.nintendo.com/buy/\"><img class=\"image_resized\" style=\"width:1059.18px;\" src=\"https://i.imgur.com/d8Y8HBT.jpg\"></a></p><p><img class=\"image_resized\" style=\"width:1059.18px;\" src=\"https://i.imgur.com/LOytgGC.gif\" alt=\"LOytgGC.gif\"></p><p><img class=\"image_resized\" style=\"width:1059.18px;\" src=\"https://i.imgur.com/0opyiiS.jpg\" alt=\"0opyiiS.jpg\"></p><p><a href=\"https://www.youtube.com/watch?v=8NjCICl7dDo\"><img class=\"image_resized\" style=\"width:1059.18px;\" src=\"https://i.imgur.com/CmaRI0t.jpg\"></a></p><p><img class=\"image_resized\" style=\"width:1059.18px;\" src=\"https://i.imgur.com/hcp3aKa.jpg\" alt=\"hcp3aKa.jpg\"></p><p><a href=\"https://www.youtube.com/watch?v=AOvefm5U250\"><img class=\"image_resized\" style=\"width:1059.18px;\" src=\"https://i.imgur.com/Low7nDu.jpg\"></a></p><p><img class=\"image_resized\" style=\"width:1059.18px;\" src=\"https://i.imgur.com/y9iuRQV.jpg\" alt=\"y9iuRQV.jpg\"></p><p><img class=\"image_resized\" style=\"width:1059.18px;\" src=\"https://i.imgur.com/gE42zWK.jpg\" alt=\"gE42zWK.jpg\"></p><p><img class=\"image_resized\" style=\"width:1059.18px;\" src=\"https://i.imgur.com/IGKLdhT.jpg\" alt=\"IGKLdhT.jpg\"></p><p>&nbsp;</p><p><a href=\"https://www.youtube.com/watch?v=V_XnbTayTH4\"><img class=\"image_resized\" style=\"width:1059.18px;\" src=\"https://i.imgur.com/dA2RD1d.jpg\"></a></p><p>&nbsp;</p><p><img class=\"image_resized\" style=\"width:1059.18px;\" src=\"https://i.imgur.com/VX4uqOS.jpg\" alt=\"VX4uqOS.jpg\"></p><p><br><a href=\"https://metroid.nintendo.com/news/\"><img class=\"image_resized\" style=\"width:1059.18px;\" src=\"https://i.imgur.com/7wG31zr.jpg\"></a></p><p><a href=\"https://metroid.nintendo.com/news/\"><img class=\"image_resized\" style=\"width:1059.18px;\" src=\"https://i.imgur.com/Pco6gbJ.jpg\"></a></p><p><br><a href=\"https://www.resetera.com/threads/metroid-dread-review-thread.496389/\"><img class=\"image_resized\" style=\"width:1059.18px;\" src=\"https://i.imgur.com/FT4d8B2.jpg\"></a></p><p><img class=\"image_resized\" style=\"width:1059.18px;\" src=\"https://i.imgur.com/PTDIZyq.jpg\" alt=\"PTDIZyq.jpg\"></p><p><img class=\"image_resized\" style=\"width:1059.18px;\" src=\"https://i.imgur.com/ngCPHLK.png\" alt=\"ngCPHLK.png\"></p><p><img class=\"image_resized\" style=\"width:1059.18px;\" src=\"https://i.imgur.com/NzAmY8C.png\" alt=\"NzAmY8C.png\"></p><p><img class=\"image_resized\" style=\"width:1059.18px;\" src=\"https://i.imgur.com/JuOK7su.png\" alt=\"JuOK7su.png\"></p><p><img class=\"image_resized\" style=\"width:1059.18px;\" src=\"https://i.imgur.com/X7ZVJWw.jpg\" alt=\"X7ZVJWw.jpg\"></p>', 1, 0, 0, '2023-03-03T12:35:22');
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`, `last_comment`) VALUES (12, 'Attention Lore Hunters', '2023-04-22T12:35:22', 'active', '2023-04-22T12:35:22', 0, 1, 3, 'We\'ll be performing server maintenance in the coming days. Heads up!', 1, 0, 1, '2023-03-03T12:35:22');
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`, `last_comment`) VALUES (13, 'Armored Core VI: Fires of Rubicon - Gameplay Trailer, releases August 25, 2023', '2023-05-03T12:35:22', 'active', '2023-05-03T12:35:22', 0, 1, 3, '<h1><span class=\"text-big\">Armored Core VI: Fires of Rubicon</span><br>&nbsp;</h1><figure class=\"media\"><oembed url=\"https://www.youtube.com/watch?v=SlSfr6Wa5sc\"></oembed></figure><h2>&nbsp;</h2><figure class=\"media\"><oembed url=\"https://www.youtube.com/watch?v=LiOgQXYxLpA\"></oembed></figure><h2>&nbsp;</h2><blockquote><p><span style=\"var(—text-color);\">\"Augmented human C4-621 has awakened.\"</span><br><br><span style=\"var(—text-color);\">ARMORED CORE VI FIRES OF RUBICON makes planetfall August 25, 2023.</span></p></blockquote><h2>&nbsp;</h2><figure class=\"media\"><oembed url=\"https://www.youtube.com/watch?v=1iwDkLHVhEc\"></oembed></figure><h2><br>Engage in high-speed mech combat</h2><p><span style=\"var(—text-color);\">Those whose primary experience with FromSoftware comes from games like Bloodborne or Elden Ring might be curious about what to expect from Armored Core VI.</span><br><br><span style=\"color:var(—text-color);\">You play an augmented mercenary piloting a huge, customizable mech. Yet while the pace and structure of mech-piloting action fundamentally differ from other games in the studio\'s catalog, players can rest assured that the smooth, responsive controls they\'ve come to expect in FromSoftware games is still here–just in a different context. Think giant, heavily equipped robots with the ability to zip around across ground and air, reacting at lightning-fast speeds to attacks and threats while trying to one-up dangerous foes with even more firepower at their disposal.</span><br>&nbsp;</p><p><img src=\"https://live.staticflickr.com/65535/52849076063_8f7868cdce_4k.jpg\"><br><h2><br>Rubicon, the ruined planet</p></h2><p><span style=\"color:var(—text-color);\">Armored Core VI is a new story that takes place on the planet Rubicon, where a powerful energy source called \"Coral\" has been discovered. But this isn\'t stuff that looks pretty in aquariums–Coral is </span><i>extremely </i><span style=\"color:var(—text-color);\">volatile, and it\'s already caused a massive disaster that nearly turned all of Rubicon to ash many years prior. But those futuristic megacorps just can\'t resist the siren song of Coral and continue to war for it to this day.</span><br><br><span style=\"color:var(—text-color);\"><img src=\"https://live.staticflickr.com/65535/52849076068_fcc13b78b1_4k.jpg\"></span><br><br><span style=\"color:var(—text-color);\">The various areas of Rubicon are filled with contrasts, as the hollowed-out industrial ruins from the aforementioned disaster smolder beneath a shiny shell of state-of-the-art mining constructs encasing the planet.</span><br><br><span style=\"color:var(—text-color);\">\"It\'s an intricate and multi-layered world, brimming with mega-structures and enormous underground facilities built by its former inhabitants. These structures cover a planetary surface wracked with extreme cold and contamination in the aftermath of the great disaster, and the player will be exploring these various environments as they proceed,\" says game director Masaru Yamamura.</span><br><br><span style=\"color:var(—text-color);\">The expansive environments will deliver an incredible sense of scale, maintaining the quality we\'ve come to expect from FromSoftware\'s world-design maestros. And with your Armored Core\'s (AC for short) advanced movement skills, you\'ll be able to explore these large, open spaces to your heart\'s content. You\'ll be encountering lots of different scenery and objectives as you advance through the game\'s mission-based progression structure (like previous entries).</span><br><br><span style=\"color:var(—text-color);\">\"There will be missions where you\'re fighting across sweeping battlefields–very combat-oriented,\" Yamamura explains. \"But you\'ll sometimes be recovering data logs from wreckage and doing other side objectives too.\"</span><br><br><img src=\"https://live.staticflickr.com/65535/52849076023_24e1f70929_4k.jpg\"><br><h2><br><span class=\"text-big\"><strong>Combat features</strong></span></h2>&nbsp;</p><p><strong>Assault Boost: </strong><span style=\"color:var(—text-color);\">One of the biggest new features in Armored Core VI is an instantaneous switch between long-range gunfighting and close-range melee, thanks to a button-activated movement skill called the Assault Boost.</span><br><br><span style=\"color:var(—text-color);\">\"Assault Boost is an offensive action that helps close the gap between enemies and lets you quickly go from long distance to close range,\" Yamamura tells us. It will also provide some incredible chain abilities when fighting, as he describes vividly: \"Say you activate Assault Boost to make your approach while using machine gun fire and a missile salvo to stagger the enemy, then use your pulse blade to score a direct melee hit once you\'re up close.\"</span><br><br><br><strong>Stagger: </strong><span style=\"color:var(—text-color);\">Another addition to the series\' combat is a \"stagger\" element: if an AC takes too many hits over a short period of time, its Attitude Control System will be overloaded, making it vulnerable for a short time. Both continuous hits and big, powerful strikes will cause stagger damage, encouraging you to keep up the pressure on the opponent. The damage inflicted to an enemy\'s stagger gauge varies from weapon to weapon. It can also be affected by factors like distance, adding additional strategy in equipping and using these armaments in combat.</span><br><br><span style=\"color:var(—text-color);\">We asked Yamamura how the pace and feel of the game compares to previous entries.</span><br><br><span style=\"color:var(—text-color);\">\"The average movement speed across the game is somewhere between Armored Core 3 and Armored Core 5,\" he replies. \"But Armored Core VI has been developed to bolster the changes of tempo and combat. With instantaneous bursts of speed and sudden changes of tempo, combat can often reach the dizzying heights of say, Armored Core 4.\"</span><br><br><span style=\"color:var(—text-color);\"><img src=\"https://live.staticflickr.com/65535/52849076008_85f211ffe7_4k.jpg\"></span><br>&nbsp;</p><h2>Fight challenging bosses</h2><p><span style=\"color:var(—text-color);\">The series\' big boss encounters are back, and the metal monstrosities you\'ll encounter look bigger and more intimidating than ever.</span><br><br><span style=\"color:var(—text-color);\">\"There will be a rich variety of powerful enemies of all shapes and sizes,\" says Yamamura. \"Huge combat helicopters, heavily armored mobile turrets, and unmanned heavy demolition machinery that\'s programmed to indiscriminately crush intruders. Armored Core VI will offer a number of explosive battle experiences that challenge players to fight against the odds and overcome these ginormous, more abnormal mechs.\"</span><br><br><img src=\"https://live.staticflickr.com/65535/52848618461_4aa48fbade_4k.jpg\"><br><br><span style=\"color:var(—text-color);”>In addition to these larger bosses, you\'ll even fight against other ACs and humanoid mechs in high-octane duels. And in grand FromSoftware tradition, it may take several attempts and some experimentation with your AC\'s equipment to fully learn and adapt to a boss\'s quirks. So better prepare yourself, as Armored Core VI will offer numerous cathartic explosive battles that\'ll truly test your skills.</span><br><br>&nbsp;</p><h2>Build the perfect AC</h2><p><span style=\"color:var(—text-color);\">Customization is a key part of the Armored Core experience. You have access to an assortment of parts to upgrade and fine-tune the power of your AC. Four slots for holding weaponry–one in each hand and two on the back–give you a lot of space to experiment with custom loadouts.</span><br><br><span style=\"color:var(—text-color);\">What kind of weapons are we talking about? Bazookas, gatling guns, split missiles, plasma rifles, and all the perennial favorites. There are a bunch of new close-range weapons, too.</span><br><br><span style=\"color:var(—text-color);\">\"One aspect we focused on in Armored Core VI is melee weapons, exclusively equipped to the left hand,\" Yamamura continues. \"These can include a cluster bomb thrower, a chainsaw or pulse blade, lances, and other more idiosyncratic weapons. Since the main weapons are firearms, the melee weapons are more focused on that strength of individuality.\"</span><br><br><span style=\"color:var(—text-color);\">Add in custom paint jobs and liveries and you\'ll be able to create a unique AC that\'s all yours.</span><br><br><span style=\"color:var(—text-color);\"><img src=\"https://live.staticflickr.com/65535/52849075858_b00bed4975_4k.jpg\"></span><br><h2><br><span class=\"text-big\"><strong>The Arena is back</strong></span></h2></p><p><span style=\"color:var(—text-color);\">There\'s more good news for longtime Armored Core fans. The Arena, a much-cherished mode where you can fight a series of battles against a wide array of specially customized mechs, makes its return in Armored Core VI as a \"combat aptitude evaluation program\" (simulated training exercise).</span><br><br><span style=\"color:var(—text-color);\">\"There are a lot of different AC frames and a lot of colorful characters to fight in the Arena, so we hope the players confront them all and aim for the top rank. You can even encounter the real version of these opponents while out on missions. These are more formidable than their simulator counterparts, and will confront the protagonist with their own ideals and motives in the heat of battle.\"</span><br><br><span style=\"color:var(—text-color);\">Perfecting your combat skills won\'t be the only reason you\'ll want to return to the frontline: there will be multiple endings to Armored Core VI\'s narrative, with new paths opening up on subsequent playthroughs, giving players plenty of incentive to explore the world and story thoroughly. What will be the ultimate fate of Rubicon? That\'s all up to you.</span><br><br><span style=\"color:var(—text-color);\"><img src=\"https://blog.playstation.com/tachyon/2023/04/2750b91a113b231cc5d6e3ee82e9ac39a43a6a27.jpg\"></span></p>', 1, 0, 0, '2023-03-03T12:35:22');
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`, `last_comment`) VALUES (14, 'Metroid Prime Remastered |OT| Primed and Ready', '2023-05-03T12:35:22', 'active', '2023-05-03T12:35:22', 0, 1, 4, '<p><img src=\"https://i.imgur.com/mtgnrDu.jpg\" alt=\"mtgnrDu.jpg\"></p><p><img src=\"https://i.imgur.com/CeNLYeT.jpg\" alt=\"CeNLYeT.jpg\"><img src=\"https://i.imgur.com/L1GfFIJ.jpg\" alt=\"L1GfFIJ.jpg\"><img src=\"https://i.imgur.com/8xSiZqs.jpg\" alt=\"8xSiZqs.jpg\"></p><p><img src=\"https://i.imgur.com/MroARTd.jpg\" alt=\"MroARTd.jpg\"></p><p><br><a href=\"https://www.resetera.com/threads/metroid-prime-remastered-ot-primed-and-ready.684754/post-101020438\"><img src=\"https://i.imgur.com/fISkWfj.jpg\"></a></p><p><br><a href=\"https://www.resetera.com/threads/metroid-prime-remastered-ot-primed-and-ready.684754/post-100999450\"><img src=\"https://i.imgur.com/AjsexWI.jpg\"></a><br>&nbsp;</p><p><img src=\"https://i.imgur.com/FvgCiRa.jpg\" alt=\"FvgCiRa.jpg\"><img src=\"https://i.imgur.com/J8H9jUx.png\" alt=\"J8H9jUx.png\"></p><p><img src=\"https://i.imgur.com/qrz77ac.png\" alt=\"qrz77ac.png\"></p><p><img src=\"https://i.imgur.com/pB9u4JT.jpg\" alt=\"pB9u4JT.jpg\"><img src=\"https://i.imgur.com/EZtd1gi.jpg\" alt=\"EZtd1gi.jpg\"><img src=\"https://i.imgur.com/IJBaAyh.jpg\" alt=\"IJBaAyh.jpg\"><img src=\"https://i.imgur.com/qYOyyZ5.jpg\" alt=\"qYOyyZ5.jpg\"><img src=\"https://i.imgur.com/vlHrUoe.png\" alt=\"vlHrUoe.png\"><img src=\"https://i.imgur.com/1BKXiAd.jpg\" alt=\"1BKXiAd.jpg\"></p>', 1, 0, 0, '2023-03-03T12:35:22');
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`, `last_comment`) VALUES (15, 'Hogwarts Legacy |OT| This Time You Really Are Wizard', '2023-05-03T12:35:22', 'active', '2023-05-03T12:35:22', 0, 1, 1, '<p><img class=\"image_resized\" style=\"width:1018px;\" src=\"https://i.imgur.com/UhYKXr8.jpg\" alt=\"\"></p><p><img class=\"image_resized\" style=\"width:1031px;\" src=\"https://i.imgur.com/8ZPopFt.jpg\" alt=\"\"></p><p><img class=\"image_resized\" style=\"width:1037px;\" src=\"https://i.imgur.com/o9k0Aii.jpg\" alt=\"\"></p><p><br><a href=\"https://www.neogaf.com/threads/hogwarts-legacy-review-thread.1651645/\"><strong>Review Thread</strong></a><br><br><br><strong>PC Details</strong>​</p><hr><p><img class=\"image_resized\" style=\"width:944px;\" src=\"https://pbs.twimg.com/media/FmSQ7fJXkAoJ73S?format=jpg&amp;name=large\" alt=\"\"></p><p>&nbsp;</p><p><img class=\"image_resized\" style=\"width:940px;\" src=\"https://pbs.twimg.com/media/FmSQ81-XwAQ152_?format=jpg&amp;name=large\" alt=\"\"><br><br><strong>Editions and Purchase Links</strong>​</p><hr><p><br><strong>Digital Pre Orders:</strong><br><br><strong>Steam:</strong><br><br><a href=\"https://store.epicgames.com/en-US/p/hogwarts-legacy\"><strong>Epic Games Store</strong></a><br><br><a href=\"https://www.neogaf.com/[URL%20unfurl=%22true%22]https://www.playstation.com/en-usgames/hogwarts-legacy/[/URL]\"><strong>PlayStation (Digital)</strong></a><br><br><a href=\"https://www.neogaf.com/[URL%20unfurl=%22true%22]https://www.xbox.com/en-US/games/store/hogwarts-legacy-xbox-series-xs-version/9PCQD194J7L8[/URL]\"><strong>Xbox (Digital)</strong></a><br><br><strong>(Standard Edition) Physical Pre Orders (US/UK/CA):</strong><br><br><strong>Gamestop:</strong><a href=\"https://www.gamestop.com/340601.html\"><strong> Xbox One</strong></a><strong>- </strong><a href=\"https://www.gamestop.com/video-games/products/hogwarts-legacy---playstation-4/340597.html\"><strong>PlayStation 4</strong></a><strong> - </strong><a href=\"https://www.gamestop.com/video-games/playstation-5/products/hogwarts-legacy---playstation-5/11203514-11203515.html?condition=New\"><strong>PlayStation 5</strong></a> - <a href=\"https://www.gamestop.com/video-games/products/hogwarts-legacy---nintendo-switch/341012.html\"><strong>Nintendo Switch</strong></a> - <a href=\"https://www.gamestop.com/video-games/xbox-series-x%7Cs/products/hogwarts-legacy---xbox-series-x/11203514-11203517.html?condition=New\"><strong>Xbox Series X</strong></a><br><br><strong>Amazon: </strong><a href=\"https://www.amazon.com/dp/B0BBWG4SCW/?tag=neogaf0e-20\"><strong>All Platforms</strong></a><br><br><strong>Walmart: </strong><a href=\"https://www.walmart.com/ip/Hogwarts-Legacy-PlayStation-5/183047021\"><strong>Playstation 5 </strong></a><strong>- </strong><a href=\"https://www.walmart.com/ip/Hogwarts-Legacy-PlayStation-4/521388454\"><strong>PlayStation 4</strong></a><strong> - </strong><a href=\"https://www.walmart.com/ip/Hogwarts-Legacy-Xbox-One/314683902\"><strong>Xbox One</strong></a><strong> - </strong><a href=\"https://www.walmart.com/ip/Hogwarts-Legacy-Xbox-Series-X/638296814\"><strong>Xbox Series X|S </strong></a><strong>- </strong><a href=\"https://www.walmart.com/ip/Hogwarts-Legacy-Nintendo-Switch/408859760\"><strong>Nintendo Switch</strong></a><br><br><strong>(Deluxe Edition) Physical Pre Orders (US/UK/CA):</strong><br><br><strong>Gamestop: </strong><a href=\"https://media.gamestop.com/i/gamestop/11203514-540d740d?$plp-tile2x$&amp;fmt=webp\"><strong>Xbox One</strong></a><strong> - </strong><a href=\"https://www.gamestop.com/video-games/products/hogwarts-legacy-deluxe-edition---nintendo-switch/351072.html\"><strong>Nintendo Switch </strong></a><strong>- </strong><a href=\"https://www.gamestop.com/video-games/products/hogwarts-legacy-deluxe-edition---playstation-5/351067.html\"><strong>PlayStation 5</strong></a> - <a href=\"https://www.gamestop.com/351069.html\"><strong>Xbox Series X | S</strong></a> - <a href=\"https://www.gamestop.com/video-games/products/hogwarts-legacy-deluxe-edition---nintendo-switch/351072.html\"><strong>Nintendo Switch</strong></a><br><br><strong>Amazon: </strong><a href=\"https://www.amazon.com/dp/B0BBWG4SCW/?tag=neogaf0e-20\"><strong>All Platforms</strong></a><br><br><strong>Walmart: </strong><a href=\"https://www.walmart.com/ip/Hogwarts-Legacy-Deluxe-Edition-Playstation-5/1604223796\"><strong>PlayStation 5</strong></a><strong> - </strong><a href=\"https://www.walmart.com/ip/Hogwarts-Legacy-Deluxe-Edition-Xbox-Series-X/1308727121\"><strong>Xbox Series X|S</strong></a><strong> - </strong><a href=\"https://www.walmart.com/ip/Hogwarts-Legacy-Deluxe-Edition-Nintendo-Switch/1724387891\"><strong>Nintendo Switch</strong></a><strong> - </strong><a href=\"https://www.walmart.com/ip/Hogwarts-Legacy-Deluxe-Edition-Xbox-One/1757852966\"><strong>Xbox One </strong></a><strong>-</strong><a href=\"https://www.walmart.com/ip/Hogwarts-Legacy-Deluxe-Edition-Playstation-4/1607338108\"><strong> PlayStation 4</strong></a><br><br><strong>(Collector\'s Edition) Physical Pre Orders (US/UK/CA):</strong><br><br><strong>Gamestop: </strong><a href=\"https://media.gamestop.com/i/gamestop/11203514-540d740d?$plp-tile2x$&amp;fmt=webp\"><strong>Xbox One</strong></a><strong> - </strong><a href=\"https://www.gamestop.com/video-games/playstation-4/products/hogwarts-legacy-collectors---playstation-4/11203514-3d0f7cad.html?condition=New\"><strong>PlayStation 4</strong></a><strong> - </strong><a href=\"https://www.gamestop.com/video-games/playstation-5/products/hogwarts-legacy-collectors---playstation-5/11203514-3e0faaad.html?condition=New\"><strong>PlayStation 5 </strong></a><strong>- </strong><a href=\"https://www.gamestop.com/video-games/xbox-series-x%7Cs/products/hogwarts-legacy-collectors---xbox-series-x/11203514-150f2ca2.html?condition=New\"><strong>Xbox Series X|S </strong></a><strong>- </strong><a href=\"https://www.gamestop.com/pc-gaming/pc-games/products/hogwarts-legacy-collectors---pc/11203514-040be769.html?condition=New\"><strong>PC</strong></a><br><br><strong>Amazon: </strong><a href=\"https://www.amazon.com/dp/B0BBWG4SCW/?tag=neogaf0e-20\"><strong>All Platforms</strong></a><br><br>&nbsp;</p><p><img class=\"image_resized\" style=\"width:1075px;\" src=\"https://thethaiger.com/th/wp-content/uploads/2022/08/Hogwarts-Legacy-%E0%B8%AE%E0%B8%AD%E0%B8%81%E0%B8%A7%E0%B8%AD%E0%B8%95%E0%B8%AA%E0%B9%8C%E0%B9%80%E0%B8%A5%E0%B8%81%E0%B8%B2%E0%B8%8B%E0%B8%B5-2.jpg\" alt=\"\"></p><p><img class=\"image_resized\" style=\"width:588px;\" src=\"https://pbs.twimg.com/media/Fa7ZvTDXgAAVPCq?format=jpg&amp;name=4096x4096\" alt=\"\"></p><p><img class=\"image_resized\" style=\"width:735px;\" src=\"https://cdn.shopify.com/s/files/1/0151/1123/products/Hogwarts-Legacy-Deluxe_2048x.jpg?v=1665544146\" alt=\"\"></p><p>&nbsp;</p><p><img class=\"image_resized\" style=\"width:auto;\" src=\"https://cdn.shopify.com/s/files/1/0355/8296/7943/products/HL_Beauty_Shot_DE_2160x3840_22_0812_abbbe59b-f790-46a4-89e7-e2b46e6a8e3b_800x.png?v=1663147751\" alt=\"\"></p><p>&nbsp;</p><p><img class=\"image_resized\" style=\"width:806px;\" src=\"https://live.staticflickr.com/65535/52356129493_056d882c0d_h.jpg\" alt=\"\"><br><br><strong>FAQ</strong>​</p><hr><p><br>&nbsp;</p><p><img class=\"image_resized\" style=\"width:873px;\" src=\"https://i.imgur.com/dsjhRBZ.jpg\" alt=\"\"></p><p><img class=\"image_resized\" style=\"width:866px;\" src=\"https://i.imgur.com/duSbmh0.jpg\" alt=\"\"></p><p><img class=\"image_resized\" style=\"width:852px;\" src=\"https://i.imgur.com/9g5HIKF.jpg\" alt=\"\"></p><p><img class=\"image_resized\" style=\"width:851px;\" src=\"https://i.imgur.com/uOvSGmj.jpg\" alt=\"\"></p><p><img class=\"image_resized\" style=\"width:851px;\" src=\"https://i.imgur.com/b12qVti.jpg\" alt=\"\"><br><br><strong>Twitch Drops &amp; </strong><a href=\"https://www.youtube.com/watch?v=HVUqei8fnX8\"><strong>Exclusive Bonus Content</strong></a>​</p><hr><p>&nbsp;</p><p><img class=\"image_resized\" style=\"width:636px;\" src=\"https://pbs.twimg.com/media/FnaQdkvWIAAonV3.jpg\" alt=\"\"></p><p><img class=\"image_resized\" style=\"width:636px;\" src=\"https://pbs.twimg.com/media/FoTYG4GWIAET4dJ?format=jpg&amp;name=900x900\" alt=\"\"></p><p><img class=\"image_resized\" style=\"width:634px;\" src=\"https://pbs.twimg.com/media/FoT0QCTX0AAAxwK.jpg:large\" alt=\"\"></p><p><br>&nbsp;</p><p><img class=\"image_resized\" style=\"width:auto;\" src=\"https://meups.com.br/wp-content/uploads/2022/09/Hogwarts-Legacy-10.jpg\" alt=\"\"><br><br><strong>Characters &amp; Cast</strong>​</p><hr><p>&nbsp;</p><p><img class=\"image_resized\" style=\"width:515px;\" src=\"https://pbs.twimg.com/media/FeJ3L27XkAIMFJZ?format=png&amp;name=large\" alt=\"\"></p><p><img class=\"image_resized\" style=\"width:516px;\" src=\"https://pbs.twimg.com/media/FeUJUl7WAAITqI6?format=png&amp;name=large\" alt=\"\"></p><p><img class=\"image_resized\" style=\"width:515px;\" src=\"https://pbs.twimg.com/media/Feed5i8XwAAcqh7?format=png&amp;name=large\" alt=\"\"></p><p><img class=\"image_resized\" style=\"width:514px;\" src=\"https://pbs.twimg.com/media/Fh3WNJdVIAET8Zi?format=jpg&amp;name=900x900\" alt=\"\"></p><p><img class=\"image_resized\" style=\"width:918px;\" src=\"https://deltiasgaming.com/wp-content/uploads/2023/01/Hogwarts-Legacy-Professor-Matilda-Weasley.png\" alt=\"\"></p><p><img class=\"image_resized\" style=\"width:901px;\" src=\"https://i.imgur.com/jW1mWpO.jpg\" alt=\"\"></p><p><img class=\"image_resized\" style=\"width:976px;\" src=\"https://deltiasgaming.com/wp-content/uploads/2023/01/Hogwarts-Legacy-Professor-Eleazar-Fig.png\" alt=\"\"></p><p><img class=\"image_resized\" style=\"width:981px;\" src=\"https://i.imgur.com/x1Srt8F.jpg\" alt=\"\"></p><p><img class=\"image_resized\" style=\"width:957px;\" src=\"https://i.imgur.com/2A5Ermp.jpg\" alt=\"\"></p><p><img class=\"image_resized\" style=\"width:956px;\" src=\"https://i.imgur.com/ZKXMM41.jpg\" alt=\"\"></p><p><br><strong>OTHER</strong>​</p><hr><p><img class=\"image_resized\" style=\"width:631px;\" src=\"https://cdn.taggbox.com/v7/https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FFoI6F_4XkAE0sGN.jpg?w=1200&amp;func=cover&amp;ci_url_encoded=1\" alt=\"\"></p><p><img class=\"image_resized\" style=\"width:603px;\" src=\"https://i.imgur.com/dZggfMf.jpg\" alt=\"\"></p>', 1, 0, 0, '2023-03-03T12:35:22');
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`, `last_comment`) VALUES (16, 'Luigi\'s Mansion 3 |OT| ScareBNB', '2023-05-03T12:35:22', 'active', '2023-05-03T12:35:22', 0, 1, 2, '<p><img src=\"https://i.imgur.com/EWNPqLr.png\" alt=\"EWNPqLr.png\"></p><p><br><strong>Developer: </strong>Next Level Games<br><strong>Publisher: </strong>Nintendo<br><strong>Platform: </strong>Nintendo Switch<br><strong>Genre:</strong> Spooktacular Goo-stbusting Action<br><strong>No. of Players: </strong>1-4 Locally, 2-8 Online<br><strong>eShop Download Size: </strong>6.3GB<br><strong>Release Date:</strong> October 31st, 2019<br><strong>Price: </strong>$59.99/£49.99/€59.99<br>&nbsp;</p><p><img src=\"https://i.imgur.com/1ooOrTB.png\" alt=\"1ooOrTB.png\"></p><p><br>Sequel to the hit 2013 3DS game, Luigi\'s Mansion: Dark Moon, Luigi\'s Mansion 3 pits everyone\'s favorite plumber in a decidedly not-mansion-like setting: the Last Resort hotel. Luigi\'s Mansion 3 takes the best aspects of the original GameCube game (continuous exploration of the mansion, more unique ghosts, the return of Portrait Ghosts) and the 3DS sequel (varied environments, varied moveset) and combines them for what is hopefully to be the best Luigi game yet!<br>&nbsp;</p><p><img src=\"https://i.imgur.com/wp4S2e5.png\" alt=\"wp4S2e5.png\"></p><p><br>Luigi, Mario, Peach, Polterpup, and a bunch of Toads have arrived at the Last Resort hotel for their much-needed vacation. Ran by <strong>Hallen Gravely</strong>, the hotel has everything you could ever want: a personal bellhop, all the sweets you could eat, gorgeous views, and extremely comfy beds...<br><br>Yet soon enough, the grave truth of the hotel is revealed; it was all a trap set up by King Boo! He has captured everyone but Luigi and Polterpup in a painting, and now our \"brave\" hero much put a stop to him once more! Can he make it to the roof of the 17-floor hotel and save his brother and friends? That\'s on you to determine!<br>&nbsp;</p><p><img src=\"https://i.imgur.com/VxrYqTG.png\" alt=\"VxrYqTG.png\"></p><p><br>Defeat ghosts by flashing them with your flashlight, then sucking them up with the Poltergust. Some ghosts may have crafty defenses that require even craftier offenses, but eventually, all of them go into the Poltergust. This time around, E. Gadd has equipped our persistent plumber with the<strong> Poltergust G-00</strong>, full of new tricks to help him out (detailed below)! In addition to fighting ghosts, there\'s plenty of puzzles on each floor to complete. You\'ll have to know all your tools well to get by!<br><br>Along with all of his typical devices (the Poltergust G-00, Flashlight, and Darklight), Luigi has a whole host of new moves in his arsenal to get the upper hand on his ghostly conspirators. Here\'s some of his most notable ones!<br>&nbsp;</p><p><img src=\"https://i.imgur.com/HmL1gDW.png\" alt=\"HmL1gDW.png\"></p><p><img src=\"https://i.imgur.com/eFnqfgR.png\" alt=\"eFnqfgR.png\"></p><p><img src=\"https://i.imgur.com/Vss1qq1.png\" alt=\"Vss1qq1.png\"></p><p><br>Swap between Luigi &amp; Gooigi on the fly in single-player, or have a second player take control of him!<br>​</p><p>Similar to the first game, Last Resort has 17 floors for you to crawl through, each with their own unique Boos Ghost! From the depressed film director Morty, to the fearsome King MacFrights, there\'s a bunch of colorful characters to meet along your journey!<br>&nbsp;</p><p><img src=\"https://i.imgur.com/PNrKwfH.png\" alt=\"PNrKwfH.png\"></p><p><strong>SCARESCRAPER</strong><br><br>A sequel to the fan-favorite mode in the previous game, Scarescraper is back, now with up to 8 players! Team up to fight a host of ghosts, find Toads, and complete a variety of other objectives online or over Local Wireless!</p><p><br><strong>SCREAMPARK</strong><br><br>A host of competitive minigames that up to 8 players can take part in locally! Get ghostly at the poolside as you collect coins in Coin Floating, shiver yer timbers in Cannon Barrage, and more! Note: This mode can only be played using sideways Joy-Cons.<br><br>Additionally, Paid DLC is coming to the game post-launch, adding even more content to Scarescraper and Screampark! Even once Halloween season is over, there\'ll still be something to fright over... positively of course.<br>&nbsp;</p><p><img src=\"https://i.imgur.com/3IPm9Gh.png\" alt=\"3IPm9Gh.png\"></p><p><br><a href=\"https://www.metacritic.com/game/switch/luigis-mansion-3\"><strong>Metacritic</strong></a><strong>: 86</strong><br><a href=\"https://opencritic.com/game/8013/luigis-mansion-3\"><strong>OpenCritic</strong></a><strong>: 86</strong><br><br><a href=\"http://switchplayer.net/2019/10/28/luigis-mansion-3-review/\">Switch Player</a> (5/5):<br>&nbsp;</p><blockquote><p>You might not be going to <i>Luigi’s Mansion 3</i> for Halloween frights but with so many inspired set-pieces, mechanics and secrets, this is the ghost-gusting adventure at its charming best. But this time Luigi deserves to share his limelight with his green gooey doppelganger.</p></blockquote><p><a href=\"https://wp.me/p8wLEc-aFv4\">VentureBeat</a> (92/100):<br>&nbsp;</p><blockquote><p>This is a huge step up for a franchise that has always been enjoyable but never felt special. Well, Luigi’s Mansion 3 is special. It’s a spooky adventure full of top-notch puzzles and so much charm that you’ll be convinced by the end that maybe Luigi has been the best brother all along.</p></blockquote><p><a href=\"https://www.nintendolife.com/reviews/nintendo-switch/luigis_mansion_3\">Nintendo Life</a> (9/10):<br>&nbsp;</p><blockquote><p>Luigi’s Mansion 3 is not only a graphical powerhouse and showcase for Next Level Games’ unrivalled mastery of video game animation, it’s also an immense helping of spooky fun as well. The amount of care and consideration poured into every facet of the game is abundantly clear, and it all results in one of the most enjoyable and attractive Switch titles of the year. It\'s also the undisputed high point of a franchise which – following this sterling release – will hopefully get even more love and attention from Nintendo fandom, and the gaming community as a whole.</p></blockquote><p><a href=\"https://www.usgamer.net/articles/luigis-mansion-3-review-only-the-poltergust-sucks\">USgamer</a> (4/5):<br>&nbsp;</p><blockquote><p>Luigi\'s Mansion 3 occasionally suffers because of its fixed camera and a ghastly boss fight here and there, but the \"goo\" overwhelms the bad in this haunting adventure. Sucking up stuff with your Poltergust is still satisfying, and slamming ghosts into each other feels so right. Add buckets of charm, and you have a game that proves—yet again—that Luigi is the superior Mario Brother.</p></blockquote><p>&nbsp;</p><p><img src=\"https://i.imgur.com/ijmt9Xe.png\" alt=\"ijmt9Xe.png\"></p><p><br>9.13.19 Nintendo Direct Trailer<br><br>Overview Trailer<br><br><a href=\"https://luigismansion.nintendo.com/\">Official Site</a></p>', 1, 0, 0, '2023-03-03T12:35:22');
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`, `last_comment`) VALUES (17, 'Horizon Forbidden West |OT| Western, but without the cowboys', '2023-05-03T12:35:22', 'active', '2023-05-03T12:35:22', 0, 1, 1, '<p><img src=\"https://cdn.discordapp.com/attachments/515617838984069121/942535793895936110/unknown.png\" alt=\"unknown.png\"></p><p><img src=\"https://cdn.discordapp.com/attachments/515617838984069121/942476806643146763/unknown.png\" alt=\"unknown.png\"></p><p><img src=\"https://cdn.discordapp.com/attachments/515617838984069121/942477977063653456/unknown.png\" alt=\"unknown.png\"><img src=\"https://cdn.discordapp.com/attachments/515617838984069121/942501312942198814/unknown.png\" alt=\"unknown.png\"><br><a href=\"https://www.gamerguides.com/horizon-forbidden-west/maps/the-forbidden-west\"><img src=\"https://cdn.discordapp.com/attachments/515617838984069121/946626863378345995/map.png\"></a></p>', 1, 0, 0, '2023-03-03T12:35:22');
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`, `last_comment`) VALUES (18, 'Animal Crossing: New Horizons |OT| Eternal Debt', '2023-05-03T12:35:22', 'active', '2023-05-03T12:35:22', 0, 1, 2, '<p><img src=\"https://i.imgur.com/qQ6j6NP.gif\" alt=\"qQ6j6NP.gif\"></p><p><img src=\"https://i.imgur.com/VA5ubRE.png\" alt=\"VA5ubRE.png\"><br>&nbsp;</p><p><img src=\"https://i.imgur.com/akS1rGP.png\" alt=\"akS1rGP.png\"><br>&nbsp;</p><p><img src=\"https://i.imgur.com/oguONjw.png\" alt=\"oguONjw.png\"></p><p><img src=\"https://i.imgur.com/3GDXeQZ.png\" alt=\"3GDXeQZ.png\"></p><p><img src=\"https://i.imgur.com/QXLDlwT.png\" alt=\"QXLDlwT.png\"></p><p><img src=\"https://i.imgur.com/tKB0so7.png\" alt=\"tKB0so7.png\"></p><p><img src=\"https://i.imgur.com/ctoqEww.png\" alt=\"ctoqEww.png\"></p><p><img src=\"https://i.imgur.com/zmBQ3sG.png\" alt=\"zmBQ3sG.png\"></p><p><img src=\"https://i.imgur.com/BC9o4lx.png\" alt=\"BC9o4lx.png\"></p><p><img src=\"https://i.imgur.com/ef0gI5f.png\" alt=\"ef0gI5f.png\"></p><p><img src=\"https://i.imgur.com/KS4DSX5.png\" alt=\"KS4DSX5.png\"></p><p><img src=\"https://i.imgur.com/qVRpWjb.png\" alt=\"qVRpWjb.png\"></p><p><img src=\"https://i.imgur.com/NQ9fJdD.png\" alt=\"NQ9fJdD.png\"></p><p><img src=\"https://i.imgur.com/l0GKymS.png\" alt=\"l0GKymS.png\"></p>', 1, 0, 0, '2023-03-03T12:35:22');
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`, `last_comment`) VALUES (19, 'God of War PC |OT| Get off the Console BOY!', '2023-05-16T12:35:22', 'active', '2023-05-16T12:35:22', 0, 1, 5, '<p><img class=\"image_resized\" style=\"width:1096.31px;\" src=\"https://i.imgur.com/4A9ce1J.gif\" alt=\"4A9ce1J.gif\"><br><br><a href=\"https://store.steampowered.com/app/1593500/God_of_War/\"><img class=\"image_resized\" style=\"width:1096.31px;\" src=\"https://i.imgur.com/KfX7XHq.png\"></a></p><p><img class=\"image_resized\" style=\"width:1096.31px;\" src=\"https://i.imgur.com/e00s8nB.png\" alt=\"e00s8nB.png\"><img class=\"image_resized\" style=\"width:1096.31px;\" src=\"https://i.imgur.com/5TA1ffu.png\" alt=\"5TA1ffu.png\"><img class=\"image_resized\" style=\"width:1096.31px;\" src=\"https://i.imgur.com/t4hn4h9.png\" alt=\"t4hn4h9.png\"><img class=\"image_resized\" style=\"width:1096.31px;\" src=\"https://i.imgur.com/Ep5lvAa.png\" alt=\"Ep5lvAa.png\"><img class=\"image_resized\" style=\"width:1096.31px;\" src=\"https://i.imgur.com/t3ev4VX.jpg\" alt=\"t3ev4VX.jpg\"></p><p><span style=\"color:rgb(184,49,47);\"><strong>General Information</strong></span><br>&nbsp;</p><p><img class=\"image_resized\" style=\"width:1096.31px;\" src=\"https://i.imgur.com/TqM1bPB.png\" alt=\"TqM1bPB.png\"></p><p><br><strong>Developer:</strong><span style=\"color:var(--text-color);\"> Jetpack Interactive (PC Port) Santa Monica Studio (Original Game)</span><br><strong>Publisher: </strong><span style=\"color:var(--text-color);\">PlayStation PC LLC (PlayStation Studios)</span><br><strong>Release Date:</strong><span style=\"color:var(--text-color);\"> January 14, 2022</span><br><strong>Genre:</strong><span style=\"color:var(--text-color);\"> Action-adventure, hack and slash</span><br><strong>Modes:</strong><span style=\"color:var(--text-color);\"> Single-player only</span><br><br><span style=\"color:rgb(184,49,47);\"><strong>Enter the Norse Realm</strong></span><br>&nbsp;</p><p><img class=\"image_resized\" style=\"width:1096.31px;\" src=\"https://i.imgur.com/TqM1bPB.png\" alt=\"TqM1bPB.png\"></p><p><br><span style=\"color:var(--text-color);\">Experience the 2018 PlayStation 4 title \'God of War\' on PC, for the first time in the franchises history. Play as Kratos, his vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods and monsters. It is in this harsh, unforgiving world that he must fight to survive… and teach his son to do the same.</span><br><br><span style=\"color:var(--text-color);\">Kratos is a father again. As mentor and protector to Atreus, a son determined to earn his respect, he is forced to deal with and control the rage that has long defined him while out in a very dangerous world with his son.</span><br><br><span style=\"color:rgb(184,49,47);\"><strong>Wield the Leviathan Axe</strong></span><br>&nbsp;</p><p><img class=\"image_resized\" style=\"width:1096.31px;\" src=\"https://i.imgur.com/TqM1bPB.png\" alt=\"TqM1bPB.png\"></p><p><br><span style=\"color:var(--text-color);\">With an over the shoulder camera that brings the player closer to the action than ever before, fights in God of War mirror the pantheon of Norse creatures Kratos will face: grand, gritty &amp; grueling. A new main weapon and new abilities retain the defining spirit of the God of War series while presenting a vision of conflict that forges new ground in the genre.</span><br><br><span style=\"color:var(--text-color);\">In God of War you\'ll be able to face enemies with the Leviathan Axe, which can be thrown and recalled to Kratos along with being used as a powerful melee weapon. You\'ll also have access to the Guardian Shield to block and parry enemy attacks. Kratos can also go unarmed, pummeling his enemies with his fists.</span><br><br><span style=\"color:rgb(184,49,47);\"><strong>PC Exclusive Features</strong></span><br>&nbsp;</p><p><img class=\"image_resized\" style=\"width:1096.31px;\" src=\"https://i.imgur.com/TqM1bPB.png\" alt=\"TqM1bPB.png\"></p><p><br><span style=\"color:var(--text-color);\">Striking visuals enhanced on PC. Enjoy true 4K resolution with unlocked frame rates for peak performance. Dial in your settings via a wide range of graphical presets and options including higher resolution shadows, improved screen space reflections, the addition of GTAO and SSDO, and much more.</span><br><br><span style=\"color:var(--text-color);\">Quality meets performance. Harness the AI power of NVIDIA Deep Learning Super Sampling (DLSS) to boost frame rates and generate beautiful, sharp images on select Nvidia GPUs. Utilize NVIDIA Reflex low latency technology allowing you to react quicker and hit harder combos with the responsive gameplay you crave on GeForce GPUs.</span><br><br><span style=\"color:var(--text-color);\">Immerse yourself like never before. Journey through the Norse realms taking in breathtaking vistas in panoramic widescreen. With 21:9 ultra-widescreen support, God of War presents a cinema quality experience that further expands the original seamless theatrical vision.</span><br><br><span style=\"color:rgb(184,49,47);\"><strong>Media</strong></span><br>&nbsp;</p><p><strong><img class=\"image_resized\" style=\"width:1096.31px;\" src=\"https://i.imgur.com/TqM1bPB.png\" alt=\"TqM1bPB.png\"></strong></p><p><br><span style=\"color:var(--text-color);\"><strong>Video 1 - </strong></span><a href=\"https://www.youtube.com/watch?v=HqQMh_tij0c\"><span style=\"color:var(--text-color);\"><strong>God of War PC – Announce Trailer</strong></span></a><br><span style=\"color:var(--text-color);\"><strong>Video 2 - </strong></span><a href=\"https://www.youtube.com/watch?v=RQK_40a0XUY\"><span style=\"color:var(--text-color);\"><strong>God of War PC – Features Trailer</strong></span></a></p>', 1, 0, 0, '2023-05-16T12:35:22');
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`, `last_comment`) VALUES (20, 'The Legend of Zelda: Tears of the Kingdom |OT| Do not look away. You witness a king\'s revival!', '2023-05-18T12:35:22', 'active', '2023-05-18T12:35:22', 0, 1, 5, '<p><img src=\"https://i.imgur.com/7HpN4kn.jpg\" alt=\"7HpN4kn.jpg\"></p><p><img src=\"https://i.imgur.com/bl1R0r7.png\" alt=\"bl1R0r7.png\"></p><p><img src=\"https://i.imgur.com/SScZndf.jpg\" alt=\"SScZndf.jpg\"></p><p><img src=\"https://i.imgur.com/5XHTHe3.jpg\" alt=\"5XHTHe3.jpg\"></p><p><img src=\"https://i.imgur.com/U8q0luD.png\" alt=\"U8q0luD.png\"></p><p><img src=\"https://i.imgur.com/p79GwgQ.png\" alt=\"p79GwgQ.png\"></p><p><img src=\"https://i.imgur.com/4bXG9SX.png\" alt=\"4bXG9SX.png\"></p><p><img src=\"https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/04/all-confirmed-amiibo-for-tears-of-the-kingdom-paraglider.jpg?q=50&amp;fit=crop&amp;w=1500&amp;dpr=1.5\" alt=\"all-confirmed-amiibo-for-tears-of-the-kingdom-paraglider.jpg\"></p><p><img src=\"https://i.imgur.com/aBhvFJi.png\" alt=\"aBhvFJi.png\"></p><p><img src=\"https://i.imgur.com/Q39jEz3.png\" alt=\"Q39jEz3.png\"></p><p><img src=\"https://i.imgur.com/fkcDMtg.png\" alt=\"fkcDMtg.png\"></p><p><img src=\"https://i.imgur.com/qToxru3.png\" alt=\"qToxru3.png\"></p>', 1, 0, 0, '2023-05-18T12:35:22');
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`, `last_comment`) VALUES (21, 'Darkest Dungeon II |OT| Ruin has come to our forum', '2023-05-19T12:35:22', 'active', '2023-05-19T12:35:22', 0, 1, 1, '<p><img class=\"image_resized\" style=\"width:auto;\" src=\"https://i.imgur.com/vlXNn9z.jpg\" alt=\"\"></p><p><br>Darkest Dungeon II is a roguelike road trip of the damned. Form a party, equip your stagecoach, and set off across the decaying landscape on a last gasp quest to avert the apocalypse. The greatest dangers you face, however, may come from within...<br><br><i><strong>Gather your courage and ride out into the chaos of a world undone.</strong></i><br>Four heroes and a stagecoach are all that stand between darkness and salvation.<br>&nbsp;</p><p><img class=\"image_resized\" style=\"width:auto;\" src=\"https://cdn.akamai.steamstatic.com/steam/apps/1940340/extras/DD2-Driving-1-630x200.gif?t=1683329567\" alt=\"\"></p><p><br><i><strong>Tried and True Turn-based Combat, Improved</strong></i><br>The ground-breaking genre-defining combat from Darkest Dungeon returns, but everything from stats to rules has been refined and improved. The all new Token System helps make your decisions impactful while adding even more depth of play.<br>&nbsp;</p><p><img class=\"image_resized\" style=\"width:auto;\" src=\"https://cdn.akamai.steamstatic.com/steam/apps/1940340/extras/DD2-Combat-2-630x300.gif?t=1683329567\" alt=\"\"></p><p><br><i><strong>Unforgettable Heroes</strong></i><br>Uncover and experience the tragic origin stories of each hero. Unlock their full potential via new skills, paths, items, and more.<br>&nbsp;</p><p><img class=\"image_resized\" style=\"width:auto;\" src=\"https://cdn.akamai.steamstatic.com/steam/apps/1940340/extras/DD2-Story-1-630x300.gif?t=1683329567\" alt=\"\"></p><p><br><i><strong>Roguelike Runs, Each With Its Own Emerging Story</strong></i><br>Each expedition lasts from 30 minutes to several hours. Even an untimely end will arm you with resources that can be spent to improve your next journey.<br><br><i><strong>The Altar of Hope</strong></i><br>Engage with a massive system of upgrades and boons that opens up new strategies for each expedition. Choose what’s important to you as you formulate your assaults on the Mountain.<br>&nbsp;</p><p><img class=\"image_resized\" style=\"width:auto;\" src=\"https://cdn.akamai.steamstatic.com/steam/apps/1940340/extras/DD2-Altar-1-630x300.gif?t=1683329567\" alt=\"\"></p><p><br><i><strong>The Affinity System</strong></i><br>As travels progress, heroes bond with each other or grate on each others’ nerves, leading to desperately needed combat synergies or journey-ending dysfunction. Manage their stress and interaction to keep the team together until the bitter end.<br>&nbsp;</p><p><img class=\"image_resized\" style=\"width:auto;\" src=\"https://cdn.akamai.steamstatic.com/steam/apps/1940340/extras/inseparable_600w.jpg?t=1683329567\" alt=\"\"></p><p><br><i><strong>Nightmarish Environs</strong></i><br>From the burning Sprawl to the diseased Foetor, the long road to the Mountain will challenge your strategies and your endurance.<br><br>Explore five distinct regions, each with their own unique creatures and challenges.<br>&nbsp;</p><p><img class=\"image_resized\" style=\"width:auto;\" src=\"https://cdn.akamai.steamstatic.com/steam/apps/1940340/extras/DD2-Driving-2-630x200.gif?t=1683329567\" alt=\"\"></p><p><br><i><strong>A Moment’s Peace</strong></i><br>Rest your weary, shell-shocked heroes at the Inn, where you can relieve their stress and try to improve their relationships with a variety of diversions and delights.<br>&nbsp;</p><p><img class=\"image_resized\" style=\"width:auto;\" src=\"https://cdn.akamai.steamstatic.com/steam/apps/1940340/extras/DD2-Inn-1-630x200.gif?t=1683329567\" alt=\"\"></p><p><br><i><strong>Face Your Failures</strong></i><br>Journey to the Mountain and face down five terrifying manifestations of your weaknesses.<br>&nbsp;</p><p><img class=\"image_resized\" style=\"width:auto;\" src=\"https://cdn.akamai.steamstatic.com/steam/apps/1940340/extras/Mountain-DRIVING_600w.png?t=1683329567\" alt=\"\"><br><br><i><strong>Signature Art Style, Evolved</strong></i><br>Darkest Dungeon’s genre-defining art now improved with no expense spared on 3D visuals, animation, and visual FX.<br>&nbsp;</p><p><img class=\"image_resized\" style=\"width:auto;\" src=\"https://cdn.akamai.steamstatic.com/steam/apps/1940340/extras/DD2-Combat-1-630x300.gif?t=1683329567\" alt=\"\"><br><br><i><strong>A Feast for the Ears</strong></i><br>The audio team from Darkest Dungeon is back. Revel in an all new narration performance by voice actor Wayne June, a brand new expansive score by Stuart Chatwood, and bone-crunching sound effects from Power Up Audio.<br>&nbsp;</p><p><img class=\"image_resized\" style=\"width:auto;\" src=\"https://cdn.akamai.steamstatic.com/steam/apps/1940340/extras/jester_600w.png?t=1683329567\" alt=\"\"></p><p><img class=\"image_resized\" style=\"width:auto;\" src=\"https://i.imgur.com/bhvJR49.jpg\" alt=\"\"></p>', 1, 0, 0, '2023-05-19T12:35:22');
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`, `last_comment`) VALUES (22, 'DOOM Eternal |OT| Hells Bells', '2023-05-19T12:31:00', 'active', '2023-05-19T11:35:22', 0, 1, 6, '<p><img src=\"https://i.imgur.com/pwrgILU.gif\" alt=\"pwrgILU.gif\"></p><p><img src=\"http://i.imgur.com/AC0XwRH.gif\" alt=\"AC0XwRH.gif\"></p><p><img src=\"http://i.imgur.com/BoxD4Pg.gif\" alt=\"BoxD4Pg.gif\"></p><p><img src=\"http://i.imgur.com/MhCFovC.gif\" alt=\"MhCFovC.gif\"></p><p><img src=\"http://i.imgur.com/wG2tpYT.gif\" alt=\"wG2tpYT.gif\"></p><p><img src=\"http://i.imgur.com/Dj58wLO.gif\" alt=\"Dj58wLO.gif\"></p><p><img src=\"http://i.imgur.com/1rS77ww.gif\" alt=\"1rS77ww.gif\"></p><p><img src=\"http://i.imgur.com/jqTtN2c.gif\" alt=\"jqTtN2c.gif\"></p><p><img src=\"http://i.imgur.com/97DWpMl.gif\" alt=\"97DWpMl.gif\"></p><p><img src=\"http://i.imgur.com/OKH7I37.gif\" alt=\"OKH7I37.gif\"></p><p><img src=\"http://i.imgur.com/MHVg7x7.gif\" alt=\"MHVg7x7.gif\"></p><p><img src=\"http://i.imgur.com/ncoN3XM.gif\" alt=\"ncoN3XM.gif\"></p><p><img src=\"http://i.imgur.com/CDLI08D.gif\" alt=\"CDLI08D.gif\"></p><p><img src=\"http://i.imgur.com/7PChMZQ.gif\" alt=\"7PChMZQ.gif\"><br><a href=\"https://www.resetera.com/threads/doom-eternal-review-thread.175421/\"><img src=\"https://i.imgur.com/U2xfgz7.gif\"></a></p><p><img src=\"https://i.imgur.com/UOqYpw8.gif\" alt=\"UOqYpw8.gif\"></p><p><img src=\"https://i.imgur.com/ofxWi2l.gif\" alt=\"ofxWi2l.gif\"><br><a href=\"https://www.youtube.com/watch?v=2HOClc6Svg4\"><img src=\"https://i.imgur.com/56mx5yx.gif\"></a><br><a href=\"https://www.youtube.com/watch?v=FkklG9MA0vM\"><img src=\"https://i.imgur.com/0b1DsDD.gif\"></a><br><a href=\"https://youtu.be/_UuktemkCFI\"><img src=\"https://i.imgur.com/MpibwRM.gif\"></a></p><p><img src=\"http://i.imgur.com/H4TItt9.gif\" alt=\"H4TItt9.gif\"></p><figure class=\"image\"><img src=\"https://i.imgur.com/cYpo17M.gif\" alt=\"cYpo17M.gif\"></figure>', 1, 0, 0, '2023-05-19T11:35:22');
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`, `last_comment`) VALUES (23, 'Final Fantasy XVI |OT| Phoenix Down Square Enix', '2023-06-22T11:35:22', 'active', '2023-06-22T11:35:22', 0, 1, 2, '<p><a href=\"https://www.resetera.com/threads/final-fantasy-xvi-spoiler-thread-open-spoilers.731475/\"><img src=\"https://i.imgur.com/V5NFO5O.jpg\"></a></p><p><img src=\"https://i.imgur.com/gJUBieG.jpg\" alt=\"gJUBieG.jpg\"></p><p><img src=\"https://i.imgur.com/FL1XWJ7.jpg\" alt=\"FL1XWJ7.jpg\"></p><p><br><a href=\"https://www.playstation.com/en-gb/games/final-fantasy-xvi/\"><img src=\"https://i.imgur.com/ygWmNqA.jpg\"></a><br>&nbsp;</p><p><img src=\"https://i.imgur.com/3rkAlS1.jpg\" alt=\"3rkAlS1.jpg\"></p><p><img src=\"https://i.imgur.com/b9zw0AA.jpg\" alt=\"b9zw0AA.jpg\"></p><p><img src=\"https://i.imgur.com/MTnR1V6.jpg\" alt=\"MTnR1V6.jpg\"></p><p><img src=\"https://i.imgur.com/LRo2oDn.jpg\" alt=\"LRo2oDn.jpg\"></p><p><img src=\"https://i.imgur.com/Ser2LUu.jpg\" alt=\"Ser2LUu.jpg\"></p><p><img src=\"https://i.imgur.com/NDNpNOw.jpg\" alt=\"NDNpNOw.jpg\"></p><p><img src=\"https://i.imgur.com/PzFBrRU.jpg\" alt=\"PzFBrRU.jpg\"></p><p><img src=\"https://i.imgur.com/UvYQkWW.jpg\" alt=\"UvYQkWW.jpg\"></p><p><img src=\"https://i.imgur.com/0Ql3oQ3.jpg\" alt=\"0Ql3oQ3.jpg\"></p><p><img src=\"https://i.imgur.com/FfayZ2I.jpg\" alt=\"FfayZ2I.jpg\"></p><p><img src=\"https://i.imgur.com/LrmTxUn.jpg\" alt=\"LrmTxUn.jpg\"></p><p><img src=\"https://i.imgur.com/2UFOu5Y.jpg\" alt=\"2UFOu5Y.jpg\"></p><p><img src=\"https://i.imgur.com/hzfV0Z0.jpg\" alt=\"hzfV0Z0.jpg\"></p><p><img src=\"https://i.imgur.com/3cSrq2E.jpg\" alt=\"3cSrq2E.jpg\"></p><p><img src=\"https://i.imgur.com/6qrQVNG.jpg\" alt=\"6qrQVNG.jpg\"></p><p><img src=\"https://i.imgur.com/YCoYyLH.jpg\" alt=\"YCoYyLH.jpg\"></p><p><img src=\"https://i.imgur.com/rUV3eVC.jpg\" alt=\"rUV3eVC.jpg\"></p><p><img src=\"https://i.imgur.com/nM23tkn.jpg\" alt=\"nM23tkn.jpg\"></p><p><img src=\"https://i.imgur.com/ikItVx6.jpg\" alt=\"ikItVx6.jpg\"></p><p><img src=\"https://i.imgur.com/Q19n9be.jpg\" alt=\"Q19n9be.jpg\"></p><p><img src=\"https://i.imgur.com/5OyDkro.jpg\" alt=\"5OyDkro.jpg\"></p><p><img src=\"https://i.imgur.com/crBABai.jpg\" alt=\"crBABai.jpg\"></p><p><img src=\"https://i.imgur.com/XM6PTiF.jpg\" alt=\"XM6PTiF.jpg\"></p><p><img class=\"image_resized\" style=\"width:540px;\" src=\"https://i.imgur.com/8QFH7d6.jpg\" alt=\"8QFH7d6.jpg\"></p><p><img class=\"image_resized\" style=\"width:539px;\" src=\"https://i.imgur.com/H5HQHPS.jpg\" alt=\"H5HQHPS.jpg\"></p><p><img class=\"image_resized\" style=\"width:539px;\" src=\"https://i.imgur.com/CjSOEze.jpg\" alt=\"CjSOEze.jpg\"></p><p><img class=\"image_resized\" style=\"width:540px;\" src=\"https://i.imgur.com/F9TfGV5.jpg\" alt=\"F9TfGV5.jpg\"></p><p><img class=\"image_resized\" style=\"width:542px;\" src=\"https://i.imgur.com/zFTenvu.jpg\" alt=\"zFTenvu.jpg\"></p><p><img class=\"image_resized\" style=\"width:543px;\" src=\"https://i.imgur.com/MWHSWx0.jpg\" alt=\"MWHSWx0.jpg\"></p><p><img class=\"image_resized\" style=\"width:542px;\" src=\"https://i.imgur.com/0einsqf.jpg\" alt=\"0einsqf.jpg\"></p><p><img class=\"image_resized\" style=\"width:542px;\" src=\"https://i.imgur.com/iJb4Vql.jpg\" alt=\"iJb4Vql.jpg\"></p><p><img src=\"https://i.imgur.com/swLlxzK.jpg\" alt=\"swLlxzK.jpg\"></p><p><img src=\"https://i.imgur.com/BvDVNle.jpg\" alt=\"BvDVNle.jpg\"></p><p><img src=\"https://i.imgur.com/KRwjVCs.jpg\" alt=\"KRwjVCs.jpg\"></p><p><img src=\"https://i.imgur.com/AGiB2Eo.jpg\" alt=\"AGiB2Eo.jpg\"></p><p><img src=\"https://i.imgur.com/KDrmHWk.jpg\" alt=\"KDrmHWk.jpg\"></p><p><img src=\"https://i.imgur.com/TK6Qrvp.jpg\" alt=\"TK6Qrvp.jpg\"></p><p><a href=\"https://www.youtube.com/watch?v=2tBnBAkHv9M\"><img class=\"image_resized\" style=\"width:524px;\" src=\"https://i.imgur.com/EcMjdRc.jpg\"> </a><a href=\"https://www.youtube.com/watch?v=Z34Q538LMeo\"><img class=\"image_resized\" style=\"width:524px;\" src=\"https://i.imgur.com/qD3KBSj.jpg\"></a><br><a href=\"https://www.youtube.com/watch?v=u-SdiYbSGIQ\"><img class=\"image_resized\" style=\"width:524px;\" src=\"https://i.imgur.com/xuT006S.jpg\"> </a><a href=\"https://www.youtube.com/watch?v=-U9SEYZDf0A\"><img class=\"image_resized\" style=\"width:526px;\" src=\"https://i.imgur.com/zz8DWB0.jpg\"></a><br><a href=\"https://www.youtube.com/watch?v=wwWgVDIv3rs\"><img class=\"image_resized\" style=\"width:522px;\" src=\"https://i.imgur.com/fuTcp7F.jpg\"></a></p><p><img class=\"image_resized\" style=\"width:525px;\" src=\"https://i.imgur.com/dOa5tDe.jpg\" alt=\"dOa5tDe.jpg\"></p><p><img class=\"image_resized\" style=\"width:521px;\" src=\"https://i.imgur.com/Z8bRqPq.jpg\" alt=\"Z8bRqPq.jpg\"></p><p><img class=\"image_resized\" style=\"width:523px;\" src=\"https://i.imgur.com/2BZvFvS.jpg\" alt=\"2BZvFvS.jpg\"></p><p><img class=\"image_resized\" style=\"width:520px;\" src=\"https://i.imgur.com/9JcQuR2.jpg\" alt=\"9JcQuR2.jpg\"></p><p><img class=\"image_resized\" style=\"width:521px;\" src=\"https://i.imgur.com/BOTx70x.jpg\" alt=\"BOTx70x.jpg\"></p>', 1, 0, 0, '2023-06-22T11:35:22');

COMMIT;


-- -----------------------------------------------------
-- Data for table `comment`
-- -----------------------------------------------------
START TRANSACTION;
USE `lorehunterdb`;
INSERT INTO `comment` (`id`, `content`, `created_at`, `status`, `last_edited`, `parent_id`, `user_id`, `post_id`, `enabled`) VALUES (1, 'Glad we are finally getting some solid gameplay footage.', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', NULL, 1, 1, 1);
INSERT INTO `comment` (`id`, `content`, `created_at`, `status`, `last_edited`, `parent_id`, `user_id`, `post_id`, `enabled`) VALUES (2, 'A silent being wields thunder...', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', NULL, 2, 2, 1);
INSERT INTO `comment` (`id`, `content`, `created_at`, `status`, `last_edited`, `parent_id`, `user_id`, `post_id`, `enabled`) VALUES (3, 'Outta nowhere!!!! But I\'m excited!!!', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', NULL, 2, 3, 1);
INSERT INTO `comment` (`id`, `content`, `created_at`, `status`, `last_edited`, `parent_id`, `user_id`, `post_id`, `enabled`) VALUES (4, 'I play all Souls game the same and have a lot of fun. I don’t look stuff up and begin as the most barren of character and just go from there', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', NULL, 2, 4, 1);
INSERT INTO `comment` (`id`, `content`, `created_at`, `status`, `last_edited`, `parent_id`, `user_id`, `post_id`, `enabled`) VALUES (5, 'I\'m not sure which ad caused it, unfortunately, but I just got this pop up', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', NULL, 2, 5, 1);
INSERT INTO `comment` (`id`, `content`, `created_at`, `status`, `last_edited`, `parent_id`, `user_id`, `post_id`, `enabled`) VALUES (6, 'What can more be said about Elden Ring? It\'s an evolved Souls game with absolutely massive scope. I was in the middle playing it when my first child was born, and playing through the rest of it over parental leave helped keep me sane? It was an amazing journey, and I\'m looking forward to seeing what else is coming with some DLC.', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', NULL, 2, 6, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `game`
-- -----------------------------------------------------
START TRANSACTION;
USE `lorehunterdb`;
INSERT INTO `game` (`id`, `created_at`, `title`, `description`, `released`, `background_image`, `metacritic_score`) VALUES (1, '2023-03-03T12:35:22', 'Resident Evil (2002)', 'Resident Evil is a survival horror video game developed by Capcom Production Studio 4 and published by Capcom. Released for the GameCube video game console in 2002, it is a remake of the 1996 PlayStation game Resident Evil, the first installment in the Resident Evil video game series. The story takes place in 1998 near the fictional Midwestern town of Raccoon City where a series of bizarre murders have taken place. The player takes on the role of either Chris Redfield or Jill Valentine, S.T.A.R.S. agents sent in by the city to investigate the murders.', '2002-03-22', 'https://media.rawg.io/media/games/d24/d24ceb45b267f4b69b5d51c36c9a46db.jpg', 94);
INSERT INTO `game` (`id`, `created_at`, `title`, `description`, `released`, `background_image`, `metacritic_score`) VALUES (2, '2023-03-03T12:35:22', 'Shadow of the Colossus (2011)', 'PlayStation 2 classic that never made it out of the Sony game system. An eerie and surreal tale about sacrifice and cruelty that the world contains. </p>\\n<p>Play as Wander -- young warrior that roams vast and hollow game universe that’s surrounded by sharp cliffs and endless water. He is on the mission to kill 16 gargantuan colossi all scattered around the game world. </p>\\n<p>Each colossus is a puzzle and can be killed only after solving it. At Wander’s disposal are his sword and bow that helps him climb the beasts. Each one requires the player to come up with a cunning strategy to topple each behemoth. The story is told in a very ascetic way and consists of only two in-game cutscenes. Nevertheless, it helps to build up the atmosphere mystery in the game epos. </p>\\n<p>Developers are no strangers in the dark, atmospheric games such as this: they also behind critically acclaimed ICO that also had been published on PlayStation 2.', '2011-09-22', 'https://media.rawg.io/media/games/6ac/6ac602e70c837ababdf025e997391d9c.jpg', 95);
INSERT INTO `game` (`id`, `created_at`, `title`, `description`, `released`, `background_image`, `metacritic_score`) VALUES (3, '2023-03-03T12:35:22', 'Metal Gear Solid', 'You are Snake, a government agent on a mission to regain control of a secret nuclear weapons base from terrorist hands. Lightly armed and facing an army of foes, Snake must avoid firefights in order to survive. If Snake can locate them he can utilize advanced hardware, ranging from silenced pistols to ground-to-air missiles. Enemies react to sight and sound - so stay quiet and stay in the shadows. State-of-the-art graphics: textures, transparencies, models and explosions. Taut, gripping story with multiple endings - a truly cinematic experience.', '1998-09-03', 'https://media.rawg.io/media/games/bbc/bbce6f1659d35ffc16aed8b66e9990a1.jpg', 93);

COMMIT;


-- -----------------------------------------------------
-- Data for table `user_has_game`
-- -----------------------------------------------------
START TRANSACTION;
USE `lorehunterdb`;
INSERT INTO `user_has_game` (`user_id`, `game_id`, `game_category`, `rating`, `review`, `is_recommended`, `playtime`, `created_at`) VALUES (1, 1, 'PLAYED', 'FIVE', 'I love coming back to Resident Evil, and this version does a good job of updating the look and feel of an old game for a modern audience. Some of the older visual flaws detract from the experience and pulled me out of tense moments, but the gameplay hooked me right back in. Resident Evil relies on atmosphere, tough limitations, and danger creeping around all corners, and this port recaptures the formula of a classic, relentless survival-horror game.', 1, 12, '2023-03-04T12:35:22');
INSERT INTO `user_has_game` (`user_id`, `game_id`, `game_category`, `rating`, `review`, `is_recommended`, `playtime`, `created_at`) VALUES (2, 2, 'PLAYED', 'FIVE', 'Much like Ueda’s other games, this is an interpretative affair which makes do with the shortest of scripts, allowing the actual action itself to shape your emotions. Despite all of the mechanics being introduced in the opening 10 minutes or so, each boss fight manages to challenge you in a unique way. There are constants (you’ll typically need to find a way to climb atop the beasts and decimate their weak points) but the battles are awe-inducingly original, whether you’re running across the spine of a giant sand worm or playing hide and seek with a bearded troll.', 1, 10, '2023-03-04T12:35:22');
INSERT INTO `user_has_game` (`user_id`, `game_id`, `game_category`, `rating`, `review`, `is_recommended`, `playtime`, `created_at`) VALUES (3, 3, 'PLAYED', 'FIVE', 'You’ve just infiltrated a highly secure enemy base using only your cunning and the scant equipment that you happened to find on your way. After rendezvousing with your hostage, you’re showered with a stirring speech on the importance of global nuclear disarmament, as well as the horrific impact of an increasingly militarised world economy. Suddenly you hear a ruckus outside the prison cell that you’ve just broken into, and upon opening the door, you’re treated to the hilarious sight of an enemy solider stripped naked, and tied up in a humorous position on the floor. That sort of wild disparity in tone is the very essence of Metal Gear Solid – a true masterpiece, and arguably the best game in the long running franchise.', 1, 13, '2023-03-04T12:35:22');

COMMIT;


-- -----------------------------------------------------
-- Data for table `notification`
-- -----------------------------------------------------
START TRANSACTION;
USE `lorehunterdb`;
INSERT INTO `notification` (`id`, `message`, `created_at`) VALUES (1, 'Staff have decided to place a soft ban on topics concerning AI content generation and their algorithms like Stable Diffusion and ChatGPT. You can read more about the update here.', '2023-03-03T12:35:22');

COMMIT;


-- -----------------------------------------------------
-- Data for table `user_notification`
-- -----------------------------------------------------
START TRANSACTION;
USE `lorehunterdb`;
INSERT INTO `user_notification` (`user_id`, `notification_id`, `viewed`, `viewed_at`, `dismissed`, `dismissed_at`) VALUES (3, 1, 0, NULL, 0, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `user_likes_comment`
-- -----------------------------------------------------
START TRANSACTION;
USE `lorehunterdb`;
INSERT INTO `user_likes_comment` (`id`, `user_id`, `comment_id`) VALUES (1, 3, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `ticket`
-- -----------------------------------------------------
START TRANSACTION;
USE `lorehunterdb`;
INSERT INTO `ticket` (`id`, `title`, `description`, `status`, `priority`, `created_at`, `updated_at`, `user_id`) VALUES (1, 'Username Change Request', 'I would like to change my username to `Samus Aran` please. Thank you.', 'OPEN', 'MEDIUM', '2023-03-03T12:35:22', '2023-03-03T12:35:22', 4);

COMMIT;


-- -----------------------------------------------------
-- Data for table `ticket_message`
-- -----------------------------------------------------
START TRANSACTION;
USE `lorehunterdb`;
INSERT INTO `ticket_message` (`id`, `content`, `created_at`, `ticket_id`, `user_id`) VALUES (1, 'Good morning Samus! We\'d love to take care of that for you. Let me first verify that your last username change was not within the past year.', '2023-03-03T12:35:22', 1, 3);

COMMIT;


-- -----------------------------------------------------
-- Data for table `user_has_follower`
-- -----------------------------------------------------
START TRANSACTION;
USE `lorehunterdb`;
INSERT INTO `user_has_follower` (`follower_id`, `followed_id`, `created_at`) VALUES (1, 2, '2023-05-19T11:35:22');

COMMIT;


-- -----------------------------------------------------
-- Data for table `user_conversation`
-- -----------------------------------------------------
START TRANSACTION;
USE `lorehunterdb`;
INSERT INTO `user_conversation` (`id`, `user_id`, `created_at`, `updated_at`) VALUES (1, 1, '2023-05-19T11:35:22', '2023-05-19T11:35:22');

COMMIT;


-- -----------------------------------------------------
-- Data for table `private_message`
-- -----------------------------------------------------
START TRANSACTION;
USE `lorehunterdb`;
INSERT INTO `private_message` (`id`, `user_conversation_id`, `content`, `created_at`, `sender_id`, `recipient_id`) VALUES (1, 1, 'Hey, what\'s up?', '2023-05-19T11:35:22', 1, 2);
INSERT INTO `private_message` (`id`, `user_conversation_id`, `content`, `created_at`, `sender_id`, `recipient_id`) VALUES (2, 1, 'Not much. How about you?', '2023-05-19T11:37:22', 2, 1);

COMMIT;

