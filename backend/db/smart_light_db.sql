CREATE DATABASE smart_light;
USE smart_light;

CREATE TABLE `rooms` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `room_name` varchar(100) NOT NULL,
  `light_status` tinyint(1) NOT NULL DEFAULT '1',
  `bulb_pin` int NOT NULL,
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `rooms` 
	VALUES (1,'Kitchen',1,14),
		   (2,'Living room',1,27),
		   (3,'Bathroom',1,26),
		   (4,'Bedroom',1,25);

CREATE TABLE `history` (
  `history_id` int NOT NULL AUTO_INCREMENT,
  `room_id` int NOT NULL,
  `light_status` tinyint(1) NOT NULL,
  `scheduled_time` datetime NOT NULL,
  PRIMARY KEY (`history_id`),
  KEY `history_FK` (`room_id`),
  CONSTRAINT `history_FK` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `scheduler` (
  `schedule_id` int NOT NULL AUTO_INCREMENT,
  `room_id` int NOT NULL,
  `light_status` tinyint(1) NOT NULL DEFAULT '1',
  `scheduled_time` datetime NOT NULL,
  `status` varchar(100) NOT NULL,
  PRIMARY KEY (`schedule_id`),
  KEY `scheduler_FK` (`room_id`),
  CONSTRAINT `scheduler_FK` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;