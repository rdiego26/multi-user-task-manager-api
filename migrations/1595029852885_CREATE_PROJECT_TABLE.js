/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    const SQL = `
		create table IF NOT EXISTS "project"
			(
				id uuid not null
					constraint "PK_project"
						primary key,
				name varchar(200) not null,
					user_id uuid not null
						constraint fk_project_user
						references "user",
				created_at timestamp with time zone default now() not null,
				deleted_at timestamp with time zone
			);
	`;
    pgm.sql(SQL);
};

exports.down = pgm => {
    const SQL = `
			DROP TABLE IF EXISTS "project"; 
    `;
    pgm.sql(SQL);
};
