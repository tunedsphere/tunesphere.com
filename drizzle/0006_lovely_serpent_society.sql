ALTER TABLE `stores` MODIFY COLUMN `userId` varchar(34) NOT NULL;--> statement-breakpoint
ALTER TABLE `stores` MODIFY COLUMN `name` varchar(110) NOT NULL;--> statement-breakpoint
ALTER TABLE `stores` MODIFY COLUMN `description` mediumtext;