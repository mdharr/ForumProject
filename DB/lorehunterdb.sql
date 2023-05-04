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
  `api_key` VARCHAR(100) NULL DEFAULT 'a569b5c91c944880a78145c9280ce92c',
  `url` TEXT NULL,
  `created_at` TIMESTAMP NULL,
  `slug` VARCHAR(255) NULL,
  `name` VARCHAR(255) NULL,
  `description` TEXT NULL,
  `released` VARCHAR(45) NULL,
  `background_image` VARCHAR(1000) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user_has_game`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_has_game` ;

CREATE TABLE IF NOT EXISTS `user_has_game` (
  `user_id` INT NOT NULL,
  `game_id` INT NOT NULL,
  `category` ENUM('PLAYED', 'PLAYING') NULL,
  `rating` ENUM('0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5') NULL,
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
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `email`, `created_at`, `image_url`, `last_activity`, `status`, `comment_count`, `banner_message`, `post_count`, `state`, `banner_image`, `is_online`, `verification_code`, `verified_status`, `email_verified`, `verification_expiry_time`, `resend_count`, `last_verification_code_sent_time`) VALUES (1, 'Jill', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', 1, 'ADMIN', 'Albert', 'Jill', 'jill@valentine.com', '2023-03-03T12:35:22', 'https://64.media.tumblr.com/8611a4dab286090923c8876380df032a/tumblr_nv8mgo9YfZ1u8intho1_500.gif', '2023-03-03T12:35:22', 'active', 3, 'I am the master of this domain.', 1, 'offline', 'https://static.wikia.nocookie.net/residentevil/images/f/ff/Resident_Evil_Series_ECG.gif', 0, '1287ce4e-93c9-439c-9673-d166bb948482', 'ACTIVE', 1, NULL, 0, NULL);
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `email`, `created_at`, `image_url`, `last_activity`, `status`, `comment_count`, `banner_message`, `post_count`, `state`, `banner_image`, `is_online`, `verification_code`, `verified_status`, `email_verified`, `verification_expiry_time`, `resend_count`, `last_verification_code_sent_time`) VALUES (2, 'Wander', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', 1, 'ADMIN', 'Michael', 'Harrington', 'wander@sotc.com', '2023-03-03T12:35:22', 'https://cdna.artstation.com/p/assets/images/images/016/596/266/original/fernando-henrique-shadowofthecolossus.gif', '2023-03-03T12:35:22', 'active', 2, 'Raise thy sword by the light.', 3, 'offline', 'https://cdna.artstation.com/p/assets/images/images/016/596/266/original/fernando-henrique-shadowofthecolossus.gif', 0, '1287ce4e-93c9-439c-9673-d166bb948482', 'ACTIVE', 1, NULL, 0, NULL);
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `email`, `created_at`, `image_url`, `last_activity`, `status`, `comment_count`, `banner_message`, `post_count`, `state`, `banner_image`, `is_online`, `verification_code`, `verified_status`, `email_verified`, `verification_expiry_time`, `resend_count`, `last_verification_code_sent_time`) VALUES (3, 'Snake', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', 1, 'ADMIN', 'Solid', 'Snake', 'snake@mgs.com', '2023-03-03T12:35:22', 'https://i.gifer.com/origin/ae/ae9c3e23b51b8122e879220927d72dd2_w200.gif', '2023-03-03T12:35:22', 'active', 5, 'A legend is nothing but fiction.', 2, 'offline', 'https://i.pinimg.com/originals/3b/96/34/3b9634ada93c603291ed0250a1b8b892.gif', 0, '1287ce4e-93c9-439c-9673-d166bb948482', 'ACTIVE', 1, NULL, 0, NULL);

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
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`) VALUES (1, '[Reddit Rumor] Embargo preview FFXVI lifted next week', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 1, 1, 'Two Italian reviewers have stated that an important game\'s embargo will expire at the end of the month, and have hinted that it is FFXVI (preview). Obviously do not take this information as 100% certain, we will find out in the coming days. To avoid NDA problems I will avoid specifying who they are.', 1, 0, 0);
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`) VALUES (2, '12th Colossus', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 2, 2, 'Paradise floats upon the lake....', 1, 0, 0);
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`) VALUES (3, 'Elden Ring DLC Announced - Shadow of the Erdtree Expansion', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 3, 1, 'Rise, Tarnished, and let us walk a new path together.\nAn upcoming expansion for #ELDENRING Shadow of the Erdtree, is currently in development. We hope you look forward to new adventures in the Lands Between.', 1, 0, 0);
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`) VALUES (4, 'Giving Elden Ring another chance', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 4, 2, 'I\'m thinking about giving ER another chance, but for realsies this time. I got it on launch and liked it well enough to sink 20-30 hours into it before I started low-key hating the game. I gave up somewhere into the second area behind the castle, after being overwhelmed with all the systems, weapons, and things to do. I had a constant feeling of FOMO and anxiety, especially reading the OT here on Era where everybody talked about builds and ever-changing balancing issues from patches. Never once did I just relax and enjoy exploring the world, there was always this sense that I was playing it wrong in some way that I couldn\'t quite place my finger on.', 1, 0, 0);
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`) VALUES (5, 'The Ad Reporting Thread', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 5, 1, 'Please use this thread to report bad ads (e.g. full-screen takeovers, pop-ups, redirects, etc.). We make it a high priority to ensure that intrusive ads don\'t show up on the site and to get them removed as quickly as possible so that you can keep having a great experience.', 1, 0, 0);
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`) VALUES (6, 'Games of the Year Awards 2022', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 6, 2, 'Top 20 Games of 2022', 1, 0, 0);
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`) VALUES (7, 'Programmer/Designer portfolio shows first look at The Silver Case: The 25th Ward\'s assets', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 1, 3, 'To put in perspective, this is a remake of a game that was originally only for (VERY OLD) mobile phones, and probably had little if any 3D motion. I think it was just a visual novel.', 1, 0, 0);
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`) VALUES (8, 'Cursed Castilla (Ghouls and Ghosts-like) is coming to Vita November 9th ($11.99)', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 1, 2, 'This game has already been released on PC, PS4, Xbone, and 3DS, but somehow it completely flew under my radar until the announcement of its upcoming Vita port. I think it looks pretty awesome!', 1, 0, 0);
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`) VALUES (9, 'Sorcer Striker (M2 ShotTriggers) releasing on PS4 on November 11th in Japan', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 1, 3, 'I hope this sells... I heard Battle Garegga was a total flop in Japan :(', 1, 0, 0);
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`) VALUES (10, 'Doesn\'t the steam fall sale start today?', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 1, 3, 'I\'ll try to split the things I want to buy between this sale and the next two (Autumn and Winter). As always, I don\'t know if I want good deals to spend a lot, or if I want bad deals so I don\'t spend money lol', 1, 0, 0);
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`) VALUES (11, 'Game Informer: The Resident Evil TV Series Is Dead, But You Can Watch The Proof Of Concept Now', '2023-03-03T12:35:22', 'active', '2023-03-03T12:35:22', 0, 1, 2, 'I\'m glad it didn\'t get picked up. I want a more direct adaptation of the series and this would have muddied the waters. I\'m not mad about the idea of setting an original story in a known universe and introducing a new character, when the actual characters/stories that people like haven\'t been adapted yet.', 1, 0, 0);
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`) VALUES (12, 'Attention Lore Hunters', '2023-04-22T12:35:22', 'active', '2023-04-22T12:35:22', 0, 1, 3, 'We\'ll be performing server maintenance in the coming days. Heads up!', 1, 0, 1);
INSERT INTO `post` (`id`, `subject`, `created_at`, `status`, `last_edited`, `comment_count`, `category_id`, `user_id`, `content`, `enabled`, `view_count`, `is_pinned`) VALUES (13, 'Armored Core VI: Fires of Rubicon - Gameplay Trailer, releases August 25, 2023', '2023-05-03T12:35:22', 'active', '2023-05-03T12:35:22', 0, 1, 3, '<h1><span class=\"text-big\">Armored Core VI: Fires of Rubicon</span><br>&nbsp;</h1><figure class=\"media\"><oembed url=\"https://www.youtube.com/watch?v=SlSfr6Wa5sc\"></oembed></figure><h2>&nbsp;</h2><figure class=\"media\"><oembed url=\"https://www.youtube.com/watch?v=LiOgQXYxLpA\"></oembed></figure><h2>&nbsp;</h2><blockquote><p><span style=\"var(—text-color);\">\"Augmented human C4-621 has awakened.\"</span><br><br><span style=\"var(—text-color);\">ARMORED CORE VI FIRES OF RUBICON makes planetfall August 25, 2023.</span></p></blockquote><h2>&nbsp;</h2><figure class=\"media\"><oembed url=\"https://www.youtube.com/watch?v=1iwDkLHVhEc\"></oembed></figure><h2><br>Engage in high-speed mech combat</h2><p><span style=\"var(—text-color);\">Those whose primary experience with FromSoftware comes from games like Bloodborne or Elden Ring might be curious about what to expect from Armored Core VI.</span><br><br><span style=\"color:var(—text-color);\">You play an augmented mercenary piloting a huge, customizable mech. Yet while the pace and structure of mech-piloting action fundamentally differ from other games in the studio\'s catalog, players can rest assured that the smooth, responsive controls they\'ve come to expect in FromSoftware games is still here–just in a different context. Think giant, heavily equipped robots with the ability to zip around across ground and air, reacting at lightning-fast speeds to attacks and threats while trying to one-up dangerous foes with even more firepower at their disposal.</span><br>&nbsp;</p><p><img src=\"https://live.staticflickr.com/65535/52849076063_8f7868cdce_4k.jpg\"><br><h2><br>Rubicon, the ruined planet</p></h2><p><span style=\"color:var(—text-color);\">Armored Core VI is a new story that takes place on the planet Rubicon, where a powerful energy source called \"Coral\" has been discovered. But this isn\'t stuff that looks pretty in aquariums–Coral is </span><i>extremely </i><span style=\"color:var(—text-color);\">volatile, and it\'s already caused a massive disaster that nearly turned all of Rubicon to ash many years prior. But those futuristic megacorps just can\'t resist the siren song of Coral and continue to war for it to this day.</span><br><br><span style=\"color:var(—text-color);\"><img src=\"https://live.staticflickr.com/65535/52849076068_fcc13b78b1_4k.jpg\"></span><br><br><span style=\"color:var(—text-color);\">The various areas of Rubicon are filled with contrasts, as the hollowed-out industrial ruins from the aforementioned disaster smolder beneath a shiny shell of state-of-the-art mining constructs encasing the planet.</span><br><br><span style=\"color:var(—text-color);\">\"It\'s an intricate and multi-layered world, brimming with mega-structures and enormous underground facilities built by its former inhabitants. These structures cover a planetary surface wracked with extreme cold and contamination in the aftermath of the great disaster, and the player will be exploring these various environments as they proceed,\" says game director Masaru Yamamura.</span><br><br><span style=\"color:var(—text-color);\">The expansive environments will deliver an incredible sense of scale, maintaining the quality we\'ve come to expect from FromSoftware\'s world-design maestros. And with your Armored Core\'s (AC for short) advanced movement skills, you\'ll be able to explore these large, open spaces to your heart\'s content. You\'ll be encountering lots of different scenery and objectives as you advance through the game\'s mission-based progression structure (like previous entries).</span><br><br><span style=\"color:var(—text-color);\">\"There will be missions where you\'re fighting across sweeping battlefields–very combat-oriented,\" Yamamura explains. \"But you\'ll sometimes be recovering data logs from wreckage and doing other side objectives too.\"</span><br><br><img src=\"https://live.staticflickr.com/65535/52849076023_24e1f70929_4k.jpg\"><br><h2><br><span class=\"text-big\"><strong>Combat features</strong></span></h2>&nbsp;</p><p><strong>Assault Boost: </strong><span style=\"color:var(—text-color);\">One of the biggest new features in Armored Core VI is an instantaneous switch between long-range gunfighting and close-range melee, thanks to a button-activated movement skill called the Assault Boost.</span><br><br><span style=\"color:var(—text-color);\">\"Assault Boost is an offensive action that helps close the gap between enemies and lets you quickly go from long distance to close range,\" Yamamura tells us. It will also provide some incredible chain abilities when fighting, as he describes vividly: \"Say you activate Assault Boost to make your approach while using machine gun fire and a missile salvo to stagger the enemy, then use your pulse blade to score a direct melee hit once you\'re up close.\"</span><br><br><br><strong>Stagger: </strong><span style=\"color:var(—text-color);\">Another addition to the series\' combat is a \"stagger\" element: if an AC takes too many hits over a short period of time, its Attitude Control System will be overloaded, making it vulnerable for a short time. Both continuous hits and big, powerful strikes will cause stagger damage, encouraging you to keep up the pressure on the opponent. The damage inflicted to an enemy\'s stagger gauge varies from weapon to weapon. It can also be affected by factors like distance, adding additional strategy in equipping and using these armaments in combat.</span><br><br><span style=\"color:var(—text-color);\">We asked Yamamura how the pace and feel of the game compares to previous entries.</span><br><br><span style=\"color:var(—text-color);\">\"The average movement speed across the game is somewhere between Armored Core 3 and Armored Core 5,\" he replies. \"But Armored Core VI has been developed to bolster the changes of tempo and combat. With instantaneous bursts of speed and sudden changes of tempo, combat can often reach the dizzying heights of say, Armored Core 4.\"</span><br><br><span style=\"color:var(—text-color);\"><img src=\"https://live.staticflickr.com/65535/52849076008_85f211ffe7_4k.jpg\"></span><br>&nbsp;</p><h2>Fight challenging bosses</h2><p><span style=\"color:var(—text-color);\">The series\' big boss encounters are back, and the metal monstrosities you\'ll encounter look bigger and more intimidating than ever.</span><br><br><span style=\"color:var(—text-color);\">\"There will be a rich variety of powerful enemies of all shapes and sizes,\" says Yamamura. \"Huge combat helicopters, heavily armored mobile turrets, and unmanned heavy demolition machinery that\'s programmed to indiscriminately crush intruders. Armored Core VI will offer a number of explosive battle experiences that challenge players to fight against the odds and overcome these ginormous, more abnormal mechs.\"</span><br><br><img src=\"https://live.staticflickr.com/65535/52848618461_4aa48fbade_4k.jpg\"><br><br><span style=\"color:var(—text-color);”>In addition to these larger bosses, you\'ll even fight against other ACs and humanoid mechs in high-octane duels. And in grand FromSoftware tradition, it may take several attempts and some experimentation with your AC\'s equipment to fully learn and adapt to a boss\'s quirks. So better prepare yourself, as Armored Core VI will offer numerous cathartic explosive battles that\'ll truly test your skills.</span><br><br>&nbsp;</p><h2>Build the perfect AC</h2><p><span style=\"color:var(—text-color);\">Customization is a key part of the Armored Core experience. You have access to an assortment of parts to upgrade and fine-tune the power of your AC. Four slots for holding weaponry–one in each hand and two on the back–give you a lot of space to experiment with custom loadouts.</span><br><br><span style=\"color:var(—text-color);\">What kind of weapons are we talking about? Bazookas, gatling guns, split missiles, plasma rifles, and all the perennial favorites. There are a bunch of new close-range weapons, too.</span><br><br><span style=\"color:var(—text-color);\">\"One aspect we focused on in Armored Core VI is melee weapons, exclusively equipped to the left hand,\" Yamamura continues. \"These can include a cluster bomb thrower, a chainsaw or pulse blade, lances, and other more idiosyncratic weapons. Since the main weapons are firearms, the melee weapons are more focused on that strength of individuality.\"</span><br><br><span style=\"color:var(—text-color);\">Add in custom paint jobs and liveries and you\'ll be able to create a unique AC that\'s all yours.</span><br><br><span style=\"color:var(—text-color);\"><img src=\"https://live.staticflickr.com/65535/52849075858_b00bed4975_4k.jpg\"></span><br><h2><br><span class=\"text-big\"><strong>The Arena is back</strong></span></h2></p><p><span style=\"color:var(—text-color);\">There\'s more good news for longtime Armored Core fans. The Arena, a much-cherished mode where you can fight a series of battles against a wide array of specially customized mechs, makes its return in Armored Core VI as a \"combat aptitude evaluation program\" (simulated training exercise).</span><br><br><span style=\"color:var(—text-color);\">\"There are a lot of different AC frames and a lot of colorful characters to fight in the Arena, so we hope the players confront them all and aim for the top rank. You can even encounter the real version of these opponents while out on missions. These are more formidable than their simulator counterparts, and will confront the protagonist with their own ideals and motives in the heat of battle.\"</span><br><br><span style=\"color:var(—text-color);\">Perfecting your combat skills won\'t be the only reason you\'ll want to return to the frontline: there will be multiple endings to Armored Core VI\'s narrative, with new paths opening up on subsequent playthroughs, giving players plenty of incentive to explore the world and story thoroughly. What will be the ultimate fate of Rubicon? That\'s all up to you.</span><br><br><span style=\"color:var(—text-color);\"><img src=\"https://blog.playstation.com/tachyon/2023/04/2750b91a113b231cc5d6e3ee82e9ac39a43a6a27.jpg\"></span></p>', 1, 0, 0);

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
INSERT INTO `game` (`id`, `api_key`, `url`, `created_at`, `slug`, `name`, `description`, `released`, `background_image`) VALUES (1, 'a569b5c91c944880a78145c9280ce92c', 'https://api.rawg.io/api/games/resident-evil-2002?key=a569b5c91c944880a78145c9280ce92c', '2023-03-03T12:35:22', 'resident-evil-2002', 'Resident Evil (2002)', '<p>Resident Evil is a survival horror video game developed by Capcom Production Studio 4 and published by Capcom. Released for the GameCube video game console in 2002, it is a remake of the 1996 PlayStation game Resident Evil, the first installment in the Resident Evil video game series. The story takes place in 1998 near the fictional Midwestern town of Raccoon City where a series of bizarre murders have taken place. The player takes on the role of either Chris Redfield or Jill Valentine, S.T.A.R.S. agents sent in by the city to investigate the murders.</p>', '2002-03-22', 'https://media.rawg.io/media/games/d24/d24ceb45b267f4b69b5d51c36c9a46db.jpg');
INSERT INTO `game` (`id`, `api_key`, `url`, `created_at`, `slug`, `name`, `description`, `released`, `background_image`) VALUES (2, 'a569b5c91c944880a78145c9280ce92c', 'https://api.rawg.io/api/games/shadow-of-the-colossus?key=a569b5c91c944880a78145c9280ce92c', '2023-03-03T12:35:22', 'shadow-of-the-colossus', 'Shadow of the Colossus (2011)', '<p>PlayStation 2 classic that never made it out of the Sony game system. An eerie and surreal tale about sacrifice and cruelty that the world contains. </p>\\n<p>Play as Wander -- young warrior that roams vast and hollow game universe that’s surrounded by sharp cliffs and endless water. He is on the mission to kill 16 gargantuan colossi all scattered around the game world. </p>\\n<p>Each colossus is a puzzle and can be killed only after solving it. At Wander’s disposal are his sword and bow that helps him climb the beasts. Each one requires the player to come up with a cunning strategy to topple each behemoth. The story is told in a very ascetic way and consists of only two in-game cutscenes. Nevertheless, it helps to build up the atmosphere mystery in the game epos. </p>\\n<p>Developers are no strangers in the dark, atmospheric games such as this: they also behind critically acclaimed ICO that also had been published on PlayStation 2.</p>', '2011-09-22', 'https://media.rawg.io/media/games/6ac/6ac602e70c837ababdf025e997391d9c.jpg');
INSERT INTO `game` (`id`, `api_key`, `url`, `created_at`, `slug`, `name`, `description`, `released`, `background_image`) VALUES (3, 'a569b5c91c944880a78145c9280ce92c', 'https://api.rawg.io/api/games/metal-gear-solid-1?key=a569b5c91c944880a78145c9280ce92c', '2023-03-03T12:35:22', 'metal-gear-solid-1', 'Metal Gear Solid', '<p>You are Snake, a government agent on a mission to regain control of a secret nuclear weapons base from terrorist hands. Lightly armed and facing an army of foes, Snake must avoid firefights in order to survive. If Snake can locate them he can utilize advanced hardware, ranging from silenced pistols to ground-to-air missiles. Enemies react to sight and sound - so stay quiet and stay in the shadows. State-of-the-art graphics: textures, transparencies, models and explosions. Taut, gripping story with multiple endings - a truly cinematic experience.</p>', '1998-09-03', 'https://media.rawg.io/media/games/bbc/bbce6f1659d35ffc16aed8b66e9990a1.jpg');

COMMIT;


-- -----------------------------------------------------
-- Data for table `user_has_game`
-- -----------------------------------------------------
START TRANSACTION;
USE `lorehunterdb`;
INSERT INTO `user_has_game` (`user_id`, `game_id`, `category`, `rating`) VALUES (1, 1, 'PLAYED', '5');
INSERT INTO `user_has_game` (`user_id`, `game_id`, `category`, `rating`) VALUES (2, 2, 'PLAYED', '5');
INSERT INTO `user_has_game` (`user_id`, `game_id`, `category`, `rating`) VALUES (3, 3, 'PLAYED', '5');

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

