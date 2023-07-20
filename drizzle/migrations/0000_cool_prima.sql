CREATE TABLE `addresses` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`line1` varchar(191),
	`line2` varchar(191),
	`city` varchar(191),
	`state` varchar(191),
	`postalCode` varchar(191),
	`country` varchar(191),
	`createdAt` timestamp DEFAULT (now())
);
--> statement-breakpoint
CREATE TABLE `carts` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`userId` varchar(191),
	`paymentIntentId` varchar(191),
	`clientSecret` varchar(191),
	`items` json DEFAULT ('null'),
	`createdAt` timestamp DEFAULT (now())
);
--> statement-breakpoint
CREATE TABLE `email_preferences` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`userId` varchar(191),
	`email` varchar(191) NOT NULL,
	`token` varchar(191) NOT NULL,
	`newsletter` boolean NOT NULL DEFAULT false,
	`marketing` boolean NOT NULL DEFAULT false,
	`transactional` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp DEFAULT (now())
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`userId` varchar(191),
	`storeId` int NOT NULL,
	`items` json DEFAULT ('null'),
	`total` decimal(10,2) NOT NULL DEFAULT '0',
	`stripePaymentIntentId` varchar(191) NOT NULL,
	`stripePaymentIntentStatus` varchar(191) NOT NULL,
	`name` varchar(191),
	`email` varchar(191),
	`addressId` int,
	`createdAt` timestamp DEFAULT (now())
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`userId` varchar(191),
	`storeId` int NOT NULL,
	`stripeAccountId` varchar(191) NOT NULL,
	`stripeAccountCreatedAt` int NOT NULL,
	`stripeAccountExpiresAt` int NOT NULL,
	`detailsSubmitted` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp DEFAULT (now())
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text,
	`images` json DEFAULT ('null'),
	`category` enum('clothing','accessories','art','decorations') NOT NULL DEFAULT 'clothing',
	`subcategory` varchar(191),
	`price` decimal(10,2) NOT NULL DEFAULT '0',
	`inventory` int NOT NULL DEFAULT 0,
	`rating` int NOT NULL DEFAULT 0,
	`tags` json DEFAULT ('null'),
	`storeId` int NOT NULL,
	`createdAt` timestamp DEFAULT (now())
);
--> statement-breakpoint
CREATE TABLE `stores` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`userId` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text,
	`slug` text,
	`active` boolean NOT NULL DEFAULT true,
	`stripeAccountId` varchar(191),
	`createdAt` timestamp DEFAULT (now())
);
