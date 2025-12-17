ALTER TABLE "courses" ALTER COLUMN "users_enrolled" SET DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "users_enrolled" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "start_at" timestamp with time zone NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "end_at" timestamp with time zone NOT NULL;