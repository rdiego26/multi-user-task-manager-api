/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    const SQL = `
		create table IF NOT EXISTS "user"
			(
				id uuid not null
					constraint "PK_user"
						primary key,
				name varchar(200) not null,
				email varchar(100) not null
					constraint email_user
						unique,
				password varchar not null,
				created_at timestamp with time zone default now() not null,
				active boolean not null default true
			);
	`;
    pgm.sql(SQL);
};

exports.down = pgm => {
    const SQL = `
      DROP TABLE IF EXISTS "user"; 
		`;
    pgm.sql(SQL);
};

