CREATE TABLE `magicLinks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`workflowId` int NOT NULL,
	`token` varchar(255) NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`usedAt` timestamp,
	`ipAddress` varchar(45),
	`userAgent` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `magicLinks_id` PRIMARY KEY(`id`),
	CONSTRAINT `magicLinks_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `workflowAnalytics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`workflowId` int NOT NULL,
	`email` varchar(320) NOT NULL,
	`eventType` enum('link_sent','link_opened','preview_viewed','cta_clicked','call_scheduled') NOT NULL,
	`metadata` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `workflowAnalytics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `workflowQuestionnaires` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`businessType` varchar(255) NOT NULL,
	`industry` varchar(255),
	`companySize` varchar(50),
	`processDescription` text NOT NULL,
	`currentTools` text,
	`painPoints` text,
	`desiredOutcome` text NOT NULL,
	`estimatedHoursPerWeek` int,
	`submittedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `workflowQuestionnaires_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `workflows` (
	`id` int AUTO_INCREMENT NOT NULL,
	`questionnaireId` int NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`toolsUsed` text,
	`complexity` enum('simple','moderate','complex') NOT NULL DEFAULT 'moderate',
	`estimatedSavingsHours` int,
	`nodeCount` int NOT NULL,
	`workflowData` text NOT NULL,
	`iconOnlyData` text NOT NULL,
	`status` enum('generated','viewed','scheduled','converted') NOT NULL DEFAULT 'generated',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`viewedAt` timestamp,
	CONSTRAINT `workflows_id` PRIMARY KEY(`id`)
);
