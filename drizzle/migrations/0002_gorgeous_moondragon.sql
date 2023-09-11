ALTER TABLE `payments` MODIFY COLUMN `stripeAccountCreatedAt` int;--> statement-breakpoint
ALTER TABLE `payments` MODIFY COLUMN `stripeAccountExpiresAt` int;--> statement-breakpoint
ALTER TABLE `products` MODIFY COLUMN `category` enum('skateboards','clothing','shoes','accessories') NOT NULL DEFAULT 'skateboards';--> statement-breakpoint
ALTER TABLE `carts` ADD `closed` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `orders` ADD `quantity` int;--> statement-breakpoint
ALTER TABLE `orders` ADD `amount` decimal(10,2) DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE `carts` DROP COLUMN `userId`;--> statement-breakpoint
ALTER TABLE `orders` DROP COLUMN `userId`;--> statement-breakpoint
ALTER TABLE `orders` DROP COLUMN `total`;--> statement-breakpoint
ALTER TABLE `payments` DROP COLUMN `userId`;