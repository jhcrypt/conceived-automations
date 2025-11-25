ALTER TABLE `workflows` MODIFY COLUMN `status` enum('generated','sent','viewed','accepted') NOT NULL DEFAULT 'generated';--> statement-breakpoint
ALTER TABLE `workflows` ADD `generatedPrompt` text;--> statement-breakpoint
ALTER TABLE `workflows` DROP COLUMN `viewedAt`;