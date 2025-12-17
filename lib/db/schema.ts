import { date, integer, jsonb, pgTable, serial, text, uuid, index, uniqueIndex, PgTable, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
    password: text('password').notNull(),
    tahunAngkatan: integer('tahun_angkatan'),
    saldo: integer('saldo').default(0),
    asalSekolah: text('asal_sekolah').notNull(),
    prodi: text('program_studi').notNull(),
    kampus: text('kampus'),

});


export const usersPaymentCredentials = relations(users, ({ one }) => ({
    paymentCredentials: one(paymentCredentials)
}));

export const paymentCredentials = pgTable('payment_credential', {
	id: serial('id_credentials').primaryKey(),
	userId: integer('user_id').references(() => users.id, {onDelete: 'cascade'}).notNull(),
	cardNumber: integer('card_number').notNull(),
    expiryDate: date('expiry_date').notNull(),
    cvv: integer('cvv').notNull(),
});

export const courses = pgTable('courses', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    teacher: text('teacher').references(() => users.name).notNull(),
    harga: integer('harga').default(0).notNull(),
    imageUrl: text('image_url').notNull(),
    tags: jsonb('tags').notNull().$type<string[]>(),
    startAt: timestamp('start_at', { withTimezone: true }).notNull(),
    endAt: timestamp('end_at', { withTimezone: true }).notNull(),
    usersEnrolledId: jsonb('users_enrolled').default([]).notNull().$type<number[]>().references(() => users.id),
    linkMeeting: text('link_meeting'),
}); 

export const coursesRelations = relations(courses, ({ one }) => ({
  teacherData: one(users, {
    fields: [courses.teacher],
    references: [users.name],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  courses: many(courses),
}));

export const chats = pgTable('chats', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: integer('user_id').references(() => users.id, {onDelete: 'cascade'}).notNull(),
    teacherId: integer('teacher_id').references(() => users.id, {onDelete: 'cascade'}).notNull(),

});
export const messages = pgTable('messages', {
    messageId: uuid('message_id').primaryKey().defaultRandom(),
    chatId: uuid('chat_id').references(() => chats.id, {onDelete: 'cascade'}).notNull(),
    senderId: integer('sender_id').references(() => users.id).notNull(),
    content: text('content').notNull(),
    timestamp: date('timestamp').notNull(),
}, (thisTable)=>([index('conversation_created_idx').on(thisTable.chatId, thisTable.timestamp)
    ])
);

// export const profileInfoRelations = relations(paymentCredentials, ({ one }) => ({
// 	user: one(users, { fields: [paymentCredentials.userId], references: [users.id] }),
// }));

// export const courses = pgTable('courses', {
// 	// routineId: text('routine_id')
// 	// 	.notNull()
// 	// 	.references(() => routines.id, { onDelete: 'cascade' }),
// 	date: text('date').notNull()
// });


//---RELATIONS----//
// export const UserRoutineRelations = relations(users, ({many}) => ({
// 	routines: many(routines)
// }))

// export const RoutineUserRelations = relations(routines, ({one}) => ({
// 	user: one(users, {
// 		fields: [routines.userId],
// 		references: [users.id]
// 	})
// }));

// export const routinesRelations = relations(routines, ({many}) => ({
// 	checkedBlocks: many(checkedBlocks)
// }));

// export const checkedBlocksRelations = relations(checkedBlocks, ({one}) => ({
// 	routines: one(routines)
// }));


// export type User = typeof users.$inferSelect;
// export type Routine = typeof routinesTable.$inferSelect;
// export type CheckedBlock = typeof checkedBlocks.$inferSelect;
