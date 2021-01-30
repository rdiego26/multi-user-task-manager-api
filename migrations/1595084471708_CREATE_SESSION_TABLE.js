/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    const SQL = `
		create table IF NOT EXISTS "session"
			(
					id uuid not null
						constraint session_pkey
							primary key,
					user_id uuid not null
						constraint fk_session_user
							references "user",
					token text not null
						constraint session_token_key
							unique,
					expires_at timestamp with time zone default now() not null
			);
	`;
    pgm.sql(SQL);
};

exports.down = pgm => {
    const SQL = `
			DROP TABLE IF EXISTS "session";
    `;
    pgm.sql(SQL);
};
