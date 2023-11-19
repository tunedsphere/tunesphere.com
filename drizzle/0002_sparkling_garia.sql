CREATE TABLE `albums` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`artistId` int NOT NULL,
	`title` text,
	`genre` enum('ambient','Downtempo','Psybreaks','Zenon','Natural Trance','Progressive','Goa','Full-On Morning','Full-On Twilight','Forest','Dark','Hi-Tech') NOT NULL DEFAULT 'ambient',
	`style` text,
	`release_date` text,
	`record_label` text,
	`format` text,
	`country` text,
	`distributor` text,
	`artwork` text,
	`mastered_by` text,
	`written_by` text,
	`producer` text,
	CONSTRAINT `albums_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `artists` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` text,
	`genre` enum('ambient','Downtempo','Psybreaks','Zenon','Natural Trance','Progressive','Goa','Full-On Morning','Full-On Twilight','Forest','Dark','Hi-Tech') NOT NULL DEFAULT 'ambient',
	CONSTRAINT `artists_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `djs` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` text,
	`genre` enum('ambient','Downtempo','Psybreaks','Zenon','Natural Trance','Progressive','Goa','Full-On Morning','Full-On Twilight','Forest','Dark','Hi-Tech') NOT NULL DEFAULT 'ambient',
	CONSTRAINT `djs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `recordLabels` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` text,
	`country` text,
	`images` json DEFAULT ('null'),
	`founding_year` text,
	`genre` enum('ambient','Downtempo','Psybreaks','Zenon','Natural Trance','Progressive','Goa','Full-On Morning','Full-On Twilight','Forest','Dark','Hi-Tech') NOT NULL DEFAULT 'ambient',
	`description` text,
	CONSTRAINT `recordLabels_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tracklist` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`album_id` text,
	`title` text,
	`duration` text,
	`remixers` text,
	CONSTRAINT `tracklist_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `stores` MODIFY COLUMN `userId` varchar(34) NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP;