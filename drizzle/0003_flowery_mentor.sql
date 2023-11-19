DROP TABLE `albums`;--> statement-breakpoint
DROP TABLE `artists`;--> statement-breakpoint
DROP TABLE `djs`;--> statement-breakpoint
DROP TABLE `recordLabels`;--> statement-breakpoint
DROP TABLE `tracklist`;--> statement-breakpoint
ALTER TABLE `products` MODIFY COLUMN `category` enum('skateboards','clothing','shoes','accessories') NOT NULL DEFAULT 'skateboards';--> statement-breakpoint
ALTER TABLE `products` MODIFY COLUMN `subcategory` varchar(191);--> statement-breakpoint
ALTER TABLE `stores` MODIFY COLUMN `userId` varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE `stores` MODIFY COLUMN `name` varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE `stores` MODIFY COLUMN `description` text;--> statement-breakpoint
ALTER TABLE `addresses` ADD `updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `carts` ADD `updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `email_preferences` ADD `updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `orders` ADD `updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `payments` ADD `updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `stores` ADD `updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP;