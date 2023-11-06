-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sydneyhelperdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `sydneyhelperdb` ;

-- -----------------------------------------------------
-- Schema sydneyhelperdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sydneyhelperdb` DEFAULT CHARACTER SET utf8 ;
USE `sydneyhelperdb` ;


-- -----------------------------------------------------
-- Table `sydneyhelperdb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sydneyhelperdb`.`user` (
  `id` INT AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `birthday` DATE NULL,
  `degree` VARCHAR(100) NULL,
  `mobile_number` VARCHAR(20) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sydneyhelperdb`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sydneyhelperdb`.`admin` (
  `id` INT AUTO_INCREMENT,
	`admin_name` VARCHAR(45),
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sydneyhelperdb`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sydneyhelperdb`.`comment` (
  `id` INT AUTO_INCREMENT,
  `user_id` INT NULL,
  `request_id` INT NULL,
  `comment_id` INT NULL,
  `commented_time` TIMESTAMP NULL,
  `content` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sydneyhelperdb`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sydneyhelperdb`.`post` (
  `id` INT AUTO_INCREMENT,
  `publisher_id` INT(6) NULL,
  `accepter_id` INT NULL,
  `state_id` INT NULL,
  `reward` VARCHAR(200) NULL,
  `title` VARCHAR(100) NULL,
  `description` TEXT NULL,
  `created_time` TIMESTAMP NULL,
  `expired_time` TIMESTAMP NULL,
  `location` VARCHAR(100) NULL,
  `marker_is_visible` TINYINT(1) DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sydneyhelperdb`.`state_values`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sydneyhelperdb`.`state_values` (
  `state_key` INT,
  `state_value` VARCHAR(45) NULL,
  PRIMARY KEY (`state_key`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `sydneyhelperdb`.`pending_accepters` (
  `id` INT AUTO_INCREMENT,
  `user_id` INT,
  `post_id` INT,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `sydneyhelperdb`.`pending_confirm` (
  `id` INT AUTO_INCREMENT,
  `user_id` INT,
  `post_id` INT,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sydneyhelperdb`.`blocked_users`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `sydneyhelperdb`.`blocked_users` (
  `user_id` INT,
  `block_state` VARCHAR(100) NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `sydneyhelperdb`.`report_problems` (
  `id` INT AUTO_INCREMENT,
  `user_id` INT,
  `post_id` INT,
  `description` TEXT,
  `state` VARCHAR(80) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `sydneyhelperdb`.`message`
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Data for table `sydneyhelperdb`.`user`
-- -----------------------------------------------------
START TRANSACTION;
USE `sydneyhelperdb`;
INSERT INTO `sydneyhelperdb`.`user` (`name`, `email`, `password`, `birthday`, `degree`, `mobile_number`) VALUES ('Louie Mohlke', 'LouieMohlke1@gmail.com', '202cb962ac59075b964b07152d234b70', '1998-11-16', 'Master of Medical Physics', '0451268592');
INSERT INTO `sydneyhelperdb`.`user` (`name`, `email`, `password`, `birthday`, `degree`, `mobile_number`) VALUES ('Felicitas Hefley', 'FelicitasHefley2@outlook.com', '202cb962ac59075b964b07152d234b70', '2000-02-25', 'Bachelor of Science', '0451524625');
INSERT INTO `sydneyhelperdb`.`user` (`name`, `email`, `password`, `birthday`, `degree`, `mobile_number`) VALUES ('Sheryl Lefler', 'SherylLefler3@gmail.com', '202cb962ac59075b964b07152d234b70', '1998-12-14', 'Master of Medical Physics', '0451184541');
INSERT INTO `sydneyhelperdb`.`user` (`name`, `email`, `password`, `birthday`, `degree`, `mobile_number`) VALUES ('David Treister', 'DavidTreister4@gmail.com', '202cb962ac59075b964b07152d234b70', '2001-02-20', 'Bachelor of Science (Medical Science)', '0451302658');
INSERT INTO `sydneyhelperdb`.`user` (`name`, `email`, `password`, `birthday`, `degree`, `mobile_number`) VALUES ('Anita Volckmann', 'AnitaVolckmann5@outlook.com', '202cb962ac59075b964b07152d234b70', '2002-04-22', 'Bachelor of Commerce', '0451251477');
INSERT INTO `sydneyhelperdb`.`user` (`name`, `email`, `password`, `birthday`, `degree`, `mobile_number`) VALUES ('Joline Sebek', 'JolineSebek6@gmail.com', '202cb962ac59075b964b07152d234b70', '1996-05-11', 'Bachelor of Science', '0451102355');
INSERT INTO `sydneyhelperdb`.`user` (`name`, `email`, `password`, `birthday`, `degree`, `mobile_number`) VALUES ('Gertrudis Kassin', 'GertrudisKassin7@gmail.com', '202cb962ac59075b964b07152d234b70', '1998-11-16', 'Bachelor of Commerce', '0451154201');
INSERT INTO `sydneyhelperdb`.`user` (`name`, `email`, `password`, `birthday`, `degree`, `mobile_number`) VALUES ('Jacquie Thurstonson', 'JacquieThurstonson8@gmail.com', '202cb962ac59075b964b07152d234b70', '1995-08-25', 'Master of Medical Physics', '0451522451');
INSERT INTO `sydneyhelperdb`.`user` (`name`, `email`, `password`, `birthday`, `degree`, `mobile_number`) VALUES ('Hae Kliever', 'HaeKliever9@outlook.com', '202cb962ac59075b964b07152d234b70', '1998-12-02', 'Bachelor of Science', '0451632547');
INSERT INTO `sydneyhelperdb`.`user` (`name`, `email`, `password`, `birthday`, `degree`, `mobile_number`) VALUES ('Mickey Cotelesse', 'MickeyCotelesse10@outlook.com', '202cb962ac59075b964b07152d234b70', '1999-02-18', 'Bachelor of Science (Medical Science)', '0451215477');
INSERT INTO `sydneyhelperdb`.`user` (`name`, `email`, `password`, `birthday`, `degree`, `mobile_number`) VALUES ('Ming Zhang', 'MingZhang11@gmail.com', '202cb962ac59075b964b07152d234b70', '2001-12-04', 'Bachelor of Physics', '0451888474');

COMMIT;


-- -----------------------------------------------------
-- Data for table `sydneyhelperdb`.`admin`
-- -----------------------------------------------------
START TRANSACTION;
USE `sydneyhelperdb`;
INSERT INTO `sydneyhelperdb`.`admin` (`admin_name`, `password`) VALUES ('LashaunHaag', '11111111');
INSERT INTO `sydneyhelperdb`.`admin` (`admin_name`, `password`) VALUES ('JesseniaBrucz', '22222222');

COMMIT;


-- -----------------------------------------------------
-- Data for table `sydneyhelperdb`.`comment`
-- -----------------------------------------------------
START TRANSACTION;
USE `sydneyhelperdb`;
INSERT INTO `sydneyhelperdb`.`comment` (`user_id`, `request_id`, `commented_time`, `content`, `comment_id`) VALUES (0, 2, '2022-09-08 12:02:01', 'Can I join if I am not a native French speaker?',  null);
INSERT INTO `sydneyhelperdb`.`comment` (`user_id`, `request_id`, `commented_time`, `content`, `comment_id`) VALUES (8, 2, '2022-09-08 12:26:11', 'It depends on your language level, may I ask you what your French proficiency test score is?', 0);

COMMIT;


-- -----------------------------------------------------
-- Data for table `sydneyhelperdb`.`post`
-- -----------------------------------------------------
START TRANSACTION;
USE `sydneyhelperdb`;
INSERT INTO `sydneyhelperdb`.`post` (`publisher_id`, `accepter_id`, `state_id`, `reward`, `title`, `description`, `created_time`, `expired_time`, `location`) VALUES ( 3, NULL, 0, 'AU$100', 'Help me with move','Need a man to help with the move, in burwood, about an hour to complete','2022-09-08 14:20:32', '2022-09-09 14:20:32', '{"lat": -33.8886,"lng": 151.1873}');
INSERT INTO `sydneyhelperdb`.`post` (`publisher_id`, `accepter_id`, `state_id`, `reward`, `title`, `description`, `created_time`, `expired_time`, `location`) VALUES ( 1, 4, 1, 'A hug', 'Pool playing', 'Want to play pool with someone next Saturday, anyone want to come? Hopefully you are also an engineering student.', '2022-09-08 05:10:01', '2022-09-08 15:10:01', '{"lat": -33.8886,"lng": 151.1873}');
INSERT INTO `sydneyhelperdb`.`post` (`publisher_id`, `accepter_id`, `state_id`, `reward`, `title`, `description`, `created_time`, `expired_time`, `location`, `marker_is_visible`) VALUES ( 1, NULL, 0, 'AU$10', 'Recruiting!!! French Practice partner','Recruiting a French practice partner to be billed by the hour.', '2022-09-08 05:10:01', '2022-09-08 05:15:01', '{"lat": -33.8886,"lng": 151.1873}', 1);
INSERT INTO `sydneyhelperdb`.`post` (`publisher_id`, `accepter_id`, `state_id`, `reward`, `title`, `description`, `created_time`, `expired_time`, `location`) VALUES ( 2, 8, 1, 'Papers with annotation', 'Translation of papers', 'Can someone help me with the translation of papers? Computer science background is needed.' , '2022-09-08 11:45:58', '2022-09-20 11:45:58', '{"lat": -33.8886,"lng": 151.1873}');
INSERT INTO `sydneyhelperdb`.`post` (`publisher_id`, `accepter_id`, `state_id`, `reward`, `title`, `description`, `created_time`, `expired_time`, `location`) VALUES ( 3, 9, 2, 'Friends', 'Football Party!', 'There is a football party this Tuesday at 3pm, anyone want to come?',  '2022-09-08 12:24:44', '2022-09-10 12:24:44', '{"lat": -33.8886,"lng": 151.1873}');
INSERT INTO `sydneyhelperdb`.`post` (`publisher_id`, `accepter_id`, `state_id`, `reward`, `title`, `description`, `created_time`, `expired_time`, `location`, `marker_is_visible`) VALUES ( 4, NULL, 0, '$60', 'Glasses Repaire', 'Does anyone know where to get my glasses repaired if they are broken?','2022-09-08 22:15:57', '2022-09-15 22:15:57', '{"lat": -33.8886,"lng": 151.1873}', 1);
INSERT INTO `sydneyhelperdb`.`post` (`publisher_id`, `accepter_id`, `state_id`, `reward`, `title`, `description`, `created_time`, `expired_time`, `location`, `marker_is_visible`) VALUES ( 5, NULL, 0, 'Two used textbooks', 'Waiter Wanted', 'Wellbeing needs a waiter for a third floor cafe for our students, male or female, fluent in English, salary negotiable.', '2022-09-08 01:04:56', '2022-10-08 01:04:56', '{"lat": -33.8886,"lng": 151.1873}', 1);
INSERT INTO `sydneyhelperdb`.`post` (`publisher_id`, `accepter_id`, `state_id`, `reward`, `title`, `description`, `created_time`, `expired_time`, `location`) VALUES ( 1, 3, 1, '$100', 'Newly open bar', 'Anyone want to hang out with me? Think of going to a bar near school.', '2022-09-18 01:04:56', '2022-10-08 01:04:56', '{"lat": -33.8886,"lng": 151.1873}');
INSERT INTO `sydneyhelperdb`.`post` (`publisher_id`, `accepter_id`, `state_id`, `reward`, `title`, `description`, `created_time`, `expired_time`, `location`) VALUES ( 3, 1, 1, '$1', 'Study Vacation', 'Anyone want to study with me during the study vacation?', '2022-09-18 01:04:56', '2022-10-01 01:04:56', '{"lat": -33.8886,"lng": 151.1873}');
INSERT INTO `sydneyhelperdb`.`post` (`publisher_id`, `accepter_id`, `state_id`, `reward`, `title`, `description`, `created_time`, `expired_time`, `location`) VALUES ( 1, 3, 2, 'A free cup of coffee', 'Do you want to learn how to make delicious coffee?', 'Hi guys, I work part time in a coffee shop, anyone want me to learn how to make coffee. Contact me!', '2022-09-17 01:04:56', '2022-10-01 01:04:56', '{"lat": -33.8886,"lng": 151.1873}');
INSERT INTO `sydneyhelperdb`.`post` (`publisher_id`, `accepter_id`, `state_id`, `reward`, `title`, `description`, `created_time`, `expired_time`, `location`) VALUES ( 4, 1, 2, 'A chance to make friends', 'Party Night', 'Hi guys, I am hosting a party at my house. Contact me if you are interested.', '2022-09-17 01:04:56', '2022-09-18 01:04:56', '{"lat": -33.8886,"lng": 151.1873}');

COMMIT;


-- -----------------------------------------------------
-- Data for table `sydneyhelperdb`.`state_values`
-- -----------------------------------------------------
START TRANSACTION;
USE `sydneyhelperdb`;
INSERT INTO `sydneyhelperdb`.`state_values` (`state_key`, `state_value`) VALUES (0, 'new');
INSERT INTO `sydneyhelperdb`.`state_values` (`state_key`, `state_value`) VALUES (1, 'ongoing');
INSERT INTO `sydneyhelperdb`.`state_values` (`state_key`, `state_value`) VALUES (2, 'completed');

COMMIT;

START TRANSACTION;
USE `sydneyhelperdb`;
INSERT INTO `sydneyhelperdb`.`pending_accepters` (`user_id`, `post_id`) VALUES (1, 2);
INSERT INTO `sydneyhelperdb`.`pending_accepters` (`user_id`, `post_id`) VALUES (2, 4);
INSERT INTO `sydneyhelperdb`.`pending_accepters` (`user_id`, `post_id`) VALUES (1, 3);

COMMIT;

START TRANSACTION;
USE `sydneyhelperdb`;
INSERT INTO `sydneyhelperdb`.`pending_confirm` (`user_id`, `post_id`) VALUES (4, 2);

COMMIT;

-- -----------------------------------------------------
-- Data for table `sydneyhelperdb`.`blocked_users`
-- -----------------------------------------------------
START TRANSACTION;
USE `sydneyhelperdb`;
INSERT INTO `sydneyhelperdb`.`blocked_users` (`user_id`, `block_state`) VALUES (10, 'ban forever');

COMMIT;


