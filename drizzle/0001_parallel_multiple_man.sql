ALTER TABLE "courses" RENAME COLUMN "metadata" TO "tags";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "saldo" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "saldo" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "harga" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "image_url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_name_unique" UNIQUE("name");