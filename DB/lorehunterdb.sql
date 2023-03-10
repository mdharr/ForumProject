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
  `view_count` INT NULL,
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
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `email`, `created_at`, `image_url`, `last_activity`, `status`, `comment_count`, `banner_message`, `post_count`) VALUES (1, 'Wesker', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', 1, 'ADMIN', 'Albert', 'Wesker', 'admin@admin.com', '2023-03-03T12:35:22', 'https://i.pinimg.com/736x/55/88/47/5588473ad336e9826e4036f8a508d9b8.jpg', '2023-03-03T12:35:22', 'active', 0, 'I am the master of this domain.', 0);
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `email`, `created_at`, `image_url`, `last_activity`, `status`, `comment_count`, `banner_message`, `post_count`) VALUES (2, 'Wander', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', 1, 'ADMIN', 'Michael', 'Harrington', 'acatt.mh@gmail.com', '2023-03-03T12:35:22', 'https://cdn.discordapp.com/attachments/1080302897599877181/1080303009180946562/ico-profile-picture.jpeg', '2023-03-03T12:35:22', 'active', 0, 'Raise thy sword by the light, and head to the place where the sword\'s light gathers.', 0);
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `email`, `created_at`, `image_url`, `last_activity`, `status`, `comment_count`, `banner_message`, `post_count`) VALUES (3, 'Snake', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', 1, 'ADMIN', 'Solid', 'Snake', 'snake@MGS.com', '2023-03-03T12:35:22', 'https://1.bp.blogspot.com/-VtNMBLJexIg/UEUABciRBMI/AAAAAAAAIBs/IJLeyg4ELYk/s1600/Old_Snake_by_metalgearsolid.jpg', '2023-03-03T12:35:22', 'active', 0, 'A legend is nothing but fiction. Someone tells it, someone else remembers it, everybody passes it on.', 0);

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
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`) VALUES (1, '[Reddit Rumor] Embargo preview FFXVI lifted next week', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 1, 1, 'Two Italian reviewers have stated that an important game\'s embargo will expire at the end of the month, and have hinted that it is FFXVI (preview). Obviously do not take this information as 100% certain, we will find out in the coming days. To avoid NDA problems I will avoid specifying who they are.', 1, 37);
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`) VALUES (2, '12th Colossus', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 43, 2, 2, 'Paradise floats upon the lake....', 1, 56);
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`) VALUES (3, 'Elden Ring DLC Announced - Shadow of the Erdtree Expansion', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 3, 1, 'Rise, Tarnished, and let us walk a new path together.\nAn upcoming expansion for #ELDENRING Shadow of the Erdtree, is currently in development. We hope you look forward to new adventures in the Lands Between.', 1, 1136);
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`) VALUES (4, 'Giving Elden Ring another chance', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 4, 2, 'I\'m thinking about giving ER another chance, but for realsies this time. I got it on launch and liked it well enough to sink 20-30 hours into it before I started low-key hating the game. I gave up somewhere into the second area behind the castle, after being overwhelmed with all the systems, weapons, and things to do. I had a constant feeling of FOMO and anxiety, especially reading the OT here on Era where everybody talked about builds and ever-changing balancing issues from patches. Never once did I just relax and enjoy exploring the world, there was always this sense that I was playing it wrong in some way that I couldn\'t quite place my finger on.', 1, 23);
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`) VALUES (5, 'The Ad Reporting Thread', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 5, 1, 'Please use this thread to report bad ads (e.g. full-screen takeovers, pop-ups, redirects, etc.). We make it a high priority to ensure that intrusive ads don\'t show up on the site and to get them removed as quickly as possible so that you can keep having a great experience.', 1, 12);
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`) VALUES (6, 'Games of the Year Awards 2022', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 6, 2, 'Top 20 Games of 2022', 1, 19);
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`) VALUES (7, 'Programmer/Designer portfolio shows first look at The Silver Case: The 25th Ward\'s assets', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 1, 3, 'To put in perspective, this is a remake of a game that was originally only for (VERY OLD) mobile phones, and probably had little if any 3D motion. I think it was just a visual novel.', 1, 256);
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`) VALUES (8, 'Cursed Castilla (Ghouls and Ghosts-like) is coming to Vita November 9th ($11.99)', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 1, 2, 'This game has already been released on PC, PS4, Xbone, and 3DS, but somehow it completely flew under my radar until the announcement of its upcoming Vita port. I think it looks pretty awesome!', 1, 4320);
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`) VALUES (9, 'Sorcer Striker (M2 ShotTriggers) releasing on PS4 on November 11th in Japan', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 1, 3, 'I hope this sells... I heard Battle Garegga was a total flop in Japan :(', 1, 12239);
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`) VALUES (10, 'Doesn\'t the steam fall sale start today?', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 1, 3, 'I\'ll try to split the things I want to buy between this sale and the next two (Autumn and Winter). As always, I don\'t know if I want good deals to spend a lot, or if I want bad deals so I don\'t spend money lol', 1, 363);
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`) VALUES (11, 'Game Informer: The Resident Evil TV Series Is Dead, But You Can Watch The Proof Of Concept Now', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 1, 2, 'I\'m glad it didn\'t get picked up. I want a more direct adaptation of the series and this would have muddied the waters. I\'m not mad about the idea of setting an original story in a known universe and introducing a new character, when the actual characters/stories that people like haven\'t been adapted yet.', 1, 785);

COMMIT;


-- -----------------------------------------------------
-- Data for table `comment`
-- -----------------------------------------------------
START TRANSACTION;
USE `lorehunterdb`;
INSERT INTO `comment` (`id`, `content`, `created_at`, `status`, `last_edited`, `parent_id`, `user_id`, `post_id`, `enabled`) VALUES (1, 'Glad we are finally getting some solid gameplay footage.', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', NULL, 1, 1, 1);
INSERT INTO `comment` (`id`, `content`, `created_at`, `status`, `last_edited`, `parent_id`, `user_id`, `post_id`, `enabled`) VALUES (2, 'A silent being wields thunder...', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', NULL, 2, 2, 1);
INSERT INTO `comment` (`id`, `content`, `created_at`, `status`, `last_edited`, `parent_id`, `user_id`, `post_id`, `enabled`) VALUES (3, 'Outta nowhere!!!! But I\'m excited!!!', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', NULL, 2, 3, 1);
INSERT INTO `comment` (`id`, `content`, `created_at`, `status`, `last_edited`, `parent_id`, `user_id`, `post_id`, `enabled`) VALUES (4, 'I play all Souls game the same and have a lot of fun. I don???t look stuff up and begin as the most barren of character and just go from there', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', NULL, 2, 4, 1);
INSERT INTO `comment` (`id`, `content`, `created_at`, `status`, `last_edited`, `parent_id`, `user_id`, `post_id`, `enabled`) VALUES (5, 'I\'m not sure which ad caused it, unfortunately, but I just got this pop up', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', NULL, 2, 5, 1);
INSERT INTO `comment` (`id`, `content`, `created_at`, `status`, `last_edited`, `parent_id`, `user_id`, `post_id`, `enabled`) VALUES (6, 'What can more be said about Elden Ring? It\'s an evolved Souls game with absolutely massive scope. I was in the middle playing it when my first child was born, and playing through the rest of it over parental leave helped keep me sane? It was an amazing journey, and I\'m looking forward to seeing what else is coming with some DLC.', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', NULL, 2, 6, 1);

COMMIT;

