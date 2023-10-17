ALTER TABLE `products` MODIFY COLUMN `subcategory` varchar(24);--> statement-breakpoint
ALTER TABLE `stores` MODIFY COLUMN `userId` varchar(32) NOT NULL;--> statement-breakpoint
ALTER TABLE `stores` MODIFY COLUMN `stripeAccountId` varchar(191);