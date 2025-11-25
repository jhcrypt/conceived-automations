CREATE TABLE `sharedCalculatorResults` (
	`id` int AUTO_INCREMENT NOT NULL,
	`shareId` varchar(64) NOT NULL,
	`industry` varchar(100) NOT NULL,
	`businessStage` varchar(50) NOT NULL,
	`teamSize` varchar(50) NOT NULL,
	`timeSaved` varchar(50) NOT NULL,
	`delayImpact` varchar(50) NOT NULL,
	`growthChallenge` varchar(50) NOT NULL,
	`urgency` varchar(50) NOT NULL,
	`results` text NOT NULL,
	`sharedBy` varchar(320),
	`viewCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`expiresAt` timestamp,
	CONSTRAINT `sharedCalculatorResults_id` PRIMARY KEY(`id`),
	CONSTRAINT `sharedCalculatorResults_shareId_unique` UNIQUE(`shareId`)
);
--> statement-breakpoint
ALTER TABLE `workflows` MODIFY COLUMN `status` enum('generated','viewed','scheduled','converted') NOT NULL DEFAULT 'generated';--> statement-breakpoint
ALTER TABLE `workflows` ADD `viewedAt` timestamp;--> statement-breakpoint
ALTER TABLE `workflowQuestionnaires` DROP COLUMN `metadata`;--> statement-breakpoint
ALTER TABLE `workflows` DROP COLUMN `generatedPrompt`;